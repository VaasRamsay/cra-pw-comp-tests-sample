import moment from "moment";

export const PAGE_SIZE = 20;
export const TIME_LINE_LIMIT = 3;
export const MAX_LENGTH = 500;
export const DATE_FORMAT = moment.defaultFormat;

export const LIST_OF_APP_NAMES = [
	"Access Management",
	"Platform SSO",
	"Identity & Access",
];

export const STATUS_COLORS: any = {
	create: "#46D18B",
	update: "#5B98FE",
	delete: "#fe5b5d",
};

export const TIME_LINE_COLORS: any = {
	create: "green",
	update: "blue",
	delete: "red",
};

export const SUCCESSMESSAGES = {
	sucess: "Sucess",
};

export const ERRORMESSAGES = {
	server: "Could not load data from the server",
	error: "Error",
	json_parse: "JSON parse error",
	no_data: "Please try searching again",
	no_data_found: "No data found...",
};

export const TRANSPARENCY = {
	"100": "FF",
	"95": "F2",
	"90": "E6",
	"85": "D9",
	"80": "CC",
	"75": "BF",
	"70": "B3",
	"65": "A6",
	"60": "99",
	"55": "8C",
	"50": "80",
	"45": "73",
	"40": "66",
	"35": "59",
	"30": "4D",
	"25": "40",
	"20": "33",
	"15": "26",
	"10": "1A",
	"5": "0D",
	"0": "00",
};
