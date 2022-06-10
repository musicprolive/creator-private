import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import creatorLogo from '/assets/simbolo-creator.png'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import style from './styles'

const translate = {
  en: {
      about: "About",
      tools: "Tools",
      investments: "Investments",
      community: "Community",
      carrer: "Carrer",
      roadmap: "Roadmap",
      terms: "Terms",
      whitePaper: "White Paper"
  },
  pt: {
    about: "Sobre",
    tools: "Ferramentas",
    investments: "Investimentos",
    community: "Comunidade",
    carrer: "Carreira",
    roadmap: "Roteiro",
    terms: "Termos",
    whitePaper: "Papel Branco"
  },
};

const Footer = () => {
  const router = useRouter()

  const {  locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = translate[locale];

  return (
    <div className={style.wrapper}> 

      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={creatorLogo} height={40} width={40} />

          <div className={style.logoText}>
            creatorPRO
          </div>

        </div>
      </Link>

      <div className={style.searchBar} style={{ background: "none" }}>
      </div>
      <div className={style.headerItems}>

        <div className={style.footerIcons}>

          <Link href="/about/">
            <div className={style.headerItem}>{objTrans.about}</div>
          </Link>

          <Link href="/tools/">
            <div className={style.headerItem}>{objTrans.tools}</div>
          </Link>

          <Link href="/investments/">
            <div className={style.headerItem}>{objTrans.investments}</div>
          </Link>

          <Link href="/">
            <div className={style.headerItem}>{objTrans.community}</div>
          </Link>

          <Link href="/">
            <div className={style.headerItem}>{objTrans.carrer}</div>
          </Link>

          <Link href="/blog/">
            <div className={style.headerItem}> Blog </div>
          </Link>

          <Link href="/faq/">
            <div className={style.headerItem}> Faq </div>
          </Link>

          <Link href="/roadmap/">
            <div className={style.headerItem}>{objTrans.roadmap}</div>
          </Link>

          <Link href="/">
            <div className={style.headerItem}>{objTrans.terms}</div>
          </Link>

          <Link href="/">
            <div className={style.headerItem}>{objTrans.width}</div>
          </Link>
        </div>

        <div className={style.socialMedia}>

          <div className={style.headerIcon}>
            <a href="https://twitter.com/creatorprolive"
              target="_blank">
              <FaTwitter />
            </a>
          </div>

          <div className={style.headerIcon}>
            <a href="https://www.instagram.com/creatorpro.live/"
              target="_blank">
              <FaInstagram />
            </a>
          </div>

          <div className={style.headerIcon}>
            <a href="https://www.facebook.com/Creator-PRO-109265141622696"
              target="_blank">
              <FaFacebook />
            </a>
          </div>

          <div className={style.headerIcon}>
            <a href="https://t.me/creatorprolive"
              target="_blank">
              <FaTelegramPlane />
            </a>
          </div>

          <div className={style.headerIcon}>
            <a href="https://discord.com/channels/924139451855274024/924139451855274027"
              target="_blank">
              <FaDiscord />
            </a>
          </div>

        </div>

        {/*  
          <div className={style.headerIcon}>   
          <MdOutlineAccountBalanceWallet /> 
          </div>
         */}

      </div>
    </div>
  )
}

export default Footer
