const SHOPIFY_DOMAIN = "slumbor.myshopify.com";

// Shopify variant IDs (from the product URLs' ?variant= value).
const VARIANT_IDS: Record<string, string> = {
  "sleepwave-pro": "58281487565181",
};
const PROTECTION_PLAN_VARIANT = "58281499689341";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// Builds a Shopify cart permalink, e.g.
//   https://slumbor.myshopify.com/cart/58281487565181:2,58281499689341:1?discount=SAVE10
// which drops the shopper straight into Shopify's cart/checkout with the right
// items, the protection plan (when selected), and the matching bundle discount.
export function createCheckout(
  items: CartItem[],
  includeProtectionPlan = false
): string {
  const lines = items
    .map((i) => {
      const variant = VARIANT_IDS[i.id];
      return variant ? `${variant}:${i.quantity}` : null;
    })
    .filter((line): line is string => line !== null);

  if (includeProtectionPlan && lines.length > 0) {
    lines.push(`${PROTECTION_PLAN_VARIANT}:1`);
  }

  let url = `https://${SHOPIFY_DOMAIN}/cart/${lines.join(",")}`;

  // Carry the bundle discount over to Shopify via a code (create SAVE10 / SAVE20
  // in Shopify Discounts). Invalid/missing codes are simply ignored by Shopify.
  const maskQty = items
    .filter((i) => i.id === "sleepwave-pro")
    .reduce((sum, i) => sum + i.quantity, 0);
  const discountCode = maskQty >= 3 ? "SAVE20" : maskQty >= 2 ? "SAVE10" : "";
  if (discountCode) url += `?discount=${discountCode}`;

  return url;
}
