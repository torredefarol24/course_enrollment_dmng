import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import { apiV1 } from "../config/enums";
import { APP_CONF, DB_CONF } from "../config/env";
import { IEntityRouter } from "../config/interface";
import { CourseRouter } from "../modules/courses/routes";
import { EnrRouter } from "../modules/enrollment/routes";
import { handleResponse } from "../utils/handleResponse";

export class CourseEnrollmentApp {
	public api: express.Application;

	constructor() {
		/**
		 * Maintain the order of functions 
		 * Inside contructor to bootstrap successfully
		 */
		this.api = express();
		this.connectToDB();
		this.integrateMiddleware(this.api);
		this.integrateRoutes(this.api);
		this.listen(this.api);
	}

	private listen(app: express.Application) {
		try {
			app.listen(APP_CONF.PORT);
			console.log(`Listening on: ${APP_CONF.PORT}`);
		} catch (err: any) {
			console.error(`Failed to start: ${err}`);
		}
	}

	private integrateMiddleware(app: express.Application) {
		app.use(cors());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
	}

	private integrateRoutes(app: express.Application) {
		const routes: IEntityRouter[] = [CourseRouter, EnrRouter];
		routes.map((route: IEntityRouter) => {
			app.use(`${apiV1}/${route.entity}`, route.router);
		});
		app.use(handleResponse);
	}

	private async connectToDB() {
		try {
			await connect(DB_CONF.CONN_URL);
			console.log("Database Connection established");
		} catch (err: any) {
			console.error("Database Connection failed", err);
		}
	}
}
