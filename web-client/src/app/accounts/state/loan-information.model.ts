export interface LoanInformation {
  id: string;
  userName: string,
  amount: number,
  repaymentDate: string,
  hasCurrentLoan: number
}

export function createLoanInformation(params: Partial<LoanInformation>) {
  return {

  } as LoanInformation;
}
