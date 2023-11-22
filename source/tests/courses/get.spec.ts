import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { ENTITIES, HTTP_CODES } from "../../config/enums";
import { testApp } from "../../main/tester";
import { getEndpoints } from "../endpoints";

chai.use(chaiHttp);
const route = getEndpoints(ENTITIES.Courses).GetAll;

describe("Courses API :: Get All Courses", () => {
	it("should get all courses", async () => {
		const response = await chai.request(testApp).get(route);
		chai.expect(response.status).to.eql(HTTP_CODES.OK);
	});
});
