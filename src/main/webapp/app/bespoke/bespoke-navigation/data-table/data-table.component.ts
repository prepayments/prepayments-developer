import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { Router } from '@angular/router';
import { RouteStateService } from 'app/bespoke/route-state.service';
import { NavigationQuestionnaireModalService } from 'app/bespoke/bespoke-navigation/navigation-questionnaire/navigation-questionnaire-modal.service';

@Component({
  selector: 'gha-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  modalQuestionnaireIsOpen: boolean;
  isNavbarCollapsed: boolean;
  modalRef?: NgbModalRef;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private navigationPathService: RouteStateService<string>,
    private loginModalService: LoginModalService,
    private navigationQuestionnaireModelService: NavigationQuestionnaireModalService,
    private router: Router
  ) {
    this.isNavbarCollapsed = false;
    this.modalQuestionnaireIsOpen = false;
  }

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  /**
   * This method opens the modal for collecting variables need by the loan account
   * view datatable
   */
  navigateLoanAccount(): void {
    this.navigationPathService.data = '/data/dt/tables/loan-accounts';
    this.navigationQuestionnaireModelService.open();
  }

  navigateSummaryBranchAdvances(): void {
    this.navigationPathService.data = '/data/summary-advances/branches/branch-report';
    this.navigationQuestionnaireModelService.open();
  }

  navigateSummaryCurrencyAdvances(): void {
    this.navigationPathService.data = '/data/summary-advances/currencies/currency-report';
    this.navigationQuestionnaireModelService.open();
  }

  navigateSummaryMoneyMarketAdvances(): void {
    this.navigationPathService.data = '/data/summary-advances/money-market/money-market-report';
    this.navigationQuestionnaireModelService.open();
  }

  navigateSummarySbuAdvances(): void {
    this.navigationPathService.data = '/data/summary-advances/sbu/sbu-report';
    this.navigationQuestionnaireModelService.open();
  }

  navigateTableFNewAdvances(): void {
    this.navigationPathService.data = '/data/summary-advances/table-f-new/table-f-new-report';
    this.navigationQuestionnaireModelService.open();
  }

  navigateTableFAdvances(): void {
    this.navigationPathService.data = '/data/summary-advances/table-f/table-f-report';
    this.navigationQuestionnaireModelService.open();
  }

  navigateSummaryCurrencyReport(): void {
    this.navigationPathService.data = '/dt/aggregate/currencies';
    this.navigationQuestionnaireModelService.open();
  }
}
