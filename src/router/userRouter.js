import express from "express";
import {
  createPosition,
  CreateTeacher,
  getPosition,
  GetTeacher,
} from "../controller/userController.js";

const router = express.Router();

router.get("/teacher", GetTeacher);
router.post("/teacher", CreateTeacher);
router.get("/teacher-position", getPosition);
router.post("/create-teacher-position", createPosition);

export default router;
