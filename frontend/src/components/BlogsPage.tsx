import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
}

const BlogsPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]); 
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

  const goToAdminDashboard = () => {
    navigate('/admindashboard');
  };

  const goToBlogDetail = (blogId: number) => {
    if (blogId) {
      navigate(`/blogs/${blogId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-blue-100 to-blue-50 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-blue-100 to-sky-100 blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="absolute right-6 z-20">
          <button
            onClick={goToAdminDashboard}
            className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:from-indigo-700 hover:to-indigo-900 focus:outline-none"
          >
            Admin Dashboard
          </button>
        </div>

        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          Blogs
        </h1>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blogs available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-6">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="group relative bg-white/40 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/60"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-all duration-300">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => goToBlogDetail(blog.id)}
                      className="text-indigo-600 hover:text-indigo-800 transition-all duration-300 group-hover:text-blue-600"
                    >
                      Read more
                    </button>
                    <span className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    By {blog.author.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;