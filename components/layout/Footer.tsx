export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-text-tertiary">
        <p>© {new Date().getFullYear()} Alex Chen. Built with care.</p>
      </div>
    </footer>
  );
}
