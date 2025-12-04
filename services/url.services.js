import { nanoid } from "nanoid";
import db from "../db/index.js";
import { urlTable } from "../models/url.model.js";

export async function createShortCodeAndSaveInDB(url, userId) {
  const shortCode = nanoid(6);

  const [data] = await db
    .insert(urlTable)
    .values({ shortCode, targetUrl: url, userId })
    .returning({
      id: urlTable.id,
      targetUrl: urlTable.targetUrl,
      shortCode: urlTable.shortCode,
    });

  return {
    id: data.id,
    targetUrl: data.targetUrl,
    shortCode: data.shortCode,
  };
}
