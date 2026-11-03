import { test, expect } from '../fixtures/qaex-testBase';
import { PracticeTestLoginPage } from '../pages/PracticeTestLoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';

test.describe('Practice Test Login', () => {
  test('invalid username and password combinations show corresponding error messages', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    await loginPage.login('student', 'senha_errada');
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your password is invalid!');

    await loginPage.navigate();
    await loginPage.login('usuario_inexistente', 'Password123');
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your username is invalid!');

    await loginPage.navigate();
    await loginPage.login('usuario_inexistente', 'senha_errada');
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your username is invalid!');
  });

  test('login with invalid username shows username error message', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    await loginPage.login('usuario_invalido', 'Password123');
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your username is invalid!');
  });

  test('login with valid credentials redirects to restricted page and shows success message', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    const loggedInPage = new LoggedInPage(page);
    await loginPage.navigate();
    await loginPage.login('student', 'Password123');
    await loggedInPage.expectOnLoggedInPage();
    await loggedInPage.expectSuccessMessage('Logged In Successfully');
    await loggedInPage.expectLogoutButtonVisible();
  });

  test('submitting login form with empty fields does not authenticate the user', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    await loginPage.login('', '');
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectSuccessMessageNotVisible('Logged In Successfully');
  });

  test('login with incorrect password shows password error message', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    await loginPage.login('student', 'SenhaErrada123');
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your password is invalid!');
  });
});