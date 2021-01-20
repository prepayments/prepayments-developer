import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrepaymentEntryComponentsPage from './prepayment-entry.page-object';
import PrepaymentEntryUpdatePage from './prepayment-entry-update.page-object';
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

describe('PrepaymentEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentEntryComponentsPage: PrepaymentEntryComponentsPage;
  let prepaymentEntryUpdatePage: PrepaymentEntryUpdatePage;

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
    prepaymentEntryComponentsPage = new PrepaymentEntryComponentsPage();
    prepaymentEntryComponentsPage = await prepaymentEntryComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepaymentEntries', async () => {
    expect(await prepaymentEntryComponentsPage.title.getText()).to.match(/Prepayment Entries/);
    expect(await prepaymentEntryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepaymentEntries', async () => {
    const beforeRecordsCount = (await isVisible(prepaymentEntryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepaymentEntryComponentsPage.table);
    prepaymentEntryUpdatePage = await prepaymentEntryComponentsPage.goToCreatePrepaymentEntry();
    await prepaymentEntryUpdatePage.enterData();

    expect(await prepaymentEntryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepaymentEntryComponentsPage.table);
    await waitUntilCount(prepaymentEntryComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepaymentEntryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepaymentEntryComponentsPage.deletePrepaymentEntry();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepaymentEntryComponentsPage.records, beforeRecordsCount);
      expect(await prepaymentEntryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepaymentEntryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
