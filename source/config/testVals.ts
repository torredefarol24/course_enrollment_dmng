import { apiV1, ENTITIES } from "./enums";

export const TEST_ENDPOINTS = {
	COURSES: {
		CREATE: `${apiV1}/${ENTITIES.Courses}`,
		GET: `${apiV1}/${ENTITIES.Courses}`,
		GET_BY_ID: (id: string) => `${apiV1}/${ENTITIES.Courses}/${id}`,
	},
	ENROLLMENT: {
		CREATE: `${apiV1}/${ENTITIES.Enrollment}`,
	},
};
