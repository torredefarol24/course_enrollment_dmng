import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { TEST_CONF } from "../../config/testVals";
import { testApp } from "../../main/tester";

chai.use(chaiHttp);

describe("Courses API :: Get Course by Id", () => {
	it("should not fetch course that doesn't exist", async () => {
		const response = await chai
			.request(testApp)
			.get(TEST_CONF.ENDPOINTS.COURSES.GET_BY_ID("faulty id"));
		chai.expect(response.status).to.eql(404);
	});

	it("should fetch course that exists", async () => {
		const createResp = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.COURSES.CREATE).send({
			title: "New title",
			description: "The other description",
			instructor: "Ron",
			duration: 240,
			price: 49,
		});
		const courseId = createResp.body.data.course._id;
		const response = await chai
			.request(testApp)
			.get(TEST_CONF.ENDPOINTS.COURSES.GET_BY_ID(courseId));
		chai.expect(response.status).to.eql(200);
	});
});
