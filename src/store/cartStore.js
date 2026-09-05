/**
 * DREAM CART BD — CART STORE
 * Manages cart state, localStorage persistence, quantity updates, coupon calculation.
 */

class CartStore {
  constructor() {
    this.items = [];
    this.coupon = null;
    this.deliveryCharge = 60; // Default Inside Dhaka
    this.listeners = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem("dcbd_cart");
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch (e) {}
  }

  saveToStorage() {
    try {
      localStorage.setItem("dcbd_cart", JSON.stringify(this.items));
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this));
  }

  addItem(product, quantity = 1, variant = null) {
    const existingIndex = this.items.findIndex(
      it => it.product_id === product.product_id && it.variant_id === (variant ? variant.variant_id : "")
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        product_id: product.product_id,
        variant_id: variant ? variant.variant_id : "",
        name: product.name,
        price: product.selling_price,
        regular_price: product.regular_price,
        thumbnail: product.thumbnail,
        seller_id: product.seller_id,
        seller_name: product.seller_name,
        quantity: quantity
      });
    }

    this.saveToStorage();
  }

  updateQuantity(productId, variantId, qty) {
    const idx = this.items.findIndex(it => it.product_id === productId && it.variant_id === (variantId || ""));
    if (idx > -1) {
      if (qty <= 0) {
        this.items.splice(idx, 1);
      } else {
        this.items[idx].quantity = qty;
      }
      this.saveToStorage();
    }
  }

  removeItem(productId, variantId) {
    this.items = this.items.filter(it => !(it.product_id === productId && it.variant_id === (variantId || "")));
    this.saveToStorage();
  }

  clear() {
    this.items = [];
    this.coupon = null;
    this.saveToStorage();
  }

  setDeliveryCharge(amount) {
    this.deliveryCharge = amount;
    this.notify();
  }

  applyCoupon(couponData) {
    this.coupon = couponData;
    this.notify();
  }

  removeCoupon() {
    this.coupon = null;
    this.notify();
  }

  getSubtotal() {
    return this.items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
  }

  getDiscount() {
    if (!this.coupon) return 0;
    return this.coupon.discount_amount || 0;
  }

  getGrandTotal() {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscount();
    return Math.max(0, subtotal + this.deliveryCharge - discount);
  }

  getCount() {
    return this.items.reduce((sum, it) => sum + it.quantity, 0);
  }
}

export const cartStore = new CartStore();
