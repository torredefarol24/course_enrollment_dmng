import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { ENTITIES, HTTP_CODES } from "../../config/enums";
import { testApp } from "../../main/tester";
import { getEndpoints } from "../endpoints";

chai.use(chaiHttp);

const route = getEndpoints(ENTITIES.Courses).Create;
const _courseMissingParams = {
	title: "something",
	desc: "another",
};
const _courseBadDuration = {
	title: "New title",
	description: "The other description",
	instructor: "Ron",
	duration: "insert string here",
	price: 30,
};
const _courseBadPrice = {
	title: "New title",
	description: "The other description",
	instructor: "Ron",
	duration: 240,
	price: "bad value",
};
const _courseValid = {
	title: "TEST_New title",
	description: "TEST_The other description",
	instructor: "TEST_Ron",
	duration: 240,
	price: 49,
};

describe("Courses API :: Create Course", () => {
	it("should check for missing fields", async () => {
		const response = await chai.request(testApp).post(route).send(_courseMissingParams);
		chai.expect(response.status).to.eql(HTTP_CODES.BadRequest);
	});

	it("should check for correct data types [duration]", async () => {
		const response = await chai.request(testApp).post(route).send(_courseBadDuration);
		chai.expect(response.status).to.eql(HTTP_CODES.BadRequest);
	});

	it("should check for correct data types [price]", async () => {
		const response = await chai.request(testApp).post(route).send(_courseBadPrice);
		chai.expect(response.status).to.eql(HTTP_CODES.BadRequest);
	});

	it("should create course with correct fields", async () => {
		const response = await chai.request(testApp).post(route).send(_courseValid);
		chai.expect(response.status).to.eql(HTTP_CODES.Created);
	});
});
