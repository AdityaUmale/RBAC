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
          // Make sure the fetched data is an array
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
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Blogs</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
              <a
                href={`/blogs/${blog._id}`}
                className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
