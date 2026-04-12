import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ordersRouter from "./orders";
import leadsRouter from "./leads";
import servicesRouter from "./services";
import settingsRouter from "./settings";
import clientPortalsRouter from "./client-portals";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/orders", ordersRouter);
router.use("/leads", leadsRouter);
router.use("/services", servicesRouter);
router.use("/settings", settingsRouter);
router.use("/client-portals", clientPortalsRouter);

export default router;
