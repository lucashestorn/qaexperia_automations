import { Page, Locator, expect } from '@playwright/test';

export class LoggedInPage {
  readonly page: Page;
  readonly container: Locator;
  readonly actionButton: Locator;
  readonly logoutButton: Locator;
  readonly successMessage: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.container = page.locator('[data-testid=\'loggedin-container\']');
    this.actionButton = page.locator('[data-testid=\'loggedin-btn\']');
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
    this.successMessage = page.locator('.post-title');
  }

  async navigate() {
    await this.page.goto('https://practicetestautomation.com/loggedin');
  }

  async expectOnLoggedInPage() {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
  }

  async expectSuccessMessage(message: string) {
    await expect(this.successMessage.first()).toBeVisible();
    await expect(this.successMessage.first()).toHaveText(message);
  }

  async expectLogoutButtonVisible() {
    await expect(this.logoutButton.first()).toBeVisible();
  }
}