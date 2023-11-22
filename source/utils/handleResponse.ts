import { NextFunction, Request, Response } from "express";
import { ERRORS, HTTP_CODES, HTTP_PHRASES } from "../config/enums";

/**
 * Use a CENTRAL ERROR HANDLER
 * which also acts as a response sender
 */

export function handleResponse(
	context: any,
	request: Request,
	response: Response,
	next: NextFunction
) {
		/**
		 * For Successful cases
		 */
	if ([HTTP_CODES.OK, HTTP_CODES.Created].includes(context.code)) {
		return response.status(context.code).json({
			message: context.message,
			data: context.data,
		});
	} else {
		/**
		 * Determine the type of error, its origin 
		 * And send back appropriate response 
		 */
		console.error(`${request.method} ${request.originalUrl} ${context.toString()}`);

		let message: string = HTTP_PHRASES.InternalServerError;
		let code = HTTP_CODES.InternalServerError;
		let errStr = context.toString();

		if (errStr.includes(ERRORS.CourseNotFound)) {
			message = ERRORS.CourseNotFound;
			code = HTTP_CODES.NotFound;
		}

		if (
			errStr.includes("Cast to ObjectId failed") &&
			(errStr.includes(`for model "Courses"`) || errStr.includes(`at path "courseId"`))
		) {
			message = ERRORS.CourseNotFound;
			code = HTTP_CODES.NotFound;
		}

		if (errStr.includes("ValidationError:")) {
			if (errStr.includes("is required")) {
				message = ERRORS.MissingParams;
				code = HTTP_CODES.BadRequest;
			}

			if (
				errStr.includes("Cast to Number failed") &&
				(errStr.includes("duration") || errStr.includes("price"))
			) {
				message = ERRORS.InvalidDataType;
				code = HTTP_CODES.BadRequest;
			}

			if (errStr.includes("Cast to date failed")) {
				message = ERRORS.InvalidDataType;
				code = HTTP_CODES.BadRequest;
			}
		}

		return response.status(code).json({
			message,
		});
	}
}
