import { Router } from "express";
import { ENTITIES } from "../../config/enums";
import { IEntityRouter } from "../../config/interface";
import { createEnrollment } from "./controllers/create";

const route = Router();

route.post("/", createEnrollment);

export const EnrRouter:IEntityRouter = {
	entity: ENTITIES.Enrollment,
	router: route,
};
