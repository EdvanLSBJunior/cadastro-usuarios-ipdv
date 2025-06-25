import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const userController = new UserController();

router.use(ensureAuthenticated, isAdmin);

router.get("/", asyncHandler(userController.getAllUsers.bind(userController)));
router.get("/:id", asyncHandler(userController.getUserById.bind(userController)));
router.put("/:id", asyncHandler(userController.update.bind(userController)));
router.delete("/:id", asyncHandler(userController.delete.bind(userController)));

export default router;
