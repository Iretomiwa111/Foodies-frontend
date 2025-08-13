import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useCartStore } from "@/store/useCartStore";
import { useProtectedAction } from "@/helpers/HandleProtection";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/pages/context/AuthContext";
import './nav.css'

export default function NavBar({ onSearchChange, onSearchSubmit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const location = useLocation();
  const isMenuPage = location.pathname === "/menu";

  const cartItems = useCartStore((state) => state.cart || []);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const check = useProtectedAction();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenuPage) {
      fetchCart();
    }
  }, [isMenuPage]);

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
    if (onSearchChange) onSearchChange(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (onSearchChange) onSearchChange(input);
      if (onSearchSubmit) onSearchSubmit();
      if (mobileSearchOpen) setMobileSearchOpen(false);
    }
  };

  const toggleSearchOverlay = () => {
    setMobileSearchOpen((prev) => !prev);
  };

  const handleProtectedClick = (e, path) => {
    e.preventDefault();
    check(() => {
      toast.success("Redirecting...");
      setTimeout(() => {
        navigate(path);
      }, 1000);
    }, path);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     toast.success("Logged out");
  //     navigate("/auth");
  //   } catch {
  //     toast.error("Logout failed");
  //   }
  // };
const handleLogout = async () => {
  try {
    document.body.classList.add("fade-out");
    await new Promise(resolve => setTimeout(resolve, 400)); // wait for animation
    await logout();
    toast.success("Logged out");
    navigate("/auth");
  } catch {
    toast.error("Logout failed");
  }
};


  return (
    <>
      <nav className="navbar sticky top-0 z-50">
        <div className="navbar-container flex items-center justify-between w-full px-4 py-2">
          <Link to="/">
            <h2 className="h1-text">Foodies</h2>
          </Link>

          <div className="flex items-center gap-4">
            {isMenuPage && (
              <button onClick={toggleSearchOverlay} className="sm:hidden">
                <FiSearch className="w-5 h-5 text-white" />
              </button>
            )}

            {isMenuPage && (
              <button
                onClick={(e) => handleProtectedClick(e, "/cart")}
                className="relative"
              >
                <FaShoppingCart className="text-white text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            <button
              className={`navbar-toggle ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>

          <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/menu" onClick={(e) => handleProtectedClick(e, "/menu")}>
                Dishes
              </Link>
            </li>

            <span>|</span>
            <li>
              <Link to="/about" onClick={(e) => handleProtectedClick(e, "/about")}>
                About
              </Link>
            </li>

            <span>|</span>
            <li>
              <Link to="/contact" onClick={(e) => handleProtectedClick(e, "/contact")}>
                Contact
              </Link>
            </li>

            <span>|</span>
            <li>
              <Link to="/services" onClick={(e) => handleProtectedClick(e, "/services")}>
                Services
              </Link>
            </li>
            {user && (
              <li className="mobile-profile w-full text-white mt-4 border-t border-white/30 pt-4">
                <div className="flex items-center gap-3">
                  <div className=" w-9 h-9 rounded-full overflow-hidden bg-white text-black flex items-center justify-center font-semibold">
                    {user.avatar ? (
                      <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="avatar-initial">
                        {user.name.charAt(0).toUpperCase()}
                      </div>


                    )}
                  </div>
                  <div className="user-menu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/profile">Orders</Link>
                    <Link><button onClick={handleLogout}>Logout</button></Link>
                  </div>

                </div>
              </li>
            )}

          </ul>

          {/*Avatar/Profile shown on desktop only */}
          {user && (
            <div className="relative desktop-profile">
              <button onClick={toggleDropdown} className="w-9 h-9 rounded-full bg-white text-black font-semibold flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span>{user.name?.[0]?.toUpperCase()}</span>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                  <button onClick={() => { navigate("/profile"); setDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                  <button onClick={() => { navigate("/profile"); setDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">Orders</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Logout</button>
                </div>
              )}
            </div>
          )}


          {isMenuPage && (
            <div className="hidden sm:block ml-4">
              <input
                type="text"
                placeholder="Search dishes..."
                value={input}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                className="navbar-search-input"
              />
            </div>
          )}
        </div>
      </nav>

      {mobileSearchOpen && isMenuPage && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md transition-all duration-300 flex items-center justify-center sm:hidden">
          <div className="relative w-[90%]">
            <input
              type="text"
              placeholder="Search dishes..."
              value={input}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-white text-black shadow-md focus:outline-none text-lg"
            />
            <button
              onClick={toggleSearchOverlay}
              className="absolute top-3 right-4 text-gray-700 hover:text-black text-xl"
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
