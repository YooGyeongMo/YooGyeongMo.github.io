"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/til", label: "TIL" },
];

const contactLinks = [
  { label: "Email", href: "mailto:ykm7003@gmail.com" },
  { label: "GitHub", href: "https://github.com/YooGyeongMo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/demian-yoo/" },
  { label: "Medium", href: "https://medium.com/@ykm7003" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  // Close contact dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    }
    if (contactOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [contactOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass fixed top-0 left-0 right-0 z-50"
        style={{ borderBottom: "1px solid var(--color-separator)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            height: "var(--nav-height)",
            maxWidth: "calc(var(--content-max-width) + 4rem)",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "var(--content-padding)",
            paddingRight: "var(--content-padding)",
          }}
        >
          <Link
            href="/"
            className="font-semibold tracking-tight"
            style={{ fontSize: "var(--font-headline)" }}
          >
            Demian YOO
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative transition-colors"
                  style={{
                    fontSize: "var(--font-footnote)",
                    padding: "var(--space-2) 0",
                    color: isActive
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 rounded-full"
                      style={{
                        height: "2px",
                        background: "var(--color-accent)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Contact dropdown */}
            <div ref={contactRef} style={{ position: "relative", marginLeft: "var(--space-4)" }}>
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="font-medium transition-all hover:scale-105"
                style={{
                  fontSize: "var(--font-caption)",
                  color: "var(--color-accent)",
                  border: "1px solid var(--color-accent)",
                  borderRadius: "980px",
                  padding: "var(--space-1) var(--space-4)",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Contact
              </button>

              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="cloud-shadow"
                    style={{
                      position: "absolute",
                      top: "calc(100% + var(--space-2))",
                      right: 0,
                      background: "var(--color-bg)",
                      borderRadius: "var(--radius-md)",
                      padding: "var(--space-2)",
                      minWidth: "160px",
                      zIndex: 60,
                      border: "1px solid var(--color-separator)",
                    }}
                  >
                    {contactLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                        onClick={() => setContactOpen(false)}
                        className="transition-colors"
                        style={{
                          display: "block",
                          padding: "var(--space-2) var(--space-4)",
                          fontSize: "var(--font-footnote)",
                          color: "var(--color-text-primary)",
                          textDecoration: "none",
                          borderRadius: "var(--radius-sm)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--color-bg-secondary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-1)",
              }}
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "var(--space-4) var(--space-4)",
                      fontSize: "var(--font-title-3)",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? "var(--color-accent)"
                        : "var(--color-text-primary)",
                      borderRadius: "var(--radius-sm)",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div
                style={{
                  marginTop: "var(--space-6)",
                  paddingTop: "var(--space-6)",
                  borderTop: "1px solid var(--color-separator)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--font-caption)",
                    color: "var(--color-text-tertiary)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    padding: "0 var(--space-4)",
                  }}
                >
                  Contact
                </p>
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "var(--space-2) var(--space-4)",
                      fontSize: "var(--font-body)",
                      color: "var(--color-text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
