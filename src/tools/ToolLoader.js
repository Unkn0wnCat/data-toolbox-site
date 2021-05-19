import React from "react";
import { useParams } from "react-router";
import prerenderedLoadable from "../helpers/prerenderedLoadable";
import NotFoundPage from "../pages/NotFound";


const HomePage = prerenderedLoadable(() => import('../pages/Home'));
const RotTool = prerenderedLoadable(() => import('./cyphers_and_cryptography/rot/RotTool'));

const ToolLoader = () => {
    const {tool} = useParams();
    
    switch(tool) {
        case "test":
            return <HomePage/>;

        case "rot":
            return <RotTool/>;

        default:
            return <NotFoundPage/>;
    }
}

export default ToolLoader;