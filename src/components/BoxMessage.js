import React from "react";
import PropTypes from 'prop-types';

import * as styles from "./BoxMessage.module.scss";

const BoxMessage = (props) => {
    return (
        <div className={styles.boxMessage + " " + styles[props.color] + " " + (props.hideInPlace ? styles.hideInPlace : "")}>
            {props.icon ? <div className={styles.icon}><props.icon/></div> : null}
            <span className={styles.content}>{props.children}</span>
        </div>
    );
}

BoxMessage.defaultProps = {
    "color": "blue",
    "hideInPlace": false
}

BoxMessage.props = {
    "children": PropTypes.array.isRequired,
    "icon": PropTypes.object,
    "color": PropTypes.string,
    "hideInPlace": PropTypes.bool
};

export default BoxMessage;