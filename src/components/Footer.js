/**
 * DREAM CART BD — FOOTER COMPONENT
 */

export function renderFooter() {
  return `
    <footer class="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 mt-20 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <!-- Col 1: Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-lg">
              DC
            </div>
            <span class="text-xl font-bold text-white tracking-tight">Dream Cart <span class="text-emerald-400">BD</span></span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mb-4">
            Bangladesh's premier high-reliability smart digital commerce platform. Premium smartwatches, organic supplements, tactical lighting, and energy-saving kitchen solutions.
          </p>
          <div class="text-xs text-slate-400 space-y-1.5">
            <p>📍 Maheshkhali, Cox's Bazar, Bangladesh</p>
            <p>📞 Phone: +880 1581-703822</p>
            <p>✉️ Email: support@dreamcartbd.com</p>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Customer Care</h4>
          <ul class="space-y-2.5 text-sm text-slate-400">
            <li><a href="#/track" class="hover:text-emerald-400 transition">Track Your Order</a></li>
            <li><a href="#/shop" class="hover:text-emerald-400 transition">Browse Products</a></li>
            <li><a href="#/account" class="hover:text-emerald-400 transition">My Account</a></li>
            <li><a href="#/partner" class="hover:text-emerald-400 transition">Become a Seller</a></li>
            <li><a href="#/partner" class="hover:text-emerald-400 transition">Reseller & Wholesale</a></li>
          </ul>
        </div>

        <!-- Col 3: Safe Delivery -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Logistics & Courier</h4>
          <p class="text-xs text-slate-400 mb-3">Integrated nationwide delivery network with automated tracking & fraud verification:</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-semibold">Steadfast Courier</span>
            <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-semibold">Pathao Courier</span>
            <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-semibold">RedX Delivery</span>
            <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-semibold">Paperfly</span>
          </div>
          <div class="mt-4 p-3 bg-slate-800/60 rounded-lg border border-slate-700/80 text-[11px] text-slate-400">
            🔒 100% Cash on Delivery available nationwide with instant SMS confirmation.
          </div>
        </div>

        <!-- Col 4: Payment Methods -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Secure Payments</h4>
          <p class="text-xs text-slate-400 mb-3">Accepting all major Bangladeshi mobile banking & cards:</p>
          <div class="grid grid-cols-3 gap-2">
            <div class="bg-slate-800 border border-slate-700 p-2 rounded text-center text-xs font-bold text-pink-400">bKash</div>
            <div class="bg-slate-800 border border-slate-700 p-2 rounded text-center text-xs font-bold text-orange-400">Nagad</div>
            <div class="bg-slate-800 border border-slate-700 p-2 rounded text-center text-xs font-bold text-purple-400">Rocket</div>
            <div class="bg-slate-800 border border-slate-700 p-2 rounded text-center text-xs font-bold text-emerald-400">COD</div>
            <div class="bg-slate-800 border border-slate-700 p-2 rounded text-center text-xs font-bold text-blue-400">Visa</div>
            <div class="bg-slate-800 border border-slate-700 p-2 rounded text-center text-xs font-bold text-amber-400">Mastercard</div>
          </div>
        </div>

      </div>

      <div class="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© 2026 Dream Cart BD. All rights reserved. Powered by Google Apps Script + Google Sheets Architecture.</p>
        <div class="flex gap-4">
          <a href="#/" class="hover:text-slate-400">Privacy Policy</a>
          <a href="#/" class="hover:text-slate-400">Terms of Service</a>
          <a href="#/" class="hover:text-slate-400">Return & Refund Policy</a>
        </div>
      </div>
    </footer>
  `;
}
