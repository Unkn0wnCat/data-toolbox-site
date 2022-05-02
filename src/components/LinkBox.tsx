import React from "react";
import { Link } from "react-router-dom";

import * as styles from "./LinkBox.module.scss";

type Props = {
    to: string
    text: string
    icon: React.ReactNode
    small?: boolean
    highlight?: boolean
    external?: boolean
}

const LinkBox = (props: Props) => {
    return (!props.external ?
        <Link className={styles.linkBox + (props.small ? " "+styles.small : "") + (props.highlight ? " "+styles.highlight : "")} to={props.to}>
            <div className={styles.lbIcon}>{props.icon}</div>
            <span className={styles.lbText}>{props.text}</span>
        </Link> :
        <a className={styles.linkBox + (props.small ? " "+styles.small : "") + (props.highlight ? " "+styles.highlight : "")} href={props.to}>
            <div className={styles.lbIcon}>{props.icon}</div>
            <span className={styles.lbText}>{props.text}</span>
        </a>
    );
}

LinkBox.defaultProps = {
    "small": false,
    "highlight": false,
    "external": false
}

export default LinkBox;