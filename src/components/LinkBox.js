import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import * as styles from "./LinkBox.module.scss";

const LinkBox = (props) => {
    return (!props.external ?
        <Link className={styles.linkBox + (props.small ? " "+styles.small : "") + (props.highlight ? " "+styles.highlight : "")} to={props.to}>
            <div className={styles.lbIcon}><props.icon/></div>
            <span className={styles.lbText}>{props.text}</span>
        </Link> :
        <a className={styles.linkBox + (props.small ? " "+styles.small : "") + (props.highlight ? " "+styles.highlight : "")} href={props.to}>
            <div className={styles.lbIcon}><props.icon/></div>
            <span className={styles.lbText}>{props.text}</span>
        </a>
    );
}

LinkBox.defaultProps = {
    "small": false,
    "highlight": false,
    "external": false
}

LinkBox.props = {
    "to": PropTypes.string,
    "text": PropTypes.string.isRequired,
    "icon": PropTypes.object.isRequired,
    "small": PropTypes.bool,
    "highlight": PropTypes.bool,
    "external": PropTypes.bool
};

export default LinkBox;