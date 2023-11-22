import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { HTTP_CODES } from "../../config/enums";
import { TEST_ENDPOINTS } from "../../config/testVals";
import { testApp } from "../../main/tester";

chai.use(chaiHttp);

describe("Enrollment API :: Create Enrollment :: Validate Request Body", () => {
	it("should check for missing fields", async () => {
		const response = await chai.request(testApp).post(TEST_ENDPOINTS.ENROLLMENT.CREATE).send({
			stdeutns: "something",
		});
		chai.expect(response.status).to.eql(HTTP_CODES.BadRequest);
	});

	it("should check for correct data value [enrollmentDate]", async () => {
		const response = await chai.request(testApp).post(TEST_ENDPOINTS.ENROLLMENT.CREATE).send({
			studentName: "Tom",
			courseId: "655d92d7b69512f79e5f103c",
			enrollmentDate: "2023-11-22T35:43:57.264Z",
		});
		chai.expect(response.status).to.eql(HTTP_CODES.BadRequest);
	});

	it("should check for existing courses before creating Enrollment", async () => {
		const response = await chai.request(testApp).post(TEST_ENDPOINTS.ENROLLMENT.CREATE).send({
			studentName: "Tom",
			courseId: "fautyId",
			enrollmentDate: "2023-11-22T05:43:57.264Z",
		});
		chai.expect(response.status).to.eql(HTTP_CODES.NotFound);
	});

	it("should create Enrollment with correct params", async () => {
		const createCourseResp = await chai.request(testApp).post(TEST_ENDPOINTS.COURSES.CREATE).send({
			title: "New title",
			description: "The other description",
			instructor: "Ron",
			duration: 240,
			price: 49,
		});
		const courseId = createCourseResp.body.data.course._id;
		const response = await chai.request(testApp).post(TEST_ENDPOINTS.ENROLLMENT.CREATE).send({
			studentName: "TEST_Tom",
			courseId,
			enrollmentDate: "2023-11-22T05:43:57.264Z",
		});
		chai.expect(response.status).to.eql(HTTP_CODES.Created);
	});
});
