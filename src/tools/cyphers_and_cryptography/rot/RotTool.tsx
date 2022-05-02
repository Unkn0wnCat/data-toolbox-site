import React, { useEffect, useState } from "react";
import { AlertOctagon } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import BoxMessage from "../../../components/BoxMessage";
import * as styles from "./RotTool.module.scss"
import { Helmet } from "react-helmet";

const RotTool = () => {
    const { t } = useTranslation();

    let [input, setInput] = useState("");
    let [output, setOutput] = useState("");
    let [offset, setOffset] = useState(13);
    let [reversed, setReversed] = useState(false)
    let [outOfRangeWarning, setOutOfRangeWarning] = useState(false)

    useEffect(() => {
        let actualOffset = offset;
        if(reversed) actualOffset = -offset;
        
        let min = 97; // This is a
        let max = 122; // This is z
        let range = max - min; // The length of the alphabet

        let rotInputStr = reversed ? output.toLowerCase() : input.toLowerCase();

        let rotInput = rotInputStr.split('');
        
        let hasOutOfRange = false;

        let rotOut = rotInput.map((char) => {
            let charCode = char.charCodeAt(0);

            if(charCode > max || charCode < min) {
                hasOutOfRange = true;
                return char;
            }

            charCode += actualOffset;

            while(charCode > max) charCode -= range;
            while(charCode < min) charCode += range;

            return String.fromCharCode(charCode);
        })

        setOutOfRangeWarning(hasOutOfRange);

        let rotOutStr = rotOut.join('').toUpperCase();

        reversed ? setInput(rotOutStr) : setOutput(rotOutStr)
    }, [input, output, reversed, offset])
    
    return (
        <main>
            <Helmet>
                <title>{t("tools.cryptography.rot.title")} | {t("site.title")}</title>
                <meta name="keywords" content="ROT, encryption, decryption, verschlüsselung, entschlüsselung, ROT-13, Caesar-cipher, cipher, caesar, cäsar-chiffre, tool" />
            </Helmet>
            <div className={styles.layoutBox}>
                <h1>{t("tools.cryptography.rot.title")}</h1>

                <p><Trans i18nKey={"tools.cryptography.rot.description"} components={{wikipedia: <a href="https://en.wikipedia.org/wiki/ROT13">xxx</a>, pre: <pre/>}} /></p>

                <BoxMessage icon={<AlertOctagon/>} color="red" hideInPlace={!outOfRangeWarning}>{t("tools.cryptography.rot.outOfRangeWarning")}</BoxMessage>

                <label htmlFor="rot-input">{t("tools.cryptography.common.cleartext")}</label>
                <textarea id="rot-input" placeholder={t("tools.cryptography.common.cleartext")} onChange={(e) => {setReversed(false); setInput(e.currentTarget.value.toUpperCase());}} value={input}></textarea>

                <label htmlFor="rot-offset" className={styles.center}>{t("tools.cryptography.rot.offset")}</label>
                <input type="number" id="rot-offset" value={offset} onChange={(e) => {setOffset(parseInt(e.currentTarget.value))}} className={styles.center} />

                <label htmlFor="rot-output">{t("tools.cryptography.common.ciphertext")}</label>
                <textarea id="rot-output" placeholder={t("tools.cryptography.common.ciphertext")} onChange={(e) => {setReversed(true); setOutput(e.currentTarget.value.toUpperCase());}} value={output}></textarea>
            </div>
        </main>
    )
}

export default RotTool;