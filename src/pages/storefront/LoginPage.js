/**
 * DREAM CART BD — LOGIN PAGE
 * Multi-role login with 1-click demo access for Super Admin, Seller, Reseller, Wholesaler, and Customer.
 */

import { authStore } from '../../store/authStore.js';
import { apiClient } from '../../api/client.js';
import { toast } from '../../components/Toast.js';

export function renderLoginPage() {
  return `
    <div class="max-w-md mx-auto py-12 px-4 space-y-6">
      
      <div class="text-center">
        <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md mb-3">
          DC
        </div>
        <h1 class="text-2xl font-black text-slate-900">Sign in to Dream Cart BD</h1>
        <p class="text-xs text-slate-500 mt-1">Access your customer account, seller portal, or admin hub</p>
      </div>

      <!-- Main Login Form -->
      <form id="form-login" class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        
        <div class="form-group">
          <label class="form-label text-xs">Mobile Phone or Email</label>
          <input 
            type="text" 
            id="login-identifier" 
            placeholder="01581703822 or admin@dreamcartbd.com" 
            required 
            class="form-control text-sm"
          />
        </div>

        <div class="form-group">
          <label class="form-label text-xs">Password</label>
          <input 
            type="password" 
            id="login-password" 
            placeholder="••••••••" 
            required 
            class="form-control text-sm"
          />
        </div>

        <button 
          type="submit" 
          id="btn-submit-login" 
          class="btn-primary w-full py-3 text-sm font-bold shadow-md shadow-emerald-600/30"
        >
          Sign In
        </button>

        <div class="text-center pt-2 text-xs text-slate-500">
          Don't have an account? <a href="#/register" class="font-bold text-emerald-600 hover:underline">Register now</a>
        </div>
      </form>

      <!-- 1-Click Instant Demo Login Shortcuts -->
      <div class="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-3">
        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
          ⚡ 1-Click Quick Demo Access
        </div>
        <p class="text-[11px] text-slate-500 text-center -mt-1 mb-2">Click any role to log in and test its full dashboard:</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <button class="btn-demo-login bg-white hover:bg-emerald-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl font-bold text-left transition flex items-center gap-2" data-role="SUPER_ADMIN" data-id="01581703822" data-pass="DCBD@2026">
            <span>👑</span>
            <div>
              <div>Super Admin</div>
              <div class="text-[10px] text-slate-400 font-normal">Full Admin Panel</div>
            </div>
          </button>

          <button class="btn-demo-login bg-white hover:bg-emerald-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl font-bold text-left transition flex items-center gap-2" data-role="SELLER" data-id="01818273838" data-pass="Seller@2026">
            <span>🏪</span>
            <div>
              <div>Marketplace Seller</div>
              <div class="text-[10px] text-slate-400 font-normal">Store & Orders</div>
            </div>
          </button>

          <button class="btn-demo-login bg-white hover:bg-emerald-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl font-bold text-left transition flex items-center gap-2" data-role="RESELLER" data-id="reseller@dreamcartbd.com" data-pass="Reseller@2026">
            <span>💼</span>
            <div>
              <div>Reseller Partner</div>
              <div class="text-[10px] text-slate-400 font-normal">Dropship Margins</div>
            </div>
          </button>

          <button class="btn-demo-login bg-white hover:bg-emerald-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl font-bold text-left transition flex items-center gap-2" data-role="WHOLESALE_CUSTOMER" data-id="wholesale@dreamcartbd.com" data-pass="Wholesale@2026">
            <span>📦</span>
            <div>
              <div>Wholesale Buyer</div>
              <div class="text-[10px] text-slate-400 font-normal">MOQ Bulk Orders</div>
            </div>
          </button>

          <button class="btn-demo-login sm:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl font-bold text-center transition flex items-center justify-center gap-2" data-role="CUSTOMER" data-id="01712345678" data-pass="Customer@2026">
            <span>🛍️</span>
            <div>Customer Account Demo</div>
          </button>
        </div>
      </div>

    </div>
  `;
}
