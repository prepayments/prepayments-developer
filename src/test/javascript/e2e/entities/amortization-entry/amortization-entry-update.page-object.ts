import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AmortizationEntryUpdatePage {
  pageTitle: ElementFinder = element(by.id('prepaymentsDevApp.amortizationEntry.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  accountNameInput: ElementFinder = element(by.css('input#amortization-entry-accountName'));
  descriptionInput: ElementFinder = element(by.css('input#amortization-entry-description'));
  accountNumberInput: ElementFinder = element(by.css('input#amortization-entry-accountNumber'));
  expenseAccountNumberInput: ElementFinder = element(by.css('input#amortization-entry-expenseAccountNumber'));
  prepaymentNumberInput: ElementFinder = element(by.css('input#amortization-entry-prepaymentNumber'));
  prepaymentDateInput: ElementFinder = element(by.css('input#amortization-entry-prepaymentDate'));
  transactionAmountInput: ElementFinder = element(by.css('input#amortization-entry-transactionAmount'));
  amortizationDateInput: ElementFinder = element(by.css('input#amortization-entry-amortizationDate'));
  uploadTokenInput: ElementFinder = element(by.css('input#amortization-entry-uploadToken'));
  prepaymentDataIdInput: ElementFinder = element(by.css('input#amortization-entry-prepaymentDataId'));
  compilationTokenInput: ElementFinder = element(by.css('input#amortization-entry-compilationToken'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAccountNameInput(accountName) {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput() {
    return this.accountNameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setAccountNumberInput(accountNumber) {
    await this.accountNumberInput.sendKeys(accountNumber);
  }

  async getAccountNumberInput() {
    return this.accountNumberInput.getAttribute('value');
  }

  async setExpenseAccountNumberInput(expenseAccountNumber) {
    await this.expenseAccountNumberInput.sendKeys(expenseAccountNumber);
  }

  async getExpenseAccountNumberInput() {
    return this.expenseAccountNumberInput.getAttribute('value');
  }

  async setPrepaymentNumberInput(prepaymentNumber) {
    await this.prepaymentNumberInput.sendKeys(prepaymentNumber);
  }

  async getPrepaymentNumberInput() {
    return this.prepaymentNumberInput.getAttribute('value');
  }

  async setPrepaymentDateInput(prepaymentDate) {
    await this.prepaymentDateInput.sendKeys(prepaymentDate);
  }

  async getPrepaymentDateInput() {
    return this.prepaymentDateInput.getAttribute('value');
  }

  async setTransactionAmountInput(transactionAmount) {
    await this.transactionAmountInput.sendKeys(transactionAmount);
  }

  async getTransactionAmountInput() {
    return this.transactionAmountInput.getAttribute('value');
  }

  async setAmortizationDateInput(amortizationDate) {
    await this.amortizationDateInput.sendKeys(amortizationDate);
  }

  async getAmortizationDateInput() {
    return this.amortizationDateInput.getAttribute('value');
  }

  async setUploadTokenInput(uploadToken) {
    await this.uploadTokenInput.sendKeys(uploadToken);
  }

  async getUploadTokenInput() {
    return this.uploadTokenInput.getAttribute('value');
  }

  async setPrepaymentDataIdInput(prepaymentDataId) {
    await this.prepaymentDataIdInput.sendKeys(prepaymentDataId);
  }

  async getPrepaymentDataIdInput() {
    return this.prepaymentDataIdInput.getAttribute('value');
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
    await this.setAccountNameInput('accountName');
    expect(await this.getAccountNameInput()).to.match(/accountName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNumberInput('accountNumber');
    expect(await this.getAccountNumberInput()).to.match(/accountNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setExpenseAccountNumberInput('expenseAccountNumber');
    expect(await this.getExpenseAccountNumberInput()).to.match(/expenseAccountNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentNumberInput('prepaymentNumber');
    expect(await this.getPrepaymentNumberInput()).to.match(/prepaymentNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentDateInput('01-01-2001');
    expect(await this.getPrepaymentDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setTransactionAmountInput('5');
    expect(await this.getTransactionAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setAmortizationDateInput('01-01-2001');
    expect(await this.getAmortizationDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUploadTokenInput('uploadToken');
    expect(await this.getUploadTokenInput()).to.match(/uploadToken/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentDataIdInput('5');
    expect(await this.getPrepaymentDataIdInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    expect(await this.getCompilationTokenInput()).to.match(/compilationToken/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
