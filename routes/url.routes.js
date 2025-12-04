import express from "express";
import { urlShortenPostRequestBodySchema } from "../validation/request.validation.js";
import {
  createShortCodeAndSaveInDB,
  getTargetUrlByShortCode,
  getAllUrlsOfUser,
  deleteShortCodeById,
} from "../services/url.services.js";

import { ensureAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const validationResult = await urlShortenPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error)
    return res.status(400).json({ error: "Please enter a valid url" });

  const { url } = validationResult.data;

  console.log("--------->", req.user);
  const { shortCode, targetUrl } = await createShortCodeAndSaveInDB(
    url,
    req.user.id
  );

  return res.status(201).json({
    success: true,
    shortCode,
    targetUrl,
  });
});

router.get("/codes", ensureAuthenticated, async function (req, res) {
  const userId = req.user.id;
  const { codes } = await getAllUrlsOfUser(userId);

  return res.json({ length: codes.length, codes });
});

router.delete("/:id", ensureAuthenticated, async function (req, res) {
  const id = req.params.id;
  const userId = req.user.id;

  await deleteShortCodeById(id, userId);

  return res.json({ deleted: true });
});

router.get("/:shortcode", async function (req, res) {
  const shortCode = req.params.shortcode;

  const { targetUrl } = await getTargetUrlByShortCode(shortCode);

  return res.redirect(targetUrl);
});

export default router;
