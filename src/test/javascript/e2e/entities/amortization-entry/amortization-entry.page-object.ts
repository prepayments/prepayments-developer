import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AmortizationEntryUpdatePage from './amortization-entry-update.page-object';

const expect = chai.expect;
export class AmortizationEntryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prepaymentsDevApp.amortizationEntry.delete.question'));
  private confirmButton = element(by.id('gha-confirm-delete-amortizationEntry'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AmortizationEntryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('amortization-entry-heading'));
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
    await navBarPage.getEntityPage('amortization-entry');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAmortizationEntry() {
    await this.createButton.click();
    return new AmortizationEntryUpdatePage();
  }

  async deleteAmortizationEntry() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const amortizationEntryDeleteDialog = new AmortizationEntryDeleteDialog();
    await waitUntilDisplayed(amortizationEntryDeleteDialog.deleteModal);
    expect(await amortizationEntryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prepaymentsDevApp.amortizationEntry.delete.question/
    );
    await amortizationEntryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(amortizationEntryDeleteDialog.deleteModal);

    expect(await isVisible(amortizationEntryDeleteDialog.deleteModal)).to.be.false;
  }
}
