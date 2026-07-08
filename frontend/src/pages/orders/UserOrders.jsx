import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [getToken]);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>Loading orders...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Your Orders</h1>
        
        {orders.length === 0 ? (
          <p style={styles.empty}>You have no orders yet.</p>
        ) : (
          <div style={styles.orderList}>
            {orders.map(order => (
              <div key={order._id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <span style={styles.orderId}>Order #{order._id.slice(-8)}</span>
                    <span style={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span style={{...styles.status, ...styles[`status_${order.paymentStatus}`]}}>
                      Payment: {order.paymentStatus}
                    </span>
                    <span style={{...styles.status, ...styles[`status_${order.orderStatus}`], marginLeft: '10px'}}>
                      Status: {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div style={styles.itemsList}>
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} style={styles.item}>
                      <img src={item.image} alt={item.name} style={styles.itemImage} />
                      <div style={styles.itemDetails}>
                        <h4 style={styles.itemName}>{item.name}</h4>
                        <p style={styles.itemMeta}>Size: {item.size} | Color: {item.color?.name}</p>
                        <p style={styles.itemPrice}>₹{item.price.toLocaleString("en-IN")} x {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={styles.orderTotal}>
                  Total: ₹{order.totalAmount.toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const colors = {
  cream: "#faf8f3",
  warmWhite: "#f5f1ea",
  black: "#1a1812",
  gold: "#c9a96e",
  lightBrown: "#8b7355",
  border: "#e0d8c8",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: colors.cream,
    fontFamily: "sans-serif",
    paddingTop: "8rem",
    paddingBottom: "4rem",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 300,
    color: colors.black,
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    marginBottom: "3rem",
    borderBottom: `1px solid ${colors.border}`,
    paddingBottom: "1rem",
  },
  empty: {
    color: colors.lightBrown,
  },
  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  orderCard: {
    background: colors.warmWhite,
    border: `1px solid ${colors.border}`,
    padding: "2rem",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: `1px solid ${colors.border}`,
    flexWrap: "wrap",
    gap: "1rem",
  },
  orderId: {
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "1rem",
  },
  orderDate: {
    color: colors.lightBrown,
    fontSize: "14px",
  },
  status: {
    padding: "4px 10px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: "bold",
  },
  status_paid: {
    background: "#d4edda",
    color: "#155724",
  },
  status_pending: {
    background: "#fff3cd",
    color: "#856404",
  },
  status_failed: {
    background: "#f8d7da",
    color: "#721c24",
  },
  status_processing: {
    background: "#e2e3e5",
    color: "#383d41",
  },
  status_shipped: {
    background: "#cce5ff",
    color: "#004085",
  },
  status_delivered: {
    background: "#d4edda",
    color: "#155724",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  item: {
    display: "flex",
    gap: "1.5rem",
  },
  itemImage: {
    width: "80px",
    height: "100px",
    objectFit: "cover",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  itemName: {
    fontSize: "16px",
    marginBottom: "4px",
  },
  itemMeta: {
    fontSize: "14px",
    color: colors.lightBrown,
    marginBottom: "4px",
  },
  itemPrice: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  orderTotal: {
    marginTop: "2rem",
    textAlign: "right",
    fontSize: "1.2rem",
    fontWeight: "bold",
  }
};

export default UserOrders;
