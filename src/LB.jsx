import { useEffect, useState } from 'react';
import './scss/LB.scss';
import { gameStore } from './gameStore';

export default ({ hide }) => {

    const [leaders, setleaders] = useState([{
        wallet: 'zGa3...5dsA',
        score: 117
    }, {
        wallet: 'ii92...GeX1',
        score: 77
    }, {
        wallet: 'Pi3D...So3n',
        score: 74
    }, {
        wallet: 'Ks50...lb32',
        score: 52
    }, {
        wallet: 'ss99...ssFA',
        score: 29
    }]);
    useEffect(() => {
        if (localStorage.getItem('wallet') || gameStore.best > 29) {
            const newLeaders = JSON.parse(JSON.stringify(leaders))
            newLeaders.push({
                wallet: localStorage.getItem('wallet'),
                score: gameStore.best
            })
            newLeaders.sort((a, b) => b.score - a.score);
            setleaders(newLeaders)
        }
    }, [])

    return (
        <div className='LB' onClick={() => { hide() }}>
            <div className='LB_inner' onClick={(e) => { e.stopPropagation() }}>
                <div className='LB_header'>
                    LEADERBOARD
                </div>
                <div className='LB_list'>
                    {
                        leaders.map((leader) => {
                            return <div className='LB_element' key={`lbel-${leader.wallet}`}>
                                <div className='LB_element_name'>

                                    {`${leader.wallet.slice(0, 4)}...${leader.wallet.slice(-4)}`}
                                </div>
                                <div className='LB_element_score'>
                                    {leader.score}
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='LB_decor free_img'>
                    <img src="/img/heroLB.png" alt="" />
                </div>
            </div>
        </div>
    )
}