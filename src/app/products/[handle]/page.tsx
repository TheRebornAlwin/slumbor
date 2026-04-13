import { products } from "@/lib/data";
import type { Metadata } from "next";
import ProductPageClient from "./product-page-client";

export function generateStaticParams() {
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);
  if (!product) {
    return { title: "Product Not Found | Slumbor" };
  }
  return {
    title: `${product.title} | Slumbor`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-heading font-bold text-heading">Product not found</h1>
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}
