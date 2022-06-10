import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'

import ArticleCard from '../ArticleCard/index'

const ListArticle = () => {
  const router = useRouter()

  const { provider } = useWeb3()
  const { slug } = router.query
  const [article, setArticle] = useState({})

  const [listings, setListings] = useState([])

  const [articleData, setArticleData] = useState([])

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
      ; (async () => {
        setListings(await marketPlaceModule.getAllListings())
      })()
  }, [marketPlaceModule])

  const fetchArticleData = async (sanityClient = client) => {

    // && contractAddress == "${collectionId}" 

    const query = `*[_type == "blog" ] {
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
      }`

    const articleDataV = await sanityClient.fetch(query)

    console.log(articleDataV, '🔥articles test')

    setArticleData(articleDataV);

    console.log(articleData, '**ArticleData')

    // the query returns 1 object inside of an array
    await setArticle()
  }

  useEffect(() => {
    fetchArticleData()
  }, [slug])

  return (
    <div>

      <div>
        {articleData.map((articleItem, id) => (
          <ArticleCard
            key={slug}
            nftItem={articleItem}
            title={article?.title}
            listings={listings}
          />
        ))}
      </div>

    </div>
  )
}

export default ListArticle