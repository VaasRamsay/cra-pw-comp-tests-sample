interface HttpResponse<T> extends Response {
	parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
	const response: HttpResponse<T> = await fetch(request);

	try {
		// may error if there is no body
		response.parsedBody = await response.json();
	} catch (ex) {
		throw new Error("Parsing error");
	}

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response;
}

export async function get<T>(
	path: string,
	args: RequestInit = { method: "get" },
): Promise<HttpResponse<T>> {
	return await http<T>(new Request(path, args));
}
