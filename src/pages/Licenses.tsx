import React from "react";

import * as styles from "./Licenses.module.scss";

import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

import text from "../licenses";

const LicensesPage = () => {
    const { t } = useTranslation();

    return <>
        <Helmet><title>{t("licenses.title")} | {t("site.title")}</title></Helmet>
        <main>
            <div className={styles.layoutBox}>
                <h1>{t("licenses.title")}</h1>

                <pre style={{wordWrap: "break-word", overflow: "hidden", lineBreak: "anywhere", whiteSpace: "break-spaces"}}>
                    {text}
                </pre>
            </div>
        </main>
        </>;
}

export default LicensesPage;