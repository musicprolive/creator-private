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
 
import CollectionCard from '../../components/CollectionCard/CollectionCard'
 

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Search = () => {




  const router = useRouter()
  const { searchTerm } = router.query;
 



  const { provider } = useWeb3()
  const { collectionId } = router.query
  const [collection, setCollection] = useState({})
 
  const [listings, setListings] = useState([])



  const [collectionData, setCollectionData] = useState([])
  //
 

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
  }, [provider])

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])



  useEffect(() => {
    fetchCollectionData()
  }, [searchTerm])


    
  
  const fetchCollectionData = async (sanityClient = client) => {


    // && contractAddress == "${collectionId}" 

    const query = `*[_type == "marketItems" && (title match "*`+searchTerm+`" ||  description match "`+searchTerm+`*" ||  description match "*`+searchTerm+`"  ||  description match "`+searchTerm+`*" ) ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`

    const collectionData = await sanityClient.fetch(query)

    console.log(collectionData, '🔥')

    setCollectionData(collectionData);

    // the query returns 1 object inside of an array
    await setCollection( )
  }

  useEffect(() => {
    fetchCollectionData()
  }, [collectionId])

  console.log(router.query)
  console.log(router.query.collectionId);


  return (
    <div className="overflow-hidden">
      <Header />


      <div className="createBox" >
                    <p>Results for  for the search  <strong>"{searchTerm}"</strong>  </p> 
      </div>

      
      <div className="flex flex-wrap ">
        {collectionData.map((collectionItem, id) => (
          <CollectionCard
            key={id}
            nftItem={collectionItem}
            title={collection?.title}
            listings={listings}
          />
        ))}
      </div>


      <Footer />

      
    </div>
  )
}

export default Search
