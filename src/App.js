import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from "./components/Navigation";

import * as styles from "./App.module.scss";
import NotFoundPage from "./pages/NotFound";
import ToolLoader from "./tools/ToolLoader";

const HomePage = lazy(() => import('./pages/Home'));
const ToolsPage = lazy(() => import('./pages/Tools'));
const AboutPage = lazy(() => import('./pages/About'));

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
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
