import { Page } from "@playwright/test";
import { fetchEmail } from "../services/email.service";
const url = "https://dailyfinance.roadtocareer.net/login";
export class Reset {
  async getResetLink(page: Page, email: string) {
    await page.goto(url);
    await page.getByRole("link", { name: "Reset it here" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill(email);
    await page.getByRole("button", { name: "Send Reset Link" }).click();
    let content: string = "";
    for (let i = 0; i < 10; i++) {
      // retry up to 10 times (10 sec)
      content = await fetchEmail();
      if (content.includes("http")) break; // email arrived
      await page.waitForTimeout(1000); // wait 1 second
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const linkArray = content.match(urlRegex);

    if (!linkArray || linkArray.length === 0) {
      throw new Error("No reset link found in email!");
    }

    const link = linkArray[0];
    await page.goto(link);
    await page.getByRole("textbox", { name: "New Password" }).fill("12345");
    await page.getByRole("textbox", { name: "Confirm Password" }).fill("12345");
    await page.getByRole("button", { name: "Reset Password" }).click();
  }
}
