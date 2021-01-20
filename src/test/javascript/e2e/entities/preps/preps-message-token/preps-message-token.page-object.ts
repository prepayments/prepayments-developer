import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import PrepsMessageTokenUpdatePage from './preps-message-token-update.page-object';

const expect = chai.expect;
export class PrepsMessageTokenDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prepaymentsDevApp.prepsPrepsMessageToken.delete.question'));
  private confirmButton = element(by.id('gha-confirm-delete-prepsMessageToken'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepsMessageTokenComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('preps-message-token-heading'));
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
    await navBarPage.getEntityPage('preps-message-token');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepsMessageToken() {
    await this.createButton.click();
    return new PrepsMessageTokenUpdatePage();
  }

  async deletePrepsMessageToken() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepsMessageTokenDeleteDialog = new PrepsMessageTokenDeleteDialog();
    await waitUntilDisplayed(prepsMessageTokenDeleteDialog.deleteModal);
    expect(await prepsMessageTokenDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prepaymentsDevApp.prepsPrepsMessageToken.delete.question/
    );
    await prepsMessageTokenDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepsMessageTokenDeleteDialog.deleteModal);

    expect(await isVisible(prepsMessageTokenDeleteDialog.deleteModal)).to.be.false;
  }
}
