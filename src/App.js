import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
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
            <Routes>
              <Route path="/" element={<HomePage/>} />

              <Route path="/tools" element={<ToolsPage/>} />
              <Route path="/tools/:category" element={<ToolsPage/>} />

              <Route path="/tool/:tool" element={<ToolLoader/>} />

              <Route path="/about" element={<AboutPage/>} />
              
              <Route path="*" element={<NotFoundPage/>} />
            </Routes>
          </Suspense>
          <footer className={styles.footer}>CC-BY-4.0 Kevin Kandlbinder | v{version} | <a href="//kevink.dev/legal/about">Impressum</a></footer>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
