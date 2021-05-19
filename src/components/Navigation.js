import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';

import * as styles from "./Navigation.module.scss";
import { Globe } from "lucide-react";
import LanguageChooser from "./LanguageChooser";

const Navigation = () => {
    const { t } = useTranslation();

    const [langChooserActive, setLangChooserActive] = useState(false);

    return (
        <div className={styles.navigation}>
            <nav>
                <Link to={"/"}>{t("site.title")}</Link>
                <span className={styles.spacer}></span>
                <Link to={"/tools"}>{t("site.navigation.tools")}</Link>
                <Link to={"/about"}>{t("site.navigation.about")}</Link>
                <Link to={"#"} onClick={() => {setLangChooserActive(true)}}><Globe/></Link>
                <LanguageChooser active={langChooserActive} onDone={() => {setLangChooserActive(false)}} />
            </nav>
        </div>
    );
}

export default Navigation;