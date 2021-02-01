import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrepaymentEntryComponentsPage, PrepaymentEntryDeleteDialog, PrepaymentEntryUpdatePage } from './prepayment-entry.page-object';

const expect = chai.expect;

describe('PrepaymentEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentEntryComponentsPage: PrepaymentEntryComponentsPage;
  let prepaymentEntryUpdatePage: PrepaymentEntryUpdatePage;
  let prepaymentEntryDeleteDialog: PrepaymentEntryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PrepaymentEntries', async () => {
    await navBarPage.goToEntity('prepayment-entry');
    prepaymentEntryComponentsPage = new PrepaymentEntryComponentsPage();
    await browser.wait(ec.visibilityOf(prepaymentEntryComponentsPage.title), 5000);
    expect(await prepaymentEntryComponentsPage.getTitle()).to.eq('Prepayment Entries');
    await browser.wait(
      ec.or(ec.visibilityOf(prepaymentEntryComponentsPage.entities), ec.visibilityOf(prepaymentEntryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PrepaymentEntry page', async () => {
    await prepaymentEntryComponentsPage.clickOnCreateButton();
    prepaymentEntryUpdatePage = new PrepaymentEntryUpdatePage();
    expect(await prepaymentEntryUpdatePage.getPageTitle()).to.eq('Create or edit a Prepayment Entry');
    await prepaymentEntryUpdatePage.cancel();
  });

  it('should create and save PrepaymentEntries', async () => {
    const nbButtonsBeforeCreate = await prepaymentEntryComponentsPage.countDeleteButtons();

    await prepaymentEntryComponentsPage.clickOnCreateButton();

    await promise.all([
      prepaymentEntryUpdatePage.setAccountNameInput('accountName'),
      prepaymentEntryUpdatePage.setDescriptionInput('description'),
      prepaymentEntryUpdatePage.setAccountNumberInput('accountNumber'),
      prepaymentEntryUpdatePage.setPrepaymentNumberInput('prepaymentNumber'),
      prepaymentEntryUpdatePage.setPrepaymentDateInput('2000-12-31'),
      prepaymentEntryUpdatePage.setTransactionAmountInput('5'),
      prepaymentEntryUpdatePage.setUploadTokenInput('uploadToken'),
      prepaymentEntryUpdatePage.setPrepaymentDataIdInput('5'),
      prepaymentEntryUpdatePage.setCompilationTokenInput('compilationToken'),
    ]);

    expect(await prepaymentEntryUpdatePage.getAccountNameInput()).to.eq(
      'accountName',
      'Expected AccountName value to be equals to accountName'
    );
    expect(await prepaymentEntryUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await prepaymentEntryUpdatePage.getAccountNumberInput()).to.eq(
      'accountNumber',
      'Expected AccountNumber value to be equals to accountNumber'
    );
    expect(await prepaymentEntryUpdatePage.getPrepaymentNumberInput()).to.eq(
      'prepaymentNumber',
      'Expected PrepaymentNumber value to be equals to prepaymentNumber'
    );
    expect(await prepaymentEntryUpdatePage.getPrepaymentDateInput()).to.eq(
      '2000-12-31',
      'Expected prepaymentDate value to be equals to 2000-12-31'
    );
    expect(await prepaymentEntryUpdatePage.getTransactionAmountInput()).to.eq('5', 'Expected transactionAmount value to be equals to 5');
    expect(await prepaymentEntryUpdatePage.getUploadTokenInput()).to.eq(
      'uploadToken',
      'Expected UploadToken value to be equals to uploadToken'
    );
    expect(await prepaymentEntryUpdatePage.getPrepaymentDataIdInput()).to.eq('5', 'Expected prepaymentDataId value to be equals to 5');
    expect(await prepaymentEntryUpdatePage.getCompilationTokenInput()).to.eq(
      'compilationToken',
      'Expected CompilationToken value to be equals to compilationToken'
    );

    await prepaymentEntryUpdatePage.save();
    expect(await prepaymentEntryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prepaymentEntryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PrepaymentEntry', async () => {
    const nbButtonsBeforeDelete = await prepaymentEntryComponentsPage.countDeleteButtons();
    await prepaymentEntryComponentsPage.clickOnLastDeleteButton();

    prepaymentEntryDeleteDialog = new PrepaymentEntryDeleteDialog();
    expect(await prepaymentEntryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Prepayment Entry?');
    await prepaymentEntryDeleteDialog.clickOnConfirmButton();

    expect(await prepaymentEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
