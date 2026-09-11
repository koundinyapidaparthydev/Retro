export default function NotFound() {
  return (
    <div className="rise">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-text">Page not found</h1>
      <p className="mt-3 text-sm text-muted">
        This track is a single page now.{" "}
        <a href="/" className="text-teal no-underline border-b border-teal/35 hover:border-teal">
          Back to the roadmap
        </a>
        .
      </p>
    </div>
  );
}
