export function Footer() {
  return (
    <footer
      className="section-container"
      style={{
        padding: "var(--space-12) var(--content-padding)",
        textAlign: "center",
        fontSize: "var(--font-footnote)",
        color: "var(--color-text-tertiary)",
        borderTop: "1px solid var(--color-separator)",
      }}
    >
      <p>&copy; {new Date().getFullYear()} Demian YOO. All rights reserved.</p>
    </footer>
  );
}
