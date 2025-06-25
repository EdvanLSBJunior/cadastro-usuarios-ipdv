import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { registerUserSchema } from "../validations/userSchema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const userController = new UserController();

router.post("/login", asyncHandler(userController.login.bind(userController)));
router.post(
  "/register",
  validate(registerUserSchema),
  asyncHandler(userController.register.bind(userController))
);

export default router;

