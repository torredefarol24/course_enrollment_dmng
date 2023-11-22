import { NextFunction, Response } from "express";
import { ERRORS } from "../../../config/enums";
import { Course } from "../model";

export async function getCourseById(request: any, response: Response, next: NextFunction) {
	try {
		const course = await Course.findById(request.params.courseId);
		if (!course) {
			next(new Error(ERRORS.COURSE_NOT_FOUND));
		}

		const context = {
			code: 200,
			message: "Course Fetched",
			data: {
				course,
			},
		};

		next(context);
	} catch (err: any) {
		next(err);
	}
}
