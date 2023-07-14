from common.types import app_address

from algorand.client import algod_client
from algosdk.atomic_transaction_composer import (
    AccountTransactionSigner,
    AtomicTransactionComposer,
    TransactionWithSigner,
)
from algosdk.transaction import (
    ApplicationNoOpTxn,
    PaymentTxn,
)

def issue_asa(
    app_id: str,
    creator_address: str,
    creator_txn_signer: AccountTransactionSigner,
    total_supply: int,
    unit_name: str,
    asset_name: str,
):
    """Issue stable coins for a particular currency.
    Only creator of smart contract can issue ASAs..."""
    sp = algod_client.suggested_params()
    sp.flat_fee = True
    sp.fee = sp.min_fee * 2

    atc = AtomicTransactionComposer()
    atc.add_transaction(
        TransactionWithSigner(
            txn=PaymentTxn(
                sender=creator_address,
                sp=algod_client.suggested_params(),
                receiver=app_address,
                amt=300_000,
            ),
            signer=creator_txn_signer,
        )
    )
    atc.add_transaction(
        TransactionWithSigner(
            txn=ApplicationNoOpTxn(
                sender=creator_address,
                sp=sp,
                index=app_id,
                app_args=["issue_asa", total_supply, unit_name, asset_name],
            ),
            signer=creator_txn_signer,
        )
    )
    tx_ids = atc.execute(algod_client, 5)
    return tx_ids[0].results

