import React from 'react';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const style = {
    container: `py-0 px-0 bg-[#000] font-sans text-xl font-bold text-center 
    bg-[url('/ondas1.jpg')] bg-contain opacity-70`,
    pageTitle: `text-[#fff] text-5xl font-extrabold pb-2`,
    subtitle1: `text-2xl text-[#00cc9b] pb-4 pt-6`,
    subtitle2: `text-[#fff] p-4 pb-5`,

    // main: `px-0 flex-[2] flex flex-col justify-start items-between
    // bg-[#000] m-0 opacity-70`,
    main: `px-0 flex-[2] flex flex-col justify-start items-between
    `,
    imageBox: `absolute`,
    //roadmapContainer: `py-1 flex-row flex-nowrap bg-[#000] bg-fixed`,
    roadmapContainer: `py-1 flex-row flex-nowrap  bg-fixed`,
    roadmap: `bg-[#292929] mx-auto 2xl:mx-[120px] items-center max-w-[350px] sm:max-w-[680px] 
    lg:max-w-[800px] rounded-[10px] p-[30px] min-h-[285px]`,

    phaseContainer: `pb-8`,
    phase: `text-xl text-[#fff] font-extrabold`,
    date: `text-[#00BFFF] font-extrabold`,
    title: `text-[32px] text-[#9400D3] font-extrabold`,
    text: `text-[#fff] pt-8`,
    text2: `text-[#005eff] pt-2`
}

const RoadmapData = ({ key, nftItem, data, id, listings }) => {
    const [isListed, setIsListed] = useState(false)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const listing = listings.find((listing) => listing.asset.id === nftItem.id)
        if (Boolean(listing)) {
            setIsListed(true)
            setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
        }
    }, [listings, nftItem])

    const { locale, locales, defaultLocale, asPath } = useRouter();
    const lang = locale;

    return (
        <div className={style.container}>
            <h2 className={style.subtitle1}>
                {lang == 'pt' ? nftItem.subtitle1Pt : nftItem.subtitle1}
            </h2>

            <h1 className={style.pageTitle}>
                {lang == 'pt' ? nftItem.pageTitlePt : nftItem.pageTitle}
            </h1>

            <p className={style.subtitle2}>
                {lang == 'pt' ? nftItem.subtitle2Pt : nftItem.subtitle2}
            </p>

            <main className={style.main}>
                <div className={style.roadmapContainer} >

                    <div className={style.roadmap}>
                        <div className={style.imageBox}>
                            <img src={data.iconSrc} />
                        </div>

                        <div>
                            <div>
                                <div className={style.phaseContainer}>
                                    <span className={style.phase}>
                                        {lang == 'pt' ? data.phasePt : data.phase}
                                    </span>

                                    <span>
                                        &nbsp;|&nbsp;
                                        <span className={style.date}>
                                            {data.date}
                                        </span>
                                    </span>
                                </div>

                                <div>
                                    <span className={style.title}>
                                        {lang == 'pt' ? data.titlePt : data.title}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className={style.text}> 
                            {lang == 'pt' ? data.text1Pt : data.text1}
                        </p>

                        <p className={style.text2}>
                            {lang == 'pt' ? data.text2Pt : data.text2}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default RoadmapData