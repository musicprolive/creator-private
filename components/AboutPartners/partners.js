import React from "react";
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import style from "./styles";

const Partners = ({ nftItem, title, listings }) => {
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
        <div className={style.container}>
            <h1 className={style.title}>
                {lang == 'pt' ? nftItem.partnersSectionPt : nftItem.partnersSection}
            </h1>

            <div className={style.imageContainer}>
                <img src={nftItem.partnersImage1} className={style.image} />
                <img src={nftItem.partnersImage2} className={style.image} />
                <img src={nftItem.partnersImage3} className={style.image} />
            </div>

            <div className={style.textContainer}>
                <h1 className={style.partnersTitle}>
                    {lang == 'pt' ? nftItem.partnersTitlePt : nftItem.partnersTitle}
                </h1>

                <p>
                    {lang == 'pt' ? nftItem.partnersSubtitlePt : nftItem.partnersSubtitle}
                </p>

                <div className={style.buttonContainer}>
                    <button className={style.button}>
                        {lang == 'pt' ? nftItem.partnersButtonPt : nftItem.partnersButton}
                    </button>
                </div>
            </div>
        </div>
    )
}

//      {lang == 'pt' ? nftItem.subtitle1Pt : nftItem.subtitle1}

export default Partners