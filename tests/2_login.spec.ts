import { expect, Page, test } from "@playwright/test";
import { UserLogin } from "../models/userLogin.model";
import { Login } from "../pages/login";
import { getLastUser, saveEnvVar } from "../Utils/util";
let page: Page;

test.describe.serial("User Login", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });
  test("User can login successfully", async () => {
    const login = new Login();
    const lastUser = getLastUser("resources/user.json");
    const user: UserLogin = {
      email: lastUser.email,
      password: lastUser.password,
    };
    await login.dologin(page, user);
    await expect(page).toHaveURL(/\/user$/);
    const accessToken = await page.evaluate(() => {
      return localStorage.getItem("authToken") || ""; // or whatever key the app uses
    });
    let token: string;

    token = accessToken;
    saveEnvVar("token", token);
  });
});
