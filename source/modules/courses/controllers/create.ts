import { NextFunction, Response } from "express";
import { HTTP_CODES, HTTP_PHRASES } from "../../../config/enums";
import { ICourse } from "../../../config/interface";
import { Course } from "../model";

export async function createCourse(request: any, response: Response, next: NextFunction) {
	try {
		const course: ICourse = request.body;
		const createdCourse: ICourse = await Course.create(course);

		const context = {
			code: HTTP_CODES.Created,
			message: HTTP_PHRASES.Created,
			data: {
				course: createdCourse,
			},
		};
		next(context);
	} catch (err: any) {
		next(err);
	}
}
