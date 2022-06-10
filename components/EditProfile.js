import React , { useState , useEffect } from "react";
import { AiOutlineInstagram, AiOutlineTwitter , AiFillEdit } from 'react-icons/ai'

import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../lib/sanityClient'



/////ENVIO DE ARQUIVO PARA IPFS ///////////
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ClientError } from '@sanity/client'
const clientIpfs  = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
/////ENVIO DE ARQUIVO PARA IPFS ///////////

import toast, { Toaster } from 'react-hot-toast'

 


export default function EditProfile( {profileId} ) {


  const { provider  , address } = useWeb3()



 
  ////////////////////////////
  const [collection, setCollection] = useState({})
  
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "users" && walletAddress == "${address}" ] {
      _id , userName, twitterHandle ,igHandle , email, phone,
      "profileImage": profileImage.asset->url,
    }`
 
    
    const collectionData = await sanityClient.fetch(query)

    console.log(collectionData, '🔥 user')

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);

    updateFormInput({ userName: collectionData[0]?.userName , email : collectionData[0]?.email ,  phone : collectionData[0]?.phone , twitterHandle : collectionData[0]?.twitterHandle,  igHandle: collectionData[0]?.igHandle   });

    setFileUrlBanner(collectionData[0]?.bannerImageUrl);
    setFileUrlProfile(collectionData[0]?.imageUrl);
    setCollectionIdInSanity(collectionData[0]?._id);
    setFileUrlProfile(collectionData[0]?.profileImage); 

   

    if(  address  ==  collectionData[0]?.creator_id){ 
        setAdmin(true);  
    } 

  }

  useEffect(() => {
    fetchCollectionData()
  }, [profileId])


 




////////////////////////////
const [isAdmin, setAdmin ] = useState(false); 
const [collectionIdInSanity, setCollectionIdInSanity ] = useState(""); 
const [userInfoSanity, setUserInfoSanity ] = useState({}); 
const [userIdInSanity, setUserIdInSanity ] = useState(""); 
////////////////////////////



const getUserIdSanity = async (sanityClient = client) => {
  const query = `*[_type == "users" && walletAddress == "${address}" ] {
    _id , userName, twitterHandle ,igHandle , email, phone,
    "profileImage": profileImage.asset->url,
  }` 
  const userData = await sanityClient.fetch(query);
  if(userData.length >0 ){ 
        setUserIdInSanity(userData[0]['_id']); 
        setUserInfoSanity(userData[0]);
  }  
} 

  
useEffect(() => {
  getUserIdSanity();
}, [address])


  ////////////////////////////



  const [showModal, setShowModal] = React.useState(false);

  const [objectBanner, setObjectBanner] = useState(null);
  const [fileUrlBanner, setFileUrlBanner] = useState(null);

  const [objectImageProfile, setObjectImageProfile] = useState(null);
  const [fileUrlProfile, setFileUrlProfile] = useState(null );

  const [formInput , updateFormInput ] = useState({ userName : "" ,  email : "" ,  phone : "" , twitterHandle : "",  igHandle: ""    })
  
 
   //// função onchange para enviar a imagem  /////////////
  
    async function onChangeProfile(e) {
        const file = e.target.files[0];  
        uploadToSanity(file  ); 
    }

 

  function uploadToSanity(file ){
          const filePath = file;
          client.assets.upload('image', filePath , {
            filename: "image"
          }).then(imageAsset => {
            console.log('got imageAsset', imageAsset)
            setObjectImageProfile(imageAsset);
               setFileUrlProfile(imageAsset.url); 
          }).catch(error=>{
            console.log('error imageAsset', error)
          })
  }
 







const [msgBtSaveCollection, setMsgBtSaveCol] = useState("Save Changes");
 
async function saveCollectionInSanity(){

  setMsgBtSaveCol("Wait...");

  try {   
 
      let userDoc = {} 

      userDoc['userName'] =""+formInput.userName ;
      userDoc['email'] =""+formInput.email ;
      userDoc['phone'] =""+formInput.phone ;
      userDoc['twitterHandle'] =""+formInput.twitterHandle ;
      userDoc['igHandle'] =""+formInput.igHandle ;


      if(   objectImageProfile?.url != null){
                   userDoc['profileImage'] =   {
                              _type: 'image',
                              asset: {
                                _type: "reference",
                                _ref: objectImageProfile._id
                              }
                     }
      } 

     // const result = await client.createOrReplace(userDoc); 

      const result = await  client.patch(collectionIdInSanity) // Document ID to patch
          .set(userDoc) // Shallow merge
          //.inc({numSold: 1}) // Increment field by count
          .commit() // Perform the patch and return a promise
          .then((updatedReturn) => {
            console.log('Hurray,  is updated! New document:')
            console.log(updatedReturn)
            showMsg("Sucesso");    
            setMsgBtSaveCol("Save Changes");    
          })
          .catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
            setMsgBtSaveCol("Save Changes");
       })

  

} catch (error) {
        setMsgBtSaveCol("Save Changes");
        console.log(error);
}                      
}




          //// exibe mensagem após retorno de ação /////////////
          const showMsg = (msgs, toastHandler = toast) => {
            toastHandler.success(
                ""+msgs,
              {
                style: {
                  background: '#04111d',
                  color: '#fff',
                },
              }
            )
          }


  return (
    <>

    {
        /**
           <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button" onClick={() => setShowModal(true)}   >
        Open regular modal
      </button>
         */
    }
   

      <AiFillEdit      onClick={() => setShowModal(true)}  style={{cursor:"pointer",fontSize:'1.5em', background:"#4b7abe" , marginTop:'-5px' , padding:"5px" , borderRadius:"2px"}}   />
          

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold" style={{color:"#222"}}>
                    {  formInput.title_   }  
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  
                  
 

                       




                                      <div className="flex flex-wrap -mx-3 mb-6">
                                          <div className="w-full px-3"><br/><br/><br/><br/><br/><br/><br/><br/>

                                                      {
                                                        fileUrlProfile && (
                                                          <img className="rounded mt-4"  width="80" src={fileUrlProfile} />
                                                        )
                                                      }

                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                                               Profile Image <strong style={{color:'red'}}>*</strong>
                                                </label>

                                                <input
                                                        type="file"
                                                        name="Asset"
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        onChange={onChangeProfile}
                                                 />
                                                    
                                                      
                                                <p className="text-gray-600 text-xs italic"> File types supported: JPG, PNG, GIF.</p>

                                          </div>  
                                      </div>

 

                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                                           Name <strong style={{color:'red'}}>*</strong>
                                          </label>
                                    
                                          <input  type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name"  onChange={e => updateFormInput({ ...formInput, userName: e.target.value })} value={formInput.userName }  />
                                          <p className="text-gray-600 text-xs italic">The description will be included on the item's detail page underneath its image. Markdown syntax is supported.<br/>
                                           User name that will appear in your collections and profile <br/>
                                          </p>
                                        </div>
                                      </div>
                                   




                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                                           Email <strong style={{color:'red'}}>*</strong>
                                          </label>
                                    
                                          <input   type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name"  onChange={e => updateFormInput({ ...formInput, email: e.target.value })} value={formInput.email}  />
                                          <p className="text-gray-600 text-xs italic">The description will be included on the item's detail page underneath its image. Markdown syntax is supported.<br/>
                                          Your email address <br/>
                                          </p>
                                        </div>
                                      </div>
                               
              
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                                           Cellphone <strong style={{color:'red'}}>*</strong>
                                          </label>
                                    
                                          <input  type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name"  onChange={e => updateFormInput({ ...formInput, phone: e.target.value })} value={formInput.phone}  />
                                          <p className="text-gray-600 text-xs italic">The description will be included on the item's detail page underneath its image. Markdown syntax is supported.<br/>
                                           Your cellphone<br/>
                                          </p>
                                        </div>
                                      </div>
                                   
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                                           Twiiter URL <strong style={{color:'red'}}>*</strong>
                                          </label>
                                    
                                          <input    type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name"  onChange={e => updateFormInput({ ...formInput, twitterHandle: e.target.value })} value={formInput.twitterHandle}  />
                                          <p className="text-gray-600 text-xs italic">The description will be included on the item's detail page underneath its image. Markdown syntax is supported.<br/>
                                           Your Twiiter URL<br/>
                                          </p>
                                        </div>
                                      </div>

                                  
    
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                                           Instagram URL <strong style={{color:'red'}}>*</strong>
                                          </label>
                                    
                                          <input  type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name"  onChange={e => updateFormInput({ ...formInput, igHandle: e.target.value })} value={formInput.igHandle}  />
                                          <p className="text-gray-600 text-xs italic">The description will be included on the item's detail page underneath its image. Markdown syntax is supported.<br/>
                                           Your Instagram URL<br/>
                                          </p>
                                        </div>
                                      </div>





 

                               

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>saveCollectionInSanity() }
                  >
                     {msgBtSaveCollection}
                  </button>


                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
