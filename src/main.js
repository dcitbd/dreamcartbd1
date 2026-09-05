/**
 * DREAM CART BD — MASTER FRONTEND BOOTSTRAPPER
 * Wires reactive stores, event delegates, modals, cart drawer, and router.
 */

import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { renderMobileNav } from './components/MobileNav.js';
import { renderCartDrawer } from './components/CartDrawer.js';
import { renderFraudModal } from './components/FraudModal.js';
import { toast } from './components/Toast.js';
import { cartStore } from './store/cartStore.js';
import { authStore } from './store/authStore.js';
import { router } from './router.js';
import { apiClient } from './api/client.js';

function initApp() {
  try {
    const root = document.getElementById('app-root');
    if (!root) {
      console.error("Could not find #app-root element");
      return;
    }

    root.innerHTML = `
      <div id="header-mount"></div>
      <main id="app-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20"></main>
      <div id="footer-mount"></div>
      <div id="mobilenav-mount"></div>
      <div id="cartdrawer-mount"></div>
      <div id="fraudmodal-mount"></div>
    `;

    // Mount persistent components
    updateHeader();
    const footerMount = document.getElementById('footer-mount');
    if (footerMount) footerMount.innerHTML = renderFooter();
    updateMobileNav();
    updateCartDrawer();
    const fraudMount = document.getElementById('fraudmodal-mount');
    if (fraudMount) fraudMount.innerHTML = renderFraudModal();

    // Listen to Cart Store and Auth Store changes
    cartStore.subscribe(() => {
      updateHeader();
      updateMobileNav();
      updateCartDrawer();
    });

    authStore.subscribe(() => {
      updateHeader();
    });

    // Attach global event delegation
    attachEventListeners();

    // Initialize Router
    window.addEventListener('hashchange', () => router.navigate());
    router.navigate();

    // Welcome toast
    setTimeout(() => {
      toast.show({
        type: "success",
        title: "Welcome to Dream Cart BD!",
        message: "Enjoy nationwide Cash on Delivery with code DREAM10 for 10% off.",
        duration: 4000
      });
    }, 800);

  } catch (err) {
    console.error("Application initialization error:", err);
  }
}

function updateHeader() {
  const mount = document.getElementById('header-mount');
  if (mount) mount.innerHTML = renderHeader();
}

function updateMobileNav() {
  const mount = document.getElementById('mobilenav-mount');
  if (mount) mount.innerHTML = renderMobileNav();
}

function updateCartDrawer() {
  const mount = document.getElementById('cartdrawer-mount');
  if (mount) mount.innerHTML = renderCartDrawer();
}

function openCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  if (backdrop && panel) {
    backdrop.classList.add('active');
    panel.classList.add('active');
  }
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  if (backdrop && panel) {
    backdrop.classList.remove('active');
    panel.classList.remove('active');
  }
}

