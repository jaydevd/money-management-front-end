const NotFound = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-orange-400 p-4 text-white">
            <div className="bg-[#2a2a40] p-10 rounded-2xl shadow-lg text-center max-w-lg w-full">
                <h1 className="text-4xl font-extrabold mb-4">404</h1>
                <p className="text-xl font-semibold mb-2">Page Not Found</p>
                <p className="text-gray-300 mb-6">The page you are looking for does not exist or has been moved.</p>
                <a href="/" className="bg-gradient-to-r from-pink-500 to-purple-600 py-2 px-6 rounded-lg font-semibold hover:opacity-90">Go to Homepage</a>
            </div>
        </div>
    )
}
export default NotFound;