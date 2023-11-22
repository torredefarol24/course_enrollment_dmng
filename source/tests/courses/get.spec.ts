import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import { TEST_CONF } from "../../config/testVals";
import { testApp } from "../../main/tester";

chai.use(chaiHttp);

describe("Courses API :: Get Courses", () => {
	it("should fetch courses", async () => {
		const response = await chai.request(testApp).get(TEST_CONF.ENDPOINTS.COURSES.GET);
		chai.expect(response.status).to.eql(200);
	});
});
