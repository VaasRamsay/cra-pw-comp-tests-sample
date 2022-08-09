import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { createMemoryHistory, createBrowserHistory, LocationListener } from "history";
import { fakeServer } from './api/fakes/server'

// figure out if we are in local dev mode or running in a container
const isolatedDevRoot = document.querySelector("#_microfrontend_root");
const isolatedMode = process.env.NODE_ENV === "development" && isolatedDevRoot != null;

// define and expose mount

export interface frontEndIntegration {
	onNavigate?: LocationListener;
	initialPath?: string;
	fallback?: React.FC;
}

const mount = (el: Element | null, { onNavigate, initialPath, fallback }: frontEndIntegration) => {
	const initialEntry = initialPath || "";

	const history = isolatedMode
		? createBrowserHistory()
		: createMemoryHistory({ initialEntries: [initialEntry] });

	if (onNavigate) {
		history.listen(onNavigate);
	}

	// Always turn on the miragejs fake server for testing purposes 
	// if (process.env.REACT_APP_API_MODE === "fake" && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
		fakeServer({ environment: process.env.NODE_ENV });
	// }

	ReactDOM.render(
		<React.StrictMode>
			<Router history={history}>
				<App isolatedMode={isolatedMode} />
			</Router>
		</React.StrictMode>,
		el,
	);

	return {
		onParentNavigate({ pathname: nextPathname }: Location) {
			const { pathname } = history.location;

			if (pathname !== nextPathname) {
				history.push(nextPathname);
			}
		},
	};
};

// if local dev, do a local mount
if (isolatedMode) {
	require("./index.scss");
	mount(isolatedDevRoot, {});
}

export { mount };
