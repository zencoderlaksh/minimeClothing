import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (acc, item) => acc + (item.originalPrice || item.discountPrice) * item.quantity,
    0
  );

  const savings = originalTotal - total;

  const handleDecrement = (id, size, quantity) => {
    if (quantity <= 1) {
      removeFromCart(id, size);
    } else {
      updateQuantity(id, size, quantity - 1);
    }
  };

  const handleIncrement = (id, size, quantity) => {
    updateQuantity(id, size, quantity + 1);
  };

  return (
    <div style={styles.page}>
      {/* Background texture overlay */}
      <div style={styles.bgTexture} />

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.brandBar}>
            <span style={styles.brandText}>GUCCI</span>
          </div>
          <h1 style={styles.pageTitle}>Shopping Bag</h1>
          <p style={styles.pageSubtitle}>
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
          <div style={styles.divider} />
        </div>

        {cart.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>✦</div>
            <h2 style={styles.emptyTitle}>Your bag is empty</h2>
            <p style={styles.emptySubtitle}>
              Discover our latest collections and add your favourites.
            </p>
            <button style={styles.continueBtn}>Continue Shopping</button>
          </div>
        ) : (
          <div style={styles.layout}>

            {/* Cart Items */}
            <div style={styles.itemsCol}>
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}`} style={styles.cartItem}>

                  {/* Item Image */}
                  <div style={styles.imageWrapper}>
                    <img
                      src={item.mainImage}
                      alt={item.title}
                      style={styles.itemImage}
                    />
                    {item.isNew && (
                      <span style={styles.newBadge}>NEW</span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div style={styles.itemDetails}>
                    <div style={styles.itemTop}>
                      <div>
                        <p style={styles.itemBrand}>GUCCI</p>
                        <h3 style={styles.itemTitle}>{item.title}</h3>
                        <p style={styles.itemMeta}>Size: {item.size}</p>
                        {item.color && (
                          <p style={styles.itemMeta}>Colour: {item.color}</p>
                        )}
                      </div>
                      <div style={styles.priceBlock}>
                        <p style={styles.itemPrice}>₹{item.discountPrice.toLocaleString("en-IN")}</p>
                        {item.originalPrice && item.originalPrice !== item.discountPrice && (
                          <p style={styles.originalPrice}>₹{item.originalPrice.toLocaleString("en-IN")}</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity + Delete */}
                    <div style={styles.itemActions}>

                      {/* Quantity Stepper */}
                      <div style={styles.stepper}>
                        <button
                          type="button"
                          style={styles.stepBtn}
                          onClick={() => handleDecrement(item.id, item.size, item.quantity)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span style={styles.qtyDisplay}>{item.quantity}</span>
                        <button
                          type="button"
                          style={styles.stepBtn}
                          onClick={() => handleIncrement(item.id, item.size, item.quantity)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        style={styles.deleteBtn}
                        onClick={() => removeFromCart(item.id, item.size)}
                        aria-label="Remove item"
                      >
                        <span style={styles.deleteLine} />
                        <span style={styles.deleteLabel}>REMOVE</span>
                      </button>

                    </div>

                    {/* Line total */}
                    <p style={styles.lineTotal}>
                      Subtotal: ₹{(item.discountPrice * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={styles.summaryCol}>
              <div style={styles.summaryCard}>
                <h2 style={styles.summaryTitle}>Order Summary</h2>
                <div style={styles.summaryDivider} />

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Subtotal</span>
                  <span style={styles.summaryValue}>₹{originalTotal.toLocaleString("en-IN")}</span>
                </div>

                {savings > 0 && (
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Discount</span>
                    <span style={{ ...styles.summaryValue, color: "#8b5c2a" }}>
                      −₹{savings.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Shipping</span>
                  <span style={styles.summaryValue}>Complimentary</span>
                </div>

                <div style={styles.summaryDivider} />

                <div style={{ ...styles.summaryRow, marginBottom: "2rem" }}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalValue}>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <button style={styles.checkoutBtn}>
                  PROCEED TO CHECKOUT
                </button>

                <div style={styles.secureNote}>
                  <span style={styles.secureDot}>✦</span>
                  <span style={styles.secureText}>Complimentary shipping & returns</span>
                </div>
                <div style={styles.secureNote}>
                  <span style={styles.secureDot}>✦</span>
                  <span style={styles.secureText}>Secure payment</span>
                </div>
                <div style={styles.secureNote}>
                  <span style={styles.secureDot}>✦</span>
                  <span style={styles.secureText}>Authentic luxury guaranteed</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

const colors = {
  cream: "#faf8f3",
  warmWhite: "#f5f1ea",
  gold: "#c9a96e",
  goldDark: "#9a7a45",
  black: "#1a1812",
  darkBrown: "#2c2416",
  midBrown: "#6b5a3e",
  lightBrown: "#8b7355",
  border: "#e0d8c8",
  borderDark: "#c8bda8",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: colors.cream,
    fontFamily: "'Cormorant Garamond', 'Garamond', 'Georgia', serif",
    position: "relative",
    paddingTop: "6rem",
    paddingBottom: "4rem",
  },
  bgTexture: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 79px,
        rgba(180,160,120,0.06) 80px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 79px,
        rgba(180,160,120,0.06) 80px
      )
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 2rem",
    position: "relative",
    zIndex: 1,
  },

  // Header
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  brandBar: {
    marginBottom: "1.5rem",
  },
  brandText: {
    fontSize: "11px",
    letterSpacing: "0.5em",
    color: colors.gold,
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 400,
  },
  pageTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 300,
    color: colors.black,
    margin: "0 0 0.5rem",
    letterSpacing: "0.05em",
    fontStyle: "italic",
  },
  pageSubtitle: {
    fontSize: "12px",
    letterSpacing: "0.3em",
    color: colors.lightBrown,
    fontFamily: "sans-serif",
    fontWeight: 300,
    margin: "0 0 2rem",
    textTransform: "uppercase",
  },
  divider: {
    width: "60px",
    height: "1px",
    background: `linear-gradient(to right, transparent, ${colors.gold}, transparent)`,
    margin: "0 auto",
  },

  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "6rem 2rem",
  },
  emptyIcon: {
    fontSize: "2rem",
    color: colors.gold,
    marginBottom: "1.5rem",
    display: "block",
  },
  emptyTitle: {
    fontSize: "2rem",
    fontWeight: 300,
    color: colors.black,
    fontStyle: "italic",
    marginBottom: "1rem",
  },
  emptySubtitle: {
    fontSize: "14px",
    color: colors.midBrown,
    fontFamily: "sans-serif",
    fontWeight: 300,
    marginBottom: "2rem",
  },
  continueBtn: {
    background: colors.black,
    color: colors.cream,
    border: "none",
    padding: "1rem 3rem",
    fontSize: "11px",
    letterSpacing: "0.3em",
    fontFamily: "sans-serif",
    cursor: "pointer",
    textTransform: "uppercase",
  },

  // Layout
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "3rem",
    alignItems: "start",
  },

  // Items Column
  itemsCol: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  cartItem: {
    display: "flex",
    gap: "2rem",
    padding: "2.5rem 0",
    borderBottom: `1px solid ${colors.border}`,
  },

  // Image
  imageWrapper: {
    position: "relative",
    flexShrink: 0,
  },
  itemImage: {
    width: "140px",
    height: "185px",
    objectFit: "cover",
    display: "block",
    background: colors.warmWhite,
  },
  newBadge: {
    position: "absolute",
    top: "8px",
    left: "8px",
    background: colors.gold,
    color: colors.cream,
    fontSize: "9px",
    letterSpacing: "0.2em",
    padding: "3px 7px",
    fontFamily: "sans-serif",
  },

  // Item Details
  itemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
  },
  itemBrand: {
    fontSize: "10px",
    letterSpacing: "0.4em",
    color: colors.gold,
    fontFamily: "sans-serif",
    margin: "0 0 6px",
  },
  itemTitle: {
    fontSize: "1.4rem",
    fontWeight: 400,
    color: colors.black,
    margin: "0 0 8px",
    fontStyle: "italic",
  },
  itemMeta: {
    fontSize: "14px",
    color: colors.midBrown,
    fontFamily: "sans-serif",
    margin: "0 0 4px",
    letterSpacing: "0.05em",
  },
  priceBlock: {
    textAlign: "right",
  },
  itemPrice: {
    fontSize: "1.2rem",
    fontWeight: 400,
    color: colors.black,
    margin: "0 0 4px",
  },
  originalPrice: {
    fontSize: "13px",
    color: colors.lightBrown,
    fontFamily: "sans-serif",
    textDecoration: "line-through",
    margin: 0,
  },

  // Quantity
  itemActions: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    marginBottom: "1rem",
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${colors.borderDark}`,
    background: "transparent",
  },
  stepBtn: {
    width: "36px",
    height: "36px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: colors.darkBrown,
    fontFamily: "serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
    lineHeight: 1,
  },
  qtyDisplay: {
    width: "44px",
    textAlign: "center",
    fontSize: "16px",
    fontFamily: "sans-serif",
    color: colors.black,
    borderLeft: `1px solid ${colors.border}`,
    borderRight: `1px solid ${colors.border}`,
    lineHeight: "36px",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: 0,
  },
  deleteLine: {
    display: "inline-block",
    width: "16px",
    height: "1px",
    background: colors.midBrown,
  },
  deleteLabel: {
    fontSize: "12px",
    letterSpacing: "0.25em",
    color: colors.midBrown,
    fontFamily: "sans-serif",
    textTransform: "uppercase",
  },
  lineTotal: {
    fontSize: "14px",
    color: colors.lightBrown,
    fontFamily: "sans-serif",
    margin: 0,
    letterSpacing: "0.05em",
  },

  // Summary
  summaryCol: {
    position: "sticky",
    top: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  summaryCard: {
    background: colors.warmWhite,
    border: `1px solid ${colors.border}`,
    padding: "2rem",
  },
  summaryTitle: {
    fontSize: "11px",
    letterSpacing: "0.4em",
    color: colors.darkBrown,
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    fontWeight: 400,
    margin: "0 0 1.25rem",
  },
  summaryDivider: {
    height: "1px",
    background: colors.border,
    margin: "1.25rem 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.85rem",
  },
  summaryLabel: {
    fontSize: "14px",
    color: colors.midBrown,
    fontFamily: "sans-serif",
    letterSpacing: "0.05em",
  },
  summaryValue: {
    fontSize: "14px",
    color: colors.black,
    fontFamily: "sans-serif",
  },
  totalLabel: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    color: colors.darkBrown,
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    fontWeight: 500,
  },
  totalValue: {
    fontSize: "1.4rem",
    fontWeight: 400,
    color: colors.black,
    fontFamily: "'Cormorant Garamond', serif",
  },
  checkoutBtn: {
    width: "100%",
    background: colors.black,
    color: colors.cream,
    border: "none",
    padding: "1.1rem",
    fontSize: "11px",
    letterSpacing: "0.35em",
    fontFamily: "sans-serif",
    cursor: "pointer",
    marginBottom: "1.5rem",
    textTransform: "uppercase",
    transition: "background 0.3s",
  },
  secureNote: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
  },
  secureDot: {
    color: colors.gold,
    fontSize: "10px",
    flexShrink: 0,
  },
  secureText: {
    fontSize: "13px",
    color: colors.midBrown,
    fontFamily: "sans-serif",
    letterSpacing: "0.03em",
  },

};

export default Cart;