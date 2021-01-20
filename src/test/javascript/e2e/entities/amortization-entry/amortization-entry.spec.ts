import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AmortizationEntryComponentsPage from './amortization-entry.page-object';
import AmortizationEntryUpdatePage from './amortization-entry-update.page-object';
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

describe('AmortizationEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amortizationEntryComponentsPage: AmortizationEntryComponentsPage;
  let amortizationEntryUpdatePage: AmortizationEntryUpdatePage;

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
    amortizationEntryComponentsPage = new AmortizationEntryComponentsPage();
    amortizationEntryComponentsPage = await amortizationEntryComponentsPage.goToPage(navBarPage);
  });

  it('should load AmortizationEntries', async () => {
    expect(await amortizationEntryComponentsPage.title.getText()).to.match(/Amortization Entries/);
    expect(await amortizationEntryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete AmortizationEntries', async () => {
    const beforeRecordsCount = (await isVisible(amortizationEntryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(amortizationEntryComponentsPage.table);
    amortizationEntryUpdatePage = await amortizationEntryComponentsPage.goToCreateAmortizationEntry();
    await amortizationEntryUpdatePage.enterData();

    expect(await amortizationEntryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(amortizationEntryComponentsPage.table);
    await waitUntilCount(amortizationEntryComponentsPage.records, beforeRecordsCount + 1);
    expect(await amortizationEntryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await amortizationEntryComponentsPage.deleteAmortizationEntry();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(amortizationEntryComponentsPage.records, beforeRecordsCount);
      expect(await amortizationEntryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(amortizationEntryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
