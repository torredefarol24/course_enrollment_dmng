import { NextFunction, Response } from "express";
import { HTTP_CODES, HTTP_PHRASES } from "../../../config/enums";
import { ICourse } from "../../../config/interface";
import { Course } from "../model";

function getFilter(query: any) {
	const priceFilter = query.price || undefined;
	const durationFilter = query.duration || undefined;
	const instructorFilter = query.instructor || undefined;

	let filter = {};
	if (priceFilter) {
		filter = { ...filter, price: priceFilter };
	}
	if (durationFilter) {
		filter = { ...filter, duration: durationFilter };
	}
	if (instructorFilter) {
		filter = { ...filter, instructor: instructorFilter };
	}
	return filter;
}

export async function getAllCourses(request: any, response: Response, next: NextFunction) {
	try {
		const limit = request.query.limit || 10;
		const page = request.query.page || 0;

		const courses: ICourse[] = await Course.find(getFilter(request.query))
			.sort({ createdAt: "desc" })
			.limit(limit)
			.skip(page * limit);

		const context = {
			code: HTTP_CODES.OK,
			message: HTTP_PHRASES.OK,
			data: {
				courses,
				filter: getFilter(request.query),
			},
		};
		next(context);
	} catch (err: any) {
		next(err);
	}
}
