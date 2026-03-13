'use client';

export function Footer() {
  return (
    <footer className="py-s-60 border-t border-border/40 text-center">
      <p className="text-s-14 text-text-muted">
        &copy; {new Date().getFullYear()} MailFlow. Built for developers who value control.
      </p>
    </footer>
  );
}
