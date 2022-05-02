import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';

import * as styles from "./LanguageChooser.module.scss";

type Props = {
    active?: boolean
    onDone: () => void
}

const LanguageChooser = (props: Props) => {
    const { t, i18n } = useTranslation();

    return ReactDOM.createPortal(
        <div className={styles.lChooser + " " + (props.active ? styles.active : "")}>
            <div>
                <span className={styles.title}>{t("system.language")}</span>
                <Link to={"#"} onClick={() => {i18n.changeLanguage("en"); props.onDone()}}>English</Link>
                <Link to={"#"} onClick={() => {i18n.changeLanguage("de"); props.onDone()}}>Deutsch</Link>
            </div>
        </div>,
        document.body
    );
}

export default LanguageChooser;

