import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import creatorLogo from '../../assets/simbolo-creator.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import Router, { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

const transalate = {
  en: {
    menucollection: "Collections",
    menucreate: "Create",
    search: "Search items, collections, and accounts"
  },
  pt: {
    menucollection: "Coleções",
    menucreate: "Create",
    search: "Pesquisar items, coleções, e contas"
  },
}

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex md:flex-row md:justify-between text-[#fff]
            md:relative absolute top-0 z-[999] mb-1.25 md:mb-0 md:items-center md:justify-center
            flex-col`,
  headerIcons: `flex items-center justify-between`,
  logoContainer: `flex items-center cursor-pointer`,
  creatorIcon: `h-16`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  headerContainer: `md:min-w-[500px] lg:min-w-[800px] xl:min-w-[1000px] 2xl:min-w-[1200px] 2xl:max-w-[1200px]`,
  spanStyle: `w-full flex flex-col gap-y-6 sm:gap-y-0 sm:flex-row items-center md:justify-between
              py-6 px-8 md:p-0 justify-center`,
  showMenu: `md:hidden flex text-2xl absolute cursor-pointer right-6 my-auto w-[25px]`,

  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
  headerImageIcon: `w-[40px] h-[40px] min-h-[40px] max-w-[40px]`,

  translateBox: `w-12 relative`,
  translateButton: `w-full flex items-center justify-center`,
  translateImage: `w-6 px-0 py-1`,

  menuMobile: `hidden md:flex`,
  menuMobileOpen: `py-20 `,

  transalateShow: `float-right py-1 px-0 w-full inline md:absolute`,
  transalateHide: `py-2.5 px-0 hidden bg-black-rgba w-full md:absolute`,
}

const Header = () => {

  ///////////////// transalate button ////
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = transalate[locale];
  /////////////////////////////////////

  let [isToggleTrans, changeToggleTrans] = useState(false);
  const changeTrans = () => {
    if (isToggleTrans == false) {
      changeToggleTrans(true);
    }
    else {
      changeToggleTrans(false);
    }
  };

  const closeTrans = () => {
    changeToggleTrans(false);
  }

  //////////////////////////

  let [isToggleOn, changeToggle] = useState(false);
  const changeStyle = () => {
    if (isToggleOn == false) {
      changeToggle(true);
    }
    else {
      changeToggle(false);
    }
  };

  //////////////////////////

  function _handleKeyDown(e) {
    if (e.key === 'Enter') {
      console.log('do start search...');
      if (searchTerm != "") {
        Router.push({
          pathname: `/search/`,
          query: { searchTerm: searchTerm },
        })
      }
    }
  }

  const [searchTerm, setsearchTerm] = useState("");

  return <div>
    <div className={style.wrapper}>

      <div className={style.headerIcons}>
        <Link href="/">
          <div className={style.logoContainer}>
            {/* <Image src={creatorLogo} className={style.creatorIcon}/>  */}
            <Image src={creatorLogo} height={40} width={40} />

            <div className={style.logoText}>
              creatorPRO
            </div>
          </div>
        </Link>

        <FontAwesomeIcon onClick={changeStyle} className={style.showMenu} icon={faList} />
      </div>

      <div className={style.headerContainer}>
        <span className={isToggleOn ? style.menuMobileOpen : style.menuMobile}>
          <div className={style.spanStyle}>
            <div className={style.searchBar}>
              <div className={style.searchIcon}>
                <AiOutlineSearch />
              </div>

              <input
                className={style.searchInput}
                placeholder={objTrans.search}
                onKeyDown={_handleKeyDown}
                onChange={e => setsearchTerm(e.target.value)}
              />
            </div>
            <div className={style.headerItems}>

              <Link href="/collections/">
                <div className={style.headerItem}>
                  {objTrans?.menucollection}
                </div>
              </Link>

              {   /*      }
          <Link href="/resources/"> 
            <div className={style.headerItem}> Resources </div> 
          </Link>

          <Link href="/royalty-share/"> 
              <div className={style.headerItem}> Royalty Share </div> 
          </Link>

          {   /*      */ }

              <Link href="/create/">
                <div className={style.headerItem}>
                  {objTrans?.menucreate}
                </div>
              </Link>
              <div className={style.headerIcon}>
                <CgProfile />
              </div>

              {/*  
          <div className={style.headerIcon}>   <MdOutlineAccountBalanceWallet /> </div>
         */}
              <div className={style.translateBox}>

                <div>
                  <button className={style.translateButton} onClick={changeTrans}>

                    <img className={style.translateImage} src={"/img/" + locale + ".svg"} />
                  </button>
                </div>

                {/* <div className={isToggleTrans ? "boxChangeTrans show" : "boxChangeTrans hide"}> */}
                <div className={isToggleTrans ? style.transalateShow : style.transalateHide}>
                  <Link href="/" locale="en">
                    <button className={style.translateButton} onClick={closeTrans}>
                      <img className={style.translateImage} src='/img/en.svg' />
                    </button>
                  </Link>

                  <Link href="/" locale="pt">
                    <button className={style.translateButton} onClick={closeTrans}>
                      <img className={style.translateImage} src="/img/pt.svg" />
                    </button>
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </span>
      </div>
    </div>
  </div>
}

export default Header