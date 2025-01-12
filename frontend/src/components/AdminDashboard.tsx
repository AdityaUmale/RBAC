import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenData } from '../utils/auth';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const tokenData = getTokenData();
    
    if (!tokenData || tokenData.role !== 'ADMIN') {
      navigate('/unauthorized');
      return;
    }

    fetchBlogs();
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        setError('Response data is not in the expected format');
      }
    } catch (err) {
      setError('An error occurred while fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage (Create):', token);

    if (!token) {
      setError('You must be logged in to create a blog');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        const createdBlog = await response.json();
        setBlogs([...blogs, createdBlog.data]);
        setNewBlog({ title: '', content: '' });
      } else {
        setError('Failed to create blog');
      }
    } catch (err) {
      setError('An error occurred while creating the blog');
    }
  };

  const handleUpdateBlog = async (id: string) => {
    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage (Update):', token);

    if (!token) {
      setError('You must be logged in to update a blog');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingBlog),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(prevBlogs =>
          prevBlogs.map(blog => (blog.id === id ? updatedBlog.data : blog))
        );
        setEditingBlog(null);
      } else {
        setError('Failed to update blog');
      }
    } catch (err) {
      setError('An error occurred while updating the blog');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage (Delete):', token);

    if (!token) {
      setError('You must be logged in to delete a blog');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
      } else {
        setError('Failed to delete blog');
      }
    } catch (err) {
      setError('An error occurred while deleting the blog');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-blue-100 to-blue-50 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-blue-100 to-sky-100 blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
          <div>
            <input
              type="text"
              className="border p-2 w-full mb-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            />
            <textarea
              className="border p-2 w-full mb-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Content"
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            />
            <button
              onClick={handleCreateBlog}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Create Blog
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Your Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="group relative bg-white/40 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/60">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-all duration-300">{blog.title}</h3>
                  <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
                  <button
                    onClick={() => setEditingBlog(blog)}
                    className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block transition-all duration-300 group-hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="text-red-600 hover:text-red-800 mt-4 inline-block ml-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available.</p>
          )}
        </div>

        {editingBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <h3 className="text-2xl font-semibold mb-4">Edit Blog</h3>
              <input
                type="text"
                className="border p-2 w-full mb-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Title"
                value={editingBlog.title}
                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
              />
              <textarea
                className="border p-2 w-full mb-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Content"
                value={editingBlog.content}
                onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleUpdateBlog(editingBlog.id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Update Blog
                </button>
                <button
                  onClick={() => setEditingBlog(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
