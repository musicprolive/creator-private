import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Partners from './partners'

const style = {
  container: `max-w-[1400px] mx-auto`,
}

const AboutPartners = () => {
  const router = useRouter()

  const { provider } = useWeb3()
  const { slug } = router.query
  const [about, setAbout] = useState({})

  const [listings, setListings] = useState([])

  const [aboutData, setAboutData] = useState([])

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

  const fetchAboutData = async (sanityClient = client) => {

    const query = `*[_type == "about" ] {
        partnersSection,  partnersSectionPt, 
        "partnersImage1": partnersImage1.asset->url,
        "partnersImage2": partnersImage2.asset->url,
        "partnersImage3": partnersImage3.asset->url,
        partnersTitle, partnersTitlePt, 
        partnersSubtitle, partnersSubtitlePt,
        partnersButton, partnersButtonPt
      }`

    const aboutDataV = await sanityClient.fetch(query)


    setAboutData(aboutDataV);

    // the query returns 1 object inside of an array
    await setAbout()
  }

  useEffect(() => {
    fetchAboutData()
  }, [slug])

  return (
    <div className={style.container}>

      <div>
        {aboutData.map((aboutItem, id) => (
          <Partners
            key={slug}
            nftItem={aboutItem}
            title={about?.title}
            listings={listings}
          />
        ))}
      </div>
      <div>
      </div>

    </div>
  )
}

export default AboutPartners