import mongoose from "mongoose";

const TeacherPositionSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  des: String,
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const TeacherPosition = mongoose.model(
  "TeacherPosition",
  TeacherPositionSchema
);

export default TeacherPosition;
