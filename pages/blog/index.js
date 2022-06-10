import React from 'react';

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ListArticle from '../../components/ListArticle/index'
import AboutData from '../../components/About';

const style = {
    footer: `lg:absolute lg:bottom-0`,
}
    
const Blog = () => {
    return (
        <div className={style.container}>
            <Header />
            <ListArticle />
            <Footer />
        </div>
    )
}

export default Blog