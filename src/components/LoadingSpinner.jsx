export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] py-12">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        {/* Spinning circle */}
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
        Loading...
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
        Please wait a moment
      </p>
    </div>
  );
}
