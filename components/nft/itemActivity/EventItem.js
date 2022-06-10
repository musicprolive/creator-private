import { BsFillCartFill } from 'react-icons/bs'


const style = {
  eventItem: `flex justify-between items-center w-full p-2.5 sm:px-4 sm:py-5 font-medium`,
  event: `flex items-center sm:p-0 sm:w-full px-1.5 w-1/2`,
  eventIcon: `mr-2 text-xl`,
  eventName: `text-base md:text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-base md:text-lg`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
  accentFrom: `text-[#2081e2] ml-8 md:ml-0`,
}

const EventItem = ({ event }) => {
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        <div className={style.eventIcon}>
          <BsFillCartFill />
        </div>
        <div className={style.eventName}>Sale</div>
      </div>
      <div className={`${style.eventPrice} flex-[2]`}>
        <img
          src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
          alt="eth"
          className={style.ethLogo}
        />
        <div className={style.eventPriceValue}>{event.price}</div>
      </div>

      <div className={`${style.accentFrom} flex-[3]`}>{event.from}</div> 
      <div className={`${style.accent} flex-[3]`}>{event.to}</div>
      <div className={`${style.accent} flex-[2]`}>{event.date}</div>

    </div>
  )
}

export default EventItem
