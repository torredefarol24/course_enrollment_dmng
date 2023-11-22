import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { ENTITIES, HTTP_CODES } from "../../config/enums";
import { testApp } from "../../main/tester";
import { getEndpoints } from "../endpoints";

chai.use(chaiHttp);
const _courseValid = {
	title: "TEST_New title",
	description: "TEST_The other description",
	instructor: "TEST_Ron",
	duration: 240,
	price: 49,
};

const createRoute = getEndpoints(ENTITIES.Courses).Create;
const getByIdRoute = (id: string) => getEndpoints(ENTITIES.Courses).GetById(id);

describe("Courses API :: Get Course By Id", () => {
	it("should not fetch course that doesn't exist", async () => {
		const response = await chai.request(testApp).get(getByIdRoute("random-wrong-id"));
		chai.expect(response.status).to.eql(HTTP_CODES.NotFound);
	});

	it("should fetch course that exists", async () => {
		const createResp = await chai.request(testApp).post(createRoute).send(_courseValid);
		const courseId = createResp.body.data.course._id;
		const response = await chai.request(testApp).get(getByIdRoute(courseId));
		chai.expect(response.status).to.eql(HTTP_CODES.OK);
	});
});
