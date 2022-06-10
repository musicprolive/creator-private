import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../../components/Header/Header'

import Footer from '../../components/Footer/Footer'

import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import NFTCard from '../../components/NFTCards/NFTCard'

import EditCollection from '../../components/EditCollection'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl md:mb-[-2rem] md:mt-0 md:pr-7 md:mx-0 pr-0 mx-auto my-10`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `md:w-[50vw] w-[80vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,

  NFTCardsGrid: `grid grid-cols-1 px-14 pt-8 pb-12 gap-y-10
                sm:grid-cols-2 sm:gap-x-10 md:grid-cols-3 lg:px-10 lg:gap-y-8
                xl:grid-cols-4
                `,
}

//////////////translate//////////////////////////

import { useTranslation } from 'next-i18next'

const translate = {
  en: {
    title: "NFTs to collect and invest in creators",
    desc: "NFTs for collect and invest in your favorite creator or artist.",
    createdBy: "Created by"

  },
  pt: {
    title: "NFTs para coletar e investir em criadores",
    desc: "NFTs para colecionar e investir em seu criador ou artista favorito.",
    createdBy: "Criado por"

  },
};
//////////////translate////////////////////////// 


const Collections = () => {

  const router = useRouter()

  //////////////translate//////////////////////////
  //const { t , i18n  } =  useTranslation(['translation', 'common']); 
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = translate[locale];
  //////////////translate//////////////////////////

  const { provider, address } = useWeb3()
  const { collectionId } = router.query

  const [collectionContract, setCollectionContract] = useState('')

  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const [isAdmin, setAdmin] = useState(false);
  const [userIdInSanity, setUserIdInSanity] = useState("");
  const getUserIdSanity = async (sanityClient = client) => {
    const query = `*[_type == "users" && walletAddress == "${address}" ] {
      _id
    }`
    const userData = await sanityClient.fetch(query);
    if (userData.length > 0) {
      setUserIdInSanity(userData[0]['_id']);
    }
  }

  const nftModule = useMemo(() => {

    if (!provider) return
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE'
      // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
    )

    try {
      return sdk.getNFTModule(collectionContract)
    } catch (error) {
      return error
    }

    //return sdk.getBundleModule(collectionContract)

  }, [provider])

  // get all NFTs FROM the THIRD WEB collection/////
  useEffect(() => {
    if (!nftModule) return
      ; (async () => {
        // const nfts = await nftModule.getAll()
        //console.log("NFTS" , nfts);
        //setNfts(nfts);

      })()
  }, [nftModule])


  const getNftList = async (sanityClient = client) => {

    const query = `*[_type == "items"  && collection._ref == "${collectionId}" && status !='block'  && moduleAddress!=""  ] {
      image,
      name,
      description,
      supply,
      price,
      currency,
      "createdBy": createdBy->userName,
      "collection": collection->_id,
      moduleAddress,
    }`;


    const nftItems = await sanityClient.fetch(query);

    console.log(nftItems, '🔥 nftItems ')
    setNfts(nftItems);

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



  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
      ; (async () => {
        setListings(await marketPlaceModule.getAllListings())
      })()
  }, [marketPlaceModule]);



  const fetchCollectionData = async (sanityClient = client) => {

    const query = `*[_type == "marketItems" && _id == "${collectionId}" ] {
            "imageUrl": profileImage.asset->url,
            "bannerImageUrl": bannerImage.asset->url,
            volumeTraded,
            createdBy,
            contractAddress,
            "creator": createdBy->userName,
            title, floorPrice,
            "allOwners": owners[]->,
            description
          }`;


    const collectionData = await sanityClient.fetch(query)

    console.log(collectionData, '🔥')

    getNftList();

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0])


    setCollectionContract(collectionData[0]?.contractAddress);


    if (address == collection?.creator_id) {
      setAdmin(true);
    }

  }

  useEffect(() => {
    fetchCollectionData();
  }, [address])


  useEffect(() => {
    fetchCollectionData()
  }, [collectionId])

  function openEditCollectionBox() {

  }

  return <div>
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection?.bannerImageUrl
              : 'https://via.placeholder.com/200'
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://via.placeholder.com/200'
            }
            alt="profile image"
          />

          {isAdmin ?

            <EditCollection collectionId={collectionContract} onClick={openEditCollectionBox} />

            : ""}

        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            {objTrans.createdBy} {' '}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}.0K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>

      <div className={style.NFTCardsGrid}>
        {nfts.map((nftItem, id) => (
          <NFTCard
            key={id}
            nftItem={nftItem}
            title={collection?.title}
            listings={listings}
            collectionId={collectionContract}
          />
        ))}
      </div>


      <Footer />

    </div>
  </div>
}

export default Collections
