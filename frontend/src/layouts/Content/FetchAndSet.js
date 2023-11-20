import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";
import { client } from "../../sanity/SanityClient";

function FetchAndSet() {
  const dispatch = useDispatch();
  useEffect(() => {
    client
      .fetch(`*[_type == "product" && isFeatured == true][0]`)
      .then((response) => dispatch(articleActions.setBrynnsPick(response)));
    client
      .fetch(
        `*[_type == "articles"]{_id,title,isFeatured,category,datePublished,coverImage{asset->{url}}} | order(datePublished desc)`
      )
      .then((response) => dispatch(articleActions.setStories(response)));
    client
      .fetch(`*[_type == "categories"]{_id,descriptor,title}`)
      .then((response) => dispatch(articleActions.setTypes(response)));
    client
      .fetch(`*[_type == "brands"]{_id,descriptor,title}`)
      .then((response) => dispatch(cartActions.setBrands(response)));
    client
      .fetch(
        `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id]`
      )
      .then((response) => {
        dispatch(cartActions.setWatches(response));
      });
  }, []);
}

export default FetchAndSet;
