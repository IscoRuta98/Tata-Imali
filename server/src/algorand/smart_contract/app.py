from os import path
from base64 import b64decode

from algosdk.atomic_transaction_composer import (
    AccountTransactionSigner,
    AtomicTransactionComposer,
    TransactionWithSigner,
)
from algosdk.v2client.algod import AlgodClient
from algosdk.mnemonic import to_private_key
from algosdk.account import address_from_private_key
from algosdk.logic import get_application_address
from algosdk.transaction import (
    ApplicationCreateTxn,
    OnComplete,
    StateSchema,
    SuggestedParams,
)


creator_mnemonic = "federal address very assault pause skate model globe video chief educate shoe prison clown yard legend load next little possible coconut develop stove abstract disorder"
user_mnemonic = "glance actor salon bridge enroll pepper ramp extra vintage galaxy head bamboo fall emotion reform credit blast surge found maximum problem gas giant able scheme"

# Setup HTTP client w/guest key provided by PureStake
algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "9vilJkTzgE2MpemaT1Dok2i3sFlXsy0w6Mx95vi2"
headers = {
    "X-API-Key": algod_token,
}

algod_client = AlgodClient("", algod_address, headers)

PATH = path.join(path.dirname(__file__), "build/")


def deploy_app(
    txn_signer: AccountTransactionSigner,
    approval_name: str,
    clear_name: str,
    sp: SuggestedParams,
    global_schema: StateSchema,
    local_schema: StateSchema,
    client: AlgodClient = algod_client,
) -> tuple[int, str]:
    with open(PATH + approval_name, "r") as approval:
        with open(PATH + clear_name, "r") as clear:
            address = address_from_private_key(txn_signer.private_key)

            atc = AtomicTransactionComposer()
            atc.add_transaction(
                TransactionWithSigner(
                    txn=ApplicationCreateTxn(
                        sender=address,
                        sp=sp,
                        on_complete=OnComplete.NoOpOC.real,
                        approval_program=_compile_program(approval.read()),
                        clear_program=_compile_program(clear.read()),
                        global_schema=global_schema,
                        local_schema=local_schema,
                    ),
                    signer=txn_signer,
                )
            )
            tx_id = atc.execute(client, 5).tx_ids[0]
            app_id = client.pending_transaction_info(tx_id)["application-index"]
            app_address = get_application_address(app_id)

            return app_id, app_address


def _compile_program(source_code: str, client: AlgodClient = algod_client) -> bytes:
    compile_response = client.compile(source_code)
    return b64decode(compile_response["result"])
