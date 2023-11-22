import { IRouter } from "express";
import { Schema } from "mongoose";

export interface IEntityRouter {
	entity: string;
	router: IRouter;
}

export interface ICourse {
	title: string;
	description: string;
	instructor: string;
	duration: Number;
	price: Number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IEnrollment {
	studentName: string;
	enrollmentDate: Date;
	courseId: Schema.Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
}
