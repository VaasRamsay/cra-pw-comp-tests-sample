import { API } from "./API";
import { get } from "./Config";

const BASE_URL = 'http://localhost:5000'; // Hard-coding it for now, ideally should pass through process.env.REACT_APP_API_BASE;

export interface OrganisationInterface {
	publicId: string;
	name: string;
}

export interface OrganisationAutocompleteInterface {
	label: string;
	value: string;
}

export class OrganisationAPI implements API {
	getResult = async () => {
		const orgs = await get<OrganisationInterface[]>(`${BASE_URL}/Organisation`);
		return orgs.parsedBody?.map((org) => {
			return { label: org.name, value: org.name };
		}) as OrganisationAutocompleteInterface[];
	};
}
