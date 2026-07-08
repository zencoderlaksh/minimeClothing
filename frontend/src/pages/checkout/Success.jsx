import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const { cart, removeFromCart } = useCartStore();

  useEffect(() => {
    // Clear cart on success
    cart.forEach(item => {
      removeFromCart(item.id, item.size, item.color);
    });
  }, [cart, removeFromCart]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <CheckCircle size={64} color={colors.gold} style={{ marginBottom: "2rem" }} />
        <h1 style={styles.title}>Thank You For Your Purchase</h1>
        <p style={styles.subtitle}>
          Your order has been placed successfully and is now being processed.
          You will receive an email confirmation shortly.
        </p>
        <div style={styles.actions}>
          <Link to="/orders" style={styles.btnPrimary}>
            VIEW ORDER STATUS
          </Link>
          <Link to="/" style={styles.btnSecondary}>
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

const colors = {
  cream: "#faf8f3",
  black: "#1a1812",
  gold: "#c9a96e",
  lightBrown: "#8b7355",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: colors.cream,
    fontFamily: "'Cormorant Garamond', serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "6rem",
  },
  container: {
    textAlign: "center",
    maxWidth: "600px",
    padding: "0 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 300,
    color: colors.black,
    fontStyle: "italic",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "16px",
    color: colors.lightBrown,
    fontFamily: "sans-serif",
    lineHeight: 1.6,
    marginBottom: "3rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btnPrimary: {
    background: colors.black,
    color: colors.cream,
    padding: "1rem 2rem",
    textDecoration: "none",
    fontSize: "11px",
    letterSpacing: "0.2em",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
  },
  btnSecondary: {
    background: "transparent",
    color: colors.black,
    border: `1px solid ${colors.black}`,
    padding: "1rem 2rem",
    textDecoration: "none",
    fontSize: "11px",
    letterSpacing: "0.2em",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
  }
};

export default Success;
