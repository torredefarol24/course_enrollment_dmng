import { NextFunction, Request, Response } from "express";
import { ERRORS } from "../config/enums";

export function handleResponse(
	context: any,
	request: Request,
	response: Response,
	next: NextFunction
) {
	if ([200, 201].includes(context.code)) {
		return response.status(context.code).json({
			message: context.message,
			data: context.data,
		});
	} else {
		console.error(`${request.method} ${request.originalUrl} ${context.toString()}`);

		let message: string = ERRORS.SOMETHING_WENT_WRONG;
		let code = 500;
		let errStr = context.toString();

		if (errStr.includes(ERRORS.COURSE_NOT_FOUND)) {
			message = ERRORS.COURSE_NOT_FOUND;
			code = 404;
		}

		if (
			errStr.includes("Cast to ObjectId failed") &&
			(errStr.includes(`for model "Courses"`) || errStr.includes(`at path "courseId"`))
		) {
			message = ERRORS.COURSE_NOT_FOUND;
			code = 404;
		}

		if (errStr.includes("ValidationError:")) {
			if (errStr.includes("is required")) {
				message = ERRORS.BAD_REQEUST;
				code = 400;
			}

			if (
				errStr.includes("Cast to Number failed") &&
				(errStr.includes("duration") || errStr.includes("price"))
			) {
				message = ERRORS.BAD_REQEUST;
				code = 400;
			}

			if (errStr.includes("Cast to date failed")) {
				message = ERRORS.BAD_REQEUST;
				code = 400;
			}
		}

		return response.status(code).json({
			message,
		});
	}
}
