export default function Loading() {
  return (
    <div className="shop-page">
      <section className="section p-0">
        <div className="section-header">
          <div className="h-8 w-48 animate-pulse bg-gray-200" />
          <div className="h-4 w-96 animate-pulse bg-gray-200" />
        </div>

        <div className="grid-cards">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-6 border"
            >
              <div className="h-6 w-32 animate-pulse bg-gray-200 mb-4" />
              <div className="h-4 w-full animate-pulse bg-gray-200 mb-2" />
              <div className="h-4 w-3/4 animate-pulse bg-gray-200 mb-4" />

              <div className="space-y-2">
                <div className="h-3 w-2/3 animate-pulse bg-gray-200 mb-2" />
                <div className="h-3 w-1/2 animate-pulse bg-gray-200 mb-2" />
                <div className="h-3 w-3/4 animate-pulse bg-gray-200" />
              </div>

              <div className="mt-6 h-4 w-20 animate-pulse bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}