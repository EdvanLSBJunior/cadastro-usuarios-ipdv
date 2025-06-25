import { Router } from "express";
import { RoleController } from "../controllers/RoleControllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const roleController = new RoleController();

router.use(ensureAuthenticated, isAdmin);

router.get("/", asyncHandler(roleController.getAll.bind(roleController)));
router.get("/:id", asyncHandler(roleController.getById.bind(roleController)));
router.post("/", asyncHandler(roleController.create.bind(roleController)));
router.put("/:id", asyncHandler(roleController.update.bind(roleController)));
router.delete("/:id", asyncHandler(roleController.delete.bind(roleController)));

export default router;
