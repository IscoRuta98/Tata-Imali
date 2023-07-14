from fastapi import HTTPException
from passlib.context import CryptContext

from algorand.generate_account import generate_keypair, fund_new_account
from algosdk.atomic_transaction_composer import (
    AccountTransactionSigner)

from common.types import Engine
from auth.schema.actions import (
    CreateUser,
    CreateUserResult,
    CreateUserSuccess,
)
from auth.schema.entities import UserDetailStorable, UserInformation

argon2_context = CryptContext(schemes=["argon2"], deprecated="auto")


def password_hash(password: str) -> str:
    return argon2_context.hash(password)


async def create_user(engine: Engine, params: CreateUser) -> CreateUserResult:
    """
    Create User and fund their wallet.
    """
    existingUsername = await engine.find_one(
        UserDetailStorable, UserDetailStorable.userName == params.userName
    )
    if existingUsername is not None:
        raise HTTPException(status_code=400, detail="This user name already exists.")
    hash_password = password_hash(params.password)
    private_key, address = generate_keypair()

    # Fund new account with 1 ALGO
    fund_new_account(address)

    new_user = UserDetailStorable(
        userName=params.userName,
        phoneNumber=params.phoneNumber,
        hash_password=hash_password,
        algorandAddress=address,
        algorandPrivateKey=private_key,
        algorandTransactionSigner = AccountTransactionSigner(private_key)
    )
    await engine.save(new_user)
    user_display = UserInformation(
        userId=str(new_user.id),
        userName=new_user.userName,
        phoneNumber=new_user.phoneNumber,
        algorandAddress=new_user.algorandAddress,
    )
    return CreateUserSuccess(Created=user_display)
