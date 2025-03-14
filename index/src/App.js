import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = 'http://localhost:3000';

function App() {
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '' });
  const [newPost, setNewPost] = useState({ title: '', content: '', authorId: '' });
  const [editPost, setEditPost] = useState(null);
  useEffect(() => {
    fetchAuthors();
    fetchPosts();
  }, []);

  const fetchAuthors = async () => {
    const response = await axios.get(`${API_BASE_URL}/authors`);
    setAuthors(response.data);
  };

  const fetchPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    setPosts(response.data);
  };

  const handleCreateAuthor = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/authors`, newAuthor);
    setNewAuthor({ name: '', email: '' });
    fetchAuthors();
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/posts`, newPost);
    setNewPost({ title: '', content: '', authorId: '' });
    fetchPosts();
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    await axios.put(`${API_BASE_URL}/posts/${editPost._id}`, editPost);
    setEditPost(null);
    fetchPosts();
  };

  const handleDeletePost = async (id) => {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Blog System</h1>

      <div className="mb-5">
        <h2>Authors</h2>
        <form onSubmit={handleCreateAuthor} className="mb-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newAuthor.name}
              onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newAuthor.email}
              onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Author</button>
        </form>

        <ul className="list-group">
          {authors.map((author) => (
            <li key={author.id} className="list-group-item">
              {author.name} - {author.email}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>Posts</h2>
        <form onSubmit={editPost ? handleUpdatePost : handleCreatePost} className="mb-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={editPost ? editPost.title : newPost.title}
              onChange={(e) =>
                editPost
                  ? setEditPost({ ...editPost, title: e.target.value })
                  : setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Content"
              value={editPost ? editPost.content : newPost.content}
              onChange={(e) =>
                editPost
                  ? setEditPost({ ...editPost, content: e.target.value })
                  : setNewPost({ ...newPost, content: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Author ID"
              value={editPost ? editPost.authorId : newPost.authorId}
              onChange={(e) =>
                editPost
                  ? setEditPost({ ...editPost, authorId: e.target.value })
                  : setNewPost({ ...newPost, authorId: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editPost ? 'Update Post' : 'Add Post'}
          </button>
          {editPost && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditPost(null)}
            >
              Cancel
            </button>
          )}
        </form>

        <ul className="list-group">
          {posts.map((post) => (
            <li key={post._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{post.title}</h5>
                <p>{post.content}</p>
                <small>Author ID: {post.authorId}</small>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditPost(post)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;