import React from 'react'

import Link from 'next/link'

import creatorLogoUser from '/assets/simbolo-creator.png'

import Image from 'next/image'

const style = {
  wrapper: `relative`,
  backgroundImage: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 
              before:right-0 before:bottom-0 
              before:bg-[url('https://marsexplore.io/img/mars/mars-background.png')] 
              before:bg-cover before:bg-center before:opacity-30 before:blur`,
  container: `flex lg:p-0 py-8`,

  contentWrapper: `flex relative justify-center items-center flex-wrap lg:flex-nowrap
                   lg:relative lg:inset-x-0 lg:h-screen`,

  copyContainer: `w-full py-14 px-6 sm:px-12 md:pt-1 md:px-24 lg:w-1/2 lg:p-10`,

  title: `relative text-white text-[46px] font-semibold`,
  description: `text-[#ddd] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,

  cardContainer: `rounded-[3rem] py-0 px-6 sm:py-0 sm:px-10 md:py-0 md:px-12 xl:pr-10`,

  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,

  descStrong: `text-[#fff]`,
}

//////////////translate//////////////////////////
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next'


const translate = {
    en: {
        title: "Discover, collect, invest and sell NFTs from creators.",
        desc: "creatorPRO is an NFT marketplace and revenue-share  platform to connect creators and investors.",
        desc1: "Let's create together",

        button: "Explore",
        button1: "Create",
    },
    pt: {
          title: "Descubra, colecione, invista e venda NFTs de criadores.",
          desc: "creatorPRO é um NFT marketplace  e plataforma de conteúdo e compartilhamento de receitas que conecta criadores e investidores.",
          desc1: "Let's create together",
          
          button: "Explorar",
          button1: "Criar",
    },
};
//////////////translate////////////////////////// 

const Hero = () => {

  //////////////translate//////////////////////////
  //const { t , i18n  } =  useTranslation(['translation', 'common']); 
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = translate[locale];
  //////////////translate//////////////////////////

  return <div className={style.container}>
    <div className={style.wrapper}>
      <div className={style.backgroundImage}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              {objTrans?.title}
            </div>
            <div className={style.description}>
              {objTrans?.desc}
              <strong className={style.descStrong}>
                {objTrans?.desc1}
              </strong>.
            </div>
            <div className={style.ctaContainer}>
              <Link href="/collections/">
                <button className={style.accentedButton}>
                  {objTrans?.button}
                </button>
              </Link>
              <Link href="/create">
                <button className={style.button}>
                  {objTrans?.button1}
                </button>
              </Link>
            </div>
          </div>

          <Link href="/collections/cb7dc8c0-78c7-4c45-b4ef-7d1e7419699e">
            <div className={style.cardContainer}>
              <img
                className="rounded-t-lg"
                src="https://marsexplore.io/img/mars/mars-background.png"
                alt=""
                width="600"
              />
              <div className={style.infoContainer}>

                <Image className="h-[2.25rem] rounded-full" src={creatorLogoUser} height={40} width={40} />

                <div className={style.author}>
                  <div className={style.name}>Mars Explore</div>
                  <a
                    className="text-[#1868b7]"
                    href="#"
                  >
                    A NFT Play to Earn Game . Enjoy!
                  </a>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
}

export default Hero
