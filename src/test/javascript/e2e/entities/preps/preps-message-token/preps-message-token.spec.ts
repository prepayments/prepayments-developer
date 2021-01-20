import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PrepsMessageTokenComponentsPage from './preps-message-token.page-object';
import PrepsMessageTokenUpdatePage from './preps-message-token-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../../util/utils';

const expect = chai.expect;

describe('PrepsMessageToken e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepsMessageTokenComponentsPage: PrepsMessageTokenComponentsPage;
  let prepsMessageTokenUpdatePage: PrepsMessageTokenUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    prepsMessageTokenComponentsPage = new PrepsMessageTokenComponentsPage();
    prepsMessageTokenComponentsPage = await prepsMessageTokenComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepsMessageTokens', async () => {
    expect(await prepsMessageTokenComponentsPage.title.getText()).to.match(/Preps Message Tokens/);
    expect(await prepsMessageTokenComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepsMessageTokens', async () => {
    const beforeRecordsCount = (await isVisible(prepsMessageTokenComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepsMessageTokenComponentsPage.table);
    prepsMessageTokenUpdatePage = await prepsMessageTokenComponentsPage.goToCreatePrepsMessageToken();
    await prepsMessageTokenUpdatePage.enterData();

    expect(await prepsMessageTokenComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepsMessageTokenComponentsPage.table);
    await waitUntilCount(prepsMessageTokenComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepsMessageTokenComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepsMessageTokenComponentsPage.deletePrepsMessageToken();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepsMessageTokenComponentsPage.records, beforeRecordsCount);
      expect(await prepsMessageTokenComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepsMessageTokenComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
