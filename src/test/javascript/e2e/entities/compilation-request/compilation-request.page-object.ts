import { element, by, ElementFinder } from 'protractor';

export class CompilationRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('gha-compilation-request div table .btn-danger'));
  title = element.all(by.css('gha-compilation-request div h2#page-heading span')).first();
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

export class CompilationRequestUpdatePage {
  pageTitle = element(by.id('gha-compilation-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descriptionInput = element(by.id('field_description'));
  fileUploadIdInput = element(by.id('field_fileUploadId'));
  compilationStatusSelect = element(by.id('field_compilationStatus'));
  compilationTypeSelect = element(by.id('field_compilationType'));
  compilationTokenInput = element(by.id('field_compilationToken'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setFileUploadIdInput(fileUploadId: string): Promise<void> {
    await this.fileUploadIdInput.sendKeys(fileUploadId);
  }

  async getFileUploadIdInput(): Promise<string> {
    return await this.fileUploadIdInput.getAttribute('value');
  }

  async setCompilationStatusSelect(compilationStatus: string): Promise<void> {
    await this.compilationStatusSelect.sendKeys(compilationStatus);
  }

  async getCompilationStatusSelect(): Promise<string> {
    return await this.compilationStatusSelect.element(by.css('option:checked')).getText();
  }

  async compilationStatusSelectLastOption(): Promise<void> {
    await this.compilationStatusSelect.all(by.tagName('option')).last().click();
  }

  async setCompilationTypeSelect(compilationType: string): Promise<void> {
    await this.compilationTypeSelect.sendKeys(compilationType);
  }

  async getCompilationTypeSelect(): Promise<string> {
    return await this.compilationTypeSelect.element(by.css('option:checked')).getText();
  }

  async compilationTypeSelectLastOption(): Promise<void> {
    await this.compilationTypeSelect.all(by.tagName('option')).last().click();
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

export class CompilationRequestDeleteDialog {
  private dialogTitle = element(by.id('gha-delete-compilationRequest-heading'));
  private confirmButton = element(by.id('gha-confirm-delete-compilationRequest'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
