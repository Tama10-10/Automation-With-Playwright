import { Page } from "@playwright/test";
import { UserLogin } from "../models/userLogin.model";
const url = "https://dailyfinance.roadtocareer.net/login";
export class Login {
  async dologin(page: Page, user: UserLogin) {
    await page.goto(url);
    await page.getByRole("textbox", { name: "Email" }).fill(user.email);
    await page.getByRole("textbox", { name: "Password" }).fill(user.password);
    await page.getByRole("button", { name: "Login" }).click();
  }
}
