import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);

  const items = [
    { href: "/admin/header", label: "Header" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/galerie", label: "Galerie" },
    { href: "/admin/testimonials", label: "Testimonial" },
    // {
    //   href: "/admin/services",
    //   label: "Services",
    //   submenu: [
    //     { href: "/admin/services", label: "List de service" },
    //     { href: "/admin/services/add", label: "ajouter un service" },
    //   ],
    // },
  ];

  // Helper to check if current location matches or is under services submenu
  const isActive = (href) => location.pathname === href;
  const isSubmenuActive = (submenu) =>
    submenu.some((sub) => location.pathname === sub.href);

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        paddingTop: "20px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => {
          const hasSubmenu = !!item.submenu;
          const active = isActive(item.href);
          const submenuActive = hasSubmenu && isSubmenuActive(item.submenu);

          return (
            <li key={item.href}>
              <div
                onClick={() => hasSubmenu && setServicesOpen(!servicesOpen)}
                style={{
                  cursor: hasSubmenu ? "pointer" : "default",
                  display: "block",
                  padding: "12px 20px",
                  margin: "0 10px 10px 10px",
                  borderRadius: "6px",
                  color: active || submenuActive ? "#007bff" : "#333",
                  backgroundColor: active || submenuActive ? "#e7f1ff" : "transparent",
                  fontWeight: active || submenuActive ? "600" : "400",
                  userSelect: "none",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!active && !submenuActive)
                    e.currentTarget.style.backgroundColor = "#f1f3f5";
                }}
                onMouseLeave={(e) => {
                  if (!active && !submenuActive)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {hasSubmenu ? (
                  <>
                    {item.label}
                    <span style={{ float: "right" }}>
                      {servicesOpen ? "▲" : "▼"}
                    </span>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>

              {/* Submenu */}
              {hasSubmenu && servicesOpen && (
                <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
                  {item.submenu.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        to={sub.href}
                        style={{
                          display: "block",
                          padding: "8px 20px",
                          margin: "0 10px 6px 10px",
                          borderRadius: "6px",
                          color: isActive(sub.href) ? "#007bff" : "#555",
                          backgroundColor: isActive(sub.href)
                            ? "#d9eaff"
                            : "transparent",
                          textDecoration: "none",
                          fontWeight: isActive(sub.href) ? "600" : "400",
                          transition: "background-color 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive(sub.href))
                            e.currentTarget.style.backgroundColor = "#f1f3f5";
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(sub.href))
                            e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
