import React, { useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import * as styles from "./IPv4SubnettingTool.module.scss"
import { Helmet } from "react-helmet";

const intToIPv4String = (ip: number): string => {
    let out = ""

    for (let group = 0; group < 4; group++) {
        let groupBin = ip & 0xff

        out = groupBin.toString()+"."+out

        ip >>= 8;
    }

    return out.substring(0, out.length-1)
}

const IPv4SubnettingTool = () => {
    const { t } = useTranslation();

    let [ipPart1, setIPPart1] = useState("");
    let [ipPart2, setIPPart2] = useState("");
    let [ipPart3, setIPPart3] = useState("");
    let [ipPart4, setIPPart4] = useState("");
    let [subnet, setSubnet] = useState("");

    let ipInput1 = useRef<HTMLInputElement>(null)
    let ipInput2 = useRef<HTMLInputElement>(null)
    let ipInput3 = useRef<HTMLInputElement>(null)
    let ipInput4 = useRef<HTMLInputElement>(null)
    let subnetInput = useRef<HTMLInputElement>(null)

    let [ipBinary, setIpBinary] = useState<number|undefined>(undefined);
    let [subnetNumber, setSubnetMaskNumber] = useState<number|undefined>(undefined);
    let [subnetMask, setSubnetMask] = useState<number|undefined>(undefined);
    let [firstAddr, setFirstAddr] = useState<number|undefined>(undefined);
    let [lastAddr, setLastAddr] = useState<number|undefined>(undefined);
    let [isPeerNet, setIsPeerNet] = useState<boolean>(false);

    useEffect(() => {
        let myIpPart1 = ipPart1;
        let myIpPart2 = ipPart2;
        let myIpPart3 = ipPart3;
        let myIpPart4 = ipPart4;
        let mySubnet = subnet;
    

        if(myIpPart1.indexOf(".") !== -1) {
            let split = myIpPart1.split(".")
            myIpPart1 = split.shift()!
            myIpPart2 = split.join(".")
            ipInput2.current?.focus()
        }
        if(myIpPart2.indexOf(".") !== -1) {
            let split = myIpPart2.split(".")
            myIpPart2 = split.shift()!
            myIpPart3 = split.join(".")
            ipInput3.current?.focus()
        }
        if(myIpPart3.indexOf(".") !== -1) {
            let split = myIpPart3.split(".")
            myIpPart3 = split.shift()!
            myIpPart4 = split.join(".")
            ipInput4.current?.focus()
        }
        if(myIpPart4.indexOf("/") !== -1) {
            let split = myIpPart4.split("/")
            myIpPart4 = split.shift()!
            mySubnet = split.join("/")
            subnetInput.current?.focus()
        }
        if(myIpPart4.indexOf(".") !== -1) {
            let split = myIpPart4.split(".")
            myIpPart4 = split.shift()!
            mySubnet = split.join(".")
            subnetInput.current?.focus()
        }


        let ipPart1Num = parseInt(myIpPart1);
        let ipPart2Num = parseInt(myIpPart2);
        let ipPart3Num = parseInt(myIpPart3);
        let ipPart4Num = parseInt(myIpPart4);
        let subnetNum = parseInt(mySubnet);


        if(!isNaN(ipPart1Num)) setIPPart1(ipPart1Num.toString());
        if(!isNaN(ipPart2Num)) setIPPart2(ipPart2Num.toString());
        if(!isNaN(ipPart3Num)) setIPPart3(ipPart3Num.toString());
        if(!isNaN(ipPart4Num)) setIPPart4(ipPart4Num.toString());
        if(!isNaN(subnetNum))  setSubnet(subnetNum.toString());

        let invalid = false;

        [ipInput1, ipInput2, ipInput3, ipInput4].forEach((field) => {
            if(!field.current) return

            const val = field.current.value;

            if (val === "") {
                field.current.setCustomValidity("");
                return
            }

            const valInt = parseInt(val);

            if(isNaN(valInt)) {
                field.current.setCustomValidity(t("tools.networking.ipv4subnetting.error.isNaN"));
                field.current.reportValidity();
                invalid = true;
                return
            }

            if(valInt < 0) {
                field.current.setCustomValidity(t("tools.networking.ipv4subnetting.error.tooSmall"));
                field.current.reportValidity();
                invalid = true;
                return
            }

            if(valInt > 255) {
                field.current.setCustomValidity(t("tools.networking.ipv4subnetting.error.tooBig"));
                field.current.reportValidity();
                invalid = true;
                return
            }

            field.current.setCustomValidity("");
        });



        ((field: React.RefObject<HTMLInputElement>) => {
            if(!field.current) return

            const val = field.current.value;

            if (val === "") {
                field.current.setCustomValidity("");
                return
            }

            const valInt = parseInt(val);

            if(isNaN(valInt)) {
                field.current.setCustomValidity(t("tools.networking.ipv4subnetting.error.isNaN"));
                field.current.reportValidity();
                invalid = true;
                return
            }

            if(valInt < 0) {
                field.current.setCustomValidity(t("tools.networking.ipv4subnetting.error.tooSmall"));
                field.current.reportValidity();
                invalid = true;
                return
            }

            if(valInt > 32) {
                field.current.setCustomValidity(t("tools.networking.ipv4subnetting.error.tooBigSubnet"));
                field.current.reportValidity();
                invalid = true;
                return
            }

            field.current.setCustomValidity("");
        })(subnetInput)

        setIpBinary(undefined);
        setFirstAddr(undefined);
        setLastAddr(undefined);
        setSubnetMaskNumber(undefined);
        setSubnetMask(undefined);
        setIsPeerNet(false);

        if(invalid) return;

        if(!isNaN(ipPart1Num) && !isNaN(ipPart2Num) && !isNaN(ipPart3Num) && !isNaN(ipPart4Num)) {
            let ipBinary = ipPart1Num * Math.pow(2, 24) + ipPart2Num * Math.pow(2, 16) + ipPart3Num * Math.pow(2, 8) + ipPart4Num;
            setIpBinary(ipBinary);

            
            if (!isNaN(subnetNum)) {
                setSubnetMaskNumber(subnetNum);

                let peerNet = false;

                if (subnetNum > 30) {
                    setIsPeerNet(true);
                    peerNet = true;
                }
    
            
                let subnetMaskBinary = new Uint32Array(1);
    
                for (let index = 0; index < 32 - subnetNum; index++) {
                    subnetMaskBinary[0] = (subnetMaskBinary[0] << 1) | 0b1;
                }
    
                subnetMaskBinary[0] ^= 0xffffffff
    
                //setSubnetMaskBinaryString(subnetMaskBinary[0].toString(2))
                setSubnetMask(subnetMaskBinary[0])
    
                if(!peerNet) {
                    setFirstAddr((ipBinary & subnetMaskBinary[0])+1)
                    setLastAddr((ipBinary | (subnetMaskBinary[0] ^ 0xffffffff)) - 1)
                }

                if(peerNet) {
                    setFirstAddr((ipBinary & subnetMaskBinary[0]))
                    setLastAddr((ipBinary | (subnetMaskBinary[0] ^ 0xffffffff)))
                }
            }
        }
    }, [ipPart1, ipPart2, ipPart3, ipPart4, subnet, t])
    
    return (
        <main>
            <Helmet>
                <title>{t("tools.networking.ipv4subnetting.title")} | {t("site.title")}</title>
                <meta name="keywords" content="subnetting, networking, ipv4, ip4, ip, internet protocol, subnet, subnetter, netmask, tool" />
            </Helmet>
            <div className={styles.layoutBox}>
                <h1>{t("tools.networking.ipv4subnetting.title")}</h1>

                <p><Trans i18nKey={"tools.networking.ipv4subnetting.description"} components={{}} /></p>

                <div className={styles.inputGrid}>
                    <div>
                        <label htmlFor="ipv4-input">{t("tools.networking.common.ipv4addr")}</label>
                        <div className={styles.combiInput}>
                            <input ref={ipInput1} id="ipv4-input" placeholder={"192"} onChange={(e) => {setIPPart1(e.currentTarget.value); if((e.currentTarget.value.length >= 3 && e.currentTarget.value.length > ipPart1.length) || e.currentTarget.value[e.currentTarget.value.length - 1] === ".") ipInput2.current?.focus()}} value={ipPart1} />
                            <span>.</span>
                            <input ref={ipInput2} id="ipv4-input2" placeholder={"168"} onChange={(e) => {setIPPart2(e.currentTarget.value); if((e.currentTarget.value.length >= 3 && e.currentTarget.value.length > ipPart2.length) || e.currentTarget.value[e.currentTarget.value.length - 1] === ".") ipInput3.current?.focus()}} value={ipPart2} />
                            <span>.</span>
                            <input ref={ipInput3} id="ipv4-input3" placeholder={"178"} onChange={(e) => {setIPPart3(e.currentTarget.value); if((e.currentTarget.value.length >= 3 && e.currentTarget.value.length > ipPart3.length) || e.currentTarget.value[e.currentTarget.value.length - 1] === ".") ipInput4.current?.focus()}} value={ipPart3} />
                            <span>.</span>
                            <input ref={ipInput4} id="ipv4-input4" placeholder={"1"} onChange={(e) => {setIPPart4(e.currentTarget.value); if((e.currentTarget.value.length >= 3 && e.currentTarget.value.length > ipPart4.length) || e.currentTarget.value[e.currentTarget.value.length - 1] === "/" || e.currentTarget.value[e.currentTarget.value.length - 1] === ".") subnetInput.current?.focus()}} value={ipPart4} />
                            <span>/</span>
                            <input ref={subnetInput} id="subnet-input" placeholder={"24"} onChange={(e) => {setSubnet(e.currentTarget.value);}} value={subnet} />
                        </div>
                    </div>

                    <div>
                        <span className={styles.fakeLabel}>{t("tools.networking.common.subnetMask")}</span>
                        <span className={styles.fakeField}>{subnetMask || subnetMask === 0 ? intToIPv4String(subnetMask) : "???"}</span>
                    </div>
                    <div>
                        <span className={styles.fakeLabel}>{t("tools.networking.common.firstAddr")}</span>
                        <span className={styles.fakeField}>{firstAddr ? intToIPv4String(firstAddr) : "???"}</span>
                    </div>
                    <div>
                        <span className={styles.fakeLabel}>{t("tools.networking.common.lastAddr")}</span>
                        <span className={styles.fakeField}>{lastAddr ? intToIPv4String(lastAddr) : "???"}</span>
                    </div>
                    <div>
                        <span className={styles.fakeLabel}>{t("tools.networking.common.netAddr")}</span>
                        <span className={styles.fakeField}>{isPeerNet ? "n/a" : (firstAddr ? intToIPv4String(firstAddr - 1) : "???")}</span>
                    </div>
                    <div>
                        <span className={styles.fakeLabel}>{t("tools.networking.common.broadcastAddr")}</span>
                        <span className={styles.fakeField}>{isPeerNet ? "n/a" : (lastAddr ? intToIPv4String(lastAddr + 1) : "???")}</span>
                    </div>
                    <div>
                        <span className={styles.fakeLabel}>{t("tools.networking.common.ipv4addr")} ({t("tools.networking.common.binary")})</span>
                        <span className={styles.fakeField}>
                            {ipBinary || ipBinary === 0 ? ipBinary.toString(2).padStart(32, "0").split("").map((bit, index) => {
                                return <span style={{color: (index) >= (subnetNumber||32) ? "red" : undefined}} key={"bit"+index}>{bit}</span>
                            }) : "???"}
                        </span>
                    </div>
                    <div>
                        <span className={styles.fakeLabel}>{t("tools.networking.common.subnetMask")} ({t("tools.networking.common.binary")})</span>
                        <span className={styles.fakeField}>
                            {subnetMask || subnetMask === 0 ? subnetMask.toString(2).padStart(32, "0").split("").map((bit, index) => {
                                return <span key={"maskbit"+index}>{bit}</span>
                            }) : "???"}
                        </span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default IPv4SubnettingTool;