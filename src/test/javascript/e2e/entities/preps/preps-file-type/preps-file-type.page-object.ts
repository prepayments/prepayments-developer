import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import PrepsFileTypeUpdatePage from './preps-file-type-update.page-object';

const expect = chai.expect;
export class PrepsFileTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prepaymentsDevApp.prepsPrepsFileType.delete.question'));
  private confirmButton = element(by.id('gha-confirm-delete-prepsFileType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepsFileTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('preps-file-type-heading'));
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
    await navBarPage.getEntityPage('preps-file-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepsFileType() {
    await this.createButton.click();
    return new PrepsFileTypeUpdatePage();
  }

  async deletePrepsFileType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepsFileTypeDeleteDialog = new PrepsFileTypeDeleteDialog();
    await waitUntilDisplayed(prepsFileTypeDeleteDialog.deleteModal);
    expect(await prepsFileTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prepaymentsDevApp.prepsPrepsFileType.delete.question/
    );
    await prepsFileTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepsFileTypeDeleteDialog.deleteModal);

    expect(await isVisible(prepsFileTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
