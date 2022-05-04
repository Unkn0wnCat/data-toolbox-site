import { ChevronRight } from "lucide-react";
import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { version } from "../../package.json";

import ServiceWorkerAPI from "../services/serviceWorkers";

import * as styles from "./Settings.module.scss";

const Settings = () => {
    const {t} = useTranslation();
    const {checkingForUpdate, checkForUpdate} = ServiceWorkerAPI.useCheckUpdate()

    return <>
        <Helmet><title>{t("settings.title")} | {t("site.title")}</title></Helmet>
        <div className={styles.layoutBox}>
            <h1>{t("settings.title")}</h1>
            
            <div className={styles.settingsSection}>
                <span className={styles.sectionHeader}>{t("settings.version")}</span>

                <div>
                    <span>{t("settings.currentVersion")}: {version}</span>{" "}
                    {!ServiceWorkerAPI.serviceWorkerAvailable() && <span>{t("settings.offlineUnavailable")}</span>}
                    {ServiceWorkerAPI.serviceWorkerAvailable() && (<button onClick={() => {checkForUpdate()}} disabled={checkingForUpdate ? true : undefined}>{checkingForUpdate ? t("settings.checkingForUpdate") : t("settings.checkForUpdate")}</button>)}
                </div>
            </div>

            <div className={styles.settingsSection}>
                <span className={styles.sectionHeader}>{t("settings.about")}</span>

                <Link to={"/about"}><span>{t("about.title")}</span><ChevronRight/></Link>

                <Link to={"/licenses"}><span>{t("licenses.title")}</span><ChevronRight/></Link>

                <a href={"https://github.com/Unkn0wnCat/data-toolbox-site"} target={"_blank"} rel="noreferrer"><span>{t("settings.source")}</span><ChevronRight/></a>
            </div>
        </div>
    </>;   
}

export default Settings;