/**
 * DREAM CART BD — HEADER COMPONENT
 * Luxury brand header, multi-role auth buttons, live search, categories menu, cart counter.
 */

import { cartStore } from '../store/cartStore.js';
import { authStore } from '../store/authStore.js';

export function renderHeader() {
  const cartCount = cartStore.getCount();
  const user = authStore.user;
  const isAuth = authStore.isAuthenticated();

  // Determine dashboard link based on role
  let dashboardLink = "#/account";
  let roleBadge = "Customer";
  if (user) {
    if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") {
      dashboardLink = "#/admin";
      roleBadge = "Super Admin";
    } else if (user.role === "SELLER") {
      dashboardLink = "#/seller";
      roleBadge = "Seller";
    } else if (user.role === "RESELLER") {
      dashboardLink = "#/reseller";
      roleBadge = "Reseller";
    } else if (user.role === "WHOLESALE_CUSTOMER") {
      dashboardLink = "#/wholesale";
      roleBadge = "Wholesaler";
    }
  }

  return `
    <!-- Top Announcement Bar -->
    <div class="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-xs py-2 px-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-2 font-medium">
          <span class="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">Hot Deal</span>
          <span>Flat 10% OFF with code <strong class="text-amber-300">DREAM10</strong> | Free Delivery inside Dhaka over ৳1,500</span>
        </div>
        <div class="hidden md:flex items-center gap-4 text-emerald-100">
          <a href="#/partner" class="hover:text-white transition flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            Seller / Reseller Portal
          </a>
          <span>|</span>
          <a href="#/track" class="hover:text-white transition flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Track Order
          </a>
          <span>|</span>
          <span>Hotline: 01581-703822</span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="sticky top-0 z-50 glass-nav transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        <!-- Logo -->
        <a href="#/" class="flex items-center gap-2 group flex-shrink-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition">
            DC
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition">Dream Cart <span class="text-emerald-600">BD</span></span>
            <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">Smart Digital Commerce</span>
          </div>
        </a>

        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-xl relative">
          <input 
            type="text" 
            id="global-search-input"
            placeholder="Search smartwatches, organic supplements, torches, gas accessories..." 
            class="w-full pl-11 pr-24 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-sm outline-none transition"
          />
          <svg class="w-5 h-5 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <button id="global-search-btn" class="absolute right-1.5 top-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-sm">
            Search
          </button>
        </div>

        <!-- Action Items -->
        <div class="flex items-center gap-2 sm:gap-3">
          
          <!-- Fraud Checker Tool -->
          <a href="#/fraud" class="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-semibold transition" title="Check Customer Courier Success Rate">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span class="hidden sm:inline">Fraud Checker</span>
          </a>

          <!-- Dynamic Auth State (Login/Register OR User Dashboard) -->
          ${isAuth ? `
            <div class="flex items-center gap-2">
              <a href="${dashboardLink}" class="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold transition">
                <span>👤</span>
                <span class="hidden sm:inline">${user.name ? user.name.split(' ')[0] : 'My Account'}</span>
                <span class="bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded">${roleBadge}</span>
              </a>
              <button id="btn-header-logout" class="p-1.5 text-slate-400 hover:text-rose-600 transition" title="Logout">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </button>
            </div>
          ` : `
            <div class="flex items-center gap-1.5">
              <a href="#/login" class="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                <span>Login</span>
              </a>
              <a href="#/register" class="hidden sm:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm">
                Register
              </a>
            </div>
          `}

          <!-- Cart Trigger Button -->
          <button id="btn-open-cart" class="relative p-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span id="header-cart-badge" class="absolute -top-1 -right-1 bg-emerald-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              ${cartCount}
            </span>
          </button>

        </div>
      </div>

      <!-- Categories Sub-header -->
      <nav class="border-t border-slate-100 bg-white/60 hidden sm:block">
        <div class="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto py-2 text-xs font-semibold text-slate-600">
          <a href="#/shop" class="hover:text-emerald-600 flex items-center gap-1 transition">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            All Products
          </a>
          <a href="#/shop?cat=CAT-SMARTWATCH" class="hover:text-emerald-600 transition">Smartwatches</a>
          <a href="#/shop?cat=CAT-ORGANIC" class="hover:text-emerald-600 transition">Organic & Health</a>
          <a href="#/shop?cat=CAT-ELECTRONICS" class="hover:text-emerald-600 transition">Tools & LED Lights</a>
          <a href="#/shop?cat=CAT-HOME" class="hover:text-emerald-600 transition">Home & Kitchen</a>
          <a href="#/partner" class="hover:text-emerald-600 text-emerald-700 font-bold transition">Wholesale / Reseller Catalog</a>
          <a href="#/track" class="hover:text-emerald-600 transition ml-auto flex items-center gap-1 text-slate-500">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            Order Tracking
          </a>
        </div>
      </nav>
    </header>
  `;
}
