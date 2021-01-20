import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PrepaymentEntryUpdatePage from './prepayment-entry-update.page-object';

const expect = chai.expect;
export class PrepaymentEntryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prepaymentsDevApp.prepaymentEntry.delete.question'));
  private confirmButton = element(by.id('gha-confirm-delete-prepaymentEntry'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepaymentEntryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prepayment-entry-heading'));
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
    await navBarPage.getEntityPage('prepayment-entry');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepaymentEntry() {
    await this.createButton.click();
    return new PrepaymentEntryUpdatePage();
  }

  async deletePrepaymentEntry() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepaymentEntryDeleteDialog = new PrepaymentEntryDeleteDialog();
    await waitUntilDisplayed(prepaymentEntryDeleteDialog.deleteModal);
    expect(await prepaymentEntryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prepaymentsDevApp.prepaymentEntry.delete.question/
    );
    await prepaymentEntryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepaymentEntryDeleteDialog.deleteModal);

    expect(await isVisible(prepaymentEntryDeleteDialog.deleteModal)).to.be.false;
  }
}
