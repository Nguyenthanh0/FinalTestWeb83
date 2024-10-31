import User from "../model/userModel.js";
import Teacher from "../model/Teacher.js";
import TeacherPosition from "../model/TeacherPosition.js";
import { v4 as uuidv4 } from "uuid";

// 1.1 GET /teachers - Lấy danh sách giáo viên với thông tin chi tiết
export const GetTeacher = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const teachers = await Teacher.find({ isDeleted: false })
      .populate("userId", "name email phoneNumber address")
      .populate("teacherPositions", "name")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teachers." });
  }
};

// 1.3 POST /teachers - Tạo mới giáo viên
export const CreateTeacher = async (req, res) => {
  const { name, email, phoneNumber, address, degrees, teacherPositions } =
    req.body;

  try {
    // Tạo user mới trong bảng User
    const user = new User({
      name,
      email,
      phoneNumber,
      address,
      role: "TEACHER",
    });
    await user.save();

    // Tạo mã code ngẫu nhiên, đảm bảo không trùng lặp
    let code;
    do {
      code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    } while (await Teacher.exists({ code }));

    const teacher = new Teacher({
      userId: user._id,
      code,
      degrees,
      teacherPositions,
    });

    await teacher.save();

    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    res.status(500).json({ error: "Failed to create teacher." });
  }
};

// 1.4 GET /teacher-positions - Lấy danh sách vị trí công tác
export const getPosition = async (req, res) => {
  try {
    const positions = await TeacherPosition.find({ isDeleted: false });
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teacher positions." });
  }
};

// 1.5 POST /teacher-positions - Tạo vị trí công tác mới
export const createPosition = async (req, res) => {
  const { name, des } = req.body;

  try {
    // Sinh mã code ngẫu nhiên, đảm bảo không trùng lặp
    let code;
    do {
      code = uuidv4();
    } while (await TeacherPosition.exists({ code }));

    const position = new TeacherPosition({ name, code, des });
    await position.save();

    res
      .status(201)
      .json({ message: "Teacher position created successfully", position });
  } catch (error) {
    res.status(500).json({ error: "Failed to create teacher position." });
  }
};
