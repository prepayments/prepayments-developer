import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompilationRequestComponentsPage from './compilation-request.page-object';
import CompilationRequestUpdatePage from './compilation-request-update.page-object';
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

describe('CompilationRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let compilationRequestComponentsPage: CompilationRequestComponentsPage;
  let compilationRequestUpdatePage: CompilationRequestUpdatePage;

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
    compilationRequestComponentsPage = new CompilationRequestComponentsPage();
    compilationRequestComponentsPage = await compilationRequestComponentsPage.goToPage(navBarPage);
  });

  it('should load CompilationRequests', async () => {
    expect(await compilationRequestComponentsPage.title.getText()).to.match(/Compilation Requests/);
    expect(await compilationRequestComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete CompilationRequests', async () => {
    const beforeRecordsCount = (await isVisible(compilationRequestComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(compilationRequestComponentsPage.table);
    compilationRequestUpdatePage = await compilationRequestComponentsPage.goToCreateCompilationRequest();
    await compilationRequestUpdatePage.enterData();

    expect(await compilationRequestComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(compilationRequestComponentsPage.table);
    await waitUntilCount(compilationRequestComponentsPage.records, beforeRecordsCount + 1);
    expect(await compilationRequestComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await compilationRequestComponentsPage.deleteCompilationRequest();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(compilationRequestComponentsPage.records, beforeRecordsCount);
      expect(await compilationRequestComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(compilationRequestComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
