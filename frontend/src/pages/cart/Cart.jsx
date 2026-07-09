import { useCartStore } from "../../stores/useCartStore";
import { Link } from 'react-router-dom';
import { useAuth } from "@clerk/react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const { getToken, isSignedIn } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showLoginPrompt) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showLoginPrompt]);

  const total = cart.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (acc, item) => acc + (item.originalPrice || item.discountPrice) * item.quantity,
    0
  );
  
  const savings = originalTotal - total;

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id, item.size, item.color);
    } else {
      updateQuantity(item.id, item.size, item.color, item.quantity - 1);
    }
  };

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.size, item.color, item.quantity + 1);
  };

  const handleCheckout = async () => {
    if (!isSignedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setShowLoginPrompt(false);
    try {
      setIsCheckingOut(true);
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems: cart }),
      });
      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initiate checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{responsiveCSS}</style>
      <div style={styles.bgTexture} />

      <div style={styles.container}>

        <div style={styles.header}>
          <div style={styles.brandBar}>
            <span style={styles.brandText}>MiniMe</span>
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
            <Link to='/collection'>
              <button style={styles.continueBtn}>Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <div style={styles.layout} className="cart-layout">

            <div style={styles.itemsCol}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color?.name}`} style={styles.cartItem} className="cart-item">

                  <div style={styles.imageWrapper}>
                    <img
                      src={item.mainImage}
                      alt={item.title}
                      style={styles.itemImage}
                      className="cart-item-image"
                    />
                    {item.isNew && (
                      <span style={styles.newBadge}>NEW</span>
                    )}
                  </div>

                  <div style={styles.itemDetails}>
                    <div style={styles.itemTop}>
                      <div>
                        <p style={styles.itemBrand}>GUCCI</p>
                        <h3 style={styles.itemTitle}>{item.title}</h3>
                        <p style={styles.itemMeta}>Size: {item.size}</p>
                        <p style={styles.itemMeta}>Colour: {item.color?.name}</p>
                      </div>
                      <div style={styles.priceBlock}>
                        <p style={styles.itemPrice}>₹{item.discountPrice.toLocaleString("en-IN")}</p>
                        {item.originalPrice && item.originalPrice !== item.discountPrice && (
                          <p style={styles.originalPrice}>₹{item.originalPrice.toLocaleString("en-IN")}</p>
                        )}
                      </div>
                    </div>

                    <div style={styles.itemActions}>

                      <div style={styles.stepper}>
                        <button
                          type="button"
                          style={styles.stepBtn}
                          onClick={() => handleDecrement(item)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span style={styles.qtyDisplay}>{item.quantity}</span>
                        <button
                          type="button"
                          style={styles.stepBtn}
                          onClick={() => handleIncrement(item)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        style={styles.deleteBtn}
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        aria-label="Remove item"
                      >
                        <span style={styles.deleteLine} />
                        <span style={styles.deleteLabel}>REMOVE</span>
                      </button>

                    </div>

                    <p style={styles.lineTotal}>
                      Subtotal: ₹{(item.discountPrice * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.summaryCol} className="summary-col">
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

                <button 
                  style={{...styles.checkoutBtn, opacity: isCheckingOut ? 0.7 : 1}} 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
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

      {showLoginPrompt && (
        <div style={styles.modalOverlay} onClick={() => setShowLoginPrompt(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeModalBtn} onClick={() => setShowLoginPrompt(false)}>
              <X size={24} />
            </button>
            <div style={styles.modalIconWrapper}>
              <span style={styles.modalIcon}>✦</span>
            </div>
            <h2 style={styles.modalTitle}>Sign In Required</h2>
            <p style={styles.modalSubtitle}>
              Please log in or create an account to proceed to secure checkout and complete your order.
            </p>
            <div style={styles.modalActions}>
              <Link to="/login" style={styles.primaryLoginBtn}>Log In</Link>
              <Link to="/signup" style={styles.secondaryLoginBtn}>Create Account</Link>
            </div>
          </div>
        </div>
      )}
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

const responsiveCSS = `
  @media (max-width: 900px) {
    .cart-layout {
      grid-template-columns: 1fr !important;
    }
    .summary-col {
      position: static !important;
    }
  }

  @media (max-width: 600px) {
    .cart-item {
      flex-direction: column !important;
      gap: 1.25rem !important;
    }
    .cart-item-image {
      width: 100% !important;
      height: 220px !important;
    }
  }
`;

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
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "3rem",
    alignItems: "start",
  },
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
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(26, 24, 18, 0.6)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "1rem",
  },
  modalContent: {
    background: colors.cream,
    padding: "3rem 2rem",
    maxWidth: "480px",
    width: "100%",
    position: "relative",
    textAlign: "center",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  closeModalBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    color: colors.midBrown,
    cursor: "pointer",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s",
  },
  modalIconWrapper: {
    marginBottom: "1.5rem",
  },
  modalIcon: {
    fontSize: "2.5rem",
    color: colors.gold,
    display: "block",
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontWeight: 300,
    color: colors.black,
    margin: "0 0 1rem",
    fontStyle: "italic",
    fontFamily: "'Cormorant Garamond', serif",
  },
  modalSubtitle: {
    fontSize: "15px",
    color: colors.midBrown,
    fontFamily: "sans-serif",
    lineHeight: 1.6,
    marginBottom: "2.5rem",
  },
  modalActions: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  primaryLoginBtn: {
    background: colors.black,
    color: colors.cream,
    padding: "1.2rem",
    textDecoration: "none",
    fontSize: "12px",
    letterSpacing: "0.3em",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    transition: "background 0.3s",
    display: "block",
  },
  secondaryLoginBtn: {
    background: "transparent",
    color: colors.black,
    border: `1px solid ${colors.black}`,
    padding: "1.2rem",
    textDecoration: "none",
    fontSize: "12px",
    letterSpacing: "0.3em",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    transition: "background 0.3s, color 0.3s",
    display: "block",
  }
};

export default Cart;