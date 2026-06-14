import { Router } from "express";

const router = Router();

const DEPRECATED = {
  error: "deprecated",
  message: "API /debts đã ngừng. Dùng /billing-periods và /accounts-receivable.",
};

router.all("/debts", (_req, res) => res.status(410).json(DEPRECATED));
router.all("/debts/:id", (_req, res) => res.status(410).json(DEPRECATED));

export default router;
