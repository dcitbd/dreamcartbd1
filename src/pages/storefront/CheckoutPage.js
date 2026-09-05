/**
 * DREAM CART BD — CHECKOUT PAGE
 * One-column streamlined mobile/desktop checkout with instant cash on delivery.
 */

import { cartStore } from '../../store/cartStore.js';
import { formatCurrency } from '../../utils/format.js';
import { apiClient } from '../../api/client.js';
import { toast } from '../../components/Toast.js';

export function renderCheckoutPage() {
  const items = cartStore.items;
  const subtotal = cartStore.getSubtotal();
  const delivery = cartStore.deliveryCharge;
  const discount = cartStore.getDiscount();
  const grandTotal = cartStore.getGrandTotal();

  if (items.length === 0) {
    return `
      <div class="max-w-md mx-auto py-20 text-center">
        <div class="text-5xl mb-4">🛒</div>
        <h2 class="text-xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p class="text-xs text-slate-500 mt-2 mb-6">Please select products before proceeding to checkout.</p>
        <a href="#/shop" class="btn-primary text-xs">Return to Catalog</a>
      </div>
    `;
  }

  return `
    <div class="max-w-4xl mx-auto space-y-8 pb-20">
      
      <div>
        <h1 class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Express Checkout</h1>
        <p class="text-xs text-slate-500 mt-1">Please provide accurate delivery information to confirm your order.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left: Delivery & Customer Info Form -->
        <div class="lg:col-span-7 space-y-6">
          <form id="checkout-form" class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Delivery Address & Contact
            </h3>

            <div class="form-group">
              <label class="form-label text-xs">Full Name *</label>
              <input 
                type="text" 
                id="checkout-name" 
                required 
                placeholder="e.g. Md. Karim Uddin" 
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label class="form-label text-xs">Mobile Phone Number (11-digit Bangladesh Phone) *</label>
              <div class="flex gap-2">
                <div class="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 text-xs font-bold text-slate-600">
                  🇧🇩 +88
                </div>
                <input 
                  type="tel" 
                  id="checkout-phone" 
                  required 
                  placeholder="017XXXXXXXX" 
                  maxlength="11"
                  class="form-control"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label text-xs">Full Delivery Address (House/Road/Area) *</label>
              <textarea 
                id="checkout-address" 
                required 
                rows="3" 
                placeholder="e.g. House #12, Road #4, Sector #11, Uttara, Dhaka" 
                class="form-control"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="form-label text-xs">Delivery Location *</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-xl border border-emerald-500 bg-emerald-50/50 cursor-pointer">
                  <input type="radio" name="delivery_zone" value="dhaka" checked class="text-emerald-600 focus:ring-emerald-500" />
                  <div>
                    <div class="text-xs font-bold text-slate-900">Inside Dhaka</div>
                    <div class="text-[11px] text-emerald-700 font-semibold">৳60 delivery charge</div>
                  </div>
                </label>
                <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer">
                  <input type="radio" name="delivery_zone" value="outside" class="text-emerald-600 focus:ring-emerald-500" />
                  <div>
                    <div class="text-xs font-bold text-slate-900">Outside Dhaka</div>
                    <div class="text-[11px] text-slate-500 font-semibold">৳120 delivery charge</div>
                  </div>
                </label>
              </div>
            </div>

            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pt-2 pb-3 flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Payment Method
            </h3>

            <div class="space-y-2">
              <label class="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500 bg-emerald-50/60 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" name="payment_method" value="COD" checked class="text-emerald-600" />
                  <div>
                    <div class="text-xs font-bold text-slate-900">Cash on Delivery (COD)</div>
                    <div class="text-[11px] text-slate-500">Pay cash directly when receiving your parcel</div>
                  </div>
                </div>
                <span class="badge badge-success text-[10px]">Recommended</span>
              </label>

              <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" name="payment_method" value="BKASH" class="text-emerald-600" />
                  <div>
                    <div class="text-xs font-bold text-slate-900">bKash / Nagad Mobile Banking</div>
                    <div class="text-[11px] text-slate-500">Send Money / Merchant Payment</div>
                  </div>
                </div>
                <span class="text-xs font-bold text-pink-600">bKash</span>
              </label>
            </div>

            <button 
              type="submit" 
              id="btn-confirm-order" 
              class="btn-primary w-full py-4 text-base font-extrabold shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 mt-4"
            >
              Confirm Order (${formatCurrency(grandTotal)})
            </button>
          </form>
        </div>

        <!-- Right: Order Summary -->
        <div class="lg:col-span-5">
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 sticky top-24">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              Order Summary (${items.length} items)
            </h3>

            <div class="divide-y divide-slate-100 max-h-72 overflow-y-auto space-y-2 pr-1">
              ${items.map(it => `
                <div class="flex items-center gap-3 py-2">
                  <img src="${it.thumbnail}" class="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-xs font-bold text-slate-800 truncate">${it.name}</h5>
                    <div class="text-[11px] text-slate-500">${it.quantity} × ${formatCurrency(it.price)}</div>
                  </div>
                  <div class="text-xs font-bold text-slate-900">
                    ${formatCurrency(it.price * it.quantity)}
                  </div>
                </div>
              `).join("")}
            </div>

            <div class="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span class="font-bold text-slate-800">${formatCurrency(subtotal)}</span>
              </div>
              <div class="flex justify-between">
                <span>Delivery Charge:</span>
                <span id="summary-delivery-charge" class="font-bold text-slate-800">${formatCurrency(delivery)}</span>
              </div>
              ${discount > 0 ? `
                <div class="flex justify-between text-emerald-600 font-bold">
                  <span>Discount:</span>
                  <span>-${formatCurrency(discount)}</span>
                </div>
              ` : ""}
              <div class="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Grand Total:</span>
                <span id="summary-grand-total" class="text-emerald-700">${formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
              <span>🔒</span>
              <span>Encrypted server-side checkout via Google Apps Script.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}
