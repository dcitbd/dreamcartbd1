/**
 * DREAM CART BD — PRODUCT DETAIL PAGE
 */

import { apiClient } from '../../api/client.js';
import { formatCurrency } from '../../utils/format.js';
import { cartStore } from '../../store/cartStore.js';
import { toast } from '../../components/Toast.js';

export async function renderProductDetailPage(slugOrId) {
  const res = await apiClient.request("products/details", { id: slugOrId, slug: slugOrId });
  const p = res.data;

  if (!p) {
    return `
      <div class="py-20 text-center">
        <h2 class="text-xl font-bold text-slate-800">Product Not Found</h2>
        <a href="#/shop" class="btn-primary mt-4 text-xs">Back to Shop</a>
      </div>
    `;
  }

  const isDiscounted = p.regular_price && p.regular_price > p.selling_price;
  const discountPercent = isDiscounted ? Math.round(((p.regular_price - p.selling_price) / p.regular_price) * 100) : 0;

  return `
    <div class="space-y-8 pb-16" data-product-json='${JSON.stringify(p).replace(/'/g, "&apos;")}'>
      
      <!-- Breadcrumb -->
      <div class="text-xs text-slate-400">
        <a href="#/" class="hover:text-emerald-600">Home</a> / 
        <a href="#/shop" class="hover:text-emerald-600">Products</a> / 
        <span class="text-slate-700 font-semibold">${p.name}</span>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        
        <!-- Gallery Column -->
        <div class="space-y-4">
          <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
            <img 
              id="detail-main-img" 
              src="${p.thumbnail || (p.images && p.images[0] ? p.images[0].image_url : '')}" 
              class="w-full h-full object-cover" 
              alt="${p.name}" 
            />
            ${discountPercent > 0 ? `
              <div class="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                -${discountPercent}% OFF
              </div>
            ` : ""}
          </div>
        </div>

        <!-- Product Information Column -->
        <div class="space-y-5 flex flex-col justify-between">
          <div>
            
            <!-- Seller badge -->
            <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <span>Verified Seller: <strong>${p.seller_name || "Dream Cart BD"}</strong></span>
            </div>

            <h1 class="text-xl md:text-2xl font-black text-slate-900 leading-snug">
              ${p.name}
            </h1>

            <div class="flex items-center gap-3 mt-2 text-xs text-slate-500">
              <span class="text-amber-500 font-bold">★ 4.9 (38 Customer Reviews)</span>
              <span>•</span>
              <span class="text-emerald-600 font-semibold">SKU: ${p.sku || p.product_id}</span>
              <span>•</span>
              <span class="text-slate-600">In Stock (${p.available_stock || 10} units)</span>
            </div>

            <!-- Pricing Box -->
            <div class="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline gap-3">
              <span class="text-3xl font-black text-emerald-700">${formatCurrency(p.selling_price)}</span>
              ${isDiscounted ? `
                <span class="text-sm text-slate-400 line-through font-semibold">${formatCurrency(p.regular_price)}</span>
                <span class="text-xs text-rose-600 font-bold">Save ${formatCurrency(p.regular_price - p.selling_price)}</span>
              ` : ""}
            </div>

            <!-- Short Description -->
            <p class="mt-4 text-sm text-slate-600 leading-relaxed">
              ${p.short_description || "High quality verified product with standard manufacturer warranty and guaranteed nationwide delivery."}
            </p>

            <!-- Quantity & Actions -->
            <div class="mt-6 space-y-4">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-slate-700">Quantity:</span>
                <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button id="btn-detail-minus" class="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold">-</button>
                  <span id="detail-qty-display" class="px-4 text-sm font-bold text-slate-900">1</span>
                  <button id="btn-detail-plus" class="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold">+</button>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <button id="btn-detail-add-cart" class="btn-primary flex-1 py-3.5 text-sm font-bold shadow-lg">
                  Add to Cart
                </button>
                <button id="btn-detail-buy-now" class="btn-secondary flex-1 py-3.5 text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 border-none shadow-md">
                  ⚡ Buy Now (Cash on Delivery)
                </button>
              </div>
            </div>

          </div>

          <!-- Trust & Delivery Matrix -->
          <div class="border-t border-slate-100 pt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div class="flex items-center gap-2">
              <span class="text-emerald-600 text-base">🛡️</span>
              <span>${p.warranty || "7 Days Replacement"}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-600 text-base">🚚</span>
              <span>Inside Dhaka: ৳60 | Outside: ৳120</span>
            </div>
          </div>

        </div>

      </div>

      <!-- Description Tabs Section -->
      <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 class="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
          Detailed Specifications & Overview
        </h3>
        <div class="prose text-sm text-slate-600 leading-relaxed space-y-3">
          <p>
            Dream Cart BD guarantees that all products undergo pre-dispatch quality verification. Whether ordering for personal use or stocking up for your retail/wholesale customer network, this item complies with strict safety and durability metrics.
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-700">
            <li>Original manufacturer grade packaging.</li>
            <li>Serial and SKU verified against Google Sheet inventory ledger.</li>
            <li>Instant dispatch via Steadfast, Pathao or RedX Courier.</li>
          </ul>
        </div>
      </div>

    </div>
  `;
}
