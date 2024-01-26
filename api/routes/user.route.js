import express from "express";
const router = express.Router();
import updateUser from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

router.get("/");
router.post("/update/:id", verifyToken, updateUser);

export default router;
