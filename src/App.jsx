import './scss/App.scss'
import Game from "./Game";
import LB from "./LB.jsx";
import { observer } from 'mobx-react-lite';
import { gameStore } from './gameStore';
import { useEffect, useState } from 'react';
const speech = [
  "- Hello! Thomas Shelbyc mafia",
  "- Mafia ? Okay",
  "- Thom, Thomas Shelbyc",
  "- Thomas Shelby",
  "- Sigma",
  "- Sigma,.where are you from ?",
  "- Malmo",
  "- Okay, nice to meet you",
  "- Thank you, I'm Thomas Shelby simb sigma",
  "- Thank you, thank you"
]

function App() {
  let inteval
  const [wallet, setwallet] = useState('');
  const [wastedKK, setwastedKK] = useState(false);
  const [hideWallet, sethideWallet] = useState(false);
  const [showLb, setshowLb] = useState(false);
  useEffect(() => {
    inteval = setInterval(() => {
      gameStore.tik()

    }, 100);
    return () => {
      clearInterval(inteval)
    }
  }, [])

  const fixStat = () => {
    localStorage.setItem('wallet', wallet)
  }
  return (
    <div className='App'>
      {showLb ? <LB hide={() => { setshowLb(false) }} /> : <></>}
      {
        !gameStore.gameOver ? <Game /> : hideWallet ? <></> : <div className="hero_wasted free_img">
          <div className='hero_wasted_inner'>
            {!wastedKK ? <>
              <div className='hero_wasted_header'>
                wasted
                <br />
                XX SHELBYC RIP LOL
              </div>
              <div className='hero_wasted_btn' onClick={() => {
                setwastedKK(true)
              }}>
                KK
              </div>
            </> : <>
              <input type="text" placeholder='SoL wallet' value={wallet} onChange={(e) => {
                setwallet(e.target.value)
              }} />
              <div className='hero_wasted_del'></div>
              <div className='hero_wasted_btn' onClick={() => {
                sethideWallet(true)
                fixStat()
              }}>
                KK
              </div>
              <div className='hero_wasted_btn' onClick={() => {
                sethideWallet(true)
              }}>
                SKIP
              </div>

            </>}
          </div>
        </div>
      }

      <div className="hero">
        <div className="header">
          <div className="header_logo">
            <img src='/img/logo.png' alt='decor' />
          </div>
          <div className="header_media">
            <div className="header_media_element header_media_element_score">
              Score: {Math.round(gameStore.score)}
              &nbsp;
              &nbsp;
              {+localStorage.getItem('best') || false ? <> Best: {Math.round(gameStore.best)}</> : <></>}
            </div>
            <a href="#" className="header_media_element">
              <img src='/img/dex.svg' alt='decor' />
            </a>
            <a href="#" className="header_media_element">
              <img src='/img/x.svg' alt='decor' />
            </a>
            <a href="#" className="header_media_element">
              <img src='/img/tg.svg' alt='decor' />
            </a>
            <div className="header_media_element header_media_element_lb" onClick={() => {
              setshowLb(true)
              console.log('neiow');

            }}>
              leaderboard
            </div>
          </div>
        </div>
        <div className="hero_content free_img">
          <div className="hero_content_inner">
            {
              gameStore.bullets ? <div className="hero_speech">
                {speech[gameStore.bullets - 1]}
              </div> : <></>}
            <div className="hero_shelbic free_img">
              <img src='/img/hero.png' alt='decor' />
            </div>
            <div className="hero_header">
              THOMAS SHELBYC
            </div>
            <div className="hero_subheader">
              welcome to mafia sigma
            </div>
            <div className="hero_decor">
              <div className="free_img hero_decor_pistol">
                <img src='/img/pistol.png' alt='decor' />
              </div>
              <div className="free_img hero_decor_money">
                <img src='/img/money.png' alt='decor' />
              </div>
            </div>
            <div className="hero_btn">
              <div className="hero_btn_inner">
                CLICK TO shoot
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="additional">
        <div className='App_vid'>
          <div className='App_vid_decor free_img'>
            <img src="/img/ak.png" alt="" />
          </div>
          <video controls className='App_vid_content'>
            <source src="/vid.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="tokenomics">
          <div className='tokenomics_header'>
            SHELBYCONOMICS
          </div>
          <img src="/img/shelbyconomics.svg" className='tokenomics_pc' alt="" />
          <img src="/img/shelbyconomicsMob.svg" className='tokenomics_mob' alt="" />
        </div>
        <div className="footer">
          <div className='footer_text'>
            <div className='free_img footer_text_decor'>
              <img src="/img/pistol.png" alt="" />
            </div>
            JOIN THE MAFIA SIGMA
          </div>
          <div className='footer_media'>
            <div className='footer_media_element'>
              <img src="/img/dex.svg" alt="" />
            </div>
            <div className='footer_media_element'>
              <img src="/img/x.svg" alt="" />
            </div>
            <div className='footer_media_element'>
              <img src="/img/tg.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default observer(App)
