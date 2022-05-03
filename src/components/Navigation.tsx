import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';

import * as styles from "./Navigation.module.scss";
import { Globe, Info, List, RefreshCw } from "lucide-react";
import LanguageChooser from "./LanguageChooser";
import ServiceWorkerAPI from "../services/serviceWorkers"

const Navigation = () => {
    const { t } = useTranslation();

    const [langChooserActive, setLangChooserActive] = useState(false);
    const updateAvailable = ServiceWorkerAPI.useUpdatePending()

    return (
        <header className={styles.navigation}>
            <nav>
                <Link to={"/"}>{t("site.title")}</Link>
                <span className={styles.spacer}></span>
                <Link to={"/tools"} title={t("site.navigation.tools")}><List/></Link>
                <Link to={"/about"} title={t("site.navigation.about")}><Info/></Link>
                <Link to={"#"} onClick={() => {setLangChooserActive(true)}} title="Change Language"><Globe/></Link>
                {updateAvailable && <Link to={"#"} onClick={() => {ServiceWorkerAPI.forceUpdate()}} title="Update Available"><RefreshCw /></Link>}

                <LanguageChooser active={langChooserActive} onDone={() => {setLangChooserActive(false)}} />
            </nav>
        </header>
    );
}

export default Navigation;