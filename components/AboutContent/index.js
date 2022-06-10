import React from "react";
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import style from "./styles";

const AboutContent = ({ nftItem, title, listings }) => {
    const [isListed, setIsListed] = useState(false)
    const [price, setPrice] = useState(0)

    function toLimit(string = "") {
        string.value = string.value.substring(0, 100);
    }

    useEffect(() => {
        const listing = listings.find((listing) => listing.asset.slug === nftItem.slug)
        if (Boolean(listing)) {
            setIsListed(true)
            setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
        }
    }, [listings, nftItem])

    const { locale, locales, defaultLocale, asPath } = useRouter();
    const lang = locale;

    return (
        <div>
            <div className={style.titleContainer}>

                <p className={style.subtitle1}>
                    {lang == 'pt' ? nftItem.subtitle1Pt : nftItem.subtitle1}
                </p>

                <div className={style.titleBox}>
                    <h1 className={style.title}>
                        {lang == 'pt' ? nftItem.titlePt : nftItem.title}
                    </h1>
                </div>

                <div className={style.titleBox}>
                    <h3 className={style.subtitle2}>
                        {lang == 'pt' ? nftItem.subtitle2Pt : nftItem.subtitle2}
                    </h3>
                </div>
            </div>

            <div className={style.iconContainer}>
                <div className={style.iconContent}>
                    <img src={nftItem.icon1} className={style.icon} />

                    <h1 className={style.iconTitle}>
                        {lang == 'pt' ? nftItem.iconTitle1Pt : nftItem.iconTitle1}
                    </h1>

                    <p className={style.iconText}>
                        {lang == 'pt' ? nftItem.iconText1Pt : nftItem.iconText1}
                    </p>
                </div>

                <div className={style.iconContent}>
                    <img src={nftItem.icon2} className={style.icon} />

                    <h1 className={style.iconTitle}>
                        {lang == 'pt' ? nftItem.iconTitle2Pt : nftItem.iconTitle2}
                    </h1>

                    <p className={style.iconText}>
                        {lang == 'pt' ? nftItem.iconText2Pt : nftItem.iconText2}
                    </p>
                </div>

                <div className={style.iconContent}>
                    <img src={nftItem.icon3} className={style.icon} />

                    <h1 className={style.iconTitle}>
                        {lang == 'pt' ? nftItem.iconTitle3Pt : nftItem.iconTitle3}
                    </h1>

                    <p className={style.iconSubtitle}>
                        {lang == 'pt' ? nftItem.iconSubtitle3Pt : nftItem.iconSubtitle3}
                    </p>

                    <p className={style.iconText}>
                        {lang == 'pt' ? nftItem.iconText3Pt : nftItem.iconText3}
                    </p>
                </div>
            </div>

            <div>
                <h1 className={style.titleTeam}>
                    {lang == 'pt' ? nftItem.teamSectionPt : nftItem.teamSection}
                </h1>
            </div>

        </div>
    )
}

export default AboutContent