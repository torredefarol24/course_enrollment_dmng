import { NextFunction, Response } from "express";
import { Course } from "../model";

export async function createCourse(request: any, response: Response, next: NextFunction) {
	try {
		const course = request.body;
		const createdCourse: any = await Course.create(course);
		const context = {
			code: 201,
			message: "Course Created",
			data: {
				course: createdCourse,
			},
		};
		next(context);
	} catch (err: any) {
		next(err);
	}
}
