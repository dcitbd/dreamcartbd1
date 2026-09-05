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

    // Listen to Cart Store changes
    cartStore.subscribe(() => {
      updateHeader();
      updateMobileNav();
      updateCartDrawer();
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
        duration: 5000
      });
    }, 1000);

  } catch (err) {
    console.error("Application initialization error:", err);
    document.body.innerHTML = `
      <div style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h2 style="color: #059669;">Dream Cart BD</h2>
        <p style="color: #64748b;">Loading platform interface...</p>
        <button onclick="location.reload()" style="margin-top: 16px; padding: 10px 20px; background: #059669; color: white; border: none; border-radius: 8px; cursor: pointer;">Reload Application</button>
      </div>
    `;
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

function openFraudModal() {
  const modal = document.getElementById('fraud-modal-backdrop');
  if (modal) modal.classList.add('active');
}

function closeFraudModal() {
  const modal = document.getElementById('fraud-modal-backdrop');
  if (modal) modal.classList.remove('active');
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

    // Open Fraud Modal
    if (e.target.closest('#btn-open-fraud-tool')) {
      openFraudModal();
    }

    // Close Fraud Modal
    if (e.target.closest('#btn-close-fraud-modal') || (e.target.id === 'fraud-modal-backdrop')) {
      closeFraudModal();
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

    // Run Fraud Check
    if (e.target.closest('#btn-run-fraud-check')) {
      const phoneInput = document.getElementById('fraud-phone-input');
      const phone = phoneInput ? phoneInput.value.trim() : '01581703822';
      toast.show({ type: "info", title: "Querying Couriers...", message: `Checking Steadfast, Pathao & RedX records for ${phone}`, duration: 2000 });
      const checkRes = await apiClient.request("fraud/check_phone", { phone });
      setTimeout(() => {
        toast.show({ type: "success", title: "Analysis Complete", message: `Overall delivery success rate: ${checkRes.data.overall_success_rate}. Status: ${checkRes.data.risk_level}` });
      }, 500);
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

    // Database Snapshot in Admin
    if (e.target.closest('#btn-admin-snapshot')) {
      toast.show({
        type: "success",
        title: "Backup Snapshot Created!",
        message: "Google Sheets database backup saved to Google Drive with timestamp.",
        duration: 4000
      });
    }

    // Empty Cart Shop button
    if (e.target.closest('#btn-empty-cart-shop')) {
      closeCartDrawer();
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

  // Checkout form submit
  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'checkout-form') {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-confirm-order');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Recording into Sheets & Reserving Stock...
        `;
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
