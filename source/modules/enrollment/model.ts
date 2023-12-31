import { model, Schema } from "mongoose";
import { ENTITIES } from "../../config/enums";
import { IEnrollment } from "../../config/interface";

const schemaOpts = {
	studentName: {
		type: String,
		required: true,
	},
	enrollmentDate: {
		type: Date,
		required: true,
	},
	courseId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: ENTITIES.Courses,
	},
};

const enrSchema = new Schema<IEnrollment>(schemaOpts, { timestamps: true });
enrSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

export const Enrollment = model(ENTITIES.Enrollment, enrSchema);
