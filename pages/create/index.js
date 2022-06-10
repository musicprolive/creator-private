import React, { useEffect, useState } from 'react'
import { supply, description, name, price } from '../../components/masks';
import Select from 'react-select'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { uuid } from '@sanity/uuid'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import toast, { Toaster } from 'react-hot-toast'
import { AiTwotoneEdit } from "react-icons/ai";

import  style   from './_styles';

/////ENVIO DE ARQUIVO PARA IPFS ///////////
import { create as ipfsHttpClient } from 'ipfs-http-client'
const clientIpfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
/////ENVIO DE ARQUIVO PARA IPFS ///////////

//////////////translate//////////////////////////
const translate = {
  en: {
    title: "Create New NFT Item",
    requiredItems: "Required Items"
  },
  pt: {
    title: "Criar Novo NFT",
    requiredItems: "Items obrigatórios"
  },
};
//////////////translate////////////////////////// 

const Create = () => {
  const router = useRouter()

  //////////////translate//////////////////////////
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = translate[locale];
  //////////////translate//////////////////////////

  const { address, provider, } = useWeb3()
  const { itemId } = router.query;
  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  
  const [optionsCategory, changeOptionsCategory] = useState([]);

  const [showCongratCt, setshowCongratCt] = useState(false);
  const [showMoreCt, setShowMore] = useState(false);
  const [showCollection, setShowCollection] = useState(true);
  const [showStaticProp, setStaticProperties] = useState(false);
  const [showRandomProp, setRandomProperties] = useState(false);

  const [msgBtNewCollection, setMsgBtNewCol] = useState("Save");
  const [msgBtCreate, setMsgBtCreate] = useState("Create Item");

  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  

  const [itemData, setItemData] = useState([]);
  const [extraLink, setExtraLink] = useState("");

  const [currentIndexCollectionSelected, setCurrentIndexCollectionSelected] = useState({});

  const [newCollectionId_, setCollectionId] = useState("");
  const [newCollectionName_, setCollectionName] = useState("");
  const [collectionsList, setCollectionList] = useState([{ title: '', _id: '' }]);
  const [userIdInSanity, setUserIdInSanity] = useState("");

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ currency_: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", price_: '', name_: '', description_: '', collection_: '', link_: '', supply_: '' })

  const [properties, setProperties] = useState([]);
  const [propertiesList, setPropertiesList] = useState([]);
  const [formProperties, updatePropriety] = useState({ key_: "", value_: '' });
  const [itemSavedId, setItemSavedId] = useState("");

  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  
  ///////////////////////////////////////////////////  

  //////// GET SELECT LIST FROM USER///////////////////////////////////
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
    const query = `*[_type == "marketItems" && createdByWallet == "${address}" ] {
      _id, 
      title, 
      contractAddress
    }`

    const collectionData = await sanityClient.fetch(query);

    setCollectionList(collectionData);

    //////
    let collectionOptions = [];
    let objectKeys = {};
    let i = 0;
    for (let item of collectionData) {
      objectKeys['' + item._id] = i;
      collectionOptions.push({ index: i, value: item._id, label: item.title });
      i += 1;
    };
    setCurrentIndexCollectionSelected(objectKeys);
    changeOptionsCategory(collectionOptions);
    //////

    console.log(collectionData, '🔥');

    if (collectionData.length > 0) { setShowCollection(false); }
  }

  useEffect(() => {
    fetchCollectionData();
    getUserIdSanity();
  }, [address])

  useEffect(() => {
    fetchCollectionInfo();
    fetchCollectionData();
  }, [itemId, itemData, itemData?.collection?._ref])

  const fetchCollectionItem = async (sanityClient = client) => {

    const query = `*[_type == "items" && _id == "${itemSavedId}" ] {
      _id,  
      name, 
      description, 
      image, 
      properties, 
      nftObject, 
      createdBy, 
      collection, 
      supply, 
      link
    }`

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, '🔥 ITEM');

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

    updateFormInput({
      name_: collectionData[0]?.name,
      description_: collectionData[0]?.description,
      supply_: collectionData[0]?.supply,
      price_: collectionData[0]?.description,
      collection_: collectionData[0]?.collection_,
      link_: collectionData[0]?.link,
    });

    ///
    setCollectionId(collectionData[0]?.collection?._ref);
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
       supply
    }`

    const collectionData = await sanityClient.fetch(query);
    console.log(collectionData, '🔥 ITEM');

    getCollectionName();
    setCollectionId(collectionData[0]?.collection?._ref);
  }

  const getCollectionName = async (sanityClient = client) => {

    const query = `*[_type == "marketItems" && _id == "${itemData?.collection?._ref}" ] {
      _id,  
      title
    }`
    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, '🔥 GET COLLECTION NAME SELECTED');

    setCollectionName(collectionData[0]?.title);

    console.log("222", collectionData[0]?._id);

  }

  //////// GET SELECT LIST FROM USER/////////////////////////////////// 



  ///////////////FORM FUNCTIONS//////////////////// 

  ///SALVAR NOVA COLECAO 
  async function saveNewCollection() {
    if (newCollectionName_ == "") return;
    saveCollectionInSanity("");
  }
  //// função onchange para enviar a imagem  /////////////
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await clientIpfs.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      );
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file (a1): ', error)
    }
    ////
  }
  ///////////////FORM FUNCTIONS///////////////////




  ////// saveCollectionInSanity///////////////////////////
  //////////////////////////////////////////////////////////


  async function saveCollectionInSanity(bundleAddress) {

    setMsgBtNewCol("Wait...");

    try {

      const id = uuid();

      const userDoc = {
        _id: id,
        _type: "marketItems",
        title: newCollectionName_,
        createdByWallet: address,
        moduleAddress: "",
        contractAddress: "",
        createdBy: {
          _type: 'reference',
          _ref: userIdInSanity
        },
      }

      const result = await client.createIfNotExists(userDoc);

      showMsg("Sucesso");
      fetchCollectionData();
      setMsgBtNewCol("Save");

      console.log(result);

    } catch (error) {

      setMsgBtNewCol("Save");
      console.log(error);

    }
  }
  ////// saveCollectionInSanity///////////////////////////
  //////////////////////////////////////////////////////////



  ////// NFT EXTRA  PROPRIETIES ///////////////////////////
  //////////////////////////////////////////////////////////

  async function addProperties() {

    if (formProperties.key_ == "" || formProperties.value_ == "") return;

    let pro = properties;
    pro.push({ key: formProperties.key_, value: formProperties.value_ });
    setProperties(pro);
    updatePropriety({ key_: formProperties.key_, value_: formProperties.value_ });
    console.log("properties", properties);

  }


  useEffect(() => {
    setPropertiesList(properties);
    console.log("propertiesList", propertiesList);
  }, [formProperties])



  ////// NFT EXTRA  PROPRIETIES ///////////////////////////
  //////////////////////////////////////////////////////////



  //////////SAVE NFT NO SANITY //////
  /////////////////////////////////// 

  async function saveNFTInSanity() {

    setMsgBtCreate("Wait...");

    ///////ADD PROPRIETIES
    let propertiesF = {};


    for (const item of properties) {
      propertiesF["" + item.key] = "" + item.value;
    }
    ///////ADD PROPRIETIES         

    try {

      const id = uuid();

      if (itemSavedId != "") { id = itemSavedId } else {
        setItemSavedId(id);
      }

      let nftObject = {
        metadata: {
          name: formInput.name_,
          description: formInput.description_,
          image: fileUrl,
          properties: propertiesF
        },
        supply: formInput.supply_
      };


      const userDoc = {
        _id: id,
        _type: "items",
        name: formInput.name_,
        description: formInput.description_,
        image: fileUrl,
        supply: formInput.supply_,
        properties: JSON.stringify(propertiesF),
        nftObject: JSON.stringify(nftObject),
        link: formInput.link_,
        createdBy: {
          _type: 'reference',
          _ref: userIdInSanity
        },
        collection: {
          _type: 'reference',
          _ref: formInput?.collection_
        },
        status: "draft"
      }

      const result = await client.createOrReplace(userDoc);

      console.log(result);
      console.log('Item saved!');
      showMsg("Item saved with Success!");
      setMsgBtCreate("Create Item");
      setshowCongratCt(true);

      return result;

    } catch (error) {

      setMsgBtCreate("Create");
      console.log(error);
      return error;

    }
  }
  //////////SAVE NFT NO SANITY //////
  ///////////////////////////////////



  //////////FORM CONTROL : VISIBILITY AND MESSAGES  //////
  /////////////////////////////////////////////////////// 


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

  ////funcoes de exibicao de items no formulario /////////////
  function showNewCollection() {
    if (showCollection == false) { setShowCollection(true); } else { setShowCollection(false); };
  }
  function ShowMoreBt() {
    if (showMoreCt == false) { setShowMore(true); } else { setShowMore(false); };
  }


  function showStaticProperties() {
    if (showStaticProp == false) { setStaticProperties(true); } else { setStaticProperties(false); }
  }

  function showRandomProperties() {
    if (showRandomProp == false) { setRandomProperties(true); } else { setRandomProperties(false); }
  }


  function reviewItem() {
    fetchCollectionItem();
    setMsgBtCreate('Save Item');
    setshowCongratCt(false);
  }



  function resetNewItem() {
    setMsgBtCreate('Create Item');
    setProperties([]);
    setPropertiesList([]);
    setFileUrl(null);
    setshowCongratCt(false);
  }

  //////////FORM CONTROL : VISIBILITY AND MESSAGES  //////
  /////////////////////////////////////////////////////// 




  //funcao para validar os inputs
  const handleKeyUp = (ev) => {
    switch (ev.target.name) {
      case 'name':
        name(ev);
        break;
      case 'supply':
        supply(ev);
        break;
      case 'description':
        description(ev);
        break;
      case 'price':
        price(ev);
      default:
        '';
    }
  };


  return (
    <div className="overflow-hidden">
      <Header />

      {showCongratCt ?

        <div className={style.showCongratCt} >
          <div className={style.boxContainer}>
            <div className={style.createBox}>
              <h1 className={style.congratTitle}>Congratulations!</h1>

              <p className={style.createBoxText}>
                <strong className={style.createBoxHighlighted}>Great! 
                </strong> Your  item  was saved . <br /> Go to
                <strong>"review and Publish"</strong> to list and sell your  NFT collection .
              </p>

              <Link href={"/publish/" + itemSavedId} >
                <a>
                  <button className={style.pageButton}> Review and Publish</button>
                </a>
              </Link>

              <p className={style.editItemTitle}>
                <Link href={"/create/" + itemSavedId} >
                  <a>
                    <small className={style.editItemLink}>
                      <AiTwotoneEdit className={style.editItem}/> 
                      Edit Item 
                    </small>
                  </a>
                </Link>
              </p>


              { /*
                <p  onClick={reviewItem} style={{marginTop:"20px" , cursor:"pointer"}}>
                  <small style={{color:"red" , textAlign:"center"}} >  
                    <AiTwotoneEdit style={{fontSize:'1.3em'}} style={{textAlign:"center", width:"100%"}}/> Edit Item 
                  </small>
                </p>
              */  }



              <Link href={"/create"} >
                <a>
                  <button className={style.newItem} onClick={resetNewItem}>Create a new item</button>
                </a>
              </Link>

              <Link href={"/dashboard"} >
                <a>
                  <button className={style.newItem}>List My Items</button>
                </a>
              </Link>

            </div>
          </div>
        </div>
        :

        <div className={style.formCreate} >
          <div className={style.createBox}>
            <h1 className={style.createBoxTitle}>{objTrans.title}</h1>
            <p className={style.createBoxText}>
              <small>
                <strong className={style.confirmationIcon}>*</strong>

                {objTrans.requiredItems}
              </small>
              <br /><br />
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

              <label className={style.itemName} for="grid-zip">
                Image, Video, Audio, or 3D Model
                <strong className={style.confirmationIcon}>*</strong>
              </label>

              <input
                type="file"
                name="Asset"
                className={style.boxItem}
                onChange={onChange}
              />

              <p className={style.specifications}>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF.
                Max size: 100 MB
              </p>
            </div>
          </div>

          <div className={style.boxContainer}>
            <div className={style.box}>
              <label className={style.itemName} for="grid-password">
                Name

                <strong className={style.confirmationIcon}>*</strong>
              </label>

              <input
                name="name"
                onKeyUp={handleKeyUp}
                className={style.boxItem}
                id="name"
                type="text"
                placeholder="Item Name"
                onChange={e => updateFormInput({ ...formInput, name_: e.target.value })}
              />

              <p className={style.specifications}>
                Item Name : Max  of 50 characteres
              </p>
            </div>
          </div>

          <div className={style.boxContainer}>
            <div className={style.box}>
              <label
                name="description"
                onKeyUp={handleKeyUp}
                className={style.itemName}
                for="grid-password"
              >
                description
                <strong className={style.confirmationIcon}>*</strong>
              </label>

              <textarea
                className={style.boxItem}
                id="description"
                onChange={e => updateFormInput({ ...formInput, description_: e.target.value })}>
              </textarea>
              <p className={style.specifications}>
                The description will be included on the item's detail page underneath its 
                image. Markdown syntax is supported.<br />
                Item Description : Max  of 5000 characteres <br />
              </p>
            </div>
          </div>

          {showCollection ?
            <div className={style.newCollection}>
              <div className={style.box}>
                <label className={style.itemName} for="grid-password">
                  New Collection Name
                </label>

                <input
                  className={style.boxItem}
                  id="titleCollection"
                  type="input"
                  placeholder="Collection Name"
                  onChange={e => setCollectionName(e.target.value)}
                />

                <p className={style.specifications}>
                  This is the collection and the block chain contract where your item will appear.
                </p>

                <button className={style.button} onClick={saveNewCollection}>
                  {msgBtNewCollection}
                </button>

                <p className={style.backToList} onClick={showNewCollection}>back to list</p>
              </div>
            </div>
            :

            <div className={style.boxContainer}>
              <div className={style.box}>

                <label className={style.itemName} for="grid-password">
                  Collection
                  <strong className={style.confirmationIcon}>*</strong>
                </label>

                { /*
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"     
                    defaultValue={newCollectionId_} onChange={e => updateFormInput({ ...formInput, collection_ : e.target.value })} >  
                      {collectionsList.map((item, id) => (
                        <option value={item._id}  key={id}   > {item.title} {newCollectionId_}</option> 
                      ))} 
                  </select>
                  */}

                <Select
                  defaultValue={optionsCategory[currentIndexCollectionSelected[newCollectionId_]]}
                  options={optionsCategory}
                  // defaultValue={newCollectionId_}
                  onChange={e => updateFormInput({ ...formInput, collection_: e.value })}
                />

                <p className={style.specifications}>
                  This is the collection where your item will appear.
                </p>
                <p className={style.createNewCollection} onClick={showNewCollection}>
                  create a new collection
                </p>
              </div>
            </div>
          }

          <div className={style.boxContainer}>
            <div className={style.boxSupply}>
              <label className={style.itemName} for="grid-city">
                Supply

                <strong className={style.confirmationIcon}>*</strong>
              </label>
              <input
                name="supply"
                onKeyUp={handleKeyUp}
                className={style.boxItem}
                id="grid-city"
                type="number"
                placeholder="1"
                onChange={e => updateFormInput({ ...formInput, supply_: e.target.value })}
              />
            </div>

            <div className={style.boxSupply}>
              <button style={{ marginTop: '25px', padding: "10px", borderRadius: '10px', color: '#fff', background: '#4B7ABE' }} onClick={ShowMoreBt}>
                Extra Options
              </button>
            </div>
          </div>

          {showMoreCt ?
            <div className="ctExtraOptions">
              <div className={style.extraOptions}>

                <h3 className={style.extraOptionsPlus} onClick={showStaticProperties}> +  </h3>

                <h3 className={style.extraOptionsTitle}> Static Properties : </h3>

                {showStaticProp ?
                  <div>
                    <div className={style.boxContainerSupply}  >
                      <div className={style.boxSupply}>
                        <label className={style.itemName} for="grid-city">
                          Name

                          <strong className={style.confirmationIcon}>*</strong>
                        </label>

                        <input
                          className={style.boxItem}
                          id="propkey"
                          type="input"
                          placeholder="name"
                          onChange={e => updatePropriety({ ...formProperties, key_: e.target.value })}
                        />
                      </div>

                      <div className={style.boxSupply}>
                        <label className={style.itemName} for="grid-city">
                          Value

                          <strong className={style.confirmationIcon}>*</strong>
                        </label>

                        <input
                          className={style.boxItem}
                          id="propvalue"
                          type="input"
                          placeholder="value"
                          onChange={e => updatePropriety({ ...formProperties, value_: e.target.value })}
                        />
                      </div>

                      <div className={style.boxSupply}>
                        <button className={style.button} onClick={addProperties}  >Add</button>
                      </div>
                    </div>

                    <div className={style.propertyItemsBox}>
                      {propertiesList.length > 0 ?
                        <h3 className={style.propertyItemsTitle}> Property Items : </h3>
                        : ""}

                      <div className="w-full px-3">
                        {propertiesList.map((item, id) => (
                          <p key={id} className={style.propertyItemsValue}>  {item.key}    :  {item.value}   </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  : ""}
              </div>

              {/*}
              <div className=" -mx-3 mb-6" style={{ position:"relative" , marginTop:"20px", padding:"15px" ,borderRadius:"10px" ,  background:"#111" , marginLeft:"0px" }}>   
                <h3 style={{cursor:"pointer" ,  position:"absolute" , right:'20px', top:"0px" , fontSize:"3em" ,   textAlign:'right' , color:"#fff"  }}  onClick={showRandomProperties} > +  </h3> 

                <h3 style={{ fontSize:"1.3em" , width:"100%" , textAlign:'left' , color:"#fff" , padding:"10px 0px"}}>Random Properties : </h3> 
                  {showRandomProp?   
                <div> 
                  <div >
                    <p  style={{ color:"#fff" }} > creatorPRO Hashpower : </p>
                    <p style={{ color:"#fff", fontSize:"0.7em" }}> The creatorPRO  hashpower is the random rarity Propriety of our ecosystem. <br/> Probability : </p>  
            
                      <ul style={{ display:"block" , color:"#fff" , marginTop:"20px" , marginLeft:"20px"   }}  >
                        <li>Commom : 82.86 %</li>
                        <li>Rare : 10.36 %</li>
                        <li>Super Rare : 5.18% </li>
                        <li>Epic : 1.04% </li>
                        <li>Legendary : 0.52% </li> 
                        <li>Mytic : 0.04% </li> 
                      </ul>     
                    </div>   
                    <p style={{ color:"#fff", marginTop:"20px" }}  ><label> <input type="checkbox"  name="controlled"   />  Add Others Random Properties . <small style={{color:'red' , fontSize:'0.6em'}}>(Comming Soon)</small></label></p> 
                  </div>   
                    : "" }   
              </div> 
              {/**/}

              <div className={style.propertyItemsBox}>
                <div className={style.box}>
                  <label className={style.itemName} for="grid-password">
                    External Link
                  </label>

                  <input
                    className={style.boxItem}
                    id="grid-password"
                    type="input"
                    placeholder="https://"
                    onChange={e => updateFormInput({ ...formInput, link_: e.target.value })}
                  />

                  <p className={style.specifications}>
                    creatorPRO will include a link to this URL on this item's detail page, so that
                    users can click to learn more about it. You are welcome to link to your own
                    webpage with more details.
                  </p>
                </div>
              </div>
            </div>
            : ""}

          <div className={style.boxContainer}>
            <div className={style.externalLinkBox}>
              <button className={style.pageButton} onClick={saveNFTInSanity}>{msgBtCreate}</button>
            </div>
          </div>
        </div>
      }
      <Footer />

    </div>
  )
}

export default Create
