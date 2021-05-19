import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from "./components/Navigation";

import * as styles from "./App.module.scss";
import NotFoundPage from "./pages/NotFound";
import ToolLoader from "./tools/ToolLoader";
import prerenderedLoadable from "./helpers/prerenderedLoadable";
import {version} from "../package.json"

const HomePage = prerenderedLoadable(() => import('./pages/Home'));
const ToolsPage = prerenderedLoadable(() => import('./pages/Tools'));
const AboutPage = prerenderedLoadable(() => import('./pages/About'));

function App() {

  return (
    <Suspense fallback="Kevin's Data-Toolbox is loading...">
      <Router>
        <div className={styles.appContainer}>
          <Navigation/>
          <Suspense fallback="Kevin's Data-Toolbox is loading...">
            <Switch>
              <Route path="/about" component={AboutPage} />
              <Route path="/tools/:category?" component={ToolsPage} />
              <Route path="/tool/:tool" component={ToolLoader} />
              <Route path="/" exact component={HomePage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Suspense>
          <footer className={styles.footer}>CC-BY-4.0 Kevin Kandlbinder | v{version} | <a href="//kevink.dev/legal/about">Impressum</a></footer>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
