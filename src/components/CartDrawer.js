/**
 * DREAM CART BD — SLIDE-OUT CART DRAWER
 * Real-time calculation, free delivery progress, coupon codes, checkout button.
 */

import { cartStore } from '../store/cartStore.js';
import { formatCurrency } from '../utils/format.js';
import { toast } from './Toast.js';

export function renderCartDrawer() {
  const items = cartStore.items;
  const subtotal = cartStore.getSubtotal();
  const delivery = cartStore.deliveryCharge;
  const discount = cartStore.getDiscount();
  const grandTotal = cartStore.getGrandTotal();
  const count = cartStore.getCount();

  const freeDeliveryThreshold = 1500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  return `
    <div id="cart-drawer-backdrop" class="drawer-backdrop"></div>
    <div id="cart-drawer-panel" class="drawer-content">
      
      <!-- Drawer Header -->
      <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            🛒
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Your Shopping Cart</h3>
            <p class="text-xs text-slate-500">${count} ${count === 1 ? 'item' : 'items'} selected</p>
          </div>
        </div>
        <button id="btn-close-cart" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Free Shipping Goal Indicator -->
      <div class="p-3 bg-emerald-50 border-b border-emerald-100 text-xs">
        <div class="flex justify-between items-center mb-1 font-semibold text-emerald-900">
          <span>${amountNeeded > 0 ? `Add ${formatCurrency(amountNeeded)} more for FREE delivery!` : "🎉 You qualify for FREE Delivery!"}</span>
          <span>${progressPercent}%</span>
        </div>
        <div class="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
          <div class="bg-emerald-600 h-full rounded-full transition-all duration-500" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <!-- Items List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        ${items.length === 0 ? `
          <div class="py-16 text-center">
            <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              🛍️
            </div>
            <h4 class="font-bold text-slate-700 text-sm">Your cart is empty</h4>
            <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Explore our hot deals and smart products to add items here!</p>
            <a href="#/shop" class="btn-primary mt-4 text-xs py-2 px-5 inline-flex" id="btn-empty-cart-shop">Start Shopping</a>
          </div>
        ` : items.map(item => `
          <div class="flex gap-3 p-2.5 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition">
            <img src="${item.thumbnail}" class="w-16 h-16 object-cover rounded-lg bg-slate-100 flex-shrink-0" />
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h5 class="text-xs font-bold text-slate-800 line-clamp-1">${item.name}</h5>
                <span class="text-[11px] text-slate-400">${item.seller_name || "Dream Cart BD"}</span>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-sm font-extrabold text-emerald-700">${formatCurrency(item.price)}</span>
                <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button class="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold cart-qty-minus" data-id="${item.product_id}">-</button>
                  <span class="px-2 text-xs font-semibold text-slate-800">${item.quantity}</span>
                  <button class="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold cart-qty-plus" data-id="${item.product_id}">+</button>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Coupon & Summary Footer -->
      ${items.length > 0 ? `
        <div class="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          
          <!-- Coupon Box -->
          <div class="flex gap-2">
            <input 
              type="text" 
              id="drawer-coupon-input" 
              placeholder="Promo Code (Try DREAM10)" 
              value="${cartStore.coupon ? cartStore.coupon.code : ''}"
              class="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs uppercase font-bold outline-none focus:border-emerald-500"
            />
            <button id="btn-apply-drawer-coupon" class="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-semibold">
              Apply
            </button>
          </div>

          <!-- Totals -->
          <div class="space-y-1.5 text-xs text-slate-600 pt-1">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span class="font-bold text-slate-900">${formatCurrency(subtotal)}</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Delivery:</span>
              <span class="font-medium">${formatCurrency(delivery)}</span>
            </div>
            ${discount > 0 ? `
              <div class="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount (${cartStore.coupon.code}):</span>
                <span>-${formatCurrency(discount)}</span>
              </div>
            ` : ""}
            <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Grand Total:</span>
              <span class="text-emerald-700 text-base">${formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <a href="#/checkout" id="btn-drawer-checkout" class="btn-primary w-full py-3 text-center justify-center font-bold text-sm shadow-md">
            Proceed to Checkout
          </a>
        </div>
      ` : ""}

    </div>
  `;
}
