import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion as Motion } from "framer-motion";
import { privateApiClient } from "@/lib/client";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(
        `/orders${statusFilter ? `?status=${statusFilter}` : ""}`
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  const updateStatus = async (orderId, newStatus) => {
    try {
      await privateApiClient.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      toast.success(`Order marked as ${newStatus}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await privateApiClient.delete(`/orders/${orderId}/admin`);
      toast.success("Order deleted");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };
  const statusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-500/20 text-yellow-400`;
      case "processing":
        return `${base} bg-blue-500/20 text-blue-400`;
      case "completed":
        return `${base} bg-green-500/20 text-green-400`;
      case "cancelled":
        return `${base} bg-red-500/20 text-red-400`;
      default:
        return base;
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <Motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Admin Orders
      </Motion.h2>

      {/* Filter */}
      <Motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <select
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </Motion.div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left bg-gray-700 text-sm text-gray-300">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Placed</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <Motion.tr
                  key={order._id}
                  className="border-t border-gray-700 hover:bg-gray-700/40 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium">{order.user?.fullName}</div>
                    <div className="text-xs text-gray-400">
                      {order.user?.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">₦{order.total}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadge(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-sm">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 space-y-2 text-sm">
                    {order.status !== "completed" &&
                      order.status !== "cancelled" && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() =>
                              updateStatus(order._id, "processing")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Mark as Processing
                          </button>
                          <button
                            onClick={() => updateStatus(order._id, "completed")}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Mark as Completed
                          </button>
                          <button
                            onClick={() => updateStatus(order._id, "cancelled")}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs mt-2"
                    >
                      Delete
                    </button>
                  </td>
                </Motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
