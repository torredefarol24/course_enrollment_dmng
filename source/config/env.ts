import { join } from "path";
require("dotenv").config({
	path: join(__dirname + "../../../", ".env"),
});

export const APP_CONF = {
	PORT: process.env.PORT,
	TEST_PORT: 13131
};

export const DB_CONF = {
	CONN_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
