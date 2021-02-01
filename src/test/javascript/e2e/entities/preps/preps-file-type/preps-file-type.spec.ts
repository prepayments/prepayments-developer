import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PrepsFileTypeComponentsPage, PrepsFileTypeDeleteDialog, PrepsFileTypeUpdatePage } from './preps-file-type.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('PrepsFileType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepsFileTypeComponentsPage: PrepsFileTypeComponentsPage;
  let prepsFileTypeUpdatePage: PrepsFileTypeUpdatePage;
  let prepsFileTypeDeleteDialog: PrepsFileTypeDeleteDialog;
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

  it('should load PrepsFileTypes', async () => {
    await navBarPage.goToEntity('preps-file-type');
    prepsFileTypeComponentsPage = new PrepsFileTypeComponentsPage();
    await browser.wait(ec.visibilityOf(prepsFileTypeComponentsPage.title), 5000);
    expect(await prepsFileTypeComponentsPage.getTitle()).to.eq('Preps File Types');
    await browser.wait(
      ec.or(ec.visibilityOf(prepsFileTypeComponentsPage.entities), ec.visibilityOf(prepsFileTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PrepsFileType page', async () => {
    await prepsFileTypeComponentsPage.clickOnCreateButton();
    prepsFileTypeUpdatePage = new PrepsFileTypeUpdatePage();
    expect(await prepsFileTypeUpdatePage.getPageTitle()).to.eq('Create or edit a Preps File Type');
    await prepsFileTypeUpdatePage.cancel();
  });

  it('should create and save PrepsFileTypes', async () => {
    const nbButtonsBeforeCreate = await prepsFileTypeComponentsPage.countDeleteButtons();

    await prepsFileTypeComponentsPage.clickOnCreateButton();

    await promise.all([
      prepsFileTypeUpdatePage.setPrepsFileTypeNameInput('prepsFileTypeName'),
      prepsFileTypeUpdatePage.prepsFileMediumTypeSelectLastOption(),
      prepsFileTypeUpdatePage.setDescriptionInput('description'),
      prepsFileTypeUpdatePage.setFileTemplateInput(absolutePath),
      prepsFileTypeUpdatePage.prepsfileTypeSelectLastOption(),
      prepsFileTypeUpdatePage.prepsfileDeleteProcessTypeSelectLastOption(),
    ]);

    expect(await prepsFileTypeUpdatePage.getPrepsFileTypeNameInput()).to.eq(
      'prepsFileTypeName',
      'Expected PrepsFileTypeName value to be equals to prepsFileTypeName'
    );
    expect(await prepsFileTypeUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await prepsFileTypeUpdatePage.getFileTemplateInput()).to.endsWith(
      fileNameToUpload,
      'Expected FileTemplate value to be end with ' + fileNameToUpload
    );

    await prepsFileTypeUpdatePage.save();
    expect(await prepsFileTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prepsFileTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PrepsFileType', async () => {
    const nbButtonsBeforeDelete = await prepsFileTypeComponentsPage.countDeleteButtons();
    await prepsFileTypeComponentsPage.clickOnLastDeleteButton();

    prepsFileTypeDeleteDialog = new PrepsFileTypeDeleteDialog();
    expect(await prepsFileTypeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Preps File Type?');
    await prepsFileTypeDeleteDialog.clickOnConfirmButton();

    expect(await prepsFileTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
