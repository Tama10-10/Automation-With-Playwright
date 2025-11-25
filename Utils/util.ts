import fs from "fs";
import path from "path";
import { User } from "../models/user.model";
export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
export function saveJsonData(JsonObj: object, fileUrl: string) {
  let dataArray: object[] = [];
  if (fs.existsSync(fileUrl)) {
    const fileContent = fs.readFileSync(fileUrl, "utf8");
    dataArray = JSON.parse(fileContent);
  }
  dataArray.push(JsonObj);
  fs.writeFileSync(fileUrl, JSON.stringify(dataArray, null, 2));
}
export function getLastUser(fileUrl: string): User {
  const fileContent = fs.readFileSync(fileUrl, "utf-8");
  const jsonArray = JSON.parse(fileContent);
  return jsonArray[jsonArray.length - 1];
}
export function saveEnvVar(
  key: string,
  value: string,
  envFilePath?: string
): void {
  const envPath = envFilePath || path.resolve(__dirname, "..", ".env");
  const newLine = `${key}=${value}`;
  const exists = fs.existsSync(envPath);

  let content = exists ? fs.readFileSync(envPath, "utf-8") : "";

  if (content.match(new RegExp(`^${key}=`, "m"))) {
    content = content.replace(new RegExp(`^${key}=.*`, "m"), newLine);
  } else {
    content += (content.trim() ? "\n" : "") + newLine + "\n";
  }

  fs.writeFileSync(envPath, content.trim() + "\n", "utf-8");
  console.log(`Saved ${key} to ${envPath}`);
}
