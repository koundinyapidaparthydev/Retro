export default function NotFound() {
  return (
    <div>
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-3xl text-ink">Page not found</h1>
      <p className="mt-3 text-sm text-slate">
        This track is a single page now. Go back to the{" "}
        <a href="/" className="text-ink underline underline-offset-4">
          mid-level roadmap
        </a>
        .
      </p>
    </div>
  );
}
