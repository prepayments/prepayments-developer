import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class PrepsFileTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('prepaymentsDevApp.prepsPrepsFileType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  prepsFileTypeNameInput: ElementFinder = element(by.css('input#preps-file-type-prepsFileTypeName'));
  prepsFileMediumTypeSelect: ElementFinder = element(by.css('select#preps-file-type-prepsFileMediumType'));
  descriptionInput: ElementFinder = element(by.css('input#preps-file-type-description'));
  fileTemplateInput: ElementFinder = element(by.css('input#file_fileTemplate'));
  prepsfileTypeSelect: ElementFinder = element(by.css('select#preps-file-type-prepsfileType'));
  prepsfileDeleteProcessTypeSelect: ElementFinder = element(by.css('select#preps-file-type-prepsfileDeleteProcessType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPrepsFileTypeNameInput(prepsFileTypeName) {
    await this.prepsFileTypeNameInput.sendKeys(prepsFileTypeName);
  }

  async getPrepsFileTypeNameInput() {
    return this.prepsFileTypeNameInput.getAttribute('value');
  }

  async setPrepsFileMediumTypeSelect(prepsFileMediumType) {
    await this.prepsFileMediumTypeSelect.sendKeys(prepsFileMediumType);
  }

  async getPrepsFileMediumTypeSelect() {
    return this.prepsFileMediumTypeSelect.element(by.css('option:checked')).getText();
  }

  async prepsFileMediumTypeSelectLastOption() {
    await this.prepsFileMediumTypeSelect.all(by.tagName('option')).last().click();
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setFileTemplateInput(fileTemplate) {
    await this.fileTemplateInput.sendKeys(fileTemplate);
  }

  async getFileTemplateInput() {
    return this.fileTemplateInput.getAttribute('value');
  }

  async setPrepsfileTypeSelect(prepsfileType) {
    await this.prepsfileTypeSelect.sendKeys(prepsfileType);
  }

  async getPrepsfileTypeSelect() {
    return this.prepsfileTypeSelect.element(by.css('option:checked')).getText();
  }

  async prepsfileTypeSelectLastOption() {
    await this.prepsfileTypeSelect.all(by.tagName('option')).last().click();
  }
  async setPrepsfileDeleteProcessTypeSelect(prepsfileDeleteProcessType) {
    await this.prepsfileDeleteProcessTypeSelect.sendKeys(prepsfileDeleteProcessType);
  }

  async getPrepsfileDeleteProcessTypeSelect() {
    return this.prepsfileDeleteProcessTypeSelect.element(by.css('option:checked')).getText();
  }

  async prepsfileDeleteProcessTypeSelectLastOption() {
    await this.prepsfileDeleteProcessTypeSelect.all(by.tagName('option')).last().click();
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
    await this.setPrepsFileTypeNameInput('prepsFileTypeName');
    expect(await this.getPrepsFileTypeNameInput()).to.match(/prepsFileTypeName/);
    await waitUntilDisplayed(this.saveButton);
    await this.prepsFileMediumTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFileTemplateInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.prepsfileTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.prepsfileDeleteProcessTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
