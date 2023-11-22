export enum ENTITIES {
	Courses = "Courses",
	Enrollment = "Enrollment",
}

export enum ERRORS {
	CourseNotFound = "Course Not Found",
	MissingParams = "Required properties are Missing",
	InvalidDataType = "Invalid data given",
}

export enum HTTP_CODES {
	OK = 200,
	Created = 201,
	BadRequest = 400,
	NotFound = 404,
	InternalServerError = 500,
}

export enum HTTP_PHRASES {
	OK = "OK",
	Created = "Created",
	BadRequest = "Bad Request",
	NotFound = "Not Found",
	InternalServerError = "Something went wrong",
}

export const apiV1 = "/api/v1";
