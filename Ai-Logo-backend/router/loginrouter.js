import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  requestPasswordReset,
  resetPassword,
  signupUser,
  updateUser,
  verifyResetCode,
} from "../controllers/logincontroller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { editLogoFromPrompt, generateLogo, generateLogoFromLogoController, getLogoHistory } from "../controllers/logo.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);

router.get("/users", authenticate, getAllUsers);
router.get("/users/:id", authenticate, getUserById);
router.put("/users/:id", authenticate, updateUser);
router.delete("/users/:id", authenticate, deleteUser);

router.post("/forgot-password", requestPasswordReset);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.post("/logo/generate", authenticate, generateLogo);
router.post("/logo/generate-from-logo", authenticate, generateLogoFromLogoController);
router.get("/logo/history", authenticate, getLogoHistory);
router.post("/logo/edit-logo", authenticate, editLogoFromPrompt);


export default router;
