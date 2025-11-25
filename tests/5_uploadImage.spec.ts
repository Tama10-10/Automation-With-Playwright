import { expect, Page, test } from "@playwright/test";
import { UserLogin } from "../models/userLogin.model";
import { UploadImage } from "../pages/imageUpload";
import { Login } from "../pages/login";
import { getLastUser } from "../Utils/util";
let page: Page;

test.describe.serial("Image Upload", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });
  test("User can successfully upload image", async () => {
    const login = new Login();
    const lastUser = getLastUser("resources/user.json");
    const user: UserLogin = {
      email: lastUser.email,
      password: lastUser.password,
    };
    await login.dologin(page, user);
    const uploadImage = new UploadImage();
    await uploadImage.upload(page, "resources/image.png");
    await expect(page.getByRole("img", { name: "User" })).toHaveAttribute(
      "src",
      /profileImage/
    );
  });
});
