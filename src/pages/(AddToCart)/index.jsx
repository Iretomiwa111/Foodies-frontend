import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCartStore } from "@/store/useCartStore";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    cart,
    loading,
    fetchCart,
    updateCartItemQuantity,
    removeCartItem,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );

  if (loading) return <p className="p-4 text-white font-lobster text-2xl">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#111] text-white font-lobster">
      <div className="p-4 max-w-4xl mx-auto bg-[#121212] min-h-screen">
        {user && (
          <h2 className="text-2xl font-lobster font-semibold mb-6 text-white">
            Welcome, {user.name}
          </h2>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Link
              to="/menu"
              className="inline-block bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition font-medium tracking-wide"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-green-400">
              Your Cart
            </h1>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border border-gray-700 p-3 rounded-lg bg-[#1e1e1e]/60 shadow shadow-black"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${item.menuItem.image}`}
                      alt={item.menuItem.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium text-white text-base">{item.menuItem.name}</p>
                      <p className="text-sm text-gray-400">₦ {item.menuItem.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateCartItemQuantity(item._id, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-500 transition"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item._id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-500 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeCartItem(item._id)}
                      className="text-red-500 hover:underline ml-4 text-sm tracking-wide"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-6 text-lg font-semibold text-green-400 tracking-wider">
              Total: ₦ {total}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => navigate("/menu")}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-6 rounded-lg transition"
              >
                ← Back To Menu
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 text-sm rounded-lg transition"
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
