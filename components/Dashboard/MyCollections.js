import React, { useState, useEffect } from "react";

import { useRouter } from 'next/router'

import { AiOutlineInstagram, AiOutlineTwitter, AiFillEdit } from 'react-icons/ai'
import Image from 'next/image'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'

import noImage from '../../assets/noImage.png'
import loadingGif from '../../assets/loadingGif.gif'
import { AiTwotoneEdit, AiFillCheckCircle } from "react-icons/ai";
import { MdError } from "react-icons/md";

import EditCollection from '../EditCollection'

/////ENVIO DE ARQUIVO PARA IPFS ///////////
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ClientError } from '@sanity/client'
const clientIpfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
/////ENVIO DE ARQUIVO PARA IPFS ///////////

import toast, { Toaster } from 'react-hot-toast'

//////////////translate//////////////////////////

import { useTranslation } from 'next-i18next'

const translate = {
  en: {
    title: "My Collections",
    account: "Account",
    collections: "Collections",
    items: "Items",
    publishRequests: "Admin"
  },
  pt: {
    title: "Minhas Coleções",
    account: "Perfil",
    collections: "Coleções",
    items: "Items",
    publishRequests: "Admin"
  },
};
//////////////translate////////////////////////// 

export default function MyCollections({ }) {
  const router = useRouter()
  const { address, provider, connectWallet } = useWeb3()

  //////////////translate//////////////////////////
  //const { t , i18n  } =  useTranslation(['translation', 'common']); 
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = translate[locale];
  //////////////translate//////////////////////////

  ////////////////////////////

  const [collectionIdInSanity, setCollectionIdInSanity] = useState("");

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

  ////////////////////////////

  const [showLoading, setShowLoading] = useState(false);

  const [showModal, setShowModal] = React.useState(false);

  const [objectBanner, setObjectBanner] = useState(null);
  const [fileUrlBanner, setFileUrlBanner] = useState(null);

  const [objectImageProfile, setObjectImageProfile] = useState(null);
  const [fileUrlProfile, setFileUrlProfile] = useState(null);

  const [formInput, updateFormInput] = useState({ title_: "", description_: "" })


  //// função onchange para enviar a imagem  /////////////
  async function onChange(e) {
    const file = e.target.files[0];
    uploadToSanity(file, "banner");
  }

  async function onChangeProfile(e) {
    const file = e.target.files[0];
    uploadToSanity(file, "profile");
  }


  const [collection, setCollection] = useState([])

  const fetchCollectionData = async (sanityClient = client) => {

    // && contractAddress == "${collectionId}" 

    // &&  walletAddress=="${address}" 
    setShowLoading(true);

    const query = `*[_type == "marketItems" ] {
        _id,
        "imageUrl": profileImage.asset->url,
        "bannerImageUrl": bannerImage.asset->url,
        volumeTraded,
        createdBy,
        contractAddress,
        "creator": createdBy->userName,
        title, floorPrice,
        "allOwners": owners[]->,
        description,status
      }`

    const collectionDataV = await sanityClient.fetch(query)

    console.log(collectionDataV, '🔥')

    setCollectionData(collectionDataV);
    setCollection(collectionDataV);
    setShowLoading(false);
  }

  useEffect(() => {
    fetchCollectionData()
  }, [address])



  const [collectionData, setCollectionData] = useState([])

  return (
    <>

      {/*content*/}
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">

          <h3 className="text-3xl font-semibold" style={{ color: "#222" }}>
            {objTrans.title}
          </h3>

          {showLoading ?
            <div style={{ width: "50px", float: "left", textAlign: "left" }}><Image src={loadingGif} height={30} width={30} /></div>
            :
            ""
          }

        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto">

          {collection.map((collectionItem, id) => (

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">


                {collectionItem?.imageUrl ?
                  <div style={{ float: "left", marginBottom: "30px", marginRight: "20px" }}>
                    <img src={collectionItem?.imageUrl} width="80" />
                    <EditCollection collectionId={collectionItem?.contractAddress} />
                  </div>

                  :
                  <div style={{ float: "left", marginBottom: "30px", marginRight: "20px" }}>
                    <Image src={noImage} height={80} width={80} /><br />
                    <EditCollection collectionId={collectionItem?.contractAddress} />
                  </div>
                }
                <h2>{collectionItem?.title}</h2>
                <p style={{ textAlign: 'left', color: '#000' }}>{collectionItem?.description}</p>
                <p style={{ textAlign: 'left', color: '#000' }}>status: {collectionItem?.status}</p>

                <p style={{ textAlign: "left", color: "#000" }}>


                  {!collectionItem?.contractAddress ?
                    <MdError style={{ display: "inline", fontSize: "1.4em", color: "#ffcc00", marginR: "0px 10px" }} />
                    :
                    <AiFillCheckCircle style={{ display: "inline", fontSize: "1.4em", color: "green", marginR: "0px 10px" }} />
                  }

                  Contract Address  : {collectionItem?.contractAddress}
                </p>

                <div style={{ clear: "both" }}></div>

                <hr />

              </div>
            </div>
          ))}

        </div>

        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

        </div>
      </div>

    </>

  );
}
