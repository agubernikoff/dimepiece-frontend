import React from 'react'
import Cobey from '../../assets/Cobey.png'

function FeaturedArticle() {
  return (
    <div className="featured-story">
        <img className="featured-story-img" alt="***TO BE FIXED***" src={Cobey}/>
         <div className="featured-story-blurb-container">
           <div className="featured-story-blurb-container-inside">
            <h2 className="featured-story-preview-title">Ginny Wright Makes Every Minute Count</h2>
            <p className="featured-story-preview-description">The CEO of Audemars Piguet and I were scheduled to meet on a sunny, sultry day in late August, but it was cool and crisp inside AP House, the new(ish) appointment only concept space by Audemars Piguet.</p>
            <button className="read-story-btn">READ STORY</button>
          </div>
        </div>
    </div>
  )
}

export default FeaturedArticle