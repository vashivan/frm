export default function CategoryLoading() {
  return (
    <section className="px-6 py-30">
      <div className="mb-6 h-6 w-32 animate-pulse bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-3/4 animate-pulse bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse bg-gray-200" />
            <div className="h-4 w-1/3 animate-pulse bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
}