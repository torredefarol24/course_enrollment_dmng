import { apiV1, ENTITIES } from "../config/enums";

export function getEndpoints(entity: ENTITIES) {
	return {
		Create: `${apiV1}/${entity}`,
		GetAll: `${apiV1}/${entity}`,
		GetById: (id: string) => `${apiV1}/${entity}/${id}`,
	};
}
