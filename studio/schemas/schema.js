// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat(
    [
      ////////////USERS ///////////////
      {
        name: 'users',
        title: 'Users',
        type: 'document',
        fields: [
          {
            name: 'userName',
            title: 'User Name',
            type: 'string',
          },
          {
            name: 'walletAddress',
            title: 'Wallet Address',
            type: 'string',
          },
          {
            name: 'email',
            title: 'Email',
            type: 'string',
          },
          {
            name: 'phone',
            title: 'phone',
            type: 'string',
          },
          {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
          },
          {
            name: 'twitterHandle',
            title: 'Twitter Handle',
            type: 'string',
          },
          {
            name: 'igHandle',
            title: 'Instagram Handle',
            type: 'string',
          },
        ],
      },
      ////////////USERS ///////////////


      ////////////marketItems ///////////////
      {
        name: 'marketItems',
        title: 'Market Items',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'contractAddress',
            title: 'Contract Address',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string',
          },
          {
            name: 'createdBy',
            title: 'Created By',
            type: 'reference',
            to: [{ type: 'users' }],
          },
          {
            name: 'createdByWallet',
            title: 'Created By Wallet',
            type: 'string',
          },
          {
            name: 'moduleAddress',
            title: 'Thirdweb Module Address',
            type: 'string',
          },
          {
            name: 'volumeTraded',
            title: 'Volume Traded',
            type: 'number',
          },
          {
            name: 'floorPrice',
            title: 'Floor Price',
            type: 'number',
          },
          {
            name: 'owners',
            title: 'Owners',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'users' }] }],
          },
          {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
          },
          {
            name: 'bannerImage',
            title: 'Banner Image',
            type: 'image',
          },

          {
            name: 'addrMumbai',
            title: 'Address mumbai',
            type: 'string',
          },

          {
            name: 'addrRinkeby',
            title: 'Address rinkeby',
            type: 'string',
          },
          {
            name: 'status',
            title: 'status',
            type: 'string',
          }
        ],
      },
      ////////////marketItems ///////////////


      ////////////ITEMS ///////////////
      {
        name: 'items',
        title: 'Items',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'nft name',
            type: 'string',
          },
          {
            name: 'description',
            title: 'NFT description',
            type: 'string',
          },
          {
            name: 'image',
            title: 'NFT image IPFS',
            type: 'string',
          },
          {
            name: 'supply',
            title: 'Supply',
            type: 'number',
          },
          {
            name: 'properties',
            title: 'properties object',
            type: 'string',
          },
          {
            name: 'nftObject',
            title: 'nft Object',
            type: 'string',
          },

          {
            name: 'createdBy',
            title: 'Created By',
            type: 'reference',
            to: [{ type: 'users' }]
          },

          {
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            to: [{ type: 'marketItems' }],
          },
          {
            name: 'link',
            title: 'link',
            type: 'string',
          },
          {
            name: 'addrMumbai',
            title: 'Address mumbai',
            type: 'string',
          },
          {
            name: 'addrRinkeby',
            title: 'Address rinkeby',
            type: 'string',
          },

          {
            name: 'contractAddress',
            title: 'Contract Address',
            type: 'string',
          },

          {
            name: 'moduleAddress',
            title: 'Thirdweb Module Address',
            type: 'string',
          },

          {
            name: 'status',
            title: 'status',
            type: 'string',
          },
          {
            name: 'price',
            title: 'price',
            type: 'string',
          },
          {
            name: 'currency',
            title: 'currency',
            type: 'string',
          }

        ],
      },
      ////////////ITEMS ///////////////


      ////////////SALES ///////////////
      {
        name: 'sales',
        title: 'Sales',
        type: 'document',
        fields: [
          {
            name: 'collectionId',
            title: 'Collection Id (Bundle Address)',
            type: 'string',
          },
          {
            name: 'tokenId',
            title: 'NFT Id or Token Id',
            type: 'string',
          },
          {
            name: 'from',
            title: 'From',
            type: 'string',
          },
          {
            name: 'to',
            title: 'To',
            type: 'string',
          },
          {
            name: 'price',
            title: 'Price',
            type: 'number',
          },
          {
            name: 'date',
            title: 'Date',
            type: 'date'
          }
        ],
      },
      ////////////SALES ///////////////



      ///////////FAQ ///////////////
      {
        name: 'faq',
        title: 'Faq',
        type: 'document',
        fields: [
          {
            name: 'id',
            title: 'Id',
            type: 'number',
          },
          {
            name: 'pageTitle',
            title: 'Page Title',
            type: 'string',
            hidden: ({document}) => !document?.pageTitle
          },
          {
            name: 'pageSubtitle',
            title: 'Page Subtitle',
            type: 'string',
            hidden: ({document}) => !document?.pageSubtitle
          },
          {
            name: 'pageSubtitlePt',
            title: 'Page Subtitle Pt',
            type: 'string',
            hidden: ({document}) => !document?.pageSubtitlePt
          },
          {
            name: 'questionBox',
            title: 'Question Box',
            type: 'string',
          },
          {
            name: 'questionBoxPt',
            title: 'Question Box Pt',
            type: 'string',
          },
          {
            name: 'questionBoxSubtitle',
            title: 'Question Box Subtitle',
            type: 'string',
          },
          {
            name: 'questionBoxSubtitlePt',
            title: 'Question Box Subtitle Pt',
            type: 'string',
          },
          {
            name: 'fullText',
            title: 'Full Text',
            type: 'document',
            fields: [
              {
                name: 'text1',
                title: 'Text 1',
                type: 'string',
              },
              {
                name: 'text2',
                title: 'Text 2',
                type: 'string',
              },
              {
                name: 'text3',
                title: 'Text 3',
                type: 'string',
              },
              {
                name: 'text4',
                title: 'Text 4',
                type: 'string',
              },
              {
                name: 'text5',
                title: 'Text 5',
                type: 'string',
              },
              {
                name: 'text6',
                title: 'Text 6',
                type: 'string',
              },
              {
                name: 'text7',
                title: 'Text 7',
                type: 'string',
              },
              {
                name: 'text8',
                title: 'Text 8',
                type: 'string',
              },
            ],
          },
          {
            name: 'fullTextPt',
            title: 'Full Text Pt',
            type: 'document',
            fields: [
              {
                name: 'text1Pt',
                title: 'Text 1 Pt',
                type: 'string',
              },
              {
                name: 'text2Pt',
                title: 'Text 2 Pt',
                type: 'string',
              },
              {
                name: 'text3Pt',
                title: 'Text 3 Pt',
                type: 'string',
              },
              {
                name: 'text4Pt',
                title: 'Text 4 Pt',
                type: 'string',
              },
              {
                name: 'text5Pt',
                title: 'Text 5 Pt',
                type: 'string',
              },
              {
                name: 'text6Pt',
                title: 'Text 6 Pt',
                type: 'string',
              },
              {
                name: 'text7Pt',
                title: 'Text 7 Pt',
                type: 'string',
              },
              {
                name: 'text8Pt',
                title: 'Text 8 Pt',
                type: 'string',
              }
            ],
          },
          {
            name: 'notification',
            title: 'Notification',
            type: 'string',
          },
          {
            name: 'notificationText',
            title: 'Notification Text',
            type: 'string',
          },
          {
            name: 'button',
            title: 'Button',
            type: 'string',
          },
          {
            name: 'inputText',
            title: 'Input Text',
            type: 'string', 
          }
        ],
      },
      ////////////FAQ ///////////////


      
      ///////////ROADMAP///////////////
      {
        name: 'roadmap',
        title: 'Roadmap',
        type: 'document',
        fields: [
          {
            name: 'id',
            title: 'Id',
            type: 'number',
          },
          {
            name: 'subtitle1',
            title: 'Subtitle 1',
            type: 'string',
            hidden: ({document}) => !document?.subtitle1
          },
          {
            name: 'subtitle1Pt',
            title: 'Subtitle 1 Pt',
            type: 'string',
            hidden: ({document}) => !document?.subtitle1
          },
          {
            name: 'pageTitle',
            title: 'Page Title',
            type: 'string',
            hidden: ({document}) => !document?.pageTitle
          },
          {
            name: 'pageTitlePt',
            title: 'Page Title Pt',
            type: 'string',
            hidden: ({document}) => !document?.subtitle1
          },
          {
            name: 'subtitle2',
            title: 'Subtitle 2',
            type: 'string',
            hidden: ({document}) => !document?.subtitle2
          },
          {
            name: 'subtitle2Pt',
            title: 'Subtitle 2 Pt',
            type: 'string',
            hidden: ({document}) => !document?.subtitle1
          },
          {
            name: 'data',
            title: 'Data',
            type: 'document',
            fields: [
              {
                name: 'iconSrc',
                title: 'Icon Src',
                type: 'string',
              },
              {
                name: 'phase',
                title: 'Phase',
                type: 'string',
              },
              {
                name: 'phasePt',
                title: 'Phase Pt',
                type: 'string',
              },
              {
                name: 'date',
                title: 'Date',
                type: 'string',
              },
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'titlePt',
                title: 'Title Pt',
                type: 'string',
              },
              {
                name: 'text1',
                title: 'Text 1',
                type: 'string',
              },
              {
                name: 'text1Pt',
                title: 'Text 1 Pt',
                type: 'string',
              },
              {
                name: 'text2',
                title: 'Text 2',
                type: 'string',
              },
              {
                name: 'text2Pt',
                title: 'Text 2 Pt',
                type: 'string',
              }
            ],
          }
        ],
      },
      ///////////ROADMAP///////////////

      
      ///////////ABOUT///////////////
      {
        name: 'about',
        title: 'About',
        type: 'document',
        fields: [
          {
            name: 'subtitle1',
            title: 'Subtitle 1',
            type: 'string',
          },
          {
            name: 'subtitle1Pt',
            title: 'Subtitle 1 Pt',
            type: 'string',
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'titlePt',
            title: 'Title Pt',
            type: 'string',
          },
          {
            name: 'subtitle2',
            title: 'Subtitle 2',
            type: 'string',
          },
          {
            name: 'subtitle2Pt',
            title: 'Subtitle 2 Pt',
            type: 'string',
          },
          {
            name: 'icon1',
            title: 'Icon 1',
            type: 'image',
          },
          {
            name: 'icon2',
            title: 'Icon 2',
            type: 'image',
          },
          {
            name: 'icon3',
            title: 'Icon 3',
            type: 'image',
          },
          {
            name: 'iconTitle1',
            title: 'Icon Title 1',
            type: 'string',
          },
          {
            name: 'iconTitle1Pt',
            title: 'Icon Title 1 Pt',
            type: 'string',
          },
          {
            name: 'iconTitle2',
            title: 'Icon Title 2',
            type: 'string',
          },
          {
            name: 'iconTitle2Pt',
            title: 'Icon Title 2 Pt',
            type: 'string',
          },
          {
            name: 'iconTitle3',
            title: 'Icon Title 3',
            type: 'string',
          },
          {
            name: 'iconTitle3Pt',
            title: 'Icon Title 3 Pt',
            type: 'string',
          },
          {
            name: 'iconSubtitle3',
            title: 'Icon Subtitle 3',
            type: 'string',
          },
          {
            name: 'iconSubtitle3Pt',
            title: 'Icon Subtitle 3 Pt',
            type: 'string',
          },
          {
            name: 'iconText1',
            title: 'Icon Text 1',
            type: 'string',
          },
          {
            name: 'iconText1Pt',
            title: 'Icon Text 1 Pt',
            type: 'string',
          },
          {
            name: 'iconText2',
            title: 'Icon Text 2',
            type: 'string',
          },
          {
            name: 'iconText2Pt',
            title: 'Icon Text 2 Pt',
            type: 'string',
          },
          {
            name: 'iconText3',
            title: 'Icon Text 3',
            type: 'string',
          },
          {
            name: 'iconText3Pt',
            title: 'Icon Text 3 Pt',
            type: 'string',
          },
          {
            name: 'teamSection',
            title: 'Team Section',
            type: 'string',
          },
          {
            name: 'teamSectionPt',
            title: 'Team Section Pt',
            type: 'string',
          },
          {
            name: 'partnersSection',
            title: 'Partners Section',
            type: 'string',
          },
          {
            name: 'partnersSectionPt',
            title: 'Partners Section Pt',
            type: 'string',
          },
          {
            name: 'partnersImage1',
            title: 'Partners Image 1',
            type: 'image',
          },
          {
            name: 'partnersImage2',
            title: 'Partners Image 2',
            type: 'image',
          },
          {
            name: 'partnersImage3',
            title: 'Partners Image 3',
            type: 'image',
          },
          {
            name: 'partnersTitle',
            title: 'Partners Title',
            type: 'string',
          },
          {
            name: 'partnersTitlePt',
            title: 'Partners Title Pt',
            type: 'string',
          },
          {
            name: 'partnersSubtitle',
            title: 'Partners Subtitle',
            type: 'string',
          },
          {
            name: 'partnersSubtitlePt',
            title: 'Partners Subtitle Pt',
            type: 'string',
          },
          {
            name: 'partnersButton',
            title: 'Partners Button',
            type: 'string',
          },
          {
            name: 'partnersButtonPt',
            title: 'Partners Button Pt',
            type: 'string',
          }
        ],
      },

      ////////////ABOUT///////////////
      
      
      ///////////TEAM ///////////////
      {
        name: 'team',
        title: 'Team',
        type: 'document',
        fields: [
          {
            name: 'id',
            title: 'Id',
            type: 'number',
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
          },
          {
            name: 'ocupation',
            title: 'Ocupation',
            type: 'string',
          },
          {
            name: 'ocupationPt',
            title: 'Ocupation Pt',
            type: 'string',
          },
          {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'text',
            title: 'Text',
            type: 'string',
          },
          {
            name: 'textPt',
            title: 'Text Pt',
            type: 'string',
          }
        ],
      },

      ////////////TEAM ///////////////
  



      ///////////BLOG ///////////////
      {
        name: 'blog',
        title: 'Blog',
        type: 'document',
        fields: [
          {
            name: 'image',
            title: 'Image',
            type: 'image',
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'titlePt',
            title: 'Title Pt',
            type: 'string',
          },
          {
            name: 'fullText',
            title: 'Full Text',
            type: 'string',
          },
          {
            name: 'fullTextPt',
            title: 'Full Text Pt',
            type: 'string',
          },
          {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
          },
          {
            name: 'profileName',
            title: 'Profile Name',
            type: 'string',
          },
          {
            name: 'creationDate',
            title: 'Creation Date',
            type: 'string',
          },
          {
            name: 'button',
            title: 'Button',
            type: 'string',
          },
          {
            name: 'buttonPt',
            title: 'Button Pt',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'string',
          }
        ],
      },

      ////////////BLOG ///////////////


      ///////////EXTRA//////////////
      {
        name: 'extra',
        title: 'Extra',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'discription',
            title: 'Discription',
            type: 'string',
          }, {
            name: 'type',
            title: 'Type',
            type: 'string',
          }
          // {
          //   name:'type',
          //   title:'Type',
          //   type: 'object',
          // }
          // {
          //   name:'probability',
          //   title:'Probability',
          //   type:'{string, number}',
          // }
        ],
      },

      ///////////FAQ ///////////////

      ///////////FAQ ///////////////


      ///////////NFT ///////////////
      {
        name: 'nft',
        title: 'NFT',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string',
          },
          {
            name: 'image',
            title: 'Image',
            type: 'string',
          },
          {
            name: 'properties',
            title: 'Properties',
            type: 'string',
          },
          {
            name: 'id',
            title: 'Id',
            type: 'string',
          },
          // {
          //   name:'id',
          //   title:'Id',
          //   type:'ObjectId',
          // },
          {
            name: 'uri',
            title: 'Uri',
            type: 'string',
          }
        ],
      }
      ///////////FAQ ///////////////

    ])

})
