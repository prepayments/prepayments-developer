import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CompilationRequestUpdatePage from './compilation-request-update.page-object';

const expect = chai.expect;
export class CompilationRequestDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prepaymentsDevApp.compilationRequest.delete.question'));
  private confirmButton = element(by.id('gha-confirm-delete-compilationRequest'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CompilationRequestComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('compilation-request-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('compilation-request');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCompilationRequest() {
    await this.createButton.click();
    return new CompilationRequestUpdatePage();
  }

  async deleteCompilationRequest() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const compilationRequestDeleteDialog = new CompilationRequestDeleteDialog();
    await waitUntilDisplayed(compilationRequestDeleteDialog.deleteModal);
    expect(await compilationRequestDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prepaymentsDevApp.compilationRequest.delete.question/
    );
    await compilationRequestDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(compilationRequestDeleteDialog.deleteModal);

    expect(await isVisible(compilationRequestDeleteDialog.deleteModal)).to.be.false;
  }
}
