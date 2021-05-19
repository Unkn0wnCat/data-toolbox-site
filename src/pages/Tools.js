import React from "react";
import { useParams } from "react-router-dom";
import * as icons from 'lucide-react';

import { useTranslation } from 'react-i18next';

import * as styles from "./Tools.module.scss";
import LinkBox from "../components/LinkBox";

import { tools } from "../tools/tools.json";
import { Helmet } from "react-helmet";

const ToolsPage = () => {
    const { t } = useTranslation();

    let { category } = useParams();

    if(category) category = category.toLowerCase();

    let toolList = tools.filter((tool) => {
        return !tool.hidden && (category == null || tool.category === category);
    });

    return ([
        <Helmet><title>{t("tools.toolList")} | {t("site.title")}</title></Helmet>,
        <div className={styles.categoryBox}>
            <div className={styles.layoutBox}>
                <span className={styles.title}>{t("tools.toolList")}</span>

                <div className={styles.flexList}>
                    <LinkBox to={"/tools"} text={t("tools.categories.everything")} icon={icons.List} small={true} highlight={category == null} />
                    <LinkBox to={"/tools/cryptography"} text={t("tools.categories.cryptography")} icon={icons.Binary} small={true} highlight={category === "cryptography"} />
                    {/*<LinkBox to={"/tools/osm"} text={"OSM"} icon={icons["Map"]} small={true} highlight={category === "osm"} />*/}
                </div>

                <div className={styles.flexList}>
                    {toolList.map((tool, i) => {
                        return (<LinkBox key={"tool"+i} external={tool.external} to={tool.external ? tool.url : "/tool/"+tool.urlname} text={tool.name} icon={icons[tool.icon]} />);
                    })}

                    {toolList.length === 0 ? <span>{t("tools.noresults")}</span> : null}
                </div>
            </div>
        </div>
    ]);
}

export default ToolsPage;