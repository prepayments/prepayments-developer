import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  CompilationRequestComponentsPage,
  CompilationRequestDeleteDialog,
  CompilationRequestUpdatePage,
} from './compilation-request.page-object';

const expect = chai.expect;

describe('CompilationRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let compilationRequestComponentsPage: CompilationRequestComponentsPage;
  let compilationRequestUpdatePage: CompilationRequestUpdatePage;
  let compilationRequestDeleteDialog: CompilationRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CompilationRequests', async () => {
    await navBarPage.goToEntity('compilation-request');
    compilationRequestComponentsPage = new CompilationRequestComponentsPage();
    await browser.wait(ec.visibilityOf(compilationRequestComponentsPage.title), 5000);
    expect(await compilationRequestComponentsPage.getTitle()).to.eq('Compilation Requests');
    await browser.wait(
      ec.or(ec.visibilityOf(compilationRequestComponentsPage.entities), ec.visibilityOf(compilationRequestComponentsPage.noResult)),
      1000
    );
  });

  it('should load create CompilationRequest page', async () => {
    await compilationRequestComponentsPage.clickOnCreateButton();
    compilationRequestUpdatePage = new CompilationRequestUpdatePage();
    expect(await compilationRequestUpdatePage.getPageTitle()).to.eq('Create or edit a Compilation Request');
    await compilationRequestUpdatePage.cancel();
  });

  it('should create and save CompilationRequests', async () => {
    const nbButtonsBeforeCreate = await compilationRequestComponentsPage.countDeleteButtons();

    await compilationRequestComponentsPage.clickOnCreateButton();

    await promise.all([
      compilationRequestUpdatePage.setDescriptionInput('description'),
      compilationRequestUpdatePage.setFileUploadIdInput('5'),
      compilationRequestUpdatePage.compilationStatusSelectLastOption(),
      compilationRequestUpdatePage.compilationTypeSelectLastOption(),
      compilationRequestUpdatePage.setCompilationTokenInput('compilationToken'),
    ]);

    expect(await compilationRequestUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await compilationRequestUpdatePage.getFileUploadIdInput()).to.eq('5', 'Expected fileUploadId value to be equals to 5');
    expect(await compilationRequestUpdatePage.getCompilationTokenInput()).to.eq(
      'compilationToken',
      'Expected CompilationToken value to be equals to compilationToken'
    );

    await compilationRequestUpdatePage.save();
    expect(await compilationRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await compilationRequestComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last CompilationRequest', async () => {
    const nbButtonsBeforeDelete = await compilationRequestComponentsPage.countDeleteButtons();
    await compilationRequestComponentsPage.clickOnLastDeleteButton();

    compilationRequestDeleteDialog = new CompilationRequestDeleteDialog();
    expect(await compilationRequestDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Compilation Request?');
    await compilationRequestDeleteDialog.clickOnConfirmButton();

    expect(await compilationRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
