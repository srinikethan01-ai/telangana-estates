import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "../models/User.js";

const router: IRouter = Router();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  try {
    const parsed = credentialsSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid email or password (min 6 chars)" });
      return;
    }
    const { email, password } = parsed.data;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    (req.session as any).userId = user._id.toString();

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        email: user.email,
        subscriptionTier: user.subscriptionTier ?? null,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("[ERROR] signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const parsed = credentialsSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }
    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    (req.session as any).userId = user._id.toString();

    res.json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        subscriptionTier: user.subscriptionTier ?? null,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("[ERROR] login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/me", async (req, res) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    res.json({
      id: user._id,
      email: user.email,
      subscriptionTier: user.subscriptionTier ?? null,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error("[ERROR] me:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
