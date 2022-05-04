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
import {version} from "../package.json"

const HomePage = React.lazy(() => import('./pages/Home'));
const ToolsPage = React.lazy(() => import('./pages/Tools'));
const AboutPage = React.lazy(() => import('./pages/About'));
const SettingsPage = React.lazy(() => import('./pages/Settings'));
const LicensesPage = React.lazy(() => import('./pages/Licenses'));

function App() {

  return (
    <Suspense fallback={<h1>Kevin's Data-Toolbox is loading...</h1>}>
      <Router>
        <div className={styles.appContainer}>
          <Navigation/>
          <Suspense fallback={<div className={styles.layoutBox}><h1>Kevin's Data-Toolbox is loading...</h1></div>}>
            <Routes>
              <Route path="/" element={<HomePage/>} />

              <Route path="/tools" element={<ToolsPage/>} />
              <Route path="/tools/:category" element={<ToolsPage/>} />

              <Route path="/tool/:tool" element={<ToolLoader/>} />

              <Route path="/about" element={<AboutPage/>} />

              <Route path="/settings" element={<SettingsPage/>} />

              <Route path="/licenses" element={<LicensesPage/>} />
              
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
