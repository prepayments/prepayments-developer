import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PrepaymentDataUpdatePage from './prepayment-data-update.page-object';

const expect = chai.expect;
export class PrepaymentDataDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prepaymentsDevApp.prepaymentData.delete.question'));
  private confirmButton = element(by.id('gha-confirm-delete-prepaymentData'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepaymentDataComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prepayment-data-heading'));
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
    await navBarPage.getEntityPage('prepayment-data');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepaymentData() {
    await this.createButton.click();
    return new PrepaymentDataUpdatePage();
  }

  async deletePrepaymentData() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepaymentDataDeleteDialog = new PrepaymentDataDeleteDialog();
    await waitUntilDisplayed(prepaymentDataDeleteDialog.deleteModal);
    expect(await prepaymentDataDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prepaymentsDevApp.prepaymentData.delete.question/
    );
    await prepaymentDataDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepaymentDataDeleteDialog.deleteModal);

    expect(await isVisible(prepaymentDataDeleteDialog.deleteModal)).to.be.false;
  }
}
