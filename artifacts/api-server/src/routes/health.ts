import { Router, type IRouter } from "express";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
