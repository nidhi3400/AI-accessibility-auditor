import express from "express";
import cors from "cors";
import { auditHtml } from "../audit/auditHtml.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

app.get("/", (req, res) => {
  res.json({
    message:
      "AI Accessibility Auditor API Running",
  });
});

app.post("/audit", (req, res) => {
  console.log("BODY:", req.body);

  const { html } = req.body;

  if (!html) {
    return res.status(400).json({
      error: "HTML is required",
    });
  }

  const result = auditHtml(html);

  res.json(result);
});

app.post(
  "/audit-url",
  async (req, res) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({
          error: "URL is required",
        });
      }

      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0",
        },
      });

      if (!response.ok) {
        return res.status(400).json({
          error:
            "Unable to fetch website",
        });
      }

      const html =
        await response.text();

      const result =
        auditHtml(html);

      res.json({
        ...result,
        auditedUrl: url,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to audit website",
      });
    }
  }
);