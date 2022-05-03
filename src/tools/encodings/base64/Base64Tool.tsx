import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import * as styles from "./Base64Tool.module.scss"
import { Helmet } from "react-helmet";
import {Buffer} from "buffer/"

const Base64Tool = () => {
    const { t } = useTranslation();

    let [input, setInput] = useState("");
    let [output, setOutput] = useState("");
    let [reversed, setReversed] = useState(false)

    useEffect(() => {
        if(!reversed) {
            // @ts-ignore
            const buf = new Buffer.from(input)
            setOutput(buf.toString("base64"))
        }

        if(reversed) {
            // @ts-ignore
            const buf = new Buffer.from(output, "base64")
            setInput(buf.toString("utf-8"))
        }

    }, [input, output, reversed])
    
    return (
        <main>
            <Helmet>
                <title>{t("tools.encodings.base64.title")} | {t("site.title")}</title>
                <meta name="keywords" content="Base64, encoding, decoding, encoder, decoder, base, 64, binary, tool" />
            </Helmet>
            <div className={styles.layoutBox}>
                <h1>{t("tools.encodings.base64.title")}</h1>

                <p><Trans i18nKey={"tools.encodings.base64.description"} components={{wikipedia: <a href="https://en.wikipedia.org/wiki/Base64">xxx</a>, pre: <pre/>}} /></p>

                <label htmlFor="base64-input">{t("tools.encodings.common.decoded")}</label>
                <textarea id="base64-input" placeholder={t("tools.encodings.common.decoded")} onChange={(e) => {setReversed(false); setInput(e.currentTarget.value);}} value={input}></textarea>

                <label htmlFor="base64-output">{t("tools.encodings.common.encoded")}</label>
                <textarea id="base64-output" placeholder={t("tools.encodings.common.encoded")} onChange={(e) => {setReversed(true); setOutput(e.currentTarget.value);}} value={output}></textarea>
            </div>
        </main>
    )
}

export default Base64Tool;