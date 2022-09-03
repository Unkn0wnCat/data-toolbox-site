import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import * as styles from "./LinuxPermissionsTool.module.scss"
import { Helmet } from "react-helmet";

const LinuxPermissionsTool = () => {
    const { t } = useTranslation();

    let [octal, setOctal] = useState("0766");
    let [umask, setUmask] = useState("");
    let [octet1, setOctet1] = useState(0)
    let [octet2, setOctet2] = useState(0)
    let [octet3, setOctet3] = useState(0)
    let [octet4, setOctet4] = useState(0)
    let [input, setInput] = useState<"octal"|"checkbox"|"umask">("octal")

    useEffect(() => {

        if(input === "octal") {
            let digits = [0, 0, 0, 0];

            const baseOffset = 4 - octal.length;

            for(let i = 0; i < digits.length && i+baseOffset < 4; i++) {
                digits[i+baseOffset] = parseInt(octal.charAt(i), 8)
            }

            setUmask(`0${digits[1]^0b111}${digits[2]^0b111}${digits[3]^0b111}`)

            setOctet1(digits[0])
            setOctet2(digits[1])
            setOctet3(digits[2])
            setOctet4(digits[3])
        }

        if(input === "umask") {
            let digits = [0, 0, 0, 0];

            const baseOffset = 4 - umask.length;

            for(let i = 0; i < digits.length && i+baseOffset < 4; i++) {
                digits[i+baseOffset] = parseInt(umask.charAt(i), 8)
            }

            setOctal(`0${digits[1]^0b111}${digits[2]^0b111}${digits[3]^0b111}`)

            setOctet1(digits[0]^0b111)
            setOctet2(digits[1]^0b111)
            setOctet3(digits[2]^0b111)
            setOctet4(digits[3]^0b111)
        }

        if(input === "checkbox") {
            setOctal(`${octet1}${octet2}${octet3}${octet4}`)
            setUmask(`0${octet2^0b111}${octet3^0b111}${octet4^0b111}`)
        }
    }, [octal, input, octet1, octet2, octet3, octet4, umask])
    
    return (
        <main>
            <Helmet>
                <title>{t("tools.encodings.linux_permissions.title")} | {t("site.title")}</title>
                <meta name="keywords" content="Linux, Permissions, octet, octets, rwx, encoding, decoding, encoder, decoder, calculator, umask, binary, tool" />
            </Helmet>
            <div className={styles.layoutBox}>
                <h1>{t("tools.encodings.linux_permissions.title")}</h1>

                <p><Trans i18nKey={"tools.encodings.linux_permissions.description"} components={{pre: <pre/>}} /></p>

                <label htmlFor="octal-input">{t("tools.encodings.linux_permissions.octal")}</label>
                <input id="octal-input" type="text" placeholder={t("tools.encodings.linux_permissions.octal")} onChange={(e) => {setOctal(e.currentTarget.value); setInput("octal")}} value={octal} />

                <label htmlFor="table-input">{t("tools.encodings.linux_permissions.bits")}</label>
                <table className={styles.inputTable} id="table-input">
                <colgroup>
                    <col span={3}/>
                    <col span={1} className={styles.gap}/>
                    <col span={3}/>
                    <col span={1} className={styles.gap}/>
                    <col span={3}/>
                    <col span={1} className={styles.gap}/>
                    <col span={3}/>
                </colgroup>
                    <thead>
                        <tr>
                            <th colSpan={3}>Flags</th>
                            <th></th>
                            <th colSpan={3}>User</th>
                            <th></th>
                            <th colSpan={3}>Group</th>
                            <th></th>
                            <th colSpan={3}>Other</th>
                        </tr>
                        <tr>
                            <th title="Set UID">U</th>
                            <th title="Set GID">G</th>
                            <th title="Sticky">S</th>
                            <th></th>
                            <th title="Read">R</th>
                            <th title="Write">W</th>
                            <th title="Execute">X</th>
                            <th></th>
                            <th title="Read">R</th>
                            <th title="Write">W</th>
                            <th title="Execute">X</th>
                            <th></th>
                            <th title="Read">R</th>
                            <th title="Write">W</th>
                            <th title="Execute">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" checked={(octet1 & 0b100) === 0b100} onChange={() => {setOctet1(prev => prev ^ 0b100); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet1 & 0b010) === 0b010} onChange={() => {setOctet1(prev => prev ^ 0b010); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet1 & 0b001) === 0b001} onChange={() => {setOctet1(prev => prev ^ 0b001); setInput("checkbox")}}/></td>
                            <td></td>
                            <td><input type="checkbox" checked={(octet2 & 0b100) === 0b100} onChange={() => {setOctet2(prev => prev ^ 0b100); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet2 & 0b010) === 0b010} onChange={() => {setOctet2(prev => prev ^ 0b010); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet2 & 0b001) === 0b001} onChange={() => {setOctet2(prev => prev ^ 0b001); setInput("checkbox")}}/></td>
                            <td></td>
                            <td><input type="checkbox" checked={(octet3 & 0b100) === 0b100} onChange={() => {setOctet3(prev => prev ^ 0b100); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet3 & 0b010) === 0b010} onChange={() => {setOctet3(prev => prev ^ 0b010); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet3 & 0b001) === 0b001} onChange={() => {setOctet3(prev => prev ^ 0b001); setInput("checkbox")}}/></td>
                            <td></td>
                            <td><input type="checkbox" checked={(octet4 & 0b100) === 0b100} onChange={() => {setOctet4(prev => prev ^ 0b100); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet4 & 0b010) === 0b010} onChange={() => {setOctet4(prev => prev ^ 0b010); setInput("checkbox")}}/></td>
                            <td><input type="checkbox" checked={(octet4 & 0b001) === 0b001} onChange={() => {setOctet4(prev => prev ^ 0b001); setInput("checkbox")}}/></td>
                        </tr>
                    </tbody>
                </table>


                <label htmlFor="umask-input">{t("tools.encodings.linux_permissions.umask")}</label>
                <input id="umask-input" type="text" placeholder={t("tools.encodings.linux_permissions.umask")} onChange={(e) => {setUmask(e.currentTarget.value); setInput("umask")}} value={umask} />

            </div>
        </main>
    )
}

export default LinuxPermissionsTool;