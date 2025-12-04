import { nanoid } from "nanoid";
import db from "../db/index.js";
import { urlTable } from "../models/url.model.js";
import { and, eq } from "drizzle-orm";

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

export async function getTargetUrlByShortCode(shortCode) {
  const [result] = await db
    .select({ targetUrl: urlTable.targetUrl })
    .from(urlTable)
    .where(eq(urlTable.shortCode, shortCode));

  return { targetUrl: result.targetUrl };
}

export async function getAllUrlsOfUser(userid) {
  const codes = await db
    .select()
    .from(urlTable)
    .where(eq(urlTable.userId, userid));

  return { codes };
}

export async function deleteShortCodeById(codeId, userId) {
  const result = await db
    .delete(urlTable)
    .where(and(eq(urlTable.id, codeId), eq(urlTable.userId, userId)));

  return result;
}
