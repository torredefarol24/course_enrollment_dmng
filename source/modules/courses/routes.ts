import { Router } from "express";
import { ENTITIES } from "../../config/enums";
import { createCourse } from "./controllers/create";
import { getAllCourses } from "./controllers/get";
import { getCourseById } from "./controllers/getById";

const route = Router();

route.get("/", getAllCourses);
route.get("/:courseId", getCourseById);
route.post("/", createCourse);

export const CourseRouter = {
	entity: ENTITIES.Courses,
	router: route,
};
