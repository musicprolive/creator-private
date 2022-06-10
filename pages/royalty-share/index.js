import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import {uuid} from '@sanity/uuid'

import { ThirdwebSDK } from '@3rdweb/sdk'


import Header from '../../components/Header/Header'

import Footer from '../../components/Footer/Footer'

import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'

import toast, { Toaster } from 'react-hot-toast'

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


/////ENVIO DE ARQUIVO PARA IPFS ///////////
import { create as ipfsHttpClient } from 'ipfs-http-client'
const clientIpfs  = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
/////ENVIO DE ARQUIVO PARA IPFS ///////////



const RoaltyShare = () => {

 
  const router = useRouter()
  const {  address, provider , connectWallet  } = useWeb3()


  ////// 
  const { collectionId }  = useState('');
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([]) 
  //////




  ///////////////////////////////////////////////////  

  
  const [showMoreCt, setShowMore] = useState(false);
  const [showCollection, setShowCollection] = useState(true);
  const [newCollectionName_, setCollectionName] = useState(""); 
  const [collectionsList, setCollectionList ] = useState( [ { title : 'Create a  collection' , _id : '' } ] );

  
  //////// GET SELECT LIST FROM USER/////////////////////////////////// 
          const fetchCollectionData = async (sanityClient = client) => {
                  const query = `*[_type == "marketItems" && createdByWallet == "${address}" ] {
                    _id, title 
                  }`

                  const collectionData = await sanityClient.fetch(query);

                  setCollectionList(collectionData); 
                  
                  console.log(collectionData, '🔥');
                  if(collectionData.length >0 ){   setShowCollection(false); } 
          } 

          useEffect(() => {
                  fetchCollectionData();
          }, [address])

    //////// GET SELECT LIST FROM USER/////////////////////////////////// 

 

 

 
  return (
    <div className="overflow-hidden">
      <Header />

       
              <div className="createBox" >
                    <h1>Roalty Share</h1>
                    <p><small> A WEB3 RoyaltyShare solution that connect creators and artists to investors.  </small></p>
                    <p>Contents from INVESTMENTS PAGE in creatorpro.live</p>
              </div>

       <Footer />
 
     </div>
  )
}

export default RoaltyShare
