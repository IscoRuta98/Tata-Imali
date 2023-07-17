import { UpdateStateCallback } from '@datorama/akita';
import { LoanInformationStore } from './loan-information.store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoanInformationService {

  constructor(
    private http: HttpClient,
    private loanInformationStore: LoanInformationStore
  ){}

  async requestLoan(userName: string, amount: number, repaymentDate: string) {
    try {
      const URL_SERVER = 'http://127.0.0.1:8000/request-loan'
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const result = await this.http.post(URL_SERVER, { userName, amount, repaymentDate }, { headers }).toPromise();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async loanRepayment(userName: string, amount: number) {
    try {
      const URL_SERVER = 'http://127.0.0.1:8000/loan-repayment'
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const result = await this.http.post(URL_SERVER, { userName, amount }, { headers }).toPromise();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
