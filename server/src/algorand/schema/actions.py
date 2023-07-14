from pydantic import BaseModel

class LoanRequest(BaseModel):
    """
    User Requesting Loan 
    """

    userName: str
    amount: int
    repaymentDate: str

class ReceiveLoanRepayment(BaseModel):
    """
    User paying Loan 
    """

    userName: str
    amount: int