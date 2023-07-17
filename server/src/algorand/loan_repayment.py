from fastapi import HTTPException

from common.types import Engine, app_address, app_id, asset_id

from algosdk.atomic_transaction_composer import (
    AccountTransactionSigner,
    AtomicTransactionComposer,
    TransactionWithSigner,
)
from algorand.client import algod_client
from algosdk.encoding import decode_address
from algosdk.transaction import (
    ApplicationNoOpTxn,
    AssetTransferTxn,
)

from algorand.schema.actions import ReceiveLoanRepayment
from auth.schema.entities import UserDetailStorable


def receive_loan_repayment(
    amount: int,
    app_id: str,
    app_address: str,
    asset_id: int,
    user_address: str,
    user_txn_signer: AccountTransactionSigner,
):
    "Smart contract to Receive loan payments"
    sp = algod_client.suggested_params()
    sp.flat_fee = True
    sp.fee = sp.min_fee * 2

    atc = AtomicTransactionComposer()
    atc.add_transaction(
        TransactionWithSigner(
            txn=AssetTransferTxn(
                sender=user_address,
                sp=sp,
                receiver=app_address,
                amt=amount,
                index=asset_id,
            ),
            signer=user_txn_signer,
        )
    )

    sp.fee = sp.min_fee * 4

    atc.add_transaction(
        TransactionWithSigner(
            txn=ApplicationNoOpTxn(
                sender=user_address,
                sp=sp,
                index=app_id,
                app_args=["receive_loan_repayment"],
                boxes=[(app_id, decode_address(user_address))],
                foreign_assets=[asset_id],
            ),
            signer=user_txn_signer,
        )
    )
    response = atc.execute(algod_client, 5)
    return response


async def loan_repayment(engine: Engine, params: ReceiveLoanRepayment):
    """
    User repaying loan
    """
    existing_user = await engine.find_one(
        UserDetailStorable, UserDetailStorable.userName == params.userName
    )
    if existing_user is None:
        raise HTTPException(status_code=404, detail="This user name does not exist.")

    receive_loan_repayment(
        params.amount,
        app_id,
        app_address,
        asset_id,
        existing_user.algorandAddress,
        AccountTransactionSigner(existing_user.algorandPrivateKey),
    )
