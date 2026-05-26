import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={styles.page}>
      <style>{css}</style>
      <div style={styles.bgTexture} />

      {/* Decorative corner marks */}
      <span style={{ ...styles.corner, top: "2rem", left: "2rem" }}>✦</span>
      <span style={{ ...styles.corner, top: "2rem", right: "2rem" }}>✦</span>
      <span style={{ ...styles.corner, bottom: "2rem", left: "2rem" }}>✦</span>
      <span style={{ ...styles.corner, bottom: "2rem", right: "2rem" }}>✦</span>

      <div style={styles.container} className={mounted ? "nf-mounted" : ""}>

        {/* Brand */}
        <p style={styles.brand} className="nf-brand">MiniMe</p>

        {/* 404 large */}
        <div style={styles.heroBlock} className="nf-hero">
          <span style={styles.num}>4</span>
          <span style={styles.ornament}>✦</span>
          <span style={styles.num}>4</span>
        </div>

        <div style={styles.dividerWrap} className="nf-divider">
          <div style={styles.dividerLine} />
          <span style={styles.dividerDot}>◆</span>
          <div style={styles.dividerLine} />
        </div>

        <h1 style={styles.title} className="nf-title">Page Not Found</h1>

        <p style={styles.subtitle} className="nf-subtitle">
          The page you are looking for has moved, been removed,<br />
          or perhaps never existed.
        </p>

        <div style={styles.actions} className="nf-actions">
          <div className="nf-actions-inner" style={styles.actionsInner}>
            <Link to="/" style={styles.primaryLink}>
              <button className="nf-primary-btn">RETURN HOME</button>
            </Link>
            <Link to="/collection" style={styles.secondaryLink}>
              <button className="nf-secondary-btn">VIEW COLLECTION</button>
            </Link>
          </div>
        </div>

        <p style={styles.codeNote} className="nf-code">Error 404</p>
      </div>
    </div>
  );
};

const colors = {
  cream: "#faf8f3",
  warmWhite: "#f5f1ea",
  gold: "#c9a96e",
  black: "#1a1812",
  darkBrown: "#2c2416",
  midBrown: "#6b5a3e",
  lightBrown: "#8b7355",
  border: "#e0d8c8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  .nf-brand,
  .nf-hero,
  .nf-divider,
  .nf-title,
  .nf-subtitle,
  .nf-actions,
  .nf-code {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .nf-mounted .nf-brand    { opacity: 1; transform: none; transition-delay: 0.05s; }
  .nf-mounted .nf-hero     { opacity: 1; transform: none; transition-delay: 0.18s; }
  .nf-mounted .nf-divider  { opacity: 1; transform: none; transition-delay: 0.32s; }
  .nf-mounted .nf-title    { opacity: 1; transform: none; transition-delay: 0.44s; }
  .nf-mounted .nf-subtitle { opacity: 1; transform: none; transition-delay: 0.56s; }
  .nf-mounted .nf-actions  { opacity: 1; transform: none; transition-delay: 0.68s; }
  .nf-mounted .nf-code     { opacity: 1; transform: none; transition-delay: 0.80s; }

  .nf-primary-btn {
    background: ${colors.black};
    color: ${colors.cream};
    border: none;
    padding: 1rem 2.8rem;
    font-size: 11px;
    letter-spacing: 0.35em;
    font-family: sans-serif;
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.3s, color 0.3s;
  }
  .nf-primary-btn:hover {
    background: ${colors.gold};
    color: ${colors.black};
  }

  .nf-secondary-btn {
    background: transparent;
    color: ${colors.darkBrown};
    border: 1px solid ${colors.border};
    padding: 1rem 2.8rem;
    font-size: 11px;
    letter-spacing: 0.35em;
    font-family: sans-serif;
    cursor: pointer;
    text-transform: uppercase;
    transition: border-color 0.3s, color 0.3s;
  }
  .nf-secondary-btn:hover {
    border-color: ${colors.gold};
    color: ${colors.gold};
  }

  @media (max-width: 520px) {
    .nf-actions-inner {
      flex-direction: column !important;
      align-items: center !important;
    }
    .nf-primary-btn,
    .nf-secondary-btn {
      width: 100%;
      max-width: 280px;
    }
  }
`;

const styles = {
  page: {
    minHeight: "100vh",
    background: colors.cream,
    fontFamily: "'Cormorant Garamond', 'Garamond', 'Georgia', serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "2rem",
    boxSizing: "border-box",
  },
  bgTexture: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(180,160,120,0.06) 80px),
      repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(180,160,120,0.06) 80px)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  corner: {
    position: "fixed",
    fontSize: "14px",
    color: colors.gold,
    opacity: 0.5,
    zIndex: 1,
  },
  container: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: "640px",
    width: "100%",
  },
  brand: {
    fontSize: "11px",
    letterSpacing: "0.55em",
    color: colors.gold,
    fontFamily: "sans-serif",
    fontWeight: 400,
    margin: "0 0 2.5rem",
  },
  heroBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
    lineHeight: 1,
  },
  num: {
    fontSize: "clamp(6rem, 18vw, 10rem)",
    fontWeight: 300,
    color: colors.black,
    fontStyle: "italic",
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  ornament: {
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
    color: colors.gold,
    lineHeight: 1,
    marginTop: "0.5rem",
  },
  dividerWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  dividerLine: {
    width: "80px",
    height: "1px",
    background: `linear-gradient(to right, transparent, ${colors.border})`,
  },
  dividerDot: {
    fontSize: "8px",
    color: colors.gold,
  },
  title: {
    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
    fontWeight: 300,
    fontStyle: "italic",
    color: colors.black,
    margin: "0 0 1rem",
    letterSpacing: "0.04em",
  },
  subtitle: {
    fontSize: "14px",
    color: colors.midBrown,
    fontFamily: "sans-serif",
    fontWeight: 300,
    lineHeight: 1.8,
    margin: "0 0 2.5rem",
    letterSpacing: "0.03em",
  },
  actions: {
    marginBottom: "2.5rem",
  },
  actionsInner: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryLink: { textDecoration: "none" },
  secondaryLink: { textDecoration: "none" },
  codeNote: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    color: colors.lightBrown,
    fontFamily: "sans-serif",
    margin: 0,
    textTransform: "uppercase",
  },
};

export default NotFound;