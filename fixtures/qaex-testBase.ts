import { test as base } from '@playwright/test';
import { PracticeTestLoginPage } from '../pages/PracticeTestLoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';
type Fixtures = {
  practiceTestLoginPage: PracticeTestLoginPage;
  loggedInPage: LoggedInPage;
};
export const test = base.extend<Fixtures>({
  practiceTestLoginPage: async ({ page }, use) => { await use(new PracticeTestLoginPage(page)); },
  loggedInPage: async ({ page }, use) => { await use(new LoggedInPage(page)); },
});
export { expect, type Page, type Locator, type BrowserContext } from '@playwright/test';
