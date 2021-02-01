import { element, by, ElementFinder } from 'protractor';

export class PrepsFileTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('gha-preps-file-type div table .btn-danger'));
  title = element.all(by.css('gha-preps-file-type div h2#page-heading span')).first();
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

export class PrepsFileTypeUpdatePage {
  pageTitle = element(by.id('gha-preps-file-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  prepsFileTypeNameInput = element(by.id('field_prepsFileTypeName'));
  prepsFileMediumTypeSelect = element(by.id('field_prepsFileMediumType'));
  descriptionInput = element(by.id('field_description'));
  fileTemplateInput = element(by.id('file_fileTemplate'));
  prepsfileTypeSelect = element(by.id('field_prepsfileType'));
  prepsfileDeleteProcessTypeSelect = element(by.id('field_prepsfileDeleteProcessType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setPrepsFileTypeNameInput(prepsFileTypeName: string): Promise<void> {
    await this.prepsFileTypeNameInput.sendKeys(prepsFileTypeName);
  }

  async getPrepsFileTypeNameInput(): Promise<string> {
    return await this.prepsFileTypeNameInput.getAttribute('value');
  }

  async setPrepsFileMediumTypeSelect(prepsFileMediumType: string): Promise<void> {
    await this.prepsFileMediumTypeSelect.sendKeys(prepsFileMediumType);
  }

  async getPrepsFileMediumTypeSelect(): Promise<string> {
    return await this.prepsFileMediumTypeSelect.element(by.css('option:checked')).getText();
  }

  async prepsFileMediumTypeSelectLastOption(): Promise<void> {
    await this.prepsFileMediumTypeSelect.all(by.tagName('option')).last().click();
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setFileTemplateInput(fileTemplate: string): Promise<void> {
    await this.fileTemplateInput.sendKeys(fileTemplate);
  }

  async getFileTemplateInput(): Promise<string> {
    return await this.fileTemplateInput.getAttribute('value');
  }

  async setPrepsfileTypeSelect(prepsfileType: string): Promise<void> {
    await this.prepsfileTypeSelect.sendKeys(prepsfileType);
  }

  async getPrepsfileTypeSelect(): Promise<string> {
    return await this.prepsfileTypeSelect.element(by.css('option:checked')).getText();
  }

  async prepsfileTypeSelectLastOption(): Promise<void> {
    await this.prepsfileTypeSelect.all(by.tagName('option')).last().click();
  }

  async setPrepsfileDeleteProcessTypeSelect(prepsfileDeleteProcessType: string): Promise<void> {
    await this.prepsfileDeleteProcessTypeSelect.sendKeys(prepsfileDeleteProcessType);
  }

  async getPrepsfileDeleteProcessTypeSelect(): Promise<string> {
    return await this.prepsfileDeleteProcessTypeSelect.element(by.css('option:checked')).getText();
  }

  async prepsfileDeleteProcessTypeSelectLastOption(): Promise<void> {
    await this.prepsfileDeleteProcessTypeSelect.all(by.tagName('option')).last().click();
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

export class PrepsFileTypeDeleteDialog {
  private dialogTitle = element(by.id('gha-delete-prepsFileType-heading'));
  private confirmButton = element(by.id('gha-confirm-delete-prepsFileType'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