function attachEventListeners() {
  document.addEventListener('click', async (e) => {
    // Open Cart Drawer
    if (e.target.closest('#btn-open-cart') || e.target.closest('#mobile-cart-btn')) {
      openCartDrawer();
    }

    // Close Cart Drawer
    if (e.target.closest('#btn-close-cart') || e.target.closest('#cart-drawer-backdrop')) {
      closeCartDrawer();
    }

    // Header Logout
    if (e.target.closest('#btn-header-logout')) {
      authStore.logout();
      toast.show({ type: "info", title: "Signed Out", message: "You have been logged out successfully." });
      window.location.hash = "#/";
    }

    // 1-Click Demo Login
    const demoBtn = e.target.closest('.btn-demo-login');
    if (demoBtn) {
      const role = demoBtn.dataset.role;
      const id = demoBtn.dataset.id;
      const pass = demoBtn.dataset.pass;
      const res = await apiClient.request("auth/login", { identifier: id, password: pass });
      if (res.success) {
        authStore.setUser(res.user, res.token);
        toast.show({ type: "success", title: "Logged in as " + res.user.name, message: "Role: " + res.user.role });
        
        // Auto-redirect to respective dashboard
        if (role === "SUPER_ADMIN" || role === "ADMIN") {
          window.location.hash = "#/admin";
        } else if (role === "SELLER") {
          window.location.hash = "#/seller";
        } else if (role === "RESELLER") {
          window.location.hash = "#/reseller";
        } else if (role === "WHOLESALE_CUSTOMER") {
          window.location.hash = "#/wholesale";
        } else {
          window.location.hash = "#/account";
        }
      }
    }

    // Fraud test quick buttons
    const phoneBtn = e.target.closest('.btn-test-phone');
    if (phoneBtn && phoneBtn.dataset.phone) {
      const input = document.getElementById('fraud-search-phone');
      if (input) {
        input.value = phoneBtn.dataset.phone;
        const btn = document.getElementById('btn-run-full-fraud');
        if (btn) btn.click();
      }
    }

    // Run Full Fraud Check
    if (e.target.closest('#btn-run-full-fraud')) {
      const input = document.getElementById('fraud-search-phone');
      const phone = input ? input.value.trim() : '01581703822';
      toast.show({ type: "info", title: "Querying Couriers...", message: "Checking Steadfast, Pathao & RedX for " + phone, duration: 1500 });
      const checkRes = await apiClient.request("fraud/check_phone", { phone });
      const out = document.getElementById('fraud-analysis-output');
      if (out && checkRes.data) {
        const d = checkRes.data;
        const isSafe = d.risk_score < 40;
        out.innerHTML = `
          <div class="p-5 ${isSafe ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'} rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider">${d.phone} Success Rate</span>
              <div class="text-3xl font-black ${isSafe ? 'text-emerald-700' : 'text-rose-700'} mt-0.5">${d.overall_success_rate}</div>
              <p class="text-xs font-medium mt-1">Status: <strong>${d.risk_level}</strong></p>
            </div>
            <div class="sm:text-right">
              <span class="badge ${isSafe ? 'badge-success' : 'badge-danger'} text-xs">${d.recommendation}</span>
              <p class="text-[11px] text-slate-500 mt-1">Risk Score: ${d.risk_score}/100</p>
            </div>
          </div>
          <div class="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table class="w-full text-left">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr><th class="p-3">Courier Partner</th><th class="p-3">Total Orders</th><th class="p-3 text-emerald-700">Delivered</th><th class="p-3 text-rose-600">Returned</th><th class="p-3">Rate</th></tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr><td class="p-3 font-bold">Steadfast Courier</td><td class="p-3">${d.steadfast.total_orders}</td><td class="p-3 text-emerald-600 font-semibold">${d.steadfast.delivered}</td><td class="p-3 text-rose-600 font-semibold">${d.steadfast.returned}</td><td class="p-3 font-black">${d.steadfast.success_rate}</td></tr>
                <tr><td class="p-3 font-bold">Pathao Courier</td><td class="p-3">${d.pathao.total_orders}</td><td class="p-3 text-emerald-600 font-semibold">${d.pathao.delivered}</td><td class="p-3 text-rose-600 font-semibold">${d.pathao.returned}</td><td class="p-3 font-black">${d.pathao.success_rate}</td></tr>
                <tr><td class="p-3 font-bold">RedX Delivery</td><td class="p-3">${d.redx.total_orders}</td><td class="p-3 text-emerald-600 font-semibold">${d.redx.delivered}</td><td class="p-3 text-rose-600 font-semibold">${d.redx.returned}</td><td class="p-3 font-black">${d.redx.success_rate}</td></tr>
              </tbody>
            </table>
          </div>
        `;
      }
    }

    // Track order search button
    if (e.target.closest('#btn-track-submit')) {
      const input = document.getElementById('track-input');
      const q = input ? input.value.trim() : '';
      if (q) {
        toast.show({ type: "success", title: "Shipment Located", message: "Order " + q + " is currently in transit with Steadfast Courier." });
      }
    }

    // Card click navigate to details
    const cardImg = e.target.closest('.card-img-click');
    if (cardImg && cardImg.dataset.slug) {
      window.location.hash = `#/product/${cardImg.dataset.slug}`;
    }

    // Quick Add Button on Product Card
    const addBtn = e.target.closest('.btn-quick-add');
    if (addBtn && addBtn.dataset.productId) {
      const pId = addBtn.dataset.productId;
      const res = await apiClient.request("products/details", { id: pId });
      if (res.data) {
        cartStore.addItem(res.data, 1);
        toast.show({
          type: "success",
          title: "Added to Cart!",
          message: `${res.data.name} is in your shopping cart.`,
          actionText: "View Cart",
          onAction: () => openCartDrawer()
        });
      }
    }

    // Cart Quantity Plus / Minus
    const plusBtn = e.target.closest('.cart-qty-plus');
    if (plusBtn && plusBtn.dataset.id) {
      const item = cartStore.items.find(it => it.product_id === plusBtn.dataset.id);
      if (item) cartStore.updateQuantity(item.product_id, item.variant_id, item.quantity + 1);
    }

    const minusBtn = e.target.closest('.cart-qty-minus');
    if (minusBtn && minusBtn.dataset.id) {
      const item = cartStore.items.find(it => it.product_id === minusBtn.dataset.id);
      if (item) cartStore.updateQuantity(item.product_id, item.variant_id, item.quantity - 1);
    }

    // Apply coupon in drawer
    if (e.target.closest('#btn-apply-drawer-coupon')) {
      const input = document.getElementById('drawer-coupon-input');
      if (input && input.value.trim()) {
        const valRes = await apiClient.request("coupons/validate", { code: input.value.trim(), subtotal: cartStore.getSubtotal() });
        if (valRes.data && valRes.data.valid) {
          cartStore.applyCoupon(valRes.data);
          toast.show({
            type: "success",
            title: "Coupon Applied!",
            message: `You saved ৳${valRes.data.discount_amount} with code ${valRes.data.code}`
          });
        } else {
          toast.show({
            type: "error",
            title: "Invalid Code",
            message: valRes.message || "Please check coupon code and try again."
          });
        }
      }
    }

    // Product Detail Buy Now / Add to Cart
    if (e.target.closest('#btn-detail-add-cart')) {
      const pContainer = document.querySelector('[data-product-json]');
      if (pContainer) {
        const p = JSON.parse(pContainer.dataset.productJson);
        const qtyDisplay = document.getElementById('detail-qty-display');
        const qty = parseInt(qtyDisplay ? qtyDisplay.textContent : '1', 10) || 1;
        cartStore.addItem(p, qty);
        toast.show({
          type: "success",
          title: "Added to Cart!",
          message: `${qty} × ${p.name} added.`,
          actionText: "Checkout Now",
          onAction: () => { window.location.hash = '#/checkout'; }
        });
      }
    }

    if (e.target.closest('#btn-detail-buy-now')) {
      const pContainer = document.querySelector('[data-product-json]');
      if (pContainer) {
        const p = JSON.parse(pContainer.dataset.productJson);
        const qtyDisplay = document.getElementById('detail-qty-display');
        const qty = parseInt(qtyDisplay ? qtyDisplay.textContent : '1', 10) || 1;
        cartStore.addItem(p, qty);
        window.location.hash = '#/checkout';
      }
    }

    if (e.target.closest('#btn-detail-plus')) {
      const qtyDisplay = document.getElementById('detail-qty-display');
      if (qtyDisplay) {
        let q = parseInt(qtyDisplay.textContent, 10) || 1;
        qtyDisplay.textContent = q + 1;
      }
    }

    if (e.target.closest('#btn-detail-minus')) {
      const qtyDisplay = document.getElementById('detail-qty-display');
      if (qtyDisplay) {
        let q = parseInt(qtyDisplay.textContent, 10) || 1;
        if (q > 1) qtyDisplay.textContent = q - 1;
      }
    }

    // Global Search button
    if (e.target.closest('#global-search-btn')) {
      const input = document.getElementById('global-search-input');
      if (input && input.value.trim()) {
        window.location.hash = `#/shop?search=${encodeURIComponent(input.value.trim())}`;
      }
    }
  });

  // Global search input enter key
  document.addEventListener('keypress', (e) => {
    if (e.target.id === 'global-search-input' && e.key === 'Enter') {
      if (e.target.value.trim()) {
        window.location.hash = `#/shop?search=${encodeURIComponent(e.target.value.trim())}`;
      }
    }
  });

  // Login form submit
  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'form-login') {
      e.preventDefault();
      const id = document.getElementById('login-identifier')?.value || '';
      const pass = document.getElementById('login-password')?.value || '';
      const btn = document.getElementById('btn-submit-login');
      if (btn) { btn.disabled = true; btn.textContent = 'Signing in...'; }
      
      const res = await apiClient.request("auth/login", { identifier: id, password: pass });
      if (res.success && res.user) {
        authStore.setUser(res.user, res.token);
        toast.show({ type: "success", title: "Welcome, " + res.user.name + "!", message: "Successfully signed in." });
        
        // Redirect based on role
        if (res.user.role === "SUPER_ADMIN" || res.user.role === "ADMIN") {
          window.location.hash = "#/admin";
        } else if (res.user.role === "SELLER") {
          window.location.hash = "#/seller";
        } else if (res.user.role === "RESELLER") {
          window.location.hash = "#/reseller";
        } else if (res.user.role === "WHOLESALE_CUSTOMER") {
          window.location.hash = "#/wholesale";
        } else {
          window.location.hash = "#/account";
        }
      } else {
        toast.show({ type: "error", title: "Sign In Failed", message: res.message || "Invalid credentials." });
        if (btn) { btn.disabled = false; btn.textContent = 'Sign In'; }
      }
    }

    // Register form submit
    if (e.target.id === 'form-register') {
      e.preventDefault();
      const role = document.querySelector('input[name="reg_role"]:checked')?.value || 'CUSTOMER';
      const name = document.getElementById('reg-name')?.value || '';
      const phone = document.getElementById('reg-phone')?.value || '';
      const pass = document.getElementById('reg-password')?.value || '';
      const addr = document.getElementById('reg-address')?.value || '';

      const btn = document.getElementById('btn-submit-register');
      if (btn) { btn.disabled = true; btn.textContent = 'Creating Account...'; }

      const res = await apiClient.request("auth/register", { role, name, phone, password: pass, address: addr });
      if (res.success && res.user) {
        authStore.setUser(res.user, res.token);
        toast.show({ type: "success", title: "Registration Complete!", message: "Welcome to Dream Cart BD, " + res.user.name + "." });
        
        if (role === "SELLER") {
          window.location.hash = "#/seller";
        } else if (role === "RESELLER") {
          window.location.hash = "#/reseller";
        } else if (role === "WHOLESALE_CUSTOMER") {
          window.location.hash = "#/wholesale";
        } else {
          window.location.hash = "#/account";
        }
      } else {
        toast.show({ type: "error", title: "Registration Failed", message: res.message || "Could not complete registration." });
        if (btn) { btn.disabled = false; btn.textContent = 'Create Account & Open Dashboard →'; }
      }
    }

    // Checkout form submit
    if (e.target.id === 'checkout-form') {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-confirm-order');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Recording order into Google Sheets...`;
      }

      const name = document.getElementById('checkout-name')?.value || "";
      const phone = document.getElementById('checkout-phone')?.value || "";
      const address = document.getElementById('checkout-address')?.value || "";
      const deliveryZone = document.querySelector('input[name="delivery_zone"]:checked')?.value || "dhaka";
      const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || "COD";

      const orderPayload = {
        customer_name: name,
        customer_phone: phone,
        shipping_address: address,
        city: deliveryZone === "dhaka" ? "Dhaka" : "Outside Dhaka",
        delivery_charge: deliveryZone === "dhaka" ? 60 : 120,
        payment_method: paymentMethod,
        discount: cartStore.getDiscount(),
        items: cartStore.items
      };

      const res = await apiClient.request("orders/create", orderPayload);
      if (res.success) {
        cartStore.clear();
        const orderId = (res.data && res.data.order_id) || "ORD-2609-1001";
        toast.show({
          type: "success",
          title: "Order Placed Successfully!",
          message: `Order ${orderId} has been confirmed. SMS notification queued.`,
          duration: 5000
        });
        window.location.hash = `#/order-success?orderId=${orderId}`;
      } else {
        toast.show({
          type: "error",
          title: "Order Failed",
          message: res.message || "Failed to record order. Please try again."
        });
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Confirm Order";
        }
      }
    }
  });
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
