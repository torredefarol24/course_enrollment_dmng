import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { ENTITIES, HTTP_CODES } from "../../config/enums";
import { testApp } from "../../main/tester";
import { getEndpoints } from "../endpoints";

chai.use(chaiHttp);

const _enrMissingParams = {
	stdeutns: "something",
};
const _enrBadDate = {
	studentName: "Tom",
	courseId: "655d92d7b69512f79e5f103c",
	enrollmentDate: "2023-11-22T35:43:57.264Z",
};
const _enrBadCourseId = {
	studentName: "Tom",
	courseId: "fautyId",
	enrollmentDate: "2023-11-22T05:43:57.264Z",
};
const _enrValid = (id: string) => {
	return {
		studentName: "TEST_Tom",
		courseId: id,
		enrollmentDate: "2023-11-22T05:43:57.264Z",
	};
};
const _courseValid = {
	title: "TEST_New title",
	description: "TEST_The other description",
	instructor: "TEST_Ron",
	duration: 240,
	price: 49,
};

const route = getEndpoints(ENTITIES.Enrollment).Create;
const courseCreateRoute = getEndpoints(ENTITIES.Courses).Create;

describe("Enrollment API :: Create Enrollment", () => {
	it("should check for missing fields", async () => {
		const response = await chai.request(testApp).post(route).send(_enrMissingParams);
		chai.expect(response.status).to.eql(HTTP_CODES.BadRequest);
	});

	it("should check for correct data types [date]", async () => {
		const response = await chai.request(testApp).post(route).send(_enrBadDate);
		chai.expect(response.status).to.eql(HTTP_CODES.BadRequest);
	});

	it("should check for existing courses", async () => {
		const response = await chai.request(testApp).post(route).send(_enrBadCourseId);
		chai.expect(response.status).to.eql(HTTP_CODES.NotFound);
	});

	it("should create course with correct fields", async () => {
		const createCourseResp = await chai.request(testApp).post(courseCreateRoute).send(_courseValid);
		const courseId = createCourseResp.body.data.course._id;
		const response = await chai.request(testApp).post(route).send(_enrValid(courseId));
		chai.expect(response.status).to.eql(HTTP_CODES.Created);
	});
});
