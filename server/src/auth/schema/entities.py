from odmantic import Model
from pydantic import BaseModel
from typing import Any

from algosdk.atomic_transaction_composer import AccountTransactionSigner


class UserInformation(BaseModel):
    """
    Return user credentials when user is logged in sucessfuly.
    """

    userId: str
    userName: str
    phoneNumber: str
    algorandAddress: str


class UserDetailStorable(Model):
    """
    Store the following user details: Algorand keypair,
    owner_name, phone_number, security answers (posisbly hash string)
    """

    userName: str
    phoneNumber: str
    hash_password: str
    algorandAddress: str
    algorandPrivateKey: str
