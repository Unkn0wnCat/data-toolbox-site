import React from "react";
import { Frown } from 'lucide-react';

import * as styles from "./NotFound.module.scss";

import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
    const { t } = useTranslation();

    return ([
        <Helmet><title>404: {t("system.notfound")}</title></Helmet>,
        <div>
            <div className={styles.layoutBox}>
                <h1>404: {t("system.notfound")} <Frown/></h1>

            </div>
        </div>
    ]);
}

export default NotFoundPage;