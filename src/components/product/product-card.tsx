"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <Link
      href={`/products/${product.handle}/`}
      className="group block"
    >
      <div className="relative glass-card glass-card-hover rounded-2xl overflow-hidden transition-all duration-300">
        <div className="relative aspect-square bg-gradient-to-br from-gold-light/30 to-surface overflow-hidden">
          {discount > 0 && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-white text-xs font-bold rounded-full z-10">
              -{discount}% OFF
            </span>
          )}
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <h3 className="font-heading font-bold text-heading text-lg mb-1 group-hover:text-gold transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-slate italic mb-3">{product.tagline}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gold">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-sm text-muted line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
