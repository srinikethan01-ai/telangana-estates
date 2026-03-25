import { Router, type IRouter } from "express";
import { z } from "zod";
import { Lead } from "../models/Lead.js";

const router: IRouter = Router();

const createLeadSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(6),
});

router.post("/", async (req, res) => {
  const parsed = createLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Full name and valid phone number are required" });
    return;
  }

  await Lead.create({
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    status: "new",
  });

  res.status(201).json({ message: "Thank you! We'll reach out to you shortly." });
});

router.get("/", async (req, res) => {
  const userId = (req.session as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const leads = await Lead.find().sort({ createdAt: 1 });
  res.json(
    leads.map((l) => ({
      id: l._id,
      fullName: l.fullName,
      phone: l.phone,
      status: l.status,
      createdAt: l.createdAt,
    }))
  );
});

export default router;
