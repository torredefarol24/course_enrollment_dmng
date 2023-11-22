import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { TEST_CONF } from "../../config/testVals";
import { testApp } from "../../main/tester";

chai.use(chaiHttp);

describe("Courses API :: Create Course :: Validate Request Body", () => {
	it("should check for missing fields", async () => {
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.COURSES.CREATE).send({
			title: "something",
			desc: "another",
		});
		chai.expect(response.status).to.eql(400);
	});

	it("should check for correct data types [duration]", async () => {
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.COURSES.CREATE).send({
			title: "New title",
			description: "The other description",
			instructor: "Ron",
			duration: "insert string here",
			price: 30,
		});
		chai.expect(response.status).to.eql(400);
	});

	it("should check for correct data types [price]", async () => {
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.COURSES.CREATE).send({
			title: "New title",
			description: "The other description",
			instructor: "Ron",
			duration: 240,
			price: "bad value",
		});
		chai.expect(response.status).to.eql(400);
	});

	it("should create course with correct fields", async () => {
		const response = await chai.request(testApp).post(TEST_CONF.ENDPOINTS.COURSES.CREATE).send({
			title: "New title",
			description: "The other description",
			instructor: "Ron",
			duration: 240,
			price: 49,
		});
		chai.expect(response.status).to.eql(201);
	});
});
