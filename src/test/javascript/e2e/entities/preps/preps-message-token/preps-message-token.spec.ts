import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  PrepsMessageTokenComponentsPage,
  PrepsMessageTokenDeleteDialog,
  PrepsMessageTokenUpdatePage,
} from './preps-message-token.page-object';

const expect = chai.expect;

describe('PrepsMessageToken e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepsMessageTokenComponentsPage: PrepsMessageTokenComponentsPage;
  let prepsMessageTokenUpdatePage: PrepsMessageTokenUpdatePage;
  let prepsMessageTokenDeleteDialog: PrepsMessageTokenDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PrepsMessageTokens', async () => {
    await navBarPage.goToEntity('preps-message-token');
    prepsMessageTokenComponentsPage = new PrepsMessageTokenComponentsPage();
    await browser.wait(ec.visibilityOf(prepsMessageTokenComponentsPage.title), 5000);
    expect(await prepsMessageTokenComponentsPage.getTitle()).to.eq('Preps Message Tokens');
    await browser.wait(
      ec.or(ec.visibilityOf(prepsMessageTokenComponentsPage.entities), ec.visibilityOf(prepsMessageTokenComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PrepsMessageToken page', async () => {
    await prepsMessageTokenComponentsPage.clickOnCreateButton();
    prepsMessageTokenUpdatePage = new PrepsMessageTokenUpdatePage();
    expect(await prepsMessageTokenUpdatePage.getPageTitle()).to.eq('Create or edit a Preps Message Token');
    await prepsMessageTokenUpdatePage.cancel();
  });

  it('should create and save PrepsMessageTokens', async () => {
    const nbButtonsBeforeCreate = await prepsMessageTokenComponentsPage.countDeleteButtons();

    await prepsMessageTokenComponentsPage.clickOnCreateButton();

    await promise.all([
      prepsMessageTokenUpdatePage.setDescriptionInput('description'),
      prepsMessageTokenUpdatePage.setTimeSentInput('5'),
      prepsMessageTokenUpdatePage.setTokenValueInput('tokenValue'),
    ]);

    expect(await prepsMessageTokenUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await prepsMessageTokenUpdatePage.getTimeSentInput()).to.eq('5', 'Expected timeSent value to be equals to 5');
    expect(await prepsMessageTokenUpdatePage.getTokenValueInput()).to.eq(
      'tokenValue',
      'Expected TokenValue value to be equals to tokenValue'
    );
    const selectedReceived = prepsMessageTokenUpdatePage.getReceivedInput();
    if (await selectedReceived.isSelected()) {
      await prepsMessageTokenUpdatePage.getReceivedInput().click();
      expect(await prepsMessageTokenUpdatePage.getReceivedInput().isSelected(), 'Expected received not to be selected').to.be.false;
    } else {
      await prepsMessageTokenUpdatePage.getReceivedInput().click();
      expect(await prepsMessageTokenUpdatePage.getReceivedInput().isSelected(), 'Expected received to be selected').to.be.true;
    }
    const selectedActioned = prepsMessageTokenUpdatePage.getActionedInput();
    if (await selectedActioned.isSelected()) {
      await prepsMessageTokenUpdatePage.getActionedInput().click();
      expect(await prepsMessageTokenUpdatePage.getActionedInput().isSelected(), 'Expected actioned not to be selected').to.be.false;
    } else {
      await prepsMessageTokenUpdatePage.getActionedInput().click();
      expect(await prepsMessageTokenUpdatePage.getActionedInput().isSelected(), 'Expected actioned to be selected').to.be.true;
    }
    const selectedContentFullyEnqueued = prepsMessageTokenUpdatePage.getContentFullyEnqueuedInput();
    if (await selectedContentFullyEnqueued.isSelected()) {
      await prepsMessageTokenUpdatePage.getContentFullyEnqueuedInput().click();
      expect(
        await prepsMessageTokenUpdatePage.getContentFullyEnqueuedInput().isSelected(),
        'Expected contentFullyEnqueued not to be selected'
      ).to.be.false;
    } else {
      await prepsMessageTokenUpdatePage.getContentFullyEnqueuedInput().click();
      expect(await prepsMessageTokenUpdatePage.getContentFullyEnqueuedInput().isSelected(), 'Expected contentFullyEnqueued to be selected')
        .to.be.true;
    }

    await prepsMessageTokenUpdatePage.save();
    expect(await prepsMessageTokenUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prepsMessageTokenComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PrepsMessageToken', async () => {
    const nbButtonsBeforeDelete = await prepsMessageTokenComponentsPage.countDeleteButtons();
    await prepsMessageTokenComponentsPage.clickOnLastDeleteButton();

    prepsMessageTokenDeleteDialog = new PrepsMessageTokenDeleteDialog();
    expect(await prepsMessageTokenDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Preps Message Token?');
    await prepsMessageTokenDeleteDialog.clickOnConfirmButton();

    expect(await prepsMessageTokenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
