/**
 * DREAM CART BD — MAIN APPS SCRIPT WEB APP ENTRYPOINT
 * Handles HTTP GET / POST, CORS Pre-flight, and JSON outputs.
 */

function doGet(e) {
  return handleRequest(e, "GET");
}

function doPost(e) {
  return handleRequest(e, "POST");
}

function handleRequest(e, httpMethod) {
  var action = "";
  var payload = {};
  var sessionToken = "";
  var metadata = {
    method: httpMethod,
    ip: (e && e.contextPath) || "ClientIP",
    userAgent: ""
  };

  if (e && e.parameter) {
    action = e.parameter.action || "";
    sessionToken = e.parameter.token || "";
  }

  if (e && e.postData && e.postData.contents) {
    try {
      var parsed = JSON.parse(e.postData.contents);
      if (parsed.action) action = parsed.action;
      if (parsed.payload) payload = parsed.payload;
      if (parsed.token) sessionToken = parsed.token;
      if (parsed.metadata) metadata = parsed.metadata;
    } catch (err) {
      // Fallback if form data
      payload = e.parameter || {};
    }
  } else if (e && e.parameter && !payload.items) {
    // If GET query parameters
    payload = e.parameter;
  }

  if (!action) {
    action = "system/health";
  }

  var responseObj = Router.dispatch(action, payload, sessionToken, metadata);
  var jsonOutput = JSON.stringify(responseObj);

  return ContentService.createTextOutput(jsonOutput)
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Setup / Initializer function to create all required sheets and headers if not yet present.
 */
function setupSystemSheets() {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetsToCreate = [
    CONFIG.SHEETS.USERS,
    CONFIG.SHEETS.SESSIONS,
    CONFIG.SHEETS.CATEGORIES,
    CONFIG.SHEETS.PRODUCTS,
    CONFIG.SHEETS.VARIANTS,
    CONFIG.SHEETS.IMAGES,
    CONFIG.SHEETS.PRODUCT_OFFERS,
    CONFIG.SHEETS.SELLER_STORES,
    CONFIG.SHEETS.SELLER_APPLICATIONS,
    CONFIG.SHEETS.ORDERS,
    CONFIG.SHEETS.ORDER_ITEMS,
    CONFIG.SHEETS.SUB_ORDERS,
    CONFIG.SHEETS.ORDER_NOTES,
    CONFIG.SHEETS.STOCK_RESERVATIONS,
    CONFIG.SHEETS.COUPONS,
    CONFIG.SHEETS.COUPON_USAGE,
    CONFIG.SHEETS.ACTIVITY_LOGS,
    CONFIG.SHEETS.API_LOGS,
    CONFIG.SHEETS.NOTIFICATIONS_QUEUE,
    CONFIG.SHEETS.BACKGROUND_JOBS,
    CONFIG.SHEETS.PAYMENTS
  ];

  sheetsToCreate.forEach(function(name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      ss.insertSheet(name);
    }
  });

  return "All required sheets verified and initialized.";
}


/**
 * Auto-seeds initial master products into 06_Products if empty.
 */
