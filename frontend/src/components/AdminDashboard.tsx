import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<any[]>([]); // Initialize as an array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [editingBlog, setEditingBlog] = useState<any | null>(null);

  // Fetch blogs on initial load
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        console.log(data); // Log the response

        // Ensure the response is an array
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setError('Response data is not in the expected format');
        }
      } catch (err) {
        setError('An error occurred while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle creating a new blog
  const handleCreateBlog = async () => {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
    console.log('Token from localStorage (Create):', token);  // Log token to check its value

    if (!token) {
      setError('You must be logged in to create a blog');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Attach the token to the request header
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        const createdBlog = await response.json();
        setBlogs([...blogs, createdBlog]);
        setNewBlog({ title: '', content: '' });
      } else {
        setError('Failed to create blog');
      }
    } catch (err) {
      setError('An error occurred while creating the blog');
    }
  };

  // Handle updating a blog
  const handleUpdateBlog = async (id: string) => {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
    console.log('Token from localStorage (Update):', token);  // Log token to check its value

    if (!token) {
      setError('You must be logged in to update a blog');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Attach the token to the request header
        },
        body: JSON.stringify(editingBlog),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map((blog) => (blog._id === id ? updatedBlog : blog)));
        setEditingBlog(null);
      } else {
        setError('Failed to update blog');
      }
    } catch (err) {
      setError('An error occurred while updating the blog');
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (id: string) => {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
    console.log('Token from localStorage (Delete):', token);  // Log token to check its value

    if (!token) {
      setError('You must be logged in to delete a blog');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,  // Attach the token to the request header
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
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
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
              <button
                onClick={() => setEditingBlog(blog)}
                className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBlog(blog._id)}
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
        <div className="mt-6">
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
          <button
            onClick={() => handleUpdateBlog(editingBlog._id)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Update Blog
          </button>
          <button
            onClick={() => setEditingBlog(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded ml-4"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
