import { element, by, ElementFinder } from 'protractor';

export class AmortizationEntryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('gha-amortization-entry div table .btn-danger'));
  title = element.all(by.css('gha-amortization-entry div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class AmortizationEntryUpdatePage {
  pageTitle = element(by.id('gha-amortization-entry-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  accountNameInput = element(by.id('field_accountName'));
  descriptionInput = element(by.id('field_description'));
  accountNumberInput = element(by.id('field_accountNumber'));
  expenseAccountNumberInput = element(by.id('field_expenseAccountNumber'));
  prepaymentNumberInput = element(by.id('field_prepaymentNumber'));
  prepaymentDateInput = element(by.id('field_prepaymentDate'));
  transactionAmountInput = element(by.id('field_transactionAmount'));
  amortizationDateInput = element(by.id('field_amortizationDate'));
  uploadTokenInput = element(by.id('field_uploadToken'));
  prepaymentDataIdInput = element(by.id('field_prepaymentDataId'));
  compilationTokenInput = element(by.id('field_compilationToken'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setAccountNameInput(accountName: string): Promise<void> {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput(): Promise<string> {
    return await this.accountNameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setAccountNumberInput(accountNumber: string): Promise<void> {
    await this.accountNumberInput.sendKeys(accountNumber);
  }

  async getAccountNumberInput(): Promise<string> {
    return await this.accountNumberInput.getAttribute('value');
  }

  async setExpenseAccountNumberInput(expenseAccountNumber: string): Promise<void> {
    await this.expenseAccountNumberInput.sendKeys(expenseAccountNumber);
  }

  async getExpenseAccountNumberInput(): Promise<string> {
    return await this.expenseAccountNumberInput.getAttribute('value');
  }

  async setPrepaymentNumberInput(prepaymentNumber: string): Promise<void> {
    await this.prepaymentNumberInput.sendKeys(prepaymentNumber);
  }

  async getPrepaymentNumberInput(): Promise<string> {
    return await this.prepaymentNumberInput.getAttribute('value');
  }

  async setPrepaymentDateInput(prepaymentDate: string): Promise<void> {
    await this.prepaymentDateInput.sendKeys(prepaymentDate);
  }

  async getPrepaymentDateInput(): Promise<string> {
    return await this.prepaymentDateInput.getAttribute('value');
  }

  async setTransactionAmountInput(transactionAmount: string): Promise<void> {
    await this.transactionAmountInput.sendKeys(transactionAmount);
  }

  async getTransactionAmountInput(): Promise<string> {
    return await this.transactionAmountInput.getAttribute('value');
  }

  async setAmortizationDateInput(amortizationDate: string): Promise<void> {
    await this.amortizationDateInput.sendKeys(amortizationDate);
  }

  async getAmortizationDateInput(): Promise<string> {
    return await this.amortizationDateInput.getAttribute('value');
  }

  async setUploadTokenInput(uploadToken: string): Promise<void> {
    await this.uploadTokenInput.sendKeys(uploadToken);
  }

  async getUploadTokenInput(): Promise<string> {
    return await this.uploadTokenInput.getAttribute('value');
  }

  async setPrepaymentDataIdInput(prepaymentDataId: string): Promise<void> {
    await this.prepaymentDataIdInput.sendKeys(prepaymentDataId);
  }

  async getPrepaymentDataIdInput(): Promise<string> {
    return await this.prepaymentDataIdInput.getAttribute('value');
  }

  async setCompilationTokenInput(compilationToken: string): Promise<void> {
    await this.compilationTokenInput.sendKeys(compilationToken);
  }

  async getCompilationTokenInput(): Promise<string> {
    return await this.compilationTokenInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AmortizationEntryDeleteDialog {
  private dialogTitle = element(by.id('gha-delete-amortizationEntry-heading'));
  private confirmButton = element(by.id('gha-confirm-delete-amortizationEntry'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
