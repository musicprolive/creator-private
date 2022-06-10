import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'

import AboutContent from '../AboutContent'
import AboutPartners from '../AboutPartners'
import AboutTeam from '../AboutTeam'
import Team from '../AboutTeam/team'

const style = {
  container: `max-w-[1400px] mx-auto`,
}

const AboutData = () => {
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

    // && contractAddress == "${collectionId}" 

    const query = `*[_type == "about" ] {
        subtitle1, subtitle1Pt,
        title, titlePt, 
        subtitle2, subtitle2Pt,
        "icon1": icon1.asset->url,
        "icon2": icon2.asset->url,
        "icon3": icon3.asset->url,
        iconTitle1, iconTitle1Pt, 
        iconTitle2, iconTitle2Pt,  
        iconTitle3, iconTitle3pT, 
        iconSubtitle3, iconSubtitle3Pt,
        iconText1, iconText1Pt, 
        iconText2, iconText2Pt, 
        iconText3, iconText3Pt,

        teamSection, teamSectionPt
      }`

    const aboutDataV = await sanityClient.fetch(query)

    setAboutData(aboutDataV);
    
    await setAbout()
  }

  useEffect(() => {
    fetchAboutData()
  }, [slug])

  return (
    <div className={style.container}>

      <div>
        {aboutData.map((aboutItem, id) => (
          <AboutContent
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

export default AboutData