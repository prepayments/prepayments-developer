import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrepaymentDataComponentsPage, PrepaymentDataDeleteDialog, PrepaymentDataUpdatePage } from './prepayment-data.page-object';

const expect = chai.expect;

describe('PrepaymentData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentDataComponentsPage: PrepaymentDataComponentsPage;
  let prepaymentDataUpdatePage: PrepaymentDataUpdatePage;
  let prepaymentDataDeleteDialog: PrepaymentDataDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PrepaymentData', async () => {
    await navBarPage.goToEntity('prepayment-data');
    prepaymentDataComponentsPage = new PrepaymentDataComponentsPage();
    await browser.wait(ec.visibilityOf(prepaymentDataComponentsPage.title), 5000);
    expect(await prepaymentDataComponentsPage.getTitle()).to.eq('Prepayment Data');
    await browser.wait(
      ec.or(ec.visibilityOf(prepaymentDataComponentsPage.entities), ec.visibilityOf(prepaymentDataComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PrepaymentData page', async () => {
    await prepaymentDataComponentsPage.clickOnCreateButton();
    prepaymentDataUpdatePage = new PrepaymentDataUpdatePage();
    expect(await prepaymentDataUpdatePage.getPageTitle()).to.eq('Create or edit a Prepayment Data');
    await prepaymentDataUpdatePage.cancel();
  });

  it('should create and save PrepaymentData', async () => {
    const nbButtonsBeforeCreate = await prepaymentDataComponentsPage.countDeleteButtons();

    await prepaymentDataComponentsPage.clickOnCreateButton();

    await promise.all([
      prepaymentDataUpdatePage.setAccountNameInput('accountName'),
      prepaymentDataUpdatePage.setDescriptionInput('description'),
      prepaymentDataUpdatePage.setAccountNumberInput('accountNumber'),
      prepaymentDataUpdatePage.setExpenseAccountNumberInput('expenseAccountNumber'),
      prepaymentDataUpdatePage.setPrepaymentNumberInput('prepaymentNumber'),
      prepaymentDataUpdatePage.setPrepaymentDateInput('2000-12-31'),
      prepaymentDataUpdatePage.setPrepaymentAmountInput('5'),
      prepaymentDataUpdatePage.setPrepaymentPeriodsInput('5'),
      prepaymentDataUpdatePage.setUploadTokenInput('uploadToken'),
    ]);

    expect(await prepaymentDataUpdatePage.getAccountNameInput()).to.eq(
      'accountName',
      'Expected AccountName value to be equals to accountName'
    );
    expect(await prepaymentDataUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await prepaymentDataUpdatePage.getAccountNumberInput()).to.eq(
      'accountNumber',
      'Expected AccountNumber value to be equals to accountNumber'
    );
    expect(await prepaymentDataUpdatePage.getExpenseAccountNumberInput()).to.eq(
      'expenseAccountNumber',
      'Expected ExpenseAccountNumber value to be equals to expenseAccountNumber'
    );
    expect(await prepaymentDataUpdatePage.getPrepaymentNumberInput()).to.eq(
      'prepaymentNumber',
      'Expected PrepaymentNumber value to be equals to prepaymentNumber'
    );
    expect(await prepaymentDataUpdatePage.getPrepaymentDateInput()).to.eq(
      '2000-12-31',
      'Expected prepaymentDate value to be equals to 2000-12-31'
    );
    expect(await prepaymentDataUpdatePage.getPrepaymentAmountInput()).to.eq('5', 'Expected prepaymentAmount value to be equals to 5');
    expect(await prepaymentDataUpdatePage.getPrepaymentPeriodsInput()).to.eq('5', 'Expected prepaymentPeriods value to be equals to 5');
    expect(await prepaymentDataUpdatePage.getUploadTokenInput()).to.eq(
      'uploadToken',
      'Expected UploadToken value to be equals to uploadToken'
    );

    await prepaymentDataUpdatePage.save();
    expect(await prepaymentDataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prepaymentDataComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PrepaymentData', async () => {
    const nbButtonsBeforeDelete = await prepaymentDataComponentsPage.countDeleteButtons();
    await prepaymentDataComponentsPage.clickOnLastDeleteButton();

    prepaymentDataDeleteDialog = new PrepaymentDataDeleteDialog();
    expect(await prepaymentDataDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Prepayment Data?');
    await prepaymentDataDeleteDialog.clickOnConfirmButton();

    expect(await prepaymentDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
