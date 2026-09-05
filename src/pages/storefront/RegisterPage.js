/**
 * DREAM CART BD — MULTI-ROLE REGISTRATION PAGE
 */

import { authStore } from '../../store/authStore.js';
import { apiClient } from '../../api/client.js';
import { toast } from '../../components/Toast.js';

export function renderRegisterPage() {
  return `
    <div class="max-w-xl mx-auto py-12 px-4 space-y-6">
      
      <div class="text-center">
        <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md mb-3">
          DC
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-slate-900">Create Your Account</h1>
        <p class="text-xs text-slate-500 mt-1">Join as a Customer, Marketplace Seller, Reseller, or Wholesale Partner</p>
      </div>

      <form id="form-register" class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
        
        <!-- Account Type Role Selector -->
        <div>
          <label class="form-label text-xs">Select Account Type *</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label class="p-2.5 rounded-xl border border-emerald-600 bg-emerald-50 text-center cursor-pointer text-xs font-bold text-emerald-900 flex flex-col items-center gap-1">
              <input type="radio" name="reg_role" value="CUSTOMER" checked class="hidden" />
              <span>🛍️</span>
              <span>Customer</span>
            </label>
            <label class="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-center cursor-pointer text-xs font-bold text-slate-700 flex flex-col items-center gap-1">
              <input type="radio" name="reg_role" value="SELLER" class="hidden" />
              <span>🏪</span>
              <span>Seller</span>
            </label>
            <label class="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-center cursor-pointer text-xs font-bold text-slate-700 flex flex-col items-center gap-1">
              <input type="radio" name="reg_role" value="RESELLER" class="hidden" />
              <span>💼</span>
              <span>Reseller</span>
            </label>
            <label class="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-center cursor-pointer text-xs font-bold text-slate-700 flex flex-col items-center gap-1">
              <input type="radio" name="reg_role" value="WHOLESALE_CUSTOMER" class="hidden" />
              <span>📦</span>
              <span>Wholesale</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label text-xs" id="lbl-name">Full Name *</label>
          <input 
            type="text" 
            id="reg-name" 
            placeholder="e.g. Md. Hasan Ali" 
            required 
            class="form-control text-sm"
          />
        </div>

        <div class="form-group">
          <label class="form-label text-xs">Mobile Phone Number (11-digit BD) *</label>
          <div class="flex gap-2">
            <div class="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 text-xs font-bold text-slate-600">
              🇧🇩 +88
            </div>
            <input 
              type="tel" 
              id="reg-phone" 
              placeholder="017XXXXXXXX" 
              maxlength="11" 
              required 
              class="form-control text-sm"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label text-xs">Password *</label>
          <input 
            type="password" 
            id="reg-password" 
            placeholder="At least 6 characters" 
            required 
            class="form-control text-sm"
          />
        </div>

        <div class="form-group">
          <label class="form-label text-xs" id="lbl-address">Delivery / Store Address *</label>
          <textarea 
            id="reg-address" 
            rows="2" 
            placeholder="Full address, district, area" 
            required 
            class="form-control text-sm"
          ></textarea>
        </div>

        <button 
          type="submit" 
          id="btn-submit-register" 
          class="btn-primary w-full py-3.5 text-sm font-bold shadow-md shadow-emerald-600/30"
        >
          Create Account & Open Dashboard →
        </button>

        <div class="text-center pt-2 text-xs text-slate-500">
          Already have an account? <a href="#/login" class="font-bold text-emerald-600 hover:underline">Sign in</a>
        </div>
      </form>

    </div>
  `;
}
