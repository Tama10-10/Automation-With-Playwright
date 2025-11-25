import { Page } from "@playwright/test";
const url = "https://dailyfinance.roadtocareer.net/user";
export class ItemPage {
  async addItem(page: Page, accesssToken: string) {
    await page.addInitScript((token) => {
      localStorage.setItem("authToken", token);
    }, accesssToken);
    await page.goto(url);
    await page.getByRole("button", { name: "Add Cost" }).click();
    await page.getByRole("textbox", { name: "Item Name" }).fill("book");
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("spinbutton", { name: "Amount" }).fill("199");
    await page
      .getByRole("textbox", { name: "Purchase Date" })
      .fill("2025-11-12");
    await page.getByLabel("Month").selectOption("April");
    await page.getByRole("textbox", { name: "Remarks" }).fill("jfhdjfh");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByRole("button", { name: "Add Cost" }).click();
    await page.getByRole("textbox", { name: "Item Name" }).fill("book");
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("spinbutton", { name: "Amount" }).fill("199");
    await page
      .getByRole("textbox", { name: "Purchase Date" })
      .fill("2025-11-12");
    await page.getByLabel("Month").selectOption("April");
    await page.getByRole("textbox", { name: "Remarks" }).fill("jfhdjfh");
    await page.getByRole("button", { name: "Submit" }).click();
  }

  async scrapTableData(page: Page) {
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();

    const tableData: string[][] = [];

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = row.locator("td");
      const cellCount = await cells.count();

      const rowData: string[] = [];
      for (let j = 0; j < cellCount; j++) {
        rowData.push(await cells.nth(j).innerText());
      }
      tableData.push(rowData);
    }

    console.log(tableData);
    return tableData;
  }
}
