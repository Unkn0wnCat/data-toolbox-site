import React from "react";

import * as styles from "./About.module.scss";

import { useTranslation, Trans } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation();

    return ([
        <div>
            <div className={styles.layoutBox}>
                <h1>{t("about.title")}</h1>

                <p>{t("about.p1")}</p>

                <p>{t("about.p2")}</p>

                <h2>{t("about.morebyme")}</h2>

                <p><Trans i18nKey={"about.visitKevinKdev"}> <a href="https://kevink.dev"> </a> </Trans></p>
            </div>
        </div>
    ]);
}

export default AboutPage;