import { test, expect } from '../fixtures/qaex-testBase';
import { PracticeTestLoginPage } from '../pages/PracticeTestLoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';

test.describe('Logged In Page', () => {
  test('Pagina restrita exibe mensagem de sucesso e botao de logout apos login valido', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    const loggedInPage = new LoggedInPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername(process.env.LOGIN_USERNAME ?? 'student');
    await loginPage.fillPassword(process.env.LOGIN_PASSWORD ?? 'Password123');
    await loginPage.clickSubmit();
    await loggedInPage.expectOnLoggedInPage();
    await loggedInPage.expectSuccessMessage('Logged In Successfully');
    await loggedInPage.expectLogoutButtonVisible();
  });
});