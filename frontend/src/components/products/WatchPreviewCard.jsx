import React from 'react';


function WatchPreviewCard({watch}){
    console.log(watch);
    return(
        <div className="watch-preview-card">
            <img src={watch.previewImageUrl} alt={watch.title}/>
            <p>{watch.title}</p>
            <p>$ {watch.priceRange.maxVariantPrice}</p>
            <p></p>
        </div>
    )
}

export default WatchPreviewCard;