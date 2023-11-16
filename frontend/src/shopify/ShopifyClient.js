import Client from "shopify-buy";

export const shopifyClient = Client.buildClient({
  domain: "dimepiece-watches.myshopify.com",
  storefrontAccessToken: "65fae332c0dee66229832aa42c865311",
});
