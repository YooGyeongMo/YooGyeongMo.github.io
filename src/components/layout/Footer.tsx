export function Footer() {
  return (
    <footer
      className="py-12 text-center text-sm"
      style={{ color: "var(--color-text-secondary)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p>&copy; {new Date().getFullYear()} Demian YOO. All rights reserved.</p>
      </div>
    </footer>
  );
}
