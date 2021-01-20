import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PrepsFileTypeComponentsPage from './preps-file-type.page-object';
import PrepsFileTypeUpdatePage from './preps-file-type-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('PrepsFileType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepsFileTypeComponentsPage: PrepsFileTypeComponentsPage;
  let prepsFileTypeUpdatePage: PrepsFileTypeUpdatePage;

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
    prepsFileTypeComponentsPage = new PrepsFileTypeComponentsPage();
    prepsFileTypeComponentsPage = await prepsFileTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepsFileTypes', async () => {
    expect(await prepsFileTypeComponentsPage.title.getText()).to.match(/Preps File Types/);
    expect(await prepsFileTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepsFileTypes', async () => {
    const beforeRecordsCount = (await isVisible(prepsFileTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepsFileTypeComponentsPage.table);
    prepsFileTypeUpdatePage = await prepsFileTypeComponentsPage.goToCreatePrepsFileType();
    await prepsFileTypeUpdatePage.enterData();

    expect(await prepsFileTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepsFileTypeComponentsPage.table);
    await waitUntilCount(prepsFileTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepsFileTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepsFileTypeComponentsPage.deletePrepsFileType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepsFileTypeComponentsPage.records, beforeRecordsCount);
      expect(await prepsFileTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepsFileTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
