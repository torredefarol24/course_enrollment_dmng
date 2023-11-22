import { model, Schema } from "mongoose";
import { ENTITIES } from "../../config/enums";
import { ICourse } from "../../config/interface";

const schemaOpts = {
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	instructor: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
};

const courseSchema = new Schema<ICourse>(schemaOpts, { timestamps: true });
courseSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

export const Course = model(ENTITIES.Courses, courseSchema);
