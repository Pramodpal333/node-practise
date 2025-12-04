import express from "express";
import { urlShortenPostRequestBodySchema } from "../validation/request.validation.js";
import { nanoid } from "nanoid";
import db from "../db/index.js";
import { urlTable } from "../models/url.model.js";

const router = express.Router();

router.post("/shorten", async function (req, res) {
  const userId = req.user?.id;

  if (!userId)
    return res.status(401).json({ error: "Please login to use this feature" });

  const validationResult = await urlShortenPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error)
    return res.status(400).json({ error: "Please enter a valid url" });

  const { url } = validationResult.data;

  const shortCode = nanoid(6);

  const [data] = await db
    .insert(urlTable)
    .values({ shortCode, targetUrl: url, userId })
    .returning({
      id: urlTable.id,
      targetUrl: urlTable.targetUrl,
      shortCode: urlTable.shortCode,
    });

  return res.status(201).json({
    success: true,
    shortcode: data.shortCode,
    targetUrl: data.targetUrl,
  });
});

export default router;
