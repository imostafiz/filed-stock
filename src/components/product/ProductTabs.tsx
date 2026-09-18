'use client';

import { useState } from 'react';
import ReviewList from './ReviewList';
import type { Product } from '@/types/product';

type ProductTabsProps = {
  product: Product;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const tabs = [
    { id: 'description' as const, label: 'Description' },
    { id: 'specs' as const, label: 'Specifications' },
    { id: 'reviews' as const, label: `Reviews (${product.reviews.length})` },
  ];

  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-[#1A2332] text-[#1A2332]'
                  : 'text-gray-500 hover:text-[#1A2332]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose prose-sm max-w-none text-gray-600">
            <p className="leading-relaxed">{product.description}</p>
            {product.tags.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold text-[#1A2332]">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-[#1A2332]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr key={spec.label} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-[#1A2332]">{spec.label}</td>
                    <td className="px-4 py-3 text-gray-600">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && <ReviewList reviews={product.reviews} />}
      </div>
    </div>
  );
};

export default ProductTabs;
