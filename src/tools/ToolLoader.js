import React, { lazy } from "react";
import { useParams } from "react-router";
import NotFoundPage from "../pages/NotFound";

const HomePage = lazy(() => import('../pages/Home'));

const ToolLoader = () => {
    const {tool} = useParams();
    
    switch(tool) {
        case "test":
            return <HomePage/>;

        default:
            return <NotFoundPage/>;
    }
}

export default ToolLoader;