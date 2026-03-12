"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/til", label: "Today I Learned" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass fixed top-0 left-0 right-0 z-50"
      style={{ borderBottom: "1px solid var(--color-separator)" }}
    >
      <div
        className="section-container flex items-center justify-between"
        style={{ height: "var(--nav-height)" }}
      >
        <Link
          href="/"
          className="font-semibold tracking-tight"
          style={{ fontSize: "var(--font-headline)" }}
        >
          Demian YOO
        </Link>

        <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
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
                  fontSize: "var(--font-subhead)",
                  padding: `${`var(--space-2)`} 0`,
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
        </div>
      </div>
    </motion.nav>
  );
}
