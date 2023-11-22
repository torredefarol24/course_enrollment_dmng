import { NextFunction, Response } from "express";
import { Enrollment } from "../model";

export async function createEnrollment(request: any, response: Response, next: NextFunction) {
	try {
		const enr = request.body;
		const createdENR: any = await Enrollment.create(enr);
		const context = {
			code: 201,
			message: "Enrollment Created",
			data: {
				enr: createdENR,
			},
		};
		next(context);
	} catch (err: any) {
		next(err);
	}
}
