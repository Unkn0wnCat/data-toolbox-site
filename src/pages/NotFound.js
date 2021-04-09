import React from "react";
import { Frown } from 'react-feather';

import * as styles from "./NotFound.module.scss";

import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const { t } = useTranslation();

    return ([
        <div>
            <div className={styles.layoutBox}>
                <h1>{t("system.notfound")} <Frown/></h1>

            </div>
        </div>
    ]);
}

export default NotFoundPage;