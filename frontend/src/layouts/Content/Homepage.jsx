import React from 'react';
import FeaturedArticle from './FeaturedArticle';
import WatchPreview from '../../components/products/WatchPreview';

function Homepage() {
    return (
        <div className="homepage">
            <FeaturedArticle/>
            <WatchPreview/>
        </div>
    )
}

export default Homepage;
