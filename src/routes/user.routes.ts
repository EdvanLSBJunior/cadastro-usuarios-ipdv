import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/login", async (req, res, next) => {
	try {
		await userController.login(req, res);
	} catch (error) {
		next(error);
	}
});
router.post("/register", async (req, res, next) => {
	try {
		await userController.register(req, res);
	} catch (error) {
		next(error);
	}
});

export default router;
