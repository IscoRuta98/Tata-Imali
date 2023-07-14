from fastapi import HTTPException
from algorand.client import algod_client

from algosdk.atomic_transaction_composer import (
    AccountTransactionSigner,
    AtomicTransactionComposer,
    TransactionWithSigner,
)
from algosdk.v2client.algod import AlgodClient
from algosdk.encoding import decode_address, encode_address
from algosdk.mnemonic import to_private_key
from algosdk.account import address_from_private_key
from algosdk.transaction import (
    ApplicationNoOpTxn,
    AssetOptInTxn,
)

from common.types import Engine, app_address, app_id, asset_id
from algorand.schema.actions import LoanRequest
from auth.schema.entities import UserDetailStorable


def grant_loan(
    user_address: str,
    user_txn_signer: AccountTransactionSigner,
    loanAmount: int,
    repaymentDate: str,
    asset_id: str,
    app_id: str = app_id,
):
    "Smart contract grant loan payments to a legible user"
    sp = algod_client.suggested_params()
    sp.flat_fee = True
    sp.fee = sp.min_fee * 2

    atc = AtomicTransactionComposer()
    account_info = algod_client.account_info(user_address)
    assets = account_info.get("assets", [])
    asset_ids = [asset["asset-id"] for asset in assets]
    if asset_id not in asset_ids:
        atc.add_transaction(
            TransactionWithSigner(
                txn=AssetOptInTxn(
                    sender=user_address,
                    sp=sp,
                    index=asset_id,
                ),
                signer=user_txn_signer,
            )
        )
    atc.add_transaction(
        TransactionWithSigner(
            txn=ApplicationNoOpTxn(
                sender=user_address,
                sp=sp,
                index=app_id,
                app_args=["grant_loan", loanAmount, repaymentDate],
                boxes=[(app_id, decode_address(user_address))],
                foreign_assets=[asset_id],
            ),
            signer=user_txn_signer,
        )
    )
    atc.execute(algod_client, 5)

    asset_holding = algod_client.account_asset_info(user_address, asset_id)[
        "asset-holding"
    ]
    return asset_holding


async def request_loan(engine: Engine, params: LoanRequest):
    """
    User repaying loan
    """
    existing_user = await engine.find_one(
        UserDetailStorable, UserDetailStorable.userName == params.userName
    )
    if existing_user is None:
        raise HTTPException(status_code=404, detail="This user name does not exist.")

    grant_loan(
        existing_user.algorandAddress,
        existing_user.algorandTransactionSigner,
        params.amount,
        params.repaymentDate,
    )
