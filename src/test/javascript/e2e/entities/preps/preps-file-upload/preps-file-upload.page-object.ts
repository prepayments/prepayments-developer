import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import PrepsFileUploadUpdatePage from './preps-file-upload-update.page-object';

const expect = chai.expect;
export class PrepsFileUploadDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prepaymentsDevApp.prepsPrepsFileUpload.delete.question'));
  private confirmButton = element(by.id('gha-confirm-delete-prepsFileUpload'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepsFileUploadComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('preps-file-upload-heading'));
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
    await navBarPage.getEntityPage('preps-file-upload');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepsFileUpload() {
    await this.createButton.click();
    return new PrepsFileUploadUpdatePage();
  }

  async deletePrepsFileUpload() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepsFileUploadDeleteDialog = new PrepsFileUploadDeleteDialog();
    await waitUntilDisplayed(prepsFileUploadDeleteDialog.deleteModal);
    expect(await prepsFileUploadDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prepaymentsDevApp.prepsPrepsFileUpload.delete.question/
    );
    await prepsFileUploadDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepsFileUploadDeleteDialog.deleteModal);

    expect(await isVisible(prepsFileUploadDeleteDialog.deleteModal)).to.be.false;
  }
}
