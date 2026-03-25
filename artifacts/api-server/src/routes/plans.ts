import { Router, type IRouter } from "express";

const router: IRouter = Router();

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    features: [
      "5 Premium Leads/mo",
      "Basic property listing",
      "Standard support",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 1999,
    features: [
      "20 Premium Leads/mo",
      "Featured property listings",
      "Priority support",
      "Market analytics dashboard",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 3999,
    features: [
      "Unlimited Leads",
      "Top-tier placement",
      "24/7 Dedicated manager",
      "API access",
      "Custom branding",
    ],
    popular: false,
  },
];

router.get("/", (_req, res) => {
  res.json(plans);
});

export default router;
