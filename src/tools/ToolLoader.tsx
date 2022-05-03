import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import prerenderedLoadable from "../helpers/prerenderedLoadable";
import NotFoundPage from "../pages/NotFound";

import * as styles from "../App.module.scss";
import { Trans } from "react-i18next";
import BoxMessage from "../components/BoxMessage";
import { AlertOctagon } from "lucide-react";


const HomePage = prerenderedLoadable(() => import('../pages/Home'));
const RotTool = prerenderedLoadable(() => import('./cyphers_and_cryptography/rot/RotTool'));
const Base64Tool = prerenderedLoadable(() => import('./encodings/base64/Base64Tool'));
const NumberBaseTool = prerenderedLoadable(() => import('./encodings/numberbase/NumberBaseTool'));
const URLEncodeTool = prerenderedLoadable(() => import('./encodings/urlencode/URLEncodeTool'));
const IPv4SubnettingTool = prerenderedLoadable(() => import('./networking/ipv4subnetting/IPv4SubnettingTool'));

type ErrorBoundaryProps = {
    resetFunction: () => void
}
class ToolErrorBoundary extends React.Component<React.PropsWithChildren<ErrorBoundaryProps>, {hasError: boolean}> {
    constructor(props: React.PropsWithChildren<ErrorBoundaryProps>) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
        return { hasError: true }; 
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error, errorInfo);
    }
    render() {

      if (this.state.hasError) {    
          // You can render any custom fallback UI    
          return <>
            <div className={styles.layoutBox}>
                <BoxMessage icon={<AlertOctagon/>}>
                    <b><Trans i18nKey={"system.errors.toolException.title"}>The tool encountered a fatal error.</Trans></b>
                    <p>
                        <Trans i18nKey={"system.errors.toolException.description"} />
                    </p>
                    <button onClick={() => this.props.resetFunction()}>Reset Tool and Retry</button>
                </BoxMessage>
            </div>
          </>;    
        }
      return this.props.children; 
    }
  }

const ToolLoader = () => {
    const {tool} = useParams();

    const [key, setKey] = useState(_.uniqueId("toolLoader_"))

    const forceReset = () => {
        setKey(_.uniqueId("toolLoader_"))
    }
    
    switch(tool) {
        case "test":
            return <ToolErrorBoundary resetFunction={forceReset} key={key}><HomePage/></ToolErrorBoundary>;

        case "rot":
            return <ToolErrorBoundary resetFunction={forceReset} key={key}><RotTool/></ToolErrorBoundary>;

        case "base64":
            return <ToolErrorBoundary resetFunction={forceReset} key={key}><Base64Tool/></ToolErrorBoundary>;

        case "numberbase":
            return <ToolErrorBoundary resetFunction={forceReset} key={key}><NumberBaseTool/></ToolErrorBoundary>;

        case "urlencode":
            return <ToolErrorBoundary resetFunction={forceReset} key={key}><URLEncodeTool/></ToolErrorBoundary>;

        case "ipv4subnetting":
            return <ToolErrorBoundary resetFunction={forceReset} key={key}><IPv4SubnettingTool/></ToolErrorBoundary>;

        default:
            return <NotFoundPage/>;
    }
}

export default ToolLoader;