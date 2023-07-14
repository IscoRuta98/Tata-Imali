from base64 import b64decode
from os import path

from algorand.client import algod_client

from algosdk.atomic_transaction_composer import (
    AtomicTransactionComposer,
    TransactionWithSigner,
)
from algosdk.encoding import decode_address
from algosdk.transaction import (
    ApplicationOptInTxn,
    PaymentTxn,
)
from algosdk.atomic_transaction_composer import (
    AccountTransactionSigner)

app_address = "7EO46UDADH6KYODVAUGEWYSVSVVUWGAUNPHWUQIJ4ZWTGV3SXW46A5F6BE"
app_id = 257360165

def opt_in(user_public_key, user_transaction_signer, app_address=app_address, app_id=app_id) -> None:
    """For a user to opt_in, they need to cover the MBR for box storage"""
    atc = AtomicTransactionComposer()
    atc.add_transaction(
        TransactionWithSigner(
            txn=PaymentTxn(
                sender=user_public_key,
                sp=algod_client.suggested_params(),
                receiver=app_address,
                amt=200_000,
            ),
            signer=user_transaction_signer,
        )
    )
    atc.add_transaction(
        TransactionWithSigner(
            txn=ApplicationOptInTxn(
                sender=user_public_key,
                sp=algod_client.suggested_params(),
                index=app_id,
                boxes=[(app_id, decode_address(user_public_key))],
            ),
            signer=user_transaction_signer,
        )
    )
    atc.execute(algod_client, 5)
