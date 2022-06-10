import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'

import  style from './_styles'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'




const Blog = () => {
    const router = useRouter()

    const { locale, locales, defaultLocale, asPath } = useRouter();
    const lang = locale;

    const { provider, address } = useWeb3()
    const { blogId } = router.query

    const [blogContract, setBlogContract] = useState('')

    const [blog, setBlog] = useState({})
    const [nfts, setNfts] = useState([])
    const [listings, setListings] = useState([])

    const [isAdmin, setAdmin] = useState(false);
    const [userIdInSanity, setUserIdInSanity] = useState("");

    const getUserIdSanity = async (sanityClient = client) => {
        const query = `*[_type == "users" && walletAddress == "${address}" ] {
            _id
        }
        `
        const userData = await sanityClient.fetch(query);
        if (userData.length > 0) {
            setUserIdInSanity(userData[0]['slug']);
        }
    }

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE'
            //'https://rinkeby.infura.io/v3/retj13fS7QQQqnBdCeidOdw1kFToJ-cE'
        )

        return sdk.getMarketplaceModule(
            '0xce1B54743d3aE22a4aD2Da8BA99c7a445d7D3eff'
        )
    }, [provider]);

    // get all listings in the blog
    useEffect(() => {
        if (!marketPlaceModule) return
            ; (async () => {
                setListings(await marketPlaceModule.getAllListings())
            })()

    }, [marketPlaceModule]);

    const fetchBlogData = async (sanityClient = client) => {

        const query = `*[_type == "blog" && slug == "${blogId}" ] {
            slug,
            "image": image.asset->url,
            title,
            titlePt,
            fullTextPt,
            fullText,
            "profileImage": profileImage.asset->url, 
            profileName,
            creationDate,
            button,
            buttonPt
        }`;

        const blogData = await sanityClient.fetch(query)

        console.log(blogData, '🔥blog test')

        //getNftList();

        // the query returns 1 object inside of an array
        await setBlog(blogData[0])

        setBlogContract(blogData[0]?.contractAddress);

        if (address == blog?.creator_id) {
            setAdmin(true);
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, [address])


    useEffect(() => {
        fetchBlogData()
    }, [blogId])


    return (
        <div>
            <Header />
            <div className={style.container}>
                <h1 className={style.title}>
                    {lang == 'pt' ? blog.titlePt : blog.title}
                </h1>

                <div className={style.bannerImageContainer}>
                    <img
                        className={style.bannerImage}
                        src={
                            blog?.image
                                ? blog?.image
                                : 'https://via.placeholder.com/200'
                        }
                        alt="article image"
                    />
                </div>

                <div className={style.midRow}>
                    <img
                        className={style.profileImg}
                        src={
                            blog?.profileImage
                                ? blog.profileImage
                                : 'https://via.placeholder.com/200'
                        }
                        alt="profile image"
                    />
                    <div className={style.writerInfo}>
                        <p className={style.profileName}>
                            {blog.profileName}
                        </p>
                        <p className={style.line}>|</p>
                        <p className={style.data}>
                            {blog.creationDate}
                        </p>
                    </div>
                </div>

                <div>
                    <p className={style.fullText}>
                        {lang == 'pt' ? blog.fullTextPt : blog.fullText}
                    </p>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Blog
