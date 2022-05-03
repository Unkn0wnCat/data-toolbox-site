import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import * as styles from "./URLEncodeTool.module.scss"
import { Helmet } from "react-helmet";

const URLEncodeTool = () => {
    const { t } = useTranslation();

    let [input, setInput] = useState("");
    let [output, setOutput] = useState("");
    let [reversed, setReversed] = useState(false)

    useEffect(() => {
        if(!reversed) {
            setOutput(encodeURIComponent(input))
        }

        if(reversed) {
            setInput(decodeURIComponent(output))
        }

    }, [input, output, reversed])
    
    return (
        <main>
            <Helmet>
                <title>{t("tools.encodings.urlencode.title")} | {t("site.title")}</title>
                <meta name="keywords" content="URL, urlencode, urldecode, URI, uriencode, uridecode, encoding, decoding, encoder, decoder, tool" />
            </Helmet>
            <div className={styles.layoutBox}>
                <h1>{t("tools.encodings.urlencode.title")}</h1>

                <p><Trans i18nKey={"tools.encodings.urlencode.description"} components={{wikipedia: <a href="https://en.wikipedia.org/wiki/Percent-encoding">xxx</a>, pre: <pre/>}} /></p>

                <label htmlFor="urlencode-input">{t("tools.encodings.common.decoded")}</label>
                <textarea id="urlencode-input" placeholder={t("tools.encodings.common.decoded")} onChange={(e) => {setReversed(false); setInput(e.currentTarget.value);}} value={input}></textarea>

                <label htmlFor="urlencode-output">{t("tools.encodings.common.encoded")}</label>
                <textarea id="urlencode-output" placeholder={t("tools.encodings.common.encoded")} onChange={(e) => {setReversed(true); setOutput(e.currentTarget.value);}} value={output}></textarea>
            </div>
        </main>
    )
}

export default URLEncodeTool;