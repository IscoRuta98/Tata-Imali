from algosdk.atomic_transaction_composer import AccountTransactionSigner
from algosdk.v2client.algod import AlgodClient
from algosdk.mnemonic import to_private_key
from algosdk.transaction import StateSchema

from app import deploy_app


if __name__ == "__main__":
    algod_address = "https://testnet-algorand.api.purestake.io/ps2"
    algod_token = "9vilJkTzgE2MpemaT1Dok2i3sFlXsy0w6Mx95vi2"
    headers = {
        "X-API-Key": algod_token,
    }

    algod_client = AlgodClient(algod_token, algod_address, headers)
    creator_mnemonic = "front liquid second web across used chaos recall burst barrel snack globe labor cup enter supreme flash nurse mixture pledge clever share winter ability torch"
    signer = AccountTransactionSigner(to_private_key(creator_mnemonic))

    print(
        deploy_app(
            txn_signer=signer,
            approval_name="approval.teal",
            clear_name="clear.teal",
            sp=algod_client.suggested_params(),
            global_schema=StateSchema(num_uints=2, num_byte_slices=0),
            local_schema=StateSchema(num_uints=0, num_byte_slices=0),
            client=algod_client,
        )
    )
