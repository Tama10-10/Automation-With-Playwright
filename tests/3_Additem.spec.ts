import { Page, test } from "@playwright/test";
import * as dotenv from "dotenv";
import { writeFileSync } from "fs";
import { ItemPage } from "../pages/addItem";
dotenv.config();
let page: Page;

test.describe.serial("Add Item", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });
  test("Add item successfully", async () => {
    const itemPage = new ItemPage();
    let token = process.env.token || "";
    itemPage.addItem(page, token);
    await page.locator("tbody tr").last().waitFor();

    const data = await itemPage.scrapTableData(page);
    const textData = JSON.stringify(data, null, 2);
    writeFileSync("resources/textFile.txt", textData);
  });
  test("Log out", async () => {
    await page.getByRole("button", { name: "account of current user" }).click();
    await page.getByRole("menuitem", { name: "Logout" }).click();
  });
});
