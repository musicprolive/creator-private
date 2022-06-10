import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import Section from './section'

const style = {
    container: `py-16 md:py-10`,
    createBox: `mt-0 px-2.5 text-[#fff] text-center`,
    createBoxTitle: `text-[#fff] text-5xl px-5 py-3`,
    createBoxSubtitle: `w-500px mt-0 mb-5 `,

    title: `font-normal text-[#fff] bg-bg-faq p-1.5 cursor-pointer flex justify-between
    w-full my-0`,

    showText: `flex bg-[#202225]`,
    hideText: `hidden`,

    header: `p-1.5 cursor-pointer `,
}

const Faq = () => {
    const router = useRouter()

    const { provider } = useWeb3()
    const { slug } = router.query
    const [faq, setFaq] = useState({})

    const [listings, setListings] = useState([])

    const [faqData, setFaqData] = useState([])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE'
        )
        return sdk.getMarketplaceModule(
            '0xce1B54743d3aE22a4aD2Da8BA99c7a445d7D3eff'
        )
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return
            ; (async () => {
                setListings(await marketPlaceModule.getAllListings())
            })()
    }, [marketPlaceModule])

    const fetchFaqData = async (sanityClient = client) => {

        const query = `*[_type == "faq" ] {
        pageTitle,
        pageSubtitle,
        pageSubtitlePt,
        questionBox,
        questionBoxPt,
        questionBoxSubtitle,
        questionBoxSubtitlePt,
        fullText, fullTextPt,
        id,
      }`

        const faqDataV = await sanityClient.fetch(query)

        const orderFaq = faqDataV.sort((a,b) => a.id - b.id);

        setFaqData(orderFaq);

        await setFaq()
    }

    useEffect(() => {
        fetchFaqData()
    }, [slug])

    return (
        <div>

            <div className={style.container}>
                {faqData.map((faqItem, id) => (
                    <div>
                        <div className={style.createBox} >
                            <h1 className={style.createBoxTitle}>  {faqItem.pageTitle} </h1>

                            <p className={style.createBoxSubtitle}> {faqItem.pageSubtitle} </p>
                        </div>

                        <Section
                            key={slug}
                            nftItem={faqItem}
                            fullText={faqItem.fullText}
                            fullTextPt={faqItem.fullTextPt}
                            listings={listings}
                        />

                        {/* <button onClick={changeStyle} className={style.title}>
                            {faqItem.notification}
                        </button>

                        <span className={isToggleOn ? style.showText : style.hideText}>
                            <div className={style.header}>
                                {faqItem.notificationText}
                                <a>{faqItem.button}</a>
                            </div>
                            <label>
                                <input type="checkbox" /> {faqItem.inputText}
                            </label>
                        </span> */}

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Faq
