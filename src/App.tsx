import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import "./App.scss";

const Audit = lazy(() => import("./pages/Audit"));

interface props {
	isolatedMode: boolean;
}

const App: React.FC<props> = ({ isolatedMode }) => {
	return (
		<Suspense fallback={<Spin size="default" />}>
			<Switch>
				<Route path="/support/audit" component={Audit} />
				{isolatedMode && (
					<Route path="/" exact>
						<Redirect to="/support/audit" />
					</Route>
				)}
			</Switch>
		</Suspense>
	);
};

export default App;
