/**
 * DREAM CART BD — HOME PAGE
 */

import { renderProductCard } from '../../components/ProductCard.js';
import { apiClient } from '../../api/client.js';

export async function renderHomePage() {
  const res = await apiClient.request("products/list");
  const products = (res.data && res.data.items) || [];

  return `
    <div class="space-y-12 pb-16">
      
      <!-- Hero Banner Section -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 md:p-14 shadow-2xl border border-emerald-900/40">
        <div class="relative z-10 max-w-2xl">
          <div class="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Direct Multi-Vendor Marketplace
          </div>
          <h1 class="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Smart Digital Commerce for <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Modern Living.</span>
          </h1>
          <p class="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
            Direct sourcing from authentic importers and master suppliers. Discover cutting-edge smartwatches, pure organic health supplements, tactical lighting, and kitchen safety essentials.
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <a href="#/shop" class="btn-primary py-3 px-6 text-sm font-bold shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50">
              Explore Hot Deals →
            </a>
            <a href="#/partner" class="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 py-3 px-6 text-sm font-semibold backdrop-blur">
              Become a Seller / Reseller
            </a>
          </div>
        </div>

        <!-- Decorative Background Elements -->
        <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-90">
          <div class="w-72 h-72 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 p-4 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center text-center">
            <div>
              <div class="text-4xl mb-2">⚡</div>
              <div class="text-xl font-bold text-white">Guaranteed Fast Delivery</div>
              <div class="text-xs text-emerald-300 mt-1">Cash on Delivery across all 64 districts</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Badges -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            🚚
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-800">Nationwide Delivery</h4>
            <p class="text-[11px] text-slate-500">Fast courier dispatch</p>
          </div>
        </div>
        <div class="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            🛡️
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-800">100% Authentic</h4>
            <p class="text-[11px] text-slate-500">Original products only</p>
          </div>
        </div>
        <div class="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            💵
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-800">Cash on Delivery</h4>
            <p class="text-[11px] text-slate-500">Pay upon parcel check</p>
          </div>
        </div>
        <div class="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            🔄
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-800">7 Days Warranty</h4>
            <p class="text-[11px] text-slate-500">Easy replacement guarantee</p>
          </div>
        </div>
      </section>

      <!-- Featured Products Grid -->
      <section>
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-widest">Handpicked Collections</span>
            <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Trending Products & Deals</h2>
          </div>
          <div class="flex items-center gap-2">
            <a href="#/shop" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              View All Catalog (64+) →
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${products.map(p => renderProductCard(p)).join("")}
        </div>
      </section>

      <!-- Multi-Vendor Value Proposition Banner -->
      <section class="rounded-3xl bg-slate-900 text-white p-8 md:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="max-w-xl">
          <span class="bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">Opportunity</span>
          <h3 class="text-2xl md:text-3xl font-black mt-2 mb-3">Earn with Dream Cart BD</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Sell directly to thousands of customers or start dropshipping as a verified Reseller with zero upfront stock risk. Wholesalers enjoy direct factory pricing with guaranteed MOQ fulfillment.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a href="#/partner" class="btn-primary text-center whitespace-nowrap">Join Partner Network</a>
          <a href="#/admin" class="btn-secondary bg-slate-800 border-slate-700 text-white hover:bg-slate-700 text-center whitespace-nowrap">Admin Login</a>
        </div>
      </section>

    </div>
  `;
}
