import { useState, useEffect } from 'react';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();

        if (response.ok) {
          setBlogs(Array.isArray(data.data) ? data.data : []);
        } else {
          setError(data.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError('An error occurred while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-blue-100 to-blue-50 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-blue-100 to-sky-100 blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          Blogs
        </h1>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="group relative bg-white/40 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/60">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-all duration-300">{blog.title}</h2>
                  <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
                  <a
                    href={`/blogs/${blog._id}`}
                    className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block transition-all duration-300 group-hover:text-blue-600"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
