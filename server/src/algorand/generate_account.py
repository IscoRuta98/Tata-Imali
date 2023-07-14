from algosdk import account, transaction
from algorand.client import algod_client
from algosdk.mnemonic import to_private_key
from algosdk.account import address_from_private_key


def generate_keypair():
    """
    Generate Algorand Keypair (i.e. private key & public address)
    """
    return account.generate_account()

def fund_new_account(new_address: str):
    creator_mnemonic = "front liquid second web across used chaos recall burst barrel snack globe labor cup enter supreme flash nurse mixture pledge clever share winter ability torch"
    creator_private_key = to_private_key(creator_mnemonic)
    creator_public_key = address_from_private_key(creator_private_key)
    
    params = algod_client.suggested_params()
    unsigned_txn = transaction.PaymentTxn(
    sender=creator_public_key,
    sp=params,
    receiver=new_address,
    amt=1_000_000,
    note=b"fund new account generated on tata-imali platform",
    )

    # sign the transaction
    signed_txn = unsigned_txn.sign(creator_private_key)

    # submit the transaction and get back a transaction id
    txid = algod_client.send_transaction(signed_txn)

    # wait for confirmation
    transaction.wait_for_confirmation(algod_client, txid, 4)