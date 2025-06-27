import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const shopifyClient = createStorefrontApiClient({
  storeDomain: "dimepiece-watches.myshopify.com",
  publicAccessToken: "9de6cf51cf6f30c9870f6c637e66fdd1",
  apiVersion: "2025-01",
});
