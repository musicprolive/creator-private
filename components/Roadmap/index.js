import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import RoadmapData from './roadmapData'


const style = {
    container: `pb-16 pt-6 bg-black`,
}

const Roadmap = () => {
    const router = useRouter()

    const { provider } = useWeb3()
    const { slug } = router.query

    const [roadmap, setRoadmap] = useState({})

    const [listings, setListings] = useState([])

    const [roadmapData, setRoadmapData] = useState([])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE'
        )
        return sdk.getMarketplaceModule(
            '0xce1B54743d3aE22a4aD2Da8BA99c7a445d7D3eff'
        )
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return
            ; (async () => {
                setListings(await marketPlaceModule.getAllListings())
            })()
    }, [marketPlaceModule])

    const fetchRoadmapData = async (sanityClient = client) => {

        const query = `*[_type == "roadmap" ] {
            subtitle1,
            pageTitle,
            subtitle2,
            id,
            data,
        }`

        const roadmapDataV = await sanityClient.fetch(query)

        const orderedRoadMap = roadmapDataV.sort((a,b) => a.id - b.id);
        
        setRoadmapData(orderedRoadMap);

        await setRoadmap()
    }

    useEffect(() => {
        fetchRoadmapData()
    }, [slug])

    return (
        <div>

            <div className={style.container}>
                {roadmapData.map((roadmapItem, id) => (
                    <div>
                        <RoadmapData
                            key={slug}
                            nftItem={roadmapItem}
                            data={roadmapItem.data}
                            id={roadmapItem.id}
                            listings={listings}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Roadmap
