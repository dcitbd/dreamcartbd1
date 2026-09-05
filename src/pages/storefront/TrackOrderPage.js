/**
 * DREAM CART BD — TRACK ORDER PAGE
 */

export function renderTrackOrderPage(orderId = "") {
  return `
    <div class="max-w-2xl mx-auto space-y-8 py-8 px-4">
      
      <div class="text-center">
        <h1 class="text-2xl md:text-3xl font-black text-slate-900">Track Your Shipment</h1>
        <p class="text-xs text-slate-500 mt-1">Enter your Order ID or registered phone number</p>
      </div>

      <!-- Search Box -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div class="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            id="track-input" 
            placeholder="e.g. ORD-2609-1001 or 017XXXXXXXX" 
            value="${orderId || ''}"
            class="form-control text-sm flex-1"
          />
          <button id="btn-track-submit" class="btn-primary text-xs py-3 px-6 whitespace-nowrap">
            Check Status
          </button>
        </div>
      </div>

      <!-- Live Timeline Stepper -->
      <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h4 class="font-bold text-slate-900 text-sm">Order Status: <span class="text-emerald-600">CONFIRMED</span></h4>
            <p class="text-xs text-slate-400">Carrier: Steadfast Courier (Tracking: ST-849204BD)</p>
          </div>
          <span class="badge badge-success">Active</span>
        </div>

        <div class="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
          
          <div class="relative">
            <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
            <div class="font-bold text-slate-900 text-xs">Order Placed & Verified</div>
            <div class="text-[11px] text-slate-500">Order recorded in Google Sheets database</div>
          </div>

          <div class="relative">
            <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
            <div class="font-bold text-slate-900 text-xs">Inventory Reserved & Packaging</div>
            <div class="text-[11px] text-slate-500">Quality check passed at Maheshkhali hub</div>
          </div>

          <div class="relative opacity-60">
            <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 border-4 border-white shadow-sm"></div>
            <div class="font-bold text-slate-700 text-xs">Handed over to Courier</div>
            <div class="text-[11px] text-slate-400">Awaiting hub pickup</div>
          </div>

          <div class="relative opacity-40">
            <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-200 border-4 border-white shadow-sm"></div>
            <div class="font-bold text-slate-700 text-xs">Out for Delivery</div>
            <div class="text-[11px] text-slate-400">Rider on the way to customer address</div>
          </div>

        </div>
      </div>

    </div>
  `;
}
