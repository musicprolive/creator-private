import React from "react";
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import style from "./styles";

const Team = ({ nftItem, title, listings }) => {
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
            <div className={style.imageContainer}>
                <img src={nftItem.image} className={style.image} />

                <div className={style.nameContainer}>
                    <h1 className={style.ocupation}>
                        {lang == 'pt' ? nftItem.ocupationPt : nftItem.ocupation}
                    </h1>

                    <h1 className={style.name}>{nftItem.name}</h1>

                    <button className={style.linkedInButton}>LinkedIn</button>
                </div>
            </div>

            <div>
                <p className={style.text}>
                    {lang == 'pt' ? nftItem.textPt : nftItem.text}
                </p>
            </div>
        </div>
    )
}

export default Team