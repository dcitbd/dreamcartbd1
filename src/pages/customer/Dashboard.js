/**
 * DREAM CART BD — CUSTOMER DASHBOARD
 * Displays authenticated customer profile, live order tracking, addresses, and wishlist.
 */

import { authStore } from '../../store/authStore.js';
import { formatCurrency } from '../../utils/format.js';

export function renderCustomerDashboard() {
  const user = authStore.user || {
    name: "Customer User",
    phone: "01755443322",
    email: "customer@dreamcartbd.com",
    role: "CUSTOMER"
  };

  return `
    <div class="space-y-8 pb-20">
      
      <!-- Welcome Header -->
      <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
            ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl md:text-2xl font-black text-slate-900">${user.name}</h1>
              <span class="badge badge-success text-[10px]">${user.role}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">📞 ${user.phone} ${user.email ? `| ✉️ ${user.email}` : ''}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <a href="#/track" class="btn-secondary text-xs py-2 px-3">Track Parcel</a>
          <a href="#/shop" class="btn-primary text-xs py-2 px-4">Browse Deals →</a>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div class="text-xs font-bold text-slate-400">Total Orders</div>
          <div class="text-2xl font-black text-slate-900 mt-1">3</div>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div class="text-xs font-bold text-emerald-600">Delivered</div>
          <div class="text-2xl font-black text-emerald-600 mt-1">2</div>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div class="text-xs font-bold text-amber-500">In Transit</div>
          <div class="text-2xl font-black text-amber-500 mt-1">1</div>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div class="text-xs font-bold text-slate-400">Saved Addresses</div>
          <div class="text-2xl font-black text-slate-900 mt-1">2</div>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h3 class="font-black text-slate-900 text-base">My Order History</h3>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
              <tr>
                <th class="py-3 px-3">Order ID</th>
                <th class="py-3 px-3">Item Details</th>
                <th class="py-3 px-3">Total Amount</th>
                <th class="py-3 px-3">Payment</th>
                <th class="py-3 px-3">Status</th>
                <th class="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td class="py-3 px-3 font-mono font-bold text-emerald-700">ORD-2609-1001</td>
                <td class="py-3 px-3">Amazfit GTS 4 Smartwatch</td>
                <td class="py-3 px-3 font-bold text-slate-900">৳18,560</td>
                <td class="py-3 px-3">Cash on Delivery</td>
                <td class="py-3 px-3"><span class="badge badge-warning">PROCESSING</span></td>
                <td class="py-3 px-3">
                  <a href="#/track?orderId=ORD-2609-1001" class="text-emerald-700 font-bold hover:underline">Track Live</a>
                </td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-mono font-bold text-emerald-700">ORD-2609-8472</td>
                <td class="py-3 px-3">Pure Organic Maca Root Powder (250g)</td>
                <td class="py-3 px-3 font-bold text-slate-900">৳1,310</td>
                <td class="py-3 px-3">Cash on Delivery</td>
                <td class="py-3 px-3"><span class="badge badge-success">DELIVERED</span></td>
                <td class="py-3 px-3">
                  <a href="#/track?orderId=ORD-2609-8472" class="text-slate-500 hover:underline">View Receipt</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

export const renderDashboard = renderCustomerDashboard;
