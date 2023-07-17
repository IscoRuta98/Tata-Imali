import { Component, OnInit } from '@angular/core';
import { SessionQuery, SessionStore } from 'src/app/session/state';
import { LoanInformationService, LoanInformationStore, LoanInformationsQuery } from '../state';
import Swal from 'sweetalert2';
import { LoanInformation } from '../state/loan-information.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  activeTab: string = 'requestLoan'; // Default active tab is "Request Loan"
  loan: any = {}; // Placeholder object for loan data
  formattedRepaymentDate: string = ''; // Placeholder variable for formatted repayment date
  amountBorrowed: number = 0;
  existingLoan = this.loanInformationQuery.getAll()[0]

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(
    public loanInformationService: LoanInformationService,
    private loanInformationStore: LoanInformationStore,
    private loanInformationQuery: LoanInformationsQuery,
    public sessionQuery: SessionQuery,
    private sessionStore: SessionStore
  ) { }

  ngOnInit(): void {
    this.loan.amountBorrowed = 0;
    this.updateRepaymentDate();
  }

  updateRepaymentDate() {
    // Calculate repayment date (30 days from current date)
    const currentDate = new Date();
    const repaymentDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
    const day = repaymentDate.getDate();
    const month = repaymentDate.getMonth() + 1; // Months are zero-based
    const year = repaymentDate.getFullYear();

    // Format the date as "dd/mm/yyyy"
    this.formattedRepaymentDate = `${day}/${month}/${year}`;
  }

  async onSubmitLoanRequest() {
    const userName = this.sessionQuery.getValue().userInfo?.userName;
    const amount = this.loan.amountBorrowed * 100
    const repaymentDate = this.formattedRepaymentDate
    const id = Math.floor(Math.random() * 1000)
    const hasCurrentLoan = 1

    const loans = this.loanInformationQuery.getAll()[0]
    if(userName && loans.hasCurrentLoan === 0){
      await this.loanInformationService.requestLoan(userName, amount, repaymentDate)
        .then((res: any) => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
      this.loanInformationStore.update({id,userName,amount, repaymentDate, hasCurrentLoan})
      Swal.fire({
        icon: 'success',
        titleText: 'You have succesfuly requested a loan',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        icon: 'error',
        titleText: 'You already have a Loan.',
        text: 'Please settle your outstanding debt, before requesting another loan.',
        confirmButtonText: 'OK'
      });
    }
  }

  onSubmitRepaymentLoan(){}

  logout() {
    this.sessionStore.reset();
  }

}
