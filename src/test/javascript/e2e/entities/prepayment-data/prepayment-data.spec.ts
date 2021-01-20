import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrepaymentDataComponentsPage from './prepayment-data.page-object';
import PrepaymentDataUpdatePage from './prepayment-data-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('PrepaymentData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentDataComponentsPage: PrepaymentDataComponentsPage;
  let prepaymentDataUpdatePage: PrepaymentDataUpdatePage;

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
    prepaymentDataComponentsPage = new PrepaymentDataComponentsPage();
    prepaymentDataComponentsPage = await prepaymentDataComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepaymentData', async () => {
    expect(await prepaymentDataComponentsPage.title.getText()).to.match(/Prepayment Data/);
    expect(await prepaymentDataComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepaymentData', async () => {
    const beforeRecordsCount = (await isVisible(prepaymentDataComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepaymentDataComponentsPage.table);
    prepaymentDataUpdatePage = await prepaymentDataComponentsPage.goToCreatePrepaymentData();
    await prepaymentDataUpdatePage.enterData();

    expect(await prepaymentDataComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepaymentDataComponentsPage.table);
    await waitUntilCount(prepaymentDataComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepaymentDataComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepaymentDataComponentsPage.deletePrepaymentData();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepaymentDataComponentsPage.records, beforeRecordsCount);
      expect(await prepaymentDataComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepaymentDataComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
