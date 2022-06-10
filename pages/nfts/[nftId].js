import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex md:flex-row flex-col`,
  nftImgContainer: `flex-1 md:mr-4 md:m-0 mt-16 mx-10 mb-6`,
  detailsContainer: `flex-[2]`,
}

const Nft = () => {
  const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      //'https://rinkeby.`infura.io`/v3/a464b9152d8c466c8a94a514fce8e837'
      'https://eth-rinkeby.alchemyapi.io/v2/retj13fS7QQQqnBdCeidOdw1kFToJ-cE'
    )

    /////////////////
    //return sdk.getNFTModule('0x7Dc0A0658e2709695C75f3A802f357dDCbD1be0a');
    return sdk.getNFTModule(router.query.collectionId);


  }, [provider])

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
      ; (async () => {
        const nfts = await nftModule.getAll()
        const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)
        setSelectedNft(selectedNftItem)
      })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
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

  return <div>
    <Header />
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.topContent}>
          <div className={style.nftImgContainer}>
            <NFTImage selectedNft={selectedNft} />
          </div>
          <div className={style.detailsContainer}>
            <GeneralDetails selectedNft={selectedNft} />
            <Purchase
              isListed={router.query.isListed}
              selectedNft={selectedNft}
              listings={listings}
              marketPlaceModule={marketPlaceModule}
            />
          </div>
        </div>
        <ItemActivity />
      </div>
    </div>

    <Footer />

  </div>

}

export default Nft
