const Pagination = ({ page, setPage, totalItems, limit }) => {

    const totalPages = Math.ceil(totalItems / limit);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-[#1e1e2f] p-4 rounded-xl shadow-lg text-white">
            <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
                Prev
            </button>
            <p className="my-2 sm:my-0 text-sm sm:text-base">Page {page} of {totalPages}</p>
            <button
                onClick={() => setPage(prev => prev + 1)}
                disabled={page >= totalPages}
                className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;