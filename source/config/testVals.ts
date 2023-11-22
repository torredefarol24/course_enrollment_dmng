import { CourseEnrollmentApp } from "../main/app";
import { ENTITIES } from "./enums";

export const TEST_CONF = {
	ENDPOINTS: {
		COURSES: {
			CREATE: `/api/v1/${ENTITIES.Courses}`,
			GET: `/api/v1/${ENTITIES.Courses}`,
			GET_BY_ID: (id: string) => `/api/v1/${ENTITIES.Courses}/${id}`,
		},
		ENROLLMENT: {
			CREATE: `/api/v1/${ENTITIES.Enrollment}`,
		},
	},
};
