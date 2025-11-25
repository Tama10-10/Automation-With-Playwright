import { expect, Page, test } from "@playwright/test";
import { Reset } from "../pages/resetPassword";

let page: Page;

test.describe.serial("Reset Password", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });
  test("User can reset password successfully", async () => {
    const reset = new Reset();

    await reset.getResetLink(page, "tamadebnath2001+3851@gmail.com");

    //console.log(link);

    const actual = await page.getByRole("paragraph").textContent();
    await expect(actual).toContain("Password reset successfully");
  });
});
