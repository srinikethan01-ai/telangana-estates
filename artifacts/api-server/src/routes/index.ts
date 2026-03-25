import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import propertiesRouter from "./properties.js";
import leadsRouter from "./leads.js";
import plansRouter from "./plans.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/properties", propertiesRouter);
router.use("/leads", leadsRouter);
router.use("/plans", plansRouter);

export default router;
