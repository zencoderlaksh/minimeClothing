import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, [getToken]);

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/all`, {
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

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading orders...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Order Management</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={styles.tr}>
                <td style={styles.td}>{order._id.slice(-8)}</td>
                <td style={styles.td}>
                  {order.user?.name}<br/>
                  <small style={{ color: "#888" }}>{order.user?.email}</small>
                </td>
                <td style={styles.td}>₹{order.totalAmount.toLocaleString("en-IN")}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...styles[`badge_${order.paymentStatus}`]}}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...styles[`badge_${order.orderStatus}`]}}>
                    {order.orderStatus}
                  </span>
                </td>
                <td style={styles.td}>
                  <select 
                    value={order.orderStatus} 
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    style={styles.select}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "1rem",
    borderBottom: "2px solid #eee",
    color: "#666",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "1rem",
    verticalAlign: "middle",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  badge_paid: { background: "#d4edda", color: "#155724" },
  badge_pending: { background: "#fff3cd", color: "#856404" },
  badge_failed: { background: "#f8d7da", color: "#721c24" },
  badge_processing: { background: "#e2e3e5", color: "#383d41" },
  badge_shipped: { background: "#cce5ff", color: "#004085" },
  badge_delivered: { background: "#d4edda", color: "#155724" },
  select: {
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  }
};

export default AdminOrders;
