export default function HomePage() {
  return (
    <main className="container-app py-8">
      <div className="animate-in">
        <h1 className="mb-2 text-4xl font-bold text-dark-900 dark:text-dark-50">
          Crypto Dashboard
        </h1>
        <p className="mb-8 text-dark-500 dark:text-dark-400">
          Track your cryptocurrency portfolio in real-time
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder cards */}
          <div className="card">
            <h2 className="mb-2 text-lg font-semibold">Portfolio Value</h2>
            <p className="text-3xl font-bold text-gradient">$0.00</p>
            <p className="mt-1 text-sm text-dark-500">Coming soon...</p>
          </div>

          <div className="card">
            <h2 className="mb-2 text-lg font-semibold">24h Change</h2>
            <p className="text-3xl font-bold text-success-500">+0.00%</p>
            <p className="mt-1 text-sm text-dark-500">Coming soon...</p>
          </div>

          <div className="card">
            <h2 className="mb-2 text-lg font-semibold">Assets</h2>
            <p className="text-3xl font-bold">0</p>
            <p className="mt-1 text-sm text-dark-500">Coming soon...</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-950">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            ✅ Project setup complete! Next.js, TypeScript, Tailwind CSS, and
            TanStack Query are configured and ready.
          </p>
        </div>
      </div>
    </main>
  );
}
