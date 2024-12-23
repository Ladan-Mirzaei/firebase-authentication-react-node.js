import { Router } from "express";
import { createUser, userProfile } from "../controllers/userController.js";

import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.post("/", firebaseRequireAuth, createUser);
router.get("/", firebaseRequireAuth, userProfile);

export default router;
