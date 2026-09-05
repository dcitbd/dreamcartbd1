/**
 * DREAM CART BD — ORDER SUCCESS PAGE
 */

import { formatCurrency } from '../../utils/format.js';

export function renderOrderSuccessPage(orderId = "ORD-2609-8472") {
  return `
    <div class="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
      
      <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-glow">
        ✓
      </div>

      <div>
        <span class="badge badge-success text-xs mb-2">Order Confirmed</span>
        <h1 class="text-2xl md:text-3xl font-black text-slate-900">Thank You for Your Order!</h1>
        <p class="text-xs text-slate-500 mt-2">
          Your order has been recorded into our central Google Sheets ledger and queued for dispatch.
        </p>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-left space-y-3">
        <div class="flex justify-between items-center border-b border-slate-100 pb-3">
          <span class="text-xs text-slate-500">Order ID:</span>
          <span class="text-sm font-extrabold text-emerald-700 font-mono">${orderId}</span>
        </div>
        <div class="flex justify-between items-center border-b border-slate-100 pb-3">
          <span class="text-xs text-slate-500">Payment Method:</span>
          <span class="text-xs font-bold text-slate-800">Cash on Delivery (COD)</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-xs text-slate-500">Estimated Delivery:</span>
          <span class="text-xs font-bold text-slate-800">2 - 3 Working Days</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="#/track?orderId=${orderId}" class="btn-primary text-xs py-3 px-6">
          Track Delivery Timeline →
        </a>
        <a href="#/shop" class="btn-secondary text-xs py-3 px-6">
          Continue Shopping
        </a>
      </div>

    </div>
  `;
}
