import React from 'react';
import FeaturedArticle from './FeaturedArticle';
import WatchPreview from '../../components/products/WatchPreview';
import LatestsStories from '../../components/stories/LatestsStories';

function Homepage() {
    return (
        <div className="homepage">
            <FeaturedArticle/>
            <LatestsStories/>
            <WatchPreview/>
        </div>
    )
}

export default Homepage;
