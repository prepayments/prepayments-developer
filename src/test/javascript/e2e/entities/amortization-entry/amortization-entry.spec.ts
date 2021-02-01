import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  AmortizationEntryComponentsPage,
  AmortizationEntryDeleteDialog,
  AmortizationEntryUpdatePage,
} from './amortization-entry.page-object';

const expect = chai.expect;

describe('AmortizationEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amortizationEntryComponentsPage: AmortizationEntryComponentsPage;
  let amortizationEntryUpdatePage: AmortizationEntryUpdatePage;
  let amortizationEntryDeleteDialog: AmortizationEntryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AmortizationEntries', async () => {
    await navBarPage.goToEntity('amortization-entry');
    amortizationEntryComponentsPage = new AmortizationEntryComponentsPage();
    await browser.wait(ec.visibilityOf(amortizationEntryComponentsPage.title), 5000);
    expect(await amortizationEntryComponentsPage.getTitle()).to.eq('Amortization Entries');
    await browser.wait(
      ec.or(ec.visibilityOf(amortizationEntryComponentsPage.entities), ec.visibilityOf(amortizationEntryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AmortizationEntry page', async () => {
    await amortizationEntryComponentsPage.clickOnCreateButton();
    amortizationEntryUpdatePage = new AmortizationEntryUpdatePage();
    expect(await amortizationEntryUpdatePage.getPageTitle()).to.eq('Create or edit a Amortization Entry');
    await amortizationEntryUpdatePage.cancel();
  });

  it('should create and save AmortizationEntries', async () => {
    const nbButtonsBeforeCreate = await amortizationEntryComponentsPage.countDeleteButtons();

    await amortizationEntryComponentsPage.clickOnCreateButton();

    await promise.all([
      amortizationEntryUpdatePage.setAccountNameInput('accountName'),
      amortizationEntryUpdatePage.setDescriptionInput('description'),
      amortizationEntryUpdatePage.setAccountNumberInput('accountNumber'),
      amortizationEntryUpdatePage.setExpenseAccountNumberInput('expenseAccountNumber'),
      amortizationEntryUpdatePage.setPrepaymentNumberInput('prepaymentNumber'),
      amortizationEntryUpdatePage.setPrepaymentDateInput('2000-12-31'),
      amortizationEntryUpdatePage.setTransactionAmountInput('5'),
      amortizationEntryUpdatePage.setAmortizationDateInput('2000-12-31'),
      amortizationEntryUpdatePage.setUploadTokenInput('uploadToken'),
      amortizationEntryUpdatePage.setPrepaymentDataIdInput('5'),
      amortizationEntryUpdatePage.setCompilationTokenInput('compilationToken'),
    ]);

    expect(await amortizationEntryUpdatePage.getAccountNameInput()).to.eq(
      'accountName',
      'Expected AccountName value to be equals to accountName'
    );
    expect(await amortizationEntryUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await amortizationEntryUpdatePage.getAccountNumberInput()).to.eq(
      'accountNumber',
      'Expected AccountNumber value to be equals to accountNumber'
    );
    expect(await amortizationEntryUpdatePage.getExpenseAccountNumberInput()).to.eq(
      'expenseAccountNumber',
      'Expected ExpenseAccountNumber value to be equals to expenseAccountNumber'
    );
    expect(await amortizationEntryUpdatePage.getPrepaymentNumberInput()).to.eq(
      'prepaymentNumber',
      'Expected PrepaymentNumber value to be equals to prepaymentNumber'
    );
    expect(await amortizationEntryUpdatePage.getPrepaymentDateInput()).to.eq(
      '2000-12-31',
      'Expected prepaymentDate value to be equals to 2000-12-31'
    );
    expect(await amortizationEntryUpdatePage.getTransactionAmountInput()).to.eq('5', 'Expected transactionAmount value to be equals to 5');
    expect(await amortizationEntryUpdatePage.getAmortizationDateInput()).to.eq(
      '2000-12-31',
      'Expected amortizationDate value to be equals to 2000-12-31'
    );
    expect(await amortizationEntryUpdatePage.getUploadTokenInput()).to.eq(
      'uploadToken',
      'Expected UploadToken value to be equals to uploadToken'
    );
    expect(await amortizationEntryUpdatePage.getPrepaymentDataIdInput()).to.eq('5', 'Expected prepaymentDataId value to be equals to 5');
    expect(await amortizationEntryUpdatePage.getCompilationTokenInput()).to.eq(
      'compilationToken',
      'Expected CompilationToken value to be equals to compilationToken'
    );

    await amortizationEntryUpdatePage.save();
    expect(await amortizationEntryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await amortizationEntryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last AmortizationEntry', async () => {
    const nbButtonsBeforeDelete = await amortizationEntryComponentsPage.countDeleteButtons();
    await amortizationEntryComponentsPage.clickOnLastDeleteButton();

    amortizationEntryDeleteDialog = new AmortizationEntryDeleteDialog();
    expect(await amortizationEntryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Amortization Entry?');
    await amortizationEntryDeleteDialog.clickOnConfirmButton();

    expect(await amortizationEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
