import React from 'react';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products/category/mens-shirts', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function Home() {
  const data = await getProducts();
  const products = data.products;
  const randomProduct = products[Math.floor(Math.random() * products.length)];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[320px] relative">
        <h2 className="text-center text-lg font-bold mb-4">Fashion Trending 2026</h2>
        
        <div className="bg-[#f0f2f5] rounded-xl p-4 h-[240px] flex items-center justify-center mb-4 relative overflow-hidden">
          <img 
            src={randomProduct.thumbnail} 
            alt={randomProduct.title}
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[#3b82f6] text-xs font-semibold">New Arrival</span>
          <span className="text-[#ef4444] font-bold text-lg">${randomProduct.price}</span>
        </div>
        
        <h3 className="font-bold text-sm mb-4 truncate" title={randomProduct.title}>
          {randomProduct.title}
        </h3>

        <button className="w-full bg-black text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}