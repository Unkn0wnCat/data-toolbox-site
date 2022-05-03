import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import * as styles from "./NumberBaseTool.module.scss"
import { Helmet } from "react-helmet";
import BoxMessage from "../../../components/BoxMessage";
import { AlertOctagon } from "lucide-react";

const NumberBaseTool = () => {
    const { t } = useTranslation();

    let [input, setInput] = useState("10");
    let [inputType, setInputType] = useState<"dec"|"hex"|"oct"|"bin">("dec");
    let [nanState, setNanState] = useState(false)

    let [dec, setDec] = useState("");
    let [bin, setBin] = useState("");
    let [oct, setOct] = useState("");
    let [hex, setHex] = useState("");

    useEffect(() => {
        let num = 0
    

        switch(inputType) {
            case "dec":
                num = parseInt(input.replaceAll(" ", ""), 10)
                break
            case "hex":
                num = parseInt(input.replaceAll(" ", "").replace(/^(0x)/,''), 16)
                break
            case "oct":
                num = parseInt(input.replaceAll(" ", ""), 8)
                break
            case "bin":
                num = parseInt(input.replaceAll(" ", ""), 2)
                break
        }

        if(isNaN(num)) {
            setNanState(true)
            switch(inputType) {
                case "dec":
                    setDec(input)
                    setHex("")
                    setOct("")
                    setBin("")
                    break
                case "hex":
                    setHex(input)
                    setDec("")
                    setOct("")
                    setBin("")
                    break
                case "oct":
                    setOct(input)
                    setDec("")
                    setHex("")
                    setBin("")
                    break
                case "bin":
                    setBin(input)
                    setDec("")
                    setHex("")
                    setOct("")
                    break
            }

            return
        }

        setNanState(false)

        setDec(num.toString(10).replace(/\B(?=(\d{3})+(?!\d))/g, " "))
        setBin(num.toString(2).replace(/\d{4}(?=.)/g, '$& '))
        setOct(num.toString(8))
        setHex(num.toString(16))


    }, [input, inputType])
    
    return (
        <main>
            <Helmet>
                <title>{t("tools.encodings.numberbase.title")} | {t("site.title")}</title>
                <meta name="keywords" content="binary, base, base6, base10, base2, binary, hex, hexadecimal, oct, bin, dec, encodings, encoding, decoding" />
            </Helmet>
            <div className={styles.layoutBox}>
                <h1>{t("tools.encodings.numberbase.title")}</h1>

                <p><Trans i18nKey={"tools.encodings.numberbase.description"} components={{}} /></p>

                <BoxMessage icon={<AlertOctagon/>} color="red" hideInPlace={!nanState}>{t("tools.encodings.numberbase.nanWarning")}</BoxMessage>

                <label htmlFor="base10-input">{t("tools.encodings.numberbase.decimal")}</label>
                <textarea id="base10-input" placeholder={t("tools.encodings.numberbase.decimal")} onChange={(e) => {setInputType("dec"); setInput(e.currentTarget.value);}} value={dec}></textarea>

                <label htmlFor="base16-input">{t("tools.encodings.numberbase.hexadecimal")}</label>
                <textarea id="base16-input" placeholder={t("tools.encodings.numberbase.hexadecimal")} onChange={(e) => {setInputType("hex"); setInput(e.currentTarget.value);}} value={hex}></textarea>

                <label htmlFor="base8-input">{t("tools.encodings.numberbase.octal")}</label>
                <textarea id="base8-input" placeholder={t("tools.encodings.numberbase.octal")} onChange={(e) => {setInputType("oct"); setInput(e.currentTarget.value);}} value={oct}></textarea>

                <label htmlFor="base2-input">{t("tools.encodings.numberbase.binary")}</label>
                <textarea id="base2-input" placeholder={t("tools.encodings.numberbase.binary")} onChange={(e) => {setInputType("bin"); setInput(e.currentTarget.value);}} value={bin}></textarea>

                
            </div>
        </main>
    )
}

export default NumberBaseTool;