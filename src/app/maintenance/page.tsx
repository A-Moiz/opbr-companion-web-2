export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Site Under Maintenance 🛠️</h1>
        <p className="text-gray-600 mb-6">
          We&apos;re currently moving our character assets to a new faster server to improve your experience. OPBR
          Companion will be back online shortly!
        </p>
        <div className="animate-pulse flex space-x-2 justify-center">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
