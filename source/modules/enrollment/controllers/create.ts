import { NextFunction, Response } from "express";
import { HTTP_CODES, HTTP_PHRASES } from "../../../config/enums";
import { IEnrollment } from "../../../config/interface";
import { Enrollment } from "../model";

export async function createEnrollment(request: any, response: Response, next: NextFunction) {
	try {
		const enr: IEnrollment = request.body;
		const createdENR: IEnrollment = await Enrollment.create(enr);

		const context = {
			code: HTTP_CODES.Created,
			message: HTTP_PHRASES.Created,
			data: {
				enr: createdENR,
			},
		};
		next(context);
	} catch (err: any) {
		next(err);
	}
}
