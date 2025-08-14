import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './../../../context/AuthContext';
import { ClientContext } from "../../../context/ClientContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout} = useContext(AuthContext);
  const { userProfile } = useContext(ClientContext);
  const navigate = useNavigate();

  // Fermer dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fonction logout appelée depuis StoreContext
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "16px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        Admin Dashboard
      </div>
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "1rem",
          }}
        >
          <span>Hi, {userProfile?.name || "User"}</span>
          <img
            src={userProfile?.photo|| null}
            alt="Profile"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </button>

        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              marginTop: "8px",
              width: "160px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              borderRadius: "6px",
              zIndex: 20,
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
              <Link to="/admin/profile/me">
                <li
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Profile
                </li>
              </Link>
              <li
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
