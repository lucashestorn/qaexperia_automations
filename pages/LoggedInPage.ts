import { Page, Locator, expect } from '@playwright/test';

export class LoggedInPage {
  readonly page: Page;
  readonly container: Locator;
  readonly actionButton: Locator;
  readonly successMessage: Locator;
  readonly logoutButton: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.container = page.locator('[data-testid=\'loggedin-container\']').first();
    this.actionButton = page.locator('[data-testid=\'loggedin-btn\']').first();
    this.successMessage = page.getByText('Logged In Successfully');
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
  }

  async expectOnLoggedInPage() {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
  }

  async expectSuccessMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectLogoutButtonVisible() {
    await expect(this.logoutButton).toBeVisible();
  }
}