import { faker } from "@faker-js/faker";
import { expect, Page, test } from "@playwright/test";
import { User } from "../models/user.model";
import { Registration } from "../pages/registration";
import { fetchEmail } from "../services/email.service";
import { generateRandomNumber, saveJsonData } from "../Utils/util";
let page: Page;
test.describe.serial("User Registration", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });
  test.afterAll(async () => {
    await page.close();
  });

  test("user can register successfully", async ({}) => {
    const registration = new Registration();
    const user: User = {
      address: faker.location.city(),
      email:
        "tamadebnath2001+" + generateRandomNumber(1000, 9999) + "@gmail.com",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: "1234",
      phoneNumber: "0130" + generateRandomNumber(1000000, 9999999),
    };
    await registration.register(page, user);
    saveJsonData(user, "./resources/user.json");
    await page.waitForTimeout(5000);
    let content = await fetchEmail();
    expect(content).toContain("Welcome to our platform");
  });
});
