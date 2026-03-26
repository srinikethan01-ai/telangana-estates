import { Router, type IRouter } from "express";
import { z } from "zod";
import { Property } from "../models/Property.js";

const router: IRouter = Router();

const createPropertySchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  price: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
});

router.get("/", async (_req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(
      properties.map((p) => ({
        id: p._id,
        title: p.title,
        location: p.location,
        price: p.price,
        description: p.description,
        type: p.type,
        status: p.status,
        imageUrl: p.imageUrl ?? null,
        createdAt: p.createdAt,
      }))
    );
  } catch (err) {
    console.error("[ERROR] GET /properties:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const parsed = createPropertySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid property data" });
      return;
    }

    const property = await Property.create({
      ...parsed.data,
      imageUrl: parsed.data.imageUrl ?? null,
    });

    res.status(201).json({
      id: property._id,
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
      type: property.type,
      status: property.status,
      imageUrl: property.imageUrl ?? null,
      createdAt: property.createdAt,
    });
  } catch (err) {
    console.error("[ERROR] POST /properties:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).catch(() => null);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    res.json({
      id: property._id,
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
      type: property.type,
      status: property.status,
      imageUrl: property.imageUrl ?? null,
      createdAt: property.createdAt,
    });
  } catch (err) {
    console.error("[ERROR] GET /properties/:id:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const deleted = await Property.findByIdAndDelete(req.params.id).catch(() => null);
    if (!deleted) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    res.json({ message: "Property deleted" });
  } catch (err) {
    console.error("[ERROR] DELETE /properties/:id:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
