import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PrepsFileUploadComponentsPage, PrepsFileUploadDeleteDialog, PrepsFileUploadUpdatePage } from './preps-file-upload.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('PrepsFileUpload e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepsFileUploadComponentsPage: PrepsFileUploadComponentsPage;
  let prepsFileUploadUpdatePage: PrepsFileUploadUpdatePage;
  let prepsFileUploadDeleteDialog: PrepsFileUploadDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PrepsFileUploads', async () => {
    await navBarPage.goToEntity('preps-file-upload');
    prepsFileUploadComponentsPage = new PrepsFileUploadComponentsPage();
    await browser.wait(ec.visibilityOf(prepsFileUploadComponentsPage.title), 5000);
    expect(await prepsFileUploadComponentsPage.getTitle()).to.eq('Preps File Uploads');
    await browser.wait(
      ec.or(ec.visibilityOf(prepsFileUploadComponentsPage.entities), ec.visibilityOf(prepsFileUploadComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PrepsFileUpload page', async () => {
    await prepsFileUploadComponentsPage.clickOnCreateButton();
    prepsFileUploadUpdatePage = new PrepsFileUploadUpdatePage();
    expect(await prepsFileUploadUpdatePage.getPageTitle()).to.eq('Create or edit a Preps File Upload');
    await prepsFileUploadUpdatePage.cancel();
  });

  it('should create and save PrepsFileUploads', async () => {
    const nbButtonsBeforeCreate = await prepsFileUploadComponentsPage.countDeleteButtons();

    await prepsFileUploadComponentsPage.clickOnCreateButton();

    await promise.all([
      prepsFileUploadUpdatePage.setDescriptionInput('description'),
      prepsFileUploadUpdatePage.setFileNameInput('fileName'),
      prepsFileUploadUpdatePage.setPeriodFromInput('2000-12-31'),
      prepsFileUploadUpdatePage.setPeriodToInput('2000-12-31'),
      prepsFileUploadUpdatePage.setPrepsFileTypeIdInput('5'),
      prepsFileUploadUpdatePage.setDataFileInput(absolutePath),
      prepsFileUploadUpdatePage.setUploadTokenInput('uploadToken'),
    ]);

    expect(await prepsFileUploadUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await prepsFileUploadUpdatePage.getFileNameInput()).to.eq('fileName', 'Expected FileName value to be equals to fileName');
    expect(await prepsFileUploadUpdatePage.getPeriodFromInput()).to.eq(
      '2000-12-31',
      'Expected periodFrom value to be equals to 2000-12-31'
    );
    expect(await prepsFileUploadUpdatePage.getPeriodToInput()).to.eq('2000-12-31', 'Expected periodTo value to be equals to 2000-12-31');
    expect(await prepsFileUploadUpdatePage.getPrepsFileTypeIdInput()).to.eq('5', 'Expected prepsFileTypeId value to be equals to 5');
    expect(await prepsFileUploadUpdatePage.getDataFileInput()).to.endsWith(
      fileNameToUpload,
      'Expected DataFile value to be end with ' + fileNameToUpload
    );
    const selectedUploadSuccessful = prepsFileUploadUpdatePage.getUploadSuccessfulInput();
    if (await selectedUploadSuccessful.isSelected()) {
      await prepsFileUploadUpdatePage.getUploadSuccessfulInput().click();
      expect(await prepsFileUploadUpdatePage.getUploadSuccessfulInput().isSelected(), 'Expected uploadSuccessful not to be selected').to.be
        .false;
    } else {
      await prepsFileUploadUpdatePage.getUploadSuccessfulInput().click();
      expect(await prepsFileUploadUpdatePage.getUploadSuccessfulInput().isSelected(), 'Expected uploadSuccessful to be selected').to.be
        .true;
    }
    const selectedUploadProcessed = prepsFileUploadUpdatePage.getUploadProcessedInput();
    if (await selectedUploadProcessed.isSelected()) {
      await prepsFileUploadUpdatePage.getUploadProcessedInput().click();
      expect(await prepsFileUploadUpdatePage.getUploadProcessedInput().isSelected(), 'Expected uploadProcessed not to be selected').to.be
        .false;
    } else {
      await prepsFileUploadUpdatePage.getUploadProcessedInput().click();
      expect(await prepsFileUploadUpdatePage.getUploadProcessedInput().isSelected(), 'Expected uploadProcessed to be selected').to.be.true;
    }
    expect(await prepsFileUploadUpdatePage.getUploadTokenInput()).to.eq(
      'uploadToken',
      'Expected UploadToken value to be equals to uploadToken'
    );

    await prepsFileUploadUpdatePage.save();
    expect(await prepsFileUploadUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prepsFileUploadComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PrepsFileUpload', async () => {
    const nbButtonsBeforeDelete = await prepsFileUploadComponentsPage.countDeleteButtons();
    await prepsFileUploadComponentsPage.clickOnLastDeleteButton();

    prepsFileUploadDeleteDialog = new PrepsFileUploadDeleteDialog();
    expect(await prepsFileUploadDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Preps File Upload?');
    await prepsFileUploadDeleteDialog.clickOnConfirmButton();

    expect(await prepsFileUploadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
