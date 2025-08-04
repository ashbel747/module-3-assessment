import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PostForm({ isEdit }) {
  const [form, setForm] = useState({ title: '', summary: '', content: '', image: '' });
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    if (isEdit && id) {
      fetch('https://module-3-assessment.onrender.com/api/posts')
        .then((res) => res.json())
        .then((posts) => {
          const post = posts.find((p) => p._id === id);
          if (post) {
            setForm({
              title: post.title,
              summary: post.summary,
              content: post.content,
              image: post.image || '',
            });
          }
        });
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit
      ? `https://module-3-assessment.onrender.com/api/posts/${id}`
      : 'https://module-3-assessment.onrender.com/api/posts';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        navigate('/dashboard/my-posts');
      } else {
        alert('Failed to submit post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Create'} Post</h2>
      <div className="mb-4">
        <label className="block text-gray-600 dark:text-gray-100 text-md font-bold mb-2">
          Title
        </label>
        <input
          name="title"
          placeholder=" Choose a Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 dark:text-gray-100 text-md font-bold mb-2">
          Summary
        </label>
        <input
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 dark:text-gray-100 text-md font-bold mb-2">
          Post Image
        </label>
        <input
          name="image"
          placeholder="Image FileName"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 dark:text-gray-100 text-md font-bold mb-2">
          Content
        </label>
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded h-40"
          required
        />
      </div>
      <button type="submit" className="bg-blue-800 hover:bg-blue-400 active:bg-blue-600 text-white  px-10 py-2 rounded mt-3 ml-64">
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
