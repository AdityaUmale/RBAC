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
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
        <div>
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Content"
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          />
          <button
            onClick={handleCreateBlog}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Create Blog
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
              <button
                onClick={() => setEditingBlog(blog)}
                className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block"
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
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>

      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">Edit Blog</h3>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Title"
              value={editingBlog.title}
              onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
            />
            <textarea
              className="border p-2 w-full mb-2"
              placeholder="Content"
              value={editingBlog.content}
              onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleUpdateBlog(editingBlog.id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Update Blog
              </button>
              <button
                onClick={() => setEditingBlog(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;