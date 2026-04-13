const SHOPIFY_DOMAIN = "slumbor.myshopify.com";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

let cachedVariantId: string | null = null;

async function getVariantId(): Promise<string> {
  if (cachedVariantId) return cachedVariantId;

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/products.json?limit=10`);
  const data = await response.json();

  const product = data.products?.[0];

  if (!product?.variants?.[0]?.id) {
    throw new Error("Could not find product variant");
  }

  cachedVariantId = String(product.variants[0].id);
  return cachedVariantId;
}

export async function createCheckout(items: CartItem[]): Promise<string> {
  const variantId = await getVariantId();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return `https://${SHOPIFY_DOMAIN}/cart/${variantId}:${totalQuantity}`;
}
