import express from "express";
import { urlShortenPostRequestBodySchema } from "../validation/request.validation.js";
import { createShortCodeAndSaveInDB } from "../services/url.services.js";
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

export default router;
