import { Page, Locator, expect } from '@playwright/test';

export class PracticeTestLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
    this.successMessage = page.getByText('Logged In Successfully');
  }

  async navigate() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async expectStillOnLoginPage() {
    await expect(this.page).toHaveURL(/practice-test-login/);
    await expect(this.submitButton).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectSuccessMessageNotVisible(message: string) {
    await expect(this.successMessage).toHaveCount(0);
    await expect(this.page.getByText(message)).toHaveCount(0);
  }
}