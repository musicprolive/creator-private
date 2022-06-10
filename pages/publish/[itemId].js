import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'

import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSwitchNetwork, useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { uuid } from '@sanity/uuid'

//import { ThirdwebSDK } from '@3rdweb/sdk' 
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'

import toast, { Toaster } from 'react-hot-toast'
import { AiTwotoneEdit, AiFillCheckCircle } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { ImCheckboxChecked, ImCheckmark, ImCross } from "react-icons/im";
import { BsFillPatchCheckFill } from "react-icons/bs";
import loadingGif from '../../assets/loadingGif.gif'
import ethIcon from '../../assets/icon-eth.jpg'
import polygonIcon from '../../assets/icon-polygon.jpg'

import  style  from './_styles'


/////ENVIO DE ARQUIVO PARA IPFS ///////////
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ClientError } from '@sanity/client'
import { devNull } from 'os'
const clientIpfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
/////ENVIO DE ARQUIVO PARA IPFS ///////////


const Publish = () => {

  ///////////////////////////////////////////////////   
  const router = useRouter()
  const { address, provider, connectWallet } = useWeb3()
  ///////////////////////////////////////////////////   


  ///////////////////////////////////////////////////   
  const [showPublishCt, setshowPublishCt] = useState(false);

  const [showCongratCt, setshowCongratCt] = useState(false);

  const [msgBtCreate, setMsgBtCreate] = useState("Publish NFT");

  const [msgBtlistNftToPublish, setMsgBtPublish] = useState("List to Sell");

  ///////////////////////////////////////////////////  

  const { itemId } = router.query;
  const [itemData, setItemData] = useState([]);

  const [itemSavedId, setItemSavedId] = useState("");


  const [extraLink, setExtraLink] = useState("");



  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ currency_: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", price_: '', name_: '', description_: '', collection_: '', link_: '', supply_: '' })


  const [newNftMinted, setnewNftMinted] = useState();
  const [propertiesList, setPropertiesList] = useState([]);

  const [collectionName, setCollectionName] = useState("");


  const [newCollectionId_, setCollectionId] = useState("");



  const [collectionStatus, setCollectionStatus] = useState(false);
  const [nftStatus, setNftStatus] = useState(false);
  const [publishStatus, setPublishStatus] = useState(false);

  ///////////////////////////////////////////////////  





  //////// GET SELECT FROM USER AND NFT  ////////////////////////////////// 
  ///////////////////////////////////////////////////  
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


  const fetchCollectionData = async (sanityClient = client) => {

    const query = `*[_type == "items" && _id == "${itemId}" ] {
      _id,  
      name, 
      description, 
      image, 
      properties, 
      nftObject, 
      createdBy, 
      collection, 
      supply, 
      link,
      status, 
      addrMumbai,
      addrRinkeby
    }`

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, 'ITEM FROM DB 🔥');


    setItemSavedId(collectionData[0]?._id);

    setItemData(collectionData[0]);

    setFileUrl(collectionData[0]?.image);

    const propertiesV = JSON.parse(collectionData[0]?.properties);
    console.log("propertiesV", propertiesV);


    const objectArray = Object.entries(propertiesV);
    const properties = [];
    objectArray.forEach(([key, value]) => {
      properties.push({ key: key, value: value, });
    });

    setPropertiesList(properties);

    getCollectionName();

    setExtraLink(collectionData[0]?.link);

    if (collectionData.length > 0) {
      if (collectionData[0]['contractAddress'] != "") {
        //getBundleModule(collectionData[0]['contractAddress']);   
      }
    }

  }

  const fetchCollectionInfo = async (sanityClient = client) => {

    const query = `*[_type == "items" && _id == "${itemId}" ] {
      _id,  
      name, 
      description, 
      image, 
      properties, 
      nftObject, 
      createdBy, 
      collection, 
      supply,
      status, 
      addrMumbai, 
      addrRinkeby
    }`

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, '🔥 ITEM(' + itemId + ")");

    setCollectionId(collectionData[0]?.collection?._ref);

    getCollectionName();

    setNetworkInfoNft({ addrRinkeby: collectionData[0]?.addrRinkeby, addrMumbai: collectionData[0]?.addrMumbai, status: collectionData[0]?.status });

  }




  const getCollectionName = async (sanityClient = client) => {

    let idItem = itemData?.collection?._ref;

    const query = `*[_type == "marketItems" && _id == "${idItem}" ] {
      _id,  
      title, 
      status, 
      addrMumbai, 
      addrRinkeby
    }`
    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, '🔥 GET COLLECTION NAME F ([ ' + idItem + " ])");

    if (collectionData[0]?.title) {
      setCollectionName(collectionData[0]?.title);
      setNetworkInfoCol({ _id: collectionData[0]?._id, addrRinkeby: collectionData[0]?.addrRinkeby, addrMumbai: collectionData[0]?.addrMumbai });
    }

  }


  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  


  useEffect(() => {
    fetchCollectionData();
    getUserIdSanity();
  }, [address, itemId])




  useEffect(() => {
    if (formInput.collection_ != bundleAddress) {
      //getBundleModule(formInput.collection_); 
    }
  }, [formInput.collection_]);


  useEffect(() => {
    fetchCollectionInfo();
    fetchCollectionData();
  }, [itemData?.collection?._ref])




  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  


  ///////////////// inica modulo bundle do thirdweb //////////////// 
  /////////////////////////////////////////////////////////////////
  const [bundleAddress, setBundleAddress] = useState("");
  const [currentBundleMode, setCurrentBundleMode] = useState();

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////



  //////////PICK RANDOM/////////////////////////////////
  //////////////////////////////////////////////////////


  function pickRandom() {
    var gen = (Math.random() * (0.120 - 100.000) + 100).toFixed(4);
    if (gen < 0.04) return 'Mytic';
    if (gen < 0.51) return 'Legendary';
    if (gen < 1.04) return 'Epic';
    if (gen < 5.18) return 'Super Rare';
    if (gen < 10.36) return 'Rare';
    if (gen < 82.86) return 'Commom';
    return "Uncommom";
  }


  //////////PICK RANDOM/////////////////////////////////
  //////////////////////////////////////////////////////



  //////////FORM CONTROL : VISIBILITY AND MESSAGES  //////
  //////////////////////////////////////////////////


  function showPublishScreen() {
    if (showPublishCt == true) { setshowPublishCt(false); } else { setshowPublishCt(true); }

  }

  function resetNewItem() {
    setFileUrl(null);
    setshowCongratCt(false);
  }

  //// exibe mensagem após retorno de ação /////////////
  const showMsg = (msgs, toastHandler = toast) => {
    toastHandler.success(
      "" + msgs,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  //////////FORM CONTROL : VISIBILITY AND MESSAGES  //////
  //////////////////////////////////////////////////


  /////////////////////V2 thirdweb ///////////////////////


  const [loadingCollection, setLoadingCollection] = useState(false);
  const [loadingNft, setLoadingNft] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);


  const [networkInfoCol, setNetworkInfoCol] = useState({ _id: "", addrRinkeby: "", addrMumbai: "" });
  const [networkInfoNft, setNetworkInfoNft] = useState({ _id: "", addrRinkeby: "", addrMumbai: "", status: "draft" });

  const [colorStates, setColorStates] = useState({
    colorRinkeby: '#ccc',
    colorMumbai: '#ccc',
  });



  const [currentNetwork, setCurrentNetwork] = useState('mumbai-network');
  const [currentColAddr, setCurrentColAddr] = useState("");
  const [currentNftAddr, setCurrentNftAddr] = useState("");

  ///////////SWITCH NETWORK////////////////////////// 

  async function switchCurrentNetwork(e) {


    /////////////////////////////////////

    let addrMumbaiCol = networkInfoCol?.addrMumbai;
    let addrRinkebyCol = networkInfoCol?.addrRinkeby;

    let addrMumbaiNft = networkInfoNft?.addrMumbai;
    let addrRinkebyNft = networkInfoNft?.addrRinkeby;


    let statusNft = networkInfoNft?.status;

    //////////////////////////////////////
    let colorMumbai = "#ccc";
    let colorRinkeby = "#ccc";
    let activeColAddr = "";
    let activeNftAddr = "";
    //////////////////////////////////////

    setCurrentNetwork(e.target.id);

    if (e.target.id == "mumbai-network") {
      colorMumbai = "#45ef89";
      activeColAddr = addrMumbaiCol;
      activeNftAddr = addrMumbaiNft;
    } else {
      colorRinkeby = "#45ef89";
      activeColAddr = addrRinkebyCol;
      activeNftAddr = addrRinkebyNft;
    }
    //////////////////////////////////////

    ///define a cor da rede ativa
    setColorStates({
      colorRinkeby: colorRinkeby,
      colorMumbai: colorMumbai,
    });
    //////////////////////////////////////

    setCurrentColAddr(activeColAddr);
    setCurrentNftAddr(activeNftAddr);


    //define ADDR DA  colecao na rede ativa 
    if (activeColAddr != 'draft' && activeColAddr != null) {
      setCollectionStatus(true);
    } else {
      setCollectionStatus(false);
    }


    //define ADDR  dO NFT  na rede ativa 
    if (activeNftAddr != 'draft' && activeNftAddr != null) {
      setNftStatus(true);
    } else {
      setNftStatus(false);
    }
    ////////////////////////////////////// 

  }
  ///////////SWITCH NETWORK//////////////////////////



  //// NFT  LIST TO SELL  /////////////   

  async function listNFTForSale() {


    //1-3///////////////////////// 
    if (currentColAddr == "" || currentColAddr == null) {
      await createNftCollectionModule();
      //CREATE COLL ADDR
    }

    //2-3///////////////////////// 
    if (currentNftAddr == "" || currentNftAddr == null) {
      await createNftItem();
      //CREATE NFT ADDR 
    }


    //3-3///////////////////////// 
    if ((currentColAddr != "" && currentColAddr != null) && (currentNftAddr != "" && currentNftAddr != null)) {
      await showListCt();
    }


    // setLoadingPublish(true);   

  }
  //// NFT  LIST TO SELL  /////////////   


  ///////////////// inica modulo marketplace do thirdweb ////////////////
  /////////////////////////////////////////////////////////////////  


  /////////CREATE A  COLLECTION MODULE /////////////
  async function createNftCollectionModule() {

    if (!provider) return;


    setLoadingCollection(true);


    let urlNetwork = "https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE";
    //let projectId = "0x6C1DD94286bA76BD8a92E320C4EdBA2C515F8F1d";
    //let mktplaceAddr = "0xB68523e99306B953d8476fBfA291C136A603fbB2";

    if (currentNetwork == "mumbai-network") {
      urlNetwork = "https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE";
      //projectId = "0x6C1DD94286bA76BD8a92E320C4EdBA2C515F8F1d";
      // mktplaceAddr = "0xB68523e99306B953d8476fBfA291C136A603fbB2";
    };

    ////////
    const sdk = new ThirdwebSDK(provider.getSigner(), urlNetwork);
    console.log("ThirdwebSDK RESULT", sdk);
    ////////

    // Data to create the pack
    const metadatas = {
      name: collectionName,
      primary_sale_recipient: address
    };

    try {
      let result = await sdk.deployer.deployNFTDrop(metadatas);
      console.log("sdk.deployer.deployNFTDrop", result);
      setCurrentColAddr(result);
      saveColAddr(result);
      setCollectionStatus(true);
      setLoadingCollection(false);
      return result;
    } catch (error) {
      console.log("ERROR sdk.deployer.deployNFTDrop", error);
      setLoadingCollection(false);
      return error;
    }
  };

  //////////CREATE A  COLLECTION MODULE /////////////


  //////////CREATE A  NFT  MODULE /////////////
  async function createNftItem() {

    if (!provider) return;

    setLoadingNft(true);

    let urlNetwork = "https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE";
    //let projectId = "0x6C1DD94286bA76BD8a92E320C4EdBA2C515F8F1d";
    //let mktplaceAddr = "0xB68523e99306B953d8476fBfA291C136A603fbB2";

    if (currentNetwork == "mumbai-network") {
      urlNetwork = "https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE";
      //projectId = "0x6C1DD94286bA76BD8a92E320C4EdBA2C515F8F1d";
      // mktplaceAddr = "0xB68523e99306B953d8476fBfA291C136A603fbB2";
    };

    ////////
    const sdk = new ThirdwebSDK(provider.getSigner(), urlNetwork);
    console.log("ThirdwebSDK RESULT", sdk);
    ////////

    // Data to create the pack


    try {
      const contractCol = sdk.getNFTDrop(currentColAddr);
      console.log(" sdk.getNFTDrop", contractCol);


      const metadatas = [{
        name: itemData?.name,
        description: itemData?.description,
        image: fileUrl, // This can be an image url or file
      }];

      const results = await contractCol.createBatch(metadatas); // uploads and creates the NFTs on chain
      console.log("contractCol.createBatch", results);

      const firstTokenId = results[0]?.id; // token id of the first created NFT
      // const firstNFT = await results[0]?.data(); // (optional) fetch details of the first created NFT
      saveNftAddr("" + firstTokenId);
      setCurrentNftAddr("" + firstTokenId);
      setNftStatus(true);
      setLoadingNft(false);


      ///////
      // const resClaim  = await contractCol.claim(  itemData?.supply );
      // console.log( "contractCol.claim" , resClaim); 
      ///////

      ///////  
      const addressV = "0xaf4521fD334c9Fd8a02ba96740D8142a5adE1B28"; // address of the wallet you want to claim the NFTs
      const quantity = 1; // how many unique NFTs you want to claim

      const tx = await contractCol.claimTo(addressV, quantity);
      console.log("contractCol.claimTo", tx);
      const receipt = tx.receipt; // the transaction receipt
      const claimedTokenId = tx.id; // the id of the NFT claimed
      const claimedNFT = await tx.data(); // (optional) get the claimed NFT metadata 
      ///////

      return results;

    } catch (error) {
      console.log("ERROR contractCol.createBatch", error);
      setLoadingNft(false);
      return error;
    }
  };
  //////////CREATE A  NFT  MODULE /////////////


  ////////listNftToPublish /////////////////////////////////////


  ///////////////////////////////////////////////////   
  const [showCtSubmitToList, setShowCtSubmitToList] = useState(true);


  async function listNftToPublish() {


    if (!provider) return;

    setShowCtSubmitToList(true);
    setMsgBtPublish("Wait...");


    let urlNetwork = "https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE";
    let mktplaceAddr = "0xB68523e99306B953d8476fBfA291C136A603fbB2";

    if (currentNetwork == "mumbai-network") {
      urlNetwork = "https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE";
      mktplaceAddr = "0xB68523e99306B953d8476fBfA291C136A603fbB2";
    };

    ////////
    const sdk = new ThirdwebSDK(provider.getSigner(), urlNetwork);
    console.log("ThirdwebSDK RESULT", sdk);
    ////////


    const contractMktPlace = sdk.getMarketplace(mktplaceAddr);
    console.log("sdk.getMarketplace", contractMktPlace);



    ///////SAVE IN SANITY TO REVISION //////////////////
    sendNftToRevision();
    ///////SAVE IN SANITY TO REVISION //////////////////

    try {
      // Data of the listing you want to create
      const listing = {
        // address of the contract the asset you want to list is on
        assetContractAddress: currentColAddr,
        // token ID of the asset you want to list
        tokenId: currentNftAddr,
        // in how many seconds will the listing open up
        startTimeInSeconds: 0,
        // how long the listing will be open for
        listingDurationInSeconds: 864000,
        // how many of the asset you want to list
        quantity: itemData?.supply,
        // address of the currency contract that will be used to pay for the listing
        currencyContractAddress: formInput?.currency_,
        // how much the asset will be sold for
        buyoutPricePerToken: formInput?.price_,
      }

      console.log("OBJECT PREPARED TO SEND", listing);

      const tx = await contractMktPlace.direct.createListing(listing);

      console.log("contractMktPlace.direct.createListing", tx);
      const receipt = tx?.receipt; // the transaction receipt  
      const id = tx?.id; // the id of the newly created listing 
      ///SAVE STATUS OF NFT TO PUBLISH/////////////////////////
      if (id != null) { saveNftStatus(id); }
      ///SAVE STATUS OF NFT TO PUBLISH/////////////////////////

    } catch (error) {
      console.log("contractMktPlace.direct.createListing", error);
      //return error;
    }


    setShowCtSubmitToList(false);
    setMsgBtPublish("List to Sell");


  }
  ////////////listNftToPublish/////////////////////////////////





  //////////UPDATE COLL ADDR //////////////////////
  async function saveColAddr(addr) {

    try {

      const id = uuid();

      let userDoc = {
        contractAddress: addr,
        moduleAddress: addr
      }
      if (currentNetwork == 'mumbai-network') {
        userDoc['addrMumbai'] = addr;
      } else {
        userDoc['addrRinkeby'] = addr;
      }


      const result = await client.patch(networkInfoCol._id) // Document ID to patch
        .set(userDoc) // Shallow merge
        //.inc({numSold: 1}) // Increment field by count
        .commit() // Perform the patch and return a promise
        .then((updatedReturn) => {
          console.log('Hurray,  is updated! New document:')
          console.log(updatedReturn);
          return updatedReturn;
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message);
          return err;
        })

      console.log("SAVE ADDR", result);

    } catch (error) {
      console.log("ERRO SAVE ADDR", error);
    }
  }
  //////////UPDATE COLL ADDR //////////////////////



  //////////UPDATE NFT ADDR //////////////////////
  async function saveNftAddr(addr) {

    try {

      const id = uuid();

      let userDoc = {
        contractAddress: addr,
        moduleAddress: addr
      }
      if (currentNetwork == 'mumbai-network') {
        userDoc['addrMumbai'] = addr;
      } else {
        userDoc['addrRinkeby'] = addr;
      }


      const result = await client.patch(itemId) // Document ID to patch
        .set(userDoc) // Shallow merge
        //.inc({numSold: 1}) // Increment field by count
        .commit() // Perform the patch and return a promise
        .then((updatedReturn) => {
          console.log('Hurray,  is updated! New document:')
          console.log(updatedReturn);
          return updatedReturn;
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message);
          return err;
        })

      console.log("SAVE ADDR", result);

      return result;

    } catch (error) {
      console.log("ERRO SAVE ADDR", error);
      return error;
    }
  }
  //////////UPDATE NFT ADDR//////////////////////



  //////////UPDATE NFT ADDR //////////////////////
  async function saveNftStatus(addr) {

    try {

      const id = uuid();
      let userDoc = { status: addr }

      const result = await client.patch(itemId) // Document ID to patch
        .set(userDoc) // Shallow merge
        //.inc({numSold: 1}) // Increment field by count
        .commit() // Perform the patch and return a promise
        .then((updatedReturn) => {
          console.log('Hurray,  is updated! New document:')
          console.log(updatedReturn);
          return updatedReturn;
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message);
          return err;
        })

      console.log("SAVE ADDR", result);

    } catch (error) {
      console.log("ERRO SAVE ADDR", error);
    }
  }
  //////////UPDATE NFT ADDR//////////////////////




  //////////UPDATE NFT ADDR //////////////////////
  async function sendNftToRevision() {

    try {


      //0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ETH
      //0xc778417e063141139fce010982780140aa0cd5ab WETH
      //0xeb8f08a975ab53e34d8a0330e0d34de942c95926 USDC
      //0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad USDT

      let currencyNick = "ETH";
      switch (formInput?.currency_) {
        case "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":
          currencyNick = "ETH";
          break;
        case "0xc778417e063141139fce010982780140aa0cd5ab":
          currencyNick = "WETH";
          break;
        case "0xeb8f08a975ab53e34d8a0330e0d34de942c95926":
          currencyNick = "USDC";
          break;
        case "0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad":
          currencyNick = "USDT";
          break;
        default:
          currencyNick = "ETH";
          break;
      }



      let userDoc = { status: 'revision', price: formInput?.price_, currency: currencyNick }

      const result = await client.patch(itemId) // Document ID to patch
        .set(userDoc) // Shallow merge
        //.inc({numSold: 1}) // Increment field by count
        .commit() // Perform the patch and return a promise
        .then((updatedReturn) => {
          console.log('Hurray,  is updated! New document:')
          console.log(updatedReturn);
          return updatedReturn;
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message);
          return err;
        })

      console.log("SAVE ADDR", result);

    } catch (error) {
      console.log("ERRO SAVE ADDR", error);
    }
  }
  //////////UPDATE NFT ADDR//////////////////////



  /////////////////////////////////////////////
  async function showListCt() {
    setshowCongratCt(true);
  }
  /////////////////////////////////////////////




  return (
    <div className="overflow-hidden">
      <Header />

      {showCongratCt ?

        <div className="formCreate" style={{ marginBottom: '100px' }} >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="createBox w-full">
              <h1 style={{ color: '#fff', textAlign: "center" }}>Congratulations!</h1>

              <p> Your  nft  collection was created!<br /> <br /> </p>

              <div className="flex flex-wrap -mx-3 mb-6" style={{ background: "rgba(7,7,7,0.5)", padding: "15px" }}>

                {showCtSubmitToList ?
                  <div className="w-full px-3">

                    <p style={{ fontSize: '1.3em' }}>List to sell now! </p>

                    <div>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        CURRENCY <strong style={{ color: 'red' }}>*</strong>
                      </label>

                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={e => updateFormInput({ ...formInput, currency_: e.target.value })} >
                        <option value="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" >ETH (Ethereum)</option>
                        <option value="0xc778417e063141139fce010982780140aa0cd5ab" >WETH (Wrapped Ether)</option>
                        <option value="0xeb8f08a975ab53e34d8a0330e0d34de942c95926" >USDC (USD Coin)</option>
                        <option value="0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad" >USDT (Tether USD)</option>
                      </select>
                    </div>


                    <div>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Price
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="titleCollection" type="input" placeholder="0.01" onChange={e => updateFormInput({ ...formInput, price_: e.target.value })} />

                      <button style={{ width: "100%", marginTop: '25px', padding: "10px", borderRadius: '10px', color: '#fff', background: '#4B7ABE' }} onClick={listNftToPublish}  > {msgBtlistNftToPublish} </button>

                      <p className="text-gray-600 text-xs italic"> <strong style={{ color: 'red' }}>Gas fee </strong>: You have to be prepared for 1 transaction.</p>

                    </div>
                  </div>


                  :
                  <div className="w-full px-3">
                    <p> <strong style={{ color: 'green' }}>Your content has been submitted for approval.</strong>  <br />  Our team will be check your content as soon as possible.</p>
                  </div>
                }

              </div>


              <Link href="/dashboard/" ><a><button style={{ width: '100%', marginTop: '25px', padding: "10px", borderRadius: '10px', color: '#fff', background: '#111' }} >Go to  Dashboard </button></a></Link>


              <Link href={"/create/"}><a><button style={{ width: '100%', marginTop: '25px', padding: "10px", borderRadius: '10px', color: '#fff', background: '#111' }} onClick={resetNewItem}   >Create a new item</button> </a></Link>

            </div>
          </div>
        </div>
        :

        <div>
          {!showPublishCt ?
            <div>
              <div className={style.formCreate} >
                <div className={style.createBoxPublish}>
                  <h1 className={style.createBoxTitle}>Review and Publish</h1>
                  <p className={style.createBoxText}> 
                    <strong className={style.confirmationIcon}>Warning </strong>
                    : Review your content . You won't be able to edit it after publishing.   
                  </p>
                </div>

                <Toaster position="top-center" reverseOrder={false} />

                <div className={style.boxContainer}>
                  <div className={style.box}>
                    {
                      fileUrl && (
                        <img className={style.fileUrlStyle} width="100%" src={fileUrl} />
                      )
                    }
                  </div>
                </div>

                <div className={style.boxContainer}>
                  <div className={style.box}>
                    <label className={style.itemName} for="grid-password">
                      Title: 
                      <strong className={style.confirmationIcon}>*</strong>
                    </label>

                    <h1>{itemData?.name} </h1>
                    <hr />
                  </div>
                </div>

                <div className={style.boxContainer}>
                  <div className={style.box}>
                    <label className={style.itemName} for="grid-password">
                      Collection : 
                      <strong className={style.confirmationIcon}>*</strong>
                    </label>
                    <p> {collectionName}  </p>
                    { /*  } <p> { itemData?.collection?._ref} </p> {  /**/}
                    <hr />
                  </div>
                </div>

                <div className={style.boxContainer}>
                  <div className={style.box}>
                    <label className={style.itemName} for="grid-password">
                      Description : 
                      <strong className={style.confirmationIcon}>*</strong>
                    </label>

                    <p> {itemData?.description}  </p>
                    <hr />
                  </div>
                </div>

                <div className={style.boxContainer}>
                  <div className={style.box}>
                    <label className={style.itemName} for="grid-password">
                      Supply : 
                      <strong className={style.confirmationIcon}>*</strong>
                    </label>

                    <p> {itemData?.supply}  </p>
                    <hr />
                  </div>
                </div>

                <div className={style.boxContainer}>
                  <div className={style.box}>
                    <label className={style.itemName} for="grid-password">
                      Extra Link : 
                      <strong className={style.confirmationIcon}>*</strong>
                    </label>

                    <p> {extraLink}  </p>
                    <hr />
                  </div>
                </div>

                <div className={style.boxContainer}>
                  <div className={style.box}>
                    <label className={style.itemName} for="grid-password">
                      Static Proprierties : 
                      <strong className={style.confirmationIcon}>*</strong>
                    </label>

                    {propertiesList.map((item, id) => (
                      <p key={id} className={style.propertiesList}>  {item.key}    :  {item.value}   </p>
                    ))}

                    <hr />
                  </div>
                </div>

                <div className={style.boxContainer}>
                  <div className={style.box}>

                    <button className={style.publishButton} onClick={showPublishScreen}  >Go to Publish</button>

                    <hr />

                    <div className={style.createBox}>
                      <small className={style.edit}>
                        <Link href={"/create/" + itemId} >
                          <a> 
                            <AiTwotoneEdit className={style.editText} /> Back to Edit 
                          </a>
                        </Link>   
                      </small>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            :

            <div className={style.formCreate} >
              <div className={style.boxContainer}>
                <div className={style.publishContainer}>

                  <hr />

                  <div className={style.createBoxPublish}>
                    <h1 className={style.createBoxTitle} >Publish Your NFT</h1>

                    <p className={style.createBoxText}> Follow the steps bellow to publish and sell your NFT.   </p>
                  </div>

                  <div className={style.networkContainer}>
                    <p className={style.networkText}> Select the Network :</p>

                    <p id="rinkeby-network" onClick={switchCurrentNetwork} className={style.networkOptions}>  
                      <Image src={ethIcon} height={30} width={26} /> 
                      <br /> Etherium  <br /> 
                      <small className={style.metaMaskOption}>(Rinkeby)</small>
                    </p>


                    <p id="mumbai-network" onClick={switchCurrentNetwork} className={style.networkOptions}>   
                      <Image src={polygonIcon} height={30} width={26} />  
                      <br />Polygon  <br /> 
                      <small className={style.metaMaskOption}>(Mumbai)</small> 
                    </p>

                    <div className={style.clearDiv}></div>
                  </div>

                  <p className={style.statusContainer}>
                    {!collectionStatus ?
                      <MdError className={style.statusIcon} />
                      :
                      <AiFillCheckCircle className={style.aiFillCheckCircle} />
                    }

                    1  ) Publish your collection in the network  
                    {loadingCollection ? 
                    <Image src={loadingGif} height={30} width={30} /> : ""}     
                  </p>

                  <hr />
                  <br />
                  <p className={style.statusContainer}>

                    {!nftStatus ?
                      <MdError className={style.statusIcon} />
                      :
                      <AiFillCheckCircle className={style.aiFillCheckCircle} />
                    }

                    2 )   Publish your NFT in the network        
                    {loadingNft ? 
                    <Image src={loadingGif} height={30} width={30} /> : ""}   
                  </p>

                  <hr /><br />
                  <p className={style.statusContainer}>

                    {!publishStatus ?
                      <MdError className={style.statusIcon} />
                      :
                      <AiFillCheckCircle className={style.aiFillCheckCircle} />
                    }

                    3  )  List to Sell      
                    {loadingPublish ? 
                    <Image src={loadingGif} height={30} width={30} /> : ""}     
                  </p>

                  <button className={style.pageButton} onClick={listNFTForSale}  >{msgBtCreate}</button>

                  <p className={style.specifications}> 
                    <br /> 
                    <strong className={style.confirmationIcon}>Gas fee </strong>
                    : You have to be prepared  for 3 gas fee  transactions to publish you NFT 
                    collection in the blockchain.
                  </p>

                  <div className={style.createBox}>
                    <small className={style.edit} onClick={showPublishScreen} >  
                      <AiTwotoneEdit className={style.editText} /> Back to Review  
                    </small>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
      <Footer />
    </div>
  )
}

export default Publish