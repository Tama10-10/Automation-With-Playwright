import { Page } from "@playwright/test";
import { User } from "../models/user.model";
const url = "https://dailyfinance.roadtocareer.net/login";
export class Registration {
  async register(page: Page, user: User) {
    await page.goto(url);
    await page.getByRole("link", { name: "Register" }).click();
    await page
      .getByRole("textbox", { name: "First Name" })
      .fill(user.firstName);
    await page.getByRole("textbox", { name: "Last Name" }).fill(user.lastName);
    await page.getByRole("textbox", { name: "Email" }).fill(user.email);
    await page.getByRole("textbox", { name: "Password" }).fill(user.password);
    await page
      .getByRole("textbox", { name: "Phone Number" })
      .fill(user.phoneNumber);
    await page.getByRole("textbox", { name: "Address" }).fill(user.address);
    await page.getByText("Gender: Male Female").click();
    await page.getByRole("radio").nth(1).check();
    await page.getByText("I accept the terms and").click();
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Register" }).click();
  }
}
