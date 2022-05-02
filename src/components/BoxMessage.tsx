import React from "react";

import * as styles from "./BoxMessage.module.scss";

type Props = {
    color: "red"
    hideInPlace?: boolean
    icon?: React.ReactNode
}

const BoxMessage = (props: React.PropsWithChildren<Props>) => {
    return (
        <div className={styles.boxMessage + " " + styles[props.color] + " " + (props.hideInPlace ? styles.hideInPlace : "")}>
            {props.icon ? <div className={styles.icon}>{props.icon}</div> : null}
            <span>{props.children}</span>
        </div>
    );
}

BoxMessage.defaultProps = {
    "color": "red",
    "hideInPlace": false
}

export default BoxMessage;