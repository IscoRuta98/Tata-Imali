from algosdk.v2client.algod import AlgodClient

algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "9vilJkTzgE2MpemaT1Dok2i3sFlXsy0w6Mx95vi2"
headers = {
    "X-API-Key": algod_token,
}
algod_client = AlgodClient("", algod_address, headers)