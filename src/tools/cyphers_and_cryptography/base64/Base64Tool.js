import React, { useEffect, useState } from "react";
import { AlertOctagon } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import BoxMessage from "../../../components/BoxMessage";
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
            const buf = new Buffer.from(input)
            setOutput(buf.toString("base64"))
        }

        if(reversed) {
            const buf = new Buffer.from(output, "base64")
            setInput(buf.toString("utf-8"))
        }

    }, [input, output, reversed])
    
    return (
        <main>
            <Helmet>
                <title>{t("tools.cryptography.base64.title")} | {t("site.title")}</title>
                <meta name="keywords" content="Base64, encryption, decryption, verschlüsselung, entschlüsselung, base, 64, binary, tool" />
            </Helmet>
            <div className={styles.layoutBox}>
                <h1>{t("tools.cryptography.base64.title")}</h1>

                <p><Trans i18nKey={"tools.cryptography.base64.description"} components={{wikipedia: <a href="https://en.wikipedia.org/wiki/Base64">xxx</a>, pre: <pre/>}} /></p>

                <label for="base64-input">{t("tools.cryptography.common.cleartext")}</label>
                <textarea id="base64-input" placeholder={t("tools.cryptography.common.cleartext")} onChange={(e) => {setReversed(false); setInput(e.currentTarget.value);}} value={input}></textarea>

                <label for="base64-output">{t("tools.cryptography.common.ciphertext")}</label>
                <textarea id="base64-output" placeholder={t("tools.cryptography.common.ciphertext")} onChange={(e) => {setReversed(true); setOutput(e.currentTarget.value);}} value={output}></textarea>
            </div>
        </main>
    )
}

export default Base64Tool;