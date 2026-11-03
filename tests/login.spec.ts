import { test, expect } from '../fixtures/qaex-testBase';
import { PracticeTestLoginPage } from '../pages/PracticeTestLoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';

test.describe('Practice Test Login', () => {
  test('Tentativas de login com combinacoes invalidas de usuario e senha exibem mensagens de erro correspondentes', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();

    await loginPage.fillUsername('student');
    await loginPage.fillPassword('senha_errada');
    await loginPage.clickSubmit();
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your password is invalid!');

    await loginPage.navigate();
    await loginPage.fillUsername('usuario_inexistente');
    await loginPage.fillPassword('Password123');
    await loginPage.clickSubmit();
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your username is invalid!');

    await loginPage.navigate();
    await loginPage.fillUsername('usuario_inexistente');
    await loginPage.fillPassword('senha_errada');
    await loginPage.clickSubmit();
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your username is invalid!');
  });

  test('Login com usuario invalido exibe mensagem de erro de usuario', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername('usuario_invalido');
    await loginPage.fillPassword('Password123');
    await loginPage.clickSubmit();
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your username is invalid!');
  });

  test('Login com credenciais validas redireciona para a pagina restrita e exibe mensagem de sucesso', async ({ page }) => {
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

  test('Envio do formulario de login com campos vazios nao autentica o usuario', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername('');
    await loginPage.fillPassword('');
    await loginPage.clickSubmit();
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectSuccessMessageNotVisible('Logged In Successfully');
  });

  test('Login com senha incorreta exibe mensagem de erro de senha', async ({ page }) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername('student');
    await loginPage.fillPassword('SenhaErrada123');
    await loginPage.clickSubmit();
    await loginPage.expectStillOnLoginPage();
    await loginPage.expectErrorMessage('Your password is invalid!');
  });
});