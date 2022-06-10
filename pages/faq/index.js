
import React from 'react';
import useCollapse from 'react-collapsed';
import './Collapsible.module.css';

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Router, { useRouter } from 'next/router'

import { transalate } from '../../components/translate'

import Section from '../../components/Faq/section';
import Faq from '../../components/Faq';

const style = {
  question: `italic pb-6`,
  text: `pb-6 flex flex-col gap-6`,
  notify: `pt-6`,
}

// function Section(props) {
//   const config = {
//     defaultExpanded: props.defaultExpanded || false,
//     collapsedHeight: props.collapsedHeight || 0
//   };
//   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

//   return (
//     <div className={style.faq2}>

//       <div className={style.header} {...getToggleProps()}>
//         <div className={style.title}>{props.title}</div>

//         <div className={style.preferences}>
//           <i className={'fas fa-chevron-circle-' + (isExpanded ? 'up' : 'down')} />
//         </div>

//       </div>
//       <div {...getCollapseProps()}>

//         <div className={style.notificationSubtitle}>
//           {props.children}
//         </div>

//       </div>
//     </div>
//   );
// }

function App() {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const objTrans = transalate[locale];

  return (
    <div className={style.notificationSubtitle}>

      <Header />

      <Faq />
      
      <Footer /> 

{/* 

      <Section title="Notifications" collapsedHeight="32">
        <p className={style.question}>
          Now you can get notifications to your smart watch!&nbsp;
          <a href="#">Learn more</a>
        </p>

        <label className={style.notify}>
          <input type="checkbox" /> Notify me task statuses via SMS
        </label>

      </Section> */}
    </div>
  );
};

export default App;