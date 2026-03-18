export function NewsletterSignup() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-base font-bold">Newsletter</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Get weekly rankings, betting edges, and model updates.</p>
      <form className="mt-3 space-y-2">
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          aria-label="Email address"
        />
        <button className="w-full rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700" type="button">
          Subscribe
        </button>
      </form>
    </section>
  );
}
