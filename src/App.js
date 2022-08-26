import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import UploadVariants from "./screens/UploadVariants";
import UploadDetails from "./screens/UploadDetails";
import Search01 from "./screens/Search01";
import PageList from "./screens/PageList";
import YourCollection from "./components/YourCollection";

function App() {
	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<Page>
							<Home />
						</Page>
					)}
				/>
				<Route
					exact
					path="/upload-variants"
					render={() => (
						<Page>
							<UploadVariants />
						</Page>
					)}
				/>
				<Route
					exact
					path="/upload-details"
					render={(props) => (
						<Page>
							<UploadDetails {...props} />
						</Page>
					)}
				/>

				<Route
					exact
					path="/search01"
					render={() => (
						<Page>
							<Search01 />
						</Page>
					)}
				/>

				<Route
					exact
					path="/yourcollection"
					render={(props) => (
						<Page>
							<YourCollection {...props} />
						</Page>
					)}
				/>

				<Route
					exact
					path="/pagelist"
					render={() => (
						<Page>
							<PageList />
						</Page>
					)}
				/>
			</Switch>
		</Router>
	);
}

export default App;
