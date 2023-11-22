import { NextFunction, Response } from "express";
import { Course } from "../model";

export async function getAllCourses(request: any, response: Response, next: NextFunction) {
	try {
		const limit = request.params.limit || 10;
		const page = request.params.page || 0;

		const courses = await Course.find()
			.sort({ createdAt: "desc" })
			.limit(limit)
			.skip(page * limit);

		const context = {
			code: 200,
			message: "Courses Fetched",
			data: {
				courses,
			},
		};
		next(context);
	} catch (err: any) {
		next(err);
	}
}
