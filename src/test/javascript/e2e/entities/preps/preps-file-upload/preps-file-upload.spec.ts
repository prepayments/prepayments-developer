import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PrepsFileUploadComponentsPage from './preps-file-upload.page-object';
import PrepsFileUploadUpdatePage from './preps-file-upload-update.page-object';
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

describe('PrepsFileUpload e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepsFileUploadComponentsPage: PrepsFileUploadComponentsPage;
  let prepsFileUploadUpdatePage: PrepsFileUploadUpdatePage;

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
    prepsFileUploadComponentsPage = new PrepsFileUploadComponentsPage();
    prepsFileUploadComponentsPage = await prepsFileUploadComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepsFileUploads', async () => {
    expect(await prepsFileUploadComponentsPage.title.getText()).to.match(/Preps File Uploads/);
    expect(await prepsFileUploadComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepsFileUploads', async () => {
    const beforeRecordsCount = (await isVisible(prepsFileUploadComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepsFileUploadComponentsPage.table);
    prepsFileUploadUpdatePage = await prepsFileUploadComponentsPage.goToCreatePrepsFileUpload();
    await prepsFileUploadUpdatePage.enterData();

    expect(await prepsFileUploadComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepsFileUploadComponentsPage.table);
    await waitUntilCount(prepsFileUploadComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepsFileUploadComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepsFileUploadComponentsPage.deletePrepsFileUpload();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepsFileUploadComponentsPage.records, beforeRecordsCount);
      expect(await prepsFileUploadComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepsFileUploadComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
