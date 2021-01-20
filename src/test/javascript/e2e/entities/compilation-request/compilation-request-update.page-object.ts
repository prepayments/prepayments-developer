import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CompilationRequestUpdatePage {
  pageTitle: ElementFinder = element(by.id('prepaymentsDevApp.compilationRequest.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#compilation-request-description'));
  fileUploadIdInput: ElementFinder = element(by.css('input#compilation-request-fileUploadId'));
  compilationStatusSelect: ElementFinder = element(by.css('select#compilation-request-compilationStatus'));
  compilationTypeSelect: ElementFinder = element(by.css('select#compilation-request-compilationType'));
  compilationTokenInput: ElementFinder = element(by.css('input#compilation-request-compilationToken'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setFileUploadIdInput(fileUploadId) {
    await this.fileUploadIdInput.sendKeys(fileUploadId);
  }

  async getFileUploadIdInput() {
    return this.fileUploadIdInput.getAttribute('value');
  }

  async setCompilationStatusSelect(compilationStatus) {
    await this.compilationStatusSelect.sendKeys(compilationStatus);
  }

  async getCompilationStatusSelect() {
    return this.compilationStatusSelect.element(by.css('option:checked')).getText();
  }

  async compilationStatusSelectLastOption() {
    await this.compilationStatusSelect.all(by.tagName('option')).last().click();
  }
  async setCompilationTypeSelect(compilationType) {
    await this.compilationTypeSelect.sendKeys(compilationType);
  }

  async getCompilationTypeSelect() {
    return this.compilationTypeSelect.element(by.css('option:checked')).getText();
  }

  async compilationTypeSelectLastOption() {
    await this.compilationTypeSelect.all(by.tagName('option')).last().click();
  }
  async setCompilationTokenInput(compilationToken) {
    await this.compilationTokenInput.sendKeys(compilationToken);
  }

  async getCompilationTokenInput() {
    return this.compilationTokenInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadIdInput('5');
    expect(await this.getFileUploadIdInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.compilationStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.compilationTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    expect(await this.getCompilationTokenInput()).to.match(/compilationToken/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
