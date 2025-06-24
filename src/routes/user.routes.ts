import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { registerUserSchema } from "../validations/userSchema";

const router = Router();
const userController = new UserController();

router.post("/login", async (req, res, next) => {
	try {
		await userController.login(req, res);
	} catch (error) {
		next(error);
	}
});
router.post("/register", validate(registerUserSchema), async (req, res, next) => {
	try {
		await userController.register(req, res);
	} catch (error) {
		next(error);
	}
});

export default router;
