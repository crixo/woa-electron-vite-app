const Pagination = ({ currentPage, setCurrentPage, hasMore }) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = !hasMore;

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className={`px-4 py-2 rounded-lg ${
          isPrevDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={isPrevDisabled}
      >
        Previous
      </button>

      <span className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Page {currentPage}
      </span>

      <button
        className={`px-4 py-2 rounded-lg ${
          isNextDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};