function seedInitialProducts() {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEETS.PRODUCTS);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEETS.PRODUCTS);
  }
  
  if (sheet.getLastRow() <= 1) {
    var initialItems = [
      {
        product_id: "PRD-2609-1001",
        seller_id: "DCBD-OFFICIAL",
        product_name: "Amazfit GTS 4 Smartwatch — Ultra AMOLED Display & SpO2",
        slug: "amazfit-gts-4-smartwatch",
        sku: "AMZ-GTS4-BLK",
        category_id: "CAT-SMARTWATCH",
        brand_id: "BRD-AMAZFIT",
        status: "active",
        visibility: "public",
        approval_status: "approved",
        selling_price: 18500,
        regular_price: 21990,
        wholesale_price: 16200,
        reseller_price: 17200,
        available_stock: 24,
        physical_stock: 24,
        rating: 4.9,
        reviews_count: 38,
        short_description: "Ultra-sleek aluminum alloy design with 150+ sports modes, dual-band GPS, and Bluetooth phone calls.",
        created_at: new Date().toISOString()
      },
      {
        product_id: "PRD-2609-1002",
        seller_id: "DCBD-OFFICIAL",
        product_name: "Pure Organic Maca Root Powder (Peru Grade-A, 250g)",
        slug: "pure-organic-maca-root-powder-250g",
        sku: "SUP-MACA-250G",
        category_id: "CAT-ORGANIC",
        brand_id: "BRD-ORGANIC",
        status: "active",
        visibility: "public",
        approval_status: "approved",
        selling_price: 1250,
        regular_price: 1650,
        wholesale_price: 950,
        reseller_price: 1050,
        available_stock: 45,
        physical_stock: 45,
        rating: 4.8,
        reviews_count: 52,
        short_description: "100% Raw gelatinized Peruvian Maca powder. Boosts natural stamina, hormonal balance, and vitality.",
        created_at: new Date().toISOString()
      },
      {
        product_id: "PRD-2609-1003",
        seller_id: "VND-TECHBD",
        product_name: "High-Power Long-Range Tactical Rechargeable LED Torchlight (5000LM)",
        slug: "tactical-rechargeable-led-torchlight-5000lm",
        sku: "LGT-TAC-5000",
        category_id: "CAT-ELECTRONICS",
        brand_id: "BRD-POWERBEAM",
        status: "active",
        visibility: "public",
        approval_status: "approved",
        selling_price: 1850,
        regular_price: 2400,
        wholesale_price: 1400,
        reseller_price: 1550,
        available_stock: 18,
        physical_stock: 18,
        rating: 4.7,
        reviews_count: 29,
        short_description: "Aircraft-grade aluminum military flashlight with zoomable focus and built-in USB powerbank feature.",
        created_at: new Date().toISOString()
      },
      {
        product_id: "PRD-2609-1004",
        seller_id: "DCBD-OFFICIAL",
        product_name: "Heavy-Duty Gas Stove Safety Fire Saver & Wind Shield Ring",
        slug: "heavy-duty-gas-stove-safety-fire-saver",
        sku: "KIT-GAS-RING01",
        category_id: "CAT-HOME",
        brand_id: "BRD-SAFEGAS",
        status: "active",
        visibility: "public",
        approval_status: "approved",
        selling_price: 490,
        regular_price: 750,
        wholesale_price: 320,
        reseller_price: 380,
        available_stock: 60,
        physical_stock: 60,
        rating: 4.9,
        reviews_count: 84,
        short_description: "Energy saving 40% gas cut ring. Fits standard burner stoves, stainless steel, heat resistant.",
        created_at: new Date().toISOString()
      },
      {
        product_id: "PRD-2609-1005",
        seller_id: "DCBD-OFFICIAL",
        product_name: "Huawei Band 8 Fitness Tracker — 1.47 Inch AMOLED Ultra Slim",
        slug: "huawei-band-8-fitness-tracker",
        sku: "HW-BND8-EM",
        category_id: "CAT-SMARTWATCH",
        brand_id: "BRD-HUAWEI",
        status: "active",
        visibility: "public",
        approval_status: "approved",
        selling_price: 4400,
        regular_price: 5200,
        wholesale_price: 3800,
        reseller_price: 4050,
        available_stock: 14,
        physical_stock: 14,
        rating: 4.8,
        reviews_count: 41,
        short_description: "TruSleep 3.0 sleep tracking, 14-day battery life, fast charging, scientific health monitoring.",
        created_at: new Date().toISOString()
      },
      {
        product_id: "PRD-2609-1006",
        seller_id: "VND-TECHBD",
        product_name: "Portable Wireless Multimedia Mini Speaker with Deep Bass & RGB Lights",
        slug: "portable-wireless-multimedia-mini-speaker",
        sku: "AUD-MINI-RGB",
        category_id: "CAT-ELECTRONICS",
        brand_id: "BRD-SOUNDPRO",
        status: "active",
        visibility: "public",
        approval_status: "approved",
        selling_price: 980,
        regular_price: 1450,
        wholesale_price: 720,
        reseller_price: 810,
        available_stock: 32,
        physical_stock: 32,
        rating: 4.6,
        reviews_count: 19,
        short_description: "Compact punchy bass Bluetooth 5.3 speaker with dynamic LED ring light and TF/AUX/FM radio support.",
        created_at: new Date().toISOString()
      }
    ];

    SheetRepository.appendRowsBatch(CONFIG.SHEETS.PRODUCTS, initialItems);
    Logger.log("Default products seeded successfully into 06_Products.");
  }
}
