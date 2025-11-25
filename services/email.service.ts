import { request } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();
async function fetchId() {
  const api = await request.newContext({
    baseURL: "https://gmail.googleapis.com",
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.gmail_accessToken}`,
    },
  });
  const response = await api.get("/gmail/v1/users/me/messages");
  let data = await response.json();
  let emailID = await data.messages[0].id;
  return emailID;
}
export async function fetchEmail() {
  const id = await fetchId();
  const api = await request.newContext({
    baseURL: "https://gmail.googleapis.com",
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.gmail_accessToken}`,
    },
  });
  const res = await api.get("/gmail/v1/users/me/messages/" + id);
  const resJson = await res.json();
  const latestEmail = resJson.snippet;
  return latestEmail;
}
