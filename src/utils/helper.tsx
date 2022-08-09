import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { ERRORMESSAGES, LIST_OF_APP_NAMES, PAGE_SIZE } from "./constants";
import { OrganisationAutocompleteInterface } from "api/OrganisationAPI";

export const parseJSON = (data: string) => {
	try {
		return JSON.parse(data);
	} catch (e) {
		console.log(ERRORMESSAGES.json_parse);
		return null;
	}
};

// Split string on UpperCase Characters
export const convertToWords = (data: string) => {
	try {
		return data.split(/(?=[A-Z])/).join(" ");
	} catch (e) {
		console.log(ERRORMESSAGES.error);
		return data;
	}
};

// calculate offset, here pageSize is the limit
export const calculateOffset = (pageNumber: number, pageSize: number) => {
	return (pageNumber - 1) * pageSize;
};

export const convertUtcToLocal = (date: string) => {
	return moment.utc(date).local().format("dddd, MMMM Do YYYY[\n]hh:mm:ss A");
};

export const determineSearch = (
	data: string,
	organisationData: OrganisationAutocompleteInterface[],
) => {
	if (data === "") return { Offset: 0, Limit: PAGE_SIZE };
	data = data.toLowerCase();

	if (matchDataInList(data, LIST_OF_APP_NAMES)) {
		return { application: data, Offset: 0, Limit: PAGE_SIZE };
	}

	if (
		matchDataInList(
			data,
			organisationData.map((o) => o.value),
		)
	) {
		return { organisation: data, Offset: 0, Limit: PAGE_SIZE };
	}

	if (/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(data)) {
		return { user: data, Offset: 0, Limit: PAGE_SIZE };
	}

	return { message: data, Offset: 0, Limit: PAGE_SIZE };
};

const matchDataInList = (data: string, list: any) => {
	return list?.some((item: string) => item.toLowerCase() === data);
};

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobileMode = (width: number) => {
		return windowDimensions.width <= width;
	};

	return [isMobileMode];
};

export function useKeyPress(callback: () => void, keyCodes: string[]): void {
	const handler = useCallback(
		({ code }: KeyboardEvent) => {
			if (keyCodes.includes(code)) {
				callback();
			}
		},
		[callback, keyCodes],
	);

	useEffect(() => {
		window.addEventListener("keydown", handler);
		return () => {
			window.removeEventListener("keydown", handler);
		};
	}, [handler]);
}
