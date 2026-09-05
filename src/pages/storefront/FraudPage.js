/**
 * DREAM CART BD — DEDICATED FRAUD CHECKER & COURIER PERFORMANCE ANALYZER
 */

import { apiClient } from '../../api/client.js';
import { toast } from '../../components/Toast.js';

export function renderFraudPage() {
  return `
    <div class="max-w-3xl mx-auto space-y-8 py-8 px-4">
      
      <div class="text-center">
        <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 font-black text-2xl flex items-center justify-center mx-auto shadow-sm mb-3">
          🛡️
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-slate-900">Multi-Courier Delivery Risk & Fraud Checker</h1>
        <p class="text-xs text-slate-500 mt-1">Cross-reference customer phone numbers across Steadfast, Pathao & RedX networks</p>
      </div>

      <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        
        <div>
          <label class="form-label text-xs">Customer 11-digit Mobile Number</label>
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 text-xs font-bold text-slate-600">
              🇧🇩 +88
            </div>
            <input 
              type="tel" 
              id="fraud-search-phone" 
              placeholder="01581703822" 
              value="01581703822"
              class="form-control text-sm flex-1"
            />
            <button id="btn-run-full-fraud" class="btn-primary text-xs py-3 px-6 whitespace-nowrap">
              Analyze Delivery History
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 text-xs">
          <span class="text-slate-400 font-medium">Quick Test Scenarios:</span>
          <button class="btn-test-phone px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold border border-emerald-200" data-phone="01581703822">Safe Buyer (93%)</button>
          <button class="btn-test-phone px-2.5 py-1 bg-rose-50 text-rose-800 rounded-full font-bold border border-rose-200" data-phone="01711000000">High Risk RTO (33%)</button>
        </div>

        <!-- Result Container -->
        <div id="fraud-analysis-output" class="space-y-4 pt-2">
          
          <div class="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800">Overall Success Rate</span>
              <div class="text-3xl font-black text-emerald-700 mt-0.5">93.1%</div>
              <p class="text-xs text-emerald-900 font-medium mt-1">Status: <strong>LOW RISK (Trusted Customer)</strong></p>
            </div>
            <div class="sm:text-right">
              <span class="badge badge-success text-xs">Approved for Cash on Delivery</span>
              <p class="text-[11px] text-slate-500 mt-1">Calculated from 29 cross-courier deliveries</p>
            </div>
          </div>

          <!-- Table -->
          <div class="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table class="w-full text-left">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th class="p-3">Courier Logistics Partner</th>
                  <th class="p-3">Total Parcels</th>
                  <th class="p-3 text-emerald-700">Delivered</th>
                  <th class="p-3 text-rose-600">Returned (RTO)</th>
                  <th class="p-3">Success Rate</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td class="p-3 font-bold">Steadfast Courier</td>
                  <td class="p-3">16</td>
                  <td class="p-3 text-emerald-600 font-semibold">15</td>
                  <td class="p-3 text-rose-600 font-semibold">1</td>
                  <td class="p-3 font-black text-emerald-700">93.8%</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold">Pathao Courier</td>
                  <td class="p-3">9</td>
                  <td class="p-3 text-emerald-600 font-semibold">8</td>
                  <td class="p-3 text-rose-600 font-semibold">1</td>
                  <td class="p-3 font-black text-emerald-700">88.9%</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold">RedX Delivery</td>
                  <td class="p-3">4</td>
                  <td class="p-3 text-emerald-600 font-semibold">4</td>
                  <td class="p-3 text-rose-600 font-semibold">0</td>
                  <td class="p-3 font-black text-emerald-700">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  `;
}
