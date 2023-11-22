import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { HTTP_CODES } from "../../config/enums";
import { TEST_ENDPOINTS } from "../../config/testVals";
import { testApp } from "../../main/tester";

chai.use(chaiHttp);

describe("Courses API :: Get Courses", () => {
	it("should fetch courses", async () => {
		const response = await chai.request(testApp).get(TEST_ENDPOINTS.COURSES.GET);
		chai.expect(response.status).to.eql(HTTP_CODES.OK);
	});
});
