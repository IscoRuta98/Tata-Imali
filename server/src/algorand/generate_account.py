from algosdk import account, mnemonic


def generate_keypair():
    """
    Generate Algorand Keypair (i.e. private key & public address)
    """
    return account.generate_account()
