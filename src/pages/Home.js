import React from "react";
import { Binary, List } from 'lucide-react';

import { useTranslation } from 'react-i18next';

import * as styles from "./Home.module.scss";
import LinkBox from "../components/LinkBox";
import { Helmet } from "react-helmet";

const HomePage = () => {
    const { t } = useTranslation();

    return ([
        <Helmet><title>Home | {t("site.title")}</title></Helmet>,
        <div className={styles.heroBox}>
            <div className={styles.layoutBox}>
                <span className={styles.heroPretitle}>{t("home.heroPretitle")}</span>
                <span className={styles.heroTitle}>{t("home.heroTitle")}</span>
                <span className={styles.heroSubtitle}>{t("home.heroSubtitle")}</span>
            </div>
        </div>,
        <main className={styles.categoryBox}>
            <div className={styles.layoutBox}>
                <span className={styles.title}>{t("tools.toolCategories")}</span>

                <div className={styles.flexList}>
                    <LinkBox to={"/tools"} text={t("tools.categories.everything")} icon={List} />
                    <LinkBox to={"/tools/cryptography"} text={t("tools.categories.cryptography")} icon={Binary} />
                    {/*<LinkBox to={"/tools/osm"} text={"OSM"} icon={Map} />*/}
                </div>
            </div>
        </main>
    ]);
}

export default HomePage;