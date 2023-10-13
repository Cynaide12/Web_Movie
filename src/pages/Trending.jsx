import React from 'react'
import '../style/scss/trending.scss'
import Trending from '../components/UI/card/Trending_card'
import { useFilmsDataContext } from '../context/apiContext'
import TrendingList from '../components/UI/cardList/cardList'

const TrendingPage = () => {
    const { filmsData } = useFilmsDataContext()
    return (
        <>
            <main className='content'>
                {filmsData && filmsData.length > 0 ?
                    <TrendingList title='Популярное на данный момент'>
                        {filmsData.map((item) => {
                            return (
                                <Trending
                                    key={item._id}
                                    src={item.thumbnail.split('src')[1]}
                                    title={item.title}
                                    description={item.category}
                                    date={item.date}
                                    id={item._id}
                                />
                            )
                        })}
                    </TrendingList> : <TrendingList title='Популярное на данный момент' isPreloader={true}/>}
            </main>
        </>
    )
}
export default TrendingPage;