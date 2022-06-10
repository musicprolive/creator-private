import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'

import Team from './team'

const style = {
    container: `mt-10 mb-20 xl:mb-32 lg:mx-10`,
    content: `lg:grid lg:grid-cols-2 max-w-[80%] sm:max-w-[70%] lg:max-w-[1400px] 
    mx-auto gap-x-60 xl:gap-x-72 gap-y-7`,
}

const AboutTeam = () => {
    const router = useRouter()

    const { provider } = useWeb3()
    const { slug } = router.query
    const [team, setTeam] = useState({})

    const [listings, setListings] = useState([])

    const [teamData, setTeamData] = useState([])

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

    const fetchTeamData = async (sanityClient = client) => {
        const query = `*[_type == "team" ] {
            "image": image.asset->url,
            ocupation, ocupationPt,
            name,
            text, textPt,
            id  
        }`

        const teamDataV = await sanityClient.fetch(query)

        const orderedTeam = teamDataV.sort((a,b) => a.id - b.id);

        setTeamData(orderedTeam);

        // the query returns 1 object inside of an array
        await setTeam()
    }

    useEffect(() => {
        fetchTeamData()
    }, [slug])

    return (
        <div className={style.container}>

            <div className={style.content}>
                {teamData.map((teamItem, id) => (
                    <Team
                        key={slug}
                        nftItem={teamItem}
                        title={team?.title}
                        listings={listings}
                    />
                ))}
            </div>

        </div>
    )
}

export default AboutTeam