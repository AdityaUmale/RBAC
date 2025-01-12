import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError('Invalid blog ID');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        const data = await response.json();

        if (response.ok) {
          setBlog(data.data);
        } else {
          setError(data.message || 'Failed to fetch blog post');
        }
      } catch (err) {
        setError('An error occurred while fetching the blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={() => navigate('/blogs')}
            className="mt-4 text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/blogs')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
        >
          ← Back to Blogs
        </button>

        {blog && (
          <article className="bg-white/40 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            <div className="prose prose-lg max-w-none">
              {blog.content}
            </div>
            <div className="mt-6 text-gray-600">
              <p>Posted on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;