import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state?.order || null);
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);

  useEffect(() => {
    if (!order) {
      const saved = localStorage.getItem("latestOrder");
      if (saved) {
        const parsed = JSON.parse(saved);
        setOrder(parsed);
        setCartItems(parsed.cartItems || []);
      }
    }
  }, [order]);

  if (!order) {
    return (
      <div className="p-4 text-center text-black text-2xl">No order found.</div>
    );
  }

  const {
    _id,
    totalAmount,
    createdAt,
    paymentMethod,
    notes,
    deliveryInfo,
    status = "pending",
  } = order;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-xl rounded-xl">
        <h1 className="text-2dxzxl font-medium text-green-600 text-center mb-4">
          🎉 Order Confirmed!
        </h1>

        <div className="text-center text-sm text-gray-600 mb-6 tracking-wide">
          <p>
            <strong>Order ID:</strong> {_id}
          </p>
          <p>
            <strong>Placed on:</strong>{" "}
            {createdAt ? format(new Date(createdAt), "PPpp") : "—"}
          </p>
          <p className="inline-block mt-1 px-3 py-1 text-xs tracking-wide font-semibold rounded-full bg-yellow-300 text-yellow-800">
            {status.toUpperCase()}
          </p>
        </div>

        <h2 className="text-3xl text-black tracking-wide font-semibold mb-2">
          Ordered Items
        </h2>
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 border-b border-gray-700 pb-4"
            >
              <img
                src={`http://localhost:5000/${item.menuItem.image}`}
                alt={item.menuItem.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium tracking-wide text-sm text-black">
                  {item.menuItem.name}
                </h3>
                <p className="text-sm text-gray-700">
                  ₦{item.menuItem.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
              <p className=" tracking-wide font-medium text-gray-900 text-sm whitespace-nowrap">
                ₦{(item.menuItem.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-500 pt-4 space-y-2 text-base text-black">
          <p className="font-semibold tracking-wide text-black">
            Total: ₦ {totalAmount?.toLocaleString() ?? "0"}
          </p>
          <p>
            <strong className="tracking-wide">Payment Method:</strong>{" "}
            {paymentMethod === "pay-on-delivery"
              ? "Pay on Delivery"
              : paymentMethod === "card"
              ? "Credit/Debit Card"
              : paymentMethod === "bank-transfer"
              ? "Bank Transfer"
              : paymentMethod === "online"
              ? "Online Payment"
              : paymentMethod}
          </p>
          {notes && (
            <p>
              <strong>Notes:</strong> {notes}
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-gray-300 pt-4 space-y-2 text-black tracking-wide text-sm">
          <h3 className="font-medium text-lg text-black tracking-wide">
            Delivery Info
          </h3>
          <p>
            <strong>Name:</strong> {deliveryInfo?.name}
          </p>
          <p>
            <strong>Phone:</strong> {deliveryInfo?.phone}
          </p>
          <p>
            <strong>Address:</strong> {deliveryInfo?.address}
          </p>
          {deliveryInfo?.email && (
            <p>
              <strong>Email:</strong> {deliveryInfo?.email}
            </p>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/menu")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
