import { Page } from "@playwright/test";
export class UploadImage {
  async upload(page: Page, url: string) {
    await page.getByRole("button", { name: "account of current user" }).click();
    await page.getByRole("menuitem", { name: "Profile" }).click();
    await page.getByRole("button", { name: "Edit" }).click();
    await page.getByRole("button", { name: "Choose File" }).click();
    await page.getByRole("button", { name: "Choose File" }).setInputFiles(url);
    await page.getByRole("button", { name: "Upload Image" }).click();
  }
}
