import { Router } from "express";
import { ENTITIES } from "../../config/enums";
import { createEnrollment } from "./controllers/create";

const route = Router();

route.post("/", createEnrollment);

export const EnrRouter = {
	entity: ENTITIES.Enrollment,
	router: route,
};
