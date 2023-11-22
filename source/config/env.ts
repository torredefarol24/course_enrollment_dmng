import { config } from "dotenv";
import { join } from "path";

config({
	path: join(__dirname + "../../../", ".env"),
});

export const APP_CONF = {
	PORT: process.env.PORT,
};

export const DB_CONF = {
	CONN_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
