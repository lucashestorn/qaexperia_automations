import { test, expect } from '../fixtures/qaex-testBase';
import { LoggedInPage } from '../pages/LoggedInPage';

test.describe('Logged In Page', () => {
  test('logged in page displays success message and logout button', async ({ page }) => {
    const loggedInPage = new LoggedInPage(page);
    await loggedInPage.navigate();
    await loggedInPage.expectSuccessMessage('Logged In Successfully');
    await loggedInPage.expectLogoutButtonVisible();
  });
});