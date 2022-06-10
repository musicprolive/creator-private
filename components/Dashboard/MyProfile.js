import React, { useState, useEffect } from "react";

import { useRouter } from 'next/router'
import Image from 'next/image'

import { AiOutlineInstagram, AiOutlineTwitter, AiFillEdit } from 'react-icons/ai'

import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import noImage from '../../assets/noImage.png'
import loadingGif from '../../assets/loadingGif.gif'

/////ENVIO DE ARQUIVO PARA IPFS ///////////
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ClientError } from '@sanity/client'
const clientIpfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
/////ENVIO DE ARQUIVO PARA IPFS ///////////

import toast, { Toaster } from 'react-hot-toast'
import EditProfile from '../EditProfile'

//////////////translate//////////////////////////
import { useTranslation } from 'next-i18next'
import { style } from "./styles";

const translate = {
  en: {
    title: "Edit Profile",
    account: "Account",
    collections: "Collections",
    items: "Items",
    publishRequests: "Admin"
  },
  pt: {
    title: "Editar Perfil",
    account: "Perfil",
    collections: "Coleções",
    items: "Items",
    publishRequests: "Admin"
  },
};
//////////////translate////////////////////////// 

export default function MyProfile({ }) {
  const router = useRouter()

  const { address, provider, connectWallet } = useWeb3()

  //////////////translate//////////////////////////
  //const { t , i18n  } =  useTranslation(['translation', 'common']); 
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = translate[locale];
  //////////////translate//////////////////////////


  ////////////////////////////


  const [showLoading, setShowLoading] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [collectionIdInSanity, setCollectionIdInSanity] = useState("");
  const [userInfoSanity, setUserInfoSanity] = useState({});
  const [userIdInSanity, setUserIdInSanity] = useState("");
  ////////////////////////////

  const getUserIdSanity = async (sanityClient = client) => {

    setShowLoading(true);
    const query = `*[_type == "users" && walletAddress == "${address}" ] {
    _id , 
    userName, 
    twitterHandle,
    igHandle, 
    email, 
    phone,
    "profileImage": profileImage.asset->url,
  }`
    const userData = await sanityClient.fetch(query);
    if (userData.length > 0) {
      setUserIdInSanity(userData[0]['_id']);
      setUserInfoSanity(userData[0]);
    }
    setShowLoading(false);
  }


  useEffect(() => {
    getUserIdSanity();
  }, [address])

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
        <div className="relative p-6 flex-auto" style={{ color: "#000", textAlign: "left" }}>


          {userInfoSanity?.profileImage ?
            <div style={{ float: "left", marginBottom: "80px", marginRight: "20px" }}>
              <img src={userInfoSanity?.profileImage} width="80" />
              <EditProfile collectionId={userInfoSanity?._id} />
            </div>

            :
            <div style={{ float: "left", marginBottom: "30px", marginRight: "20px" }}>
              <Image src={noImage} height={80} width={80} /><br />
              <EditProfile collectionId={userInfoSanity?._id} />
            </div>
          }


          <p style={{ color: "#000", textAlign: "left" }}>Name : {userInfoSanity.userName}</p>
          <p style={{ color: "#000", textAlign: "left" }}>Email : {userInfoSanity.email}</p>
          <p style={{ color: "#000", textAlign: "left" }}>Phone : {userInfoSanity.phone}</p>
          <p style={{ color: "#000", textAlign: "left" }}>Twiiter : {userInfoSanity.twitterHandle}</p>
          <p style={{ color: "#000", textAlign: "left" }}>Instagram  : {userInfoSanity.igHandle}</p>


        </div>


        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">


        </div>
      </div>


    </>


  );
}
