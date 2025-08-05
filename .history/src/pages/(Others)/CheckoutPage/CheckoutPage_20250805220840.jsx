import { useEffect, useState } from "react";
import { privateApiClient } from "@/lib/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "world-countries";

const countryList = countries.map((c) => ({
  label: c.name.common,
  value: c.cca2,
}));

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pay-on-delivery");

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [placingOrder, setPlacingOrder] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await privateApiClient.get("/cart");
        setCart(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch cart", err);
        toast.error("Could not load cart");
        setLoading(false);
      }
    };

    fetchCart();
  }, []);


  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => phone.length >= 10;

  const total = cart.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !country ||
      !postalCode
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error("Invalid phone number");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cvv || !expiryDate) {
        toast.error("Please fill in all card details");
        return;
      }
    }

    try {
      setPlacingOrder(true);
      const res = await privateApiClient.post("/orders", {
        paymentMethod,
        notes: note,
        deliveryInfo: {
          name: `${firstName} ${lastName}`,
          phone,
          address: `${street}, ${city}, ${postalCode}, ${country}`,
          email,
        },
      });

      toast.success("Order placed!");
      navigate("/order-confirmation", {
        state: {
          order: res.data.order,
          cartItems: cart,
          paymentMethod: res.data.order.paymentMethod,
          notes: note,
        },
      });

      setCart([]);
    } catch (err) {
      console.error("Checkout failed", err);
      toast.error("Checkout failed");
    } finally {
      setPlacingOrder(false);
    }
  };


  if (loading) {
    return (
      <div className="text-center text-white text-2xl py-20">
        Loading cart...
      </div>
    );
  }

  const inputStyle =
    "bg-transparent border-b border-gray-600 focus:outline-none text-sm tracking-widest focus:border-green-500 px-2 py-3 rounded-md";

  return (
    <div className="min-h-screen bg-[#111827] text-white p-4 sm:p-10 flex justify-center items-center">
      <div className="bg-[#1f2937] w-full max-w-6xl rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* LEFT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-8 space-y-8">
          {/* Customer Info */}
          <div>
            <h2 className="text-3xl tracking-wider font-medium mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputStyle}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle + " col-span-full"}
                required
              />
              <PhoneInput
                country={"ng"}
                value={phone}
                onChange={(val) => setPhone(val)}
                inputClass="!bg-transparent !text-white !w-full !border-b !border-gray-600 placeholder:!text-gray-400"
                buttonClass="!bg-transparent !border-none"
                dropdownClass="!bg-white !text-black"
                containerClass="col-span-full"
              />
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h2 className="text-3xl tracking-wider font-medium mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Street Address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={inputStyle + " col-span-full"}
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputStyle}
                required
              />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${inputStyle} col-span-full bg-[#1f2937] text-white border-b border-gray-600 outline-none`}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Country
                </option>
                {countryList.map((c) => (
                  <option key={c.value} value={c.label} className="text-black">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-3xl tracking-wider font-medium mb-4">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tracking-wider">
              {["pay-on-delivery", "card", "bank-transfer"].map((method) => (
                <div
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`cursor-pointer p-4 rounded-xl border text-center text-sm font-medium transition ${paymentMethod === method
                    ? "border-green-500 bg-green-600 text-white"
                    : "border-gray-600 bg-transparent"
                    }`}
                >
                  {method === "pay-on-delivery"
                    ? "Pay on Delivery"
                    : method === "card"
                      ? "Credit  /Debit Card"
                      : "Bank Transfer"}
                </div>
              ))}
            </div>
            {paymentMethod === "card" && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={inputStyle + " col-span-full"}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className={inputStyle}
                />
              </div>
            )}
          </div>

          <textarea
            placeholder="Additional Notes (Optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={inputStyle + " w-full mt-4 rounded-md"}
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-700"></div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="w-full md:w-1/2 p-8 bg-[#111827] flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-medium mb-6">Order Summary</h2>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 border-b border-gray-700 pb-4"
                >
                  <img
                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${item.menuItem.image}`}
                    alt={item.menuItem.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium tracking-wide text-sm">{item.menuItem.name}</h3>
                    <p className="text-sm text-gray-400">
                      ₦{item.menuItem.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <p className=" tracking-wide font-medium text-green-400 text-sm whitespace-nowrap">
                    ₦{(item.menuItem.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-gray-700 pt-4 text-lg font-semibold">
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span>₦ {total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mb-4 text-sm text-gray-300 hover:text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Go Back
            </button>

            {/* Place Order Button */}
            <button
              onClick={handleCheckout}
              disabled={placingOrder}
              className={`w-full py-3 rounded-xl font-medium shadow-md transition duration-300 ${placingOrder
                  ? "bg-green-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CheckoutPage;
