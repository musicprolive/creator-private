import React from 'react';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const style = {
  faq2: ` font-bold text-[20px] box-border text-[#fff] 2xl:ml-[400px]
  2xl:mr-[163px] max-w-[875px] mx-auto lg:px-0 md:px-24 px-10`,
  header: `p-1.5 cursor-pointer `,
  title: `font-normal text-[#fff] bg-bg-faq p-1.5 cursor-pointer flex justify-between
  w-full my-0`,
  preferences: ``,

  notificationSubtitle: `text-[#fff] text-left ml-0 py-10 md:py-0`,

  showText: `flex bg-[#202225]`,
  hideText: `hidden`,

  fullText: `pb-6 flex flex-col gap-6 bg-[#202225]`,
  questionBoxSubtitle: `pb-6`,
}

const Section = ({ nftItem, fullText, fullTextPt, listings }) => {
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)

  function toLimit(string = "") {
    string.value = string.value.substring(0, 100);
  }
  //const fullTextContent = [fullText];

  useEffect(() => {
    const listing = listings.find((listing) => listing.asset.id === nftItem.id)
    if (Boolean(listing)) {
      setIsListed(true)
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
    }
  }, [listings, nftItem])

  let [isToggleOn, changeToggle] = useState(false);
  const changeStyle = () => {
    if (isToggleOn == false) {
      changeToggle(true);
    }
    else {
      changeToggle(false);
    }
  };

  const { locale, locales, defaultLocale, asPath } = useRouter();
  const lang = locale;

  return (
    <div className={style.faq2}>

      <button onClick={changeStyle} className={style.title}>
        {lang == 'pt' ? nftItem.questionBoxPt : nftItem.questionBox}
      </button>

      <span className={isToggleOn ? style.showText : style.hideText}>
        <div className={style.header}>
          <div className={style.questionBoxSubtitle}>
            {lang == 'pt' ? nftItem.questionBoxSubtitlePt : nftItem.questionBoxSubtitle}
          </div>

            <div className={style.fullText}>
              <p>{lang == 'pt' ? fullText.text1Pt : fullText.text1}</p>
              <p>{lang == 'pt' ? fullText.text2Pt : fullText.text2}</p>
              <p>{lang == 'pt' ? fullText.text3Pt : fullText.text3}</p>
              <p>{lang == 'pt' ? fullText.text4Pt : fullText.text4}</p>
              <p>{lang == 'pt' ? fullText.text5Pt : fullText.text5}</p>
              <p>{lang == 'pt' ? fullText.text6Pt : fullText.text6}</p>
              <p>{lang == 'pt' ? fullText.text7Pt : fullText.text7}</p>
              <p>{lang == 'pt' ? fullText.text8Pt : fullText.text8}</p>
            </div>
        </div>
      </span>

      {/* <button onClick={changeNotificationStyle} className={style.title}>
        {nftItem.notification}
        <a>{nftItem.button}</a>
      </button>
      <span className={isToggleOn ? style.showText : style.hideText}>
        <div className={style.header}>
          <div className={style.fullText}>
            <input type="checkbox" />
              <p>{nftItem.inpuText}</p>
          </div>
        </div>
      </span> */}

      {/* <div className={style.header} {...getToggleProps()}>
        <div className={style.title}>{nftItem.title}</div>

        <div className={style.preferences}>
          <i className={'fas fa-chevron-circle-' + (isExpanded ? 'up' : 'down')} />
        </div>

      </div> */}
      {/* <div {...getCollapseProps()}>

        <div className={style.notificationSubtitle}>
          {nftItems.children}
        </div>

      </div> */}
    </div>
  );
}

export default Section