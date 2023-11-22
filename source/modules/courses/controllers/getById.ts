import { NextFunction, Response } from "express";
import { ERRORS, HTTP_CODES, HTTP_PHRASES } from "../../../config/enums";
import { ICourse } from "../../../config/interface";
import { Course } from "../model";

export async function getCourseById(request: any, response: Response, next: NextFunction) {
	try {
		const course: ICourse | null = await Course.findById(request.params.courseId);
		if (!course) {
			next(new Error(ERRORS.CourseNotFound));
		}

		const context = {
			code: HTTP_CODES.OK,
			message: HTTP_PHRASES.OK,
			data: {
				course,
			},
		};

		next(context);
	} catch (err: any) {
		next(err);
	}
}
