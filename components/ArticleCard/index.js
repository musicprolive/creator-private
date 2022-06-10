import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

const style = {
  article: `py-5 w-full`,

  container: ` bg-[#293339] rounded-3xl mt-20 mx-10 mb-5 sm:mt-22 sm:mx-20
              md:mt-6 md:mx-28 lg:my-6 lg:mx-14 xl:mx-20 2xl:mx-52 cursor-pointer`,

  wrapper: `flex flex-col lg:flex-row justify-between gap-x-1 text-[#e4e8eb]`,
  content: 'lg:w-1/2 flex flex-col justify-center lg:pr-12 text-[#e4e8eb] px-5 sm:px-7 lg:px-10',

  image: 'lg:w-1/2',
  profileIcon: 'rounded-full w-10',
  contentImage: 'lg:rounded-3xl rounded-t-3xl relative w-full',
  creator: 'flex flex-row items-center gap-x-2',
  writerInfo: 'flex flex-row gap-x-2',

  title: `text-[#fff]  text-2xl font-medium pt-5 pb-4 w-ful sm:text-3xl lg:p-0 xl:text-5xl`,

  fullText: `text-[#DDDDDD] text-base xl:my-5 lg:my-3` ,

  infos: `my-4 mx-0 w-full lg:my-0 pt-1 md:flex md:flex-row md:items-center md:justify-between `,

  profileName: `text-[#2081e2] text-base`,

  line: `text-[#8a939b]`,
  data: `text-[#8a939b] text-base`,
  readMore: `text-sm py-3 px-0 text-center md:p-0`,
}

import { FullText } from './styles'

// const translate = {
//   en: {
//     button: "+ Read More"
//   },
//   pt: {
//     button: "+ Leia Mais"
//   },
// };

const ArticleCard = ({ nftItem, title, listings }) => {
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)

  function toLimit(string = "") {
    string.value = string.value.substring(0, 100);
  }

  useEffect(() => {
    const listing = listings.find((listing) => listing.asset.slug === nftItem.slug)
    if (Boolean(listing)) {
      setIsListed(true)
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
    }
  }, [listings, nftItem])

  const { locale, locales, defaultLocale, asPath } = useRouter();
  const lang = locale;
  //const objTrans = translate[locale];
  
  return (
    <div className={style.article}>
      <div className={style.container}>
        <div
          className={style.wrapper}
          onClick={() => {
            Router.push({
              pathname: `/blog/${nftItem.slug}`
            })
          }}
        >
          <div className={style.image}>
            <img src={nftItem.image} alt={nftItem.name} className={style.contentImage} /> 
          </div>

          <div className={style.content}>
            <div className={style.title}>
              {lang == 'pt' ? nftItem.titlePt : nftItem.title }
            </div>
            <div>
              <div>
                <FullText className={style.fullText}>
                  {lang == 'pt' ? nftItem.fullTextPt : nftItem.fullText}
                </FullText>
              </div>

              <div className={style.infos}>
                <div className={style.creator}>
                  <img src={nftItem.profileImage} alt={nftItem.name} className={style.profileIcon} /> 
                  <div className={style.writerInfo}>
                    <p className={style.profileName}>
                      {nftItem.profileName}
                    </p>
                    <p className={style.line}>|</p>
                    <p className={style.data}>
                      {nftItem.creationDate}
                    </p>
                  </div>
                </div>
                <p className={style.readMore}>
                  {lang == 'pt' ? nftItem.buttonPt : nftItem.button}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default ArticleCard
