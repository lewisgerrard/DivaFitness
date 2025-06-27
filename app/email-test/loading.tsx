export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md w-2/3 animate-pulse"></div>
              </div>
              <div className="mt-4">
                <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="h-6 bg-gray-200 rounded-md w-48 mb-4 animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
