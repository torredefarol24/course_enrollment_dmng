import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { TEST_CONF } from "../../config/testVals";
import { testApp } from "../../main/tester";

chai.use(chaiHttp);

describe("Enrollment API :: Create Enrollment :: Validate Request Body", () => {
	it("should check for missing fields", async () => {
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.ENROLLMENT.CREATE).send({
			stdeutns: "something",
		});
		chai.expect(response.status).to.eql(400);
	});

	it("should check for correct data value [enrollmentDate]", async () => {
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.ENROLLMENT.CREATE).send({
			studentName: "Tom",
			courseId: "655d92d7b69512f79e5f103c",
			enrollmentDate: "2023-11-22T35:43:57.264Z",
		});
		chai.expect(response.status).to.eql(400);
	});

	it("should check for existing courses before creating Enrollment", async () => {
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.ENROLLMENT.CREATE).send({
			studentName: "Tom",
			courseId: "fauty Id",
			enrollmentDate: "2023-11-22T05:43:57.264Z",
		});
		chai.expect(response.status).to.eql(404);
	});

	it("should create Enrollment with correct params", async () => {
		const createCourseResp = await chai
			.request(testApp)
			.post(TEST_CONF.ENDPOINTS.COURSES.CREATE)
			.send({
				title: "New title",
				description: "The other description",
				instructor: "Ron",
				duration: 240,
				price: 49,
			});
		const courseId = createCourseResp.body.data.course._id;
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.ENROLLMENT.CREATE).send({
			studentName: "Tom",
			courseId,
			enrollmentDate: "2023-11-22T05:43:57.264Z",
		});
		chai.expect(response.status).to.eql(201);
	});
});
