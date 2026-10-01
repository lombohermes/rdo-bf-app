import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPosts, createPost, updatePost, deletePost } from './firebase';
import { useAuth } from './AuthContext';
import './Admin.css';

const Admin = ({ setPage }) => {
  const { t } = useTranslation();
  const { currentUser, userData } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editingPost, setEditingPost] = useState(null);
  const [saving, setSaving] = useState(false);

  // Formulaire
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'news',
    author: 'RDO-BF',
    image: '',
    published: true
  });

  // Vérifier les droits admin
  const isAdmin = userData?.role === 'admin' || userData?.isAdmin === true;

  // Charger les articles
  useEffect(() => {
    if (isAdmin) {
      loadPosts();
    }
  }, [isAdmin]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      alert(t('admin.error'));
    } finally {
      setLoading(false);
    }
  };

  // Si pas admin → afficher un message
  if (!isAdmin) {
    return (
      <div className="container">
        <div className="admin-denied">
          <h2>🚫 {t('admin.not_admin')}</h2>
          <p>Vous devez être connecté en tant qu'administrateur pour accéder à cette page.</p>
          <button className="btn-primary" onClick={() => setPage('home')}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Réinitialiser le formulaire
  const resetForm = () => {
    setForm({
      title: '',
      excerpt: '',
      content: '',
      category: 'news',
      author: 'RDO-BF',
      image: '',
      published: true
    });
    setEditingPost(null);
  };

  // Ouvrir le formulaire pour créer
  const handleNew = () => {
    resetForm();
    setView('form');
  };

  // Ouvrir le formulaire pour modifier
  const handleEdit = (post) => {
    setForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'news',
      author: post.author || 'RDO-BF',
      image: post.image || '',
      published: post.published !== false
    });
    setEditingPost(post);
    setView('form');
  };

  // Supprimer un article
  const handleDelete = async (post) => {
    if (!window.confirm(t('admin.delete_confirm'))) return;

    try {
      setSaving(true);
      await deletePost(post.id);
      alert(t('admin.success_delete'));
      loadPosts();
    } catch (err) {
      console.error(err);
      alert(t('admin.error'));
    } finally {
      setSaving(false);
    }
  };

  // Sauvegarder (créer ou mettre à jour)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingPost) {
        // Mise à jour
        await updatePost(editingPost.id, form);
        alert(t('admin.success_update'));
      } else {
        // Création
        await createPost(form);
        alert(t('admin.success_create'));
      }
      resetForm();
      setView('list');
      loadPosts();
    } catch (err) {
      console.error(err);
      alert(t('admin.error') + ' ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <h2>{t('admin.title')}</h2>
      <p className="lead">{t('admin.subtitle')}</p>

      {/* Boutons onglets */}
      <div className="admin-tabs">
        <button
          className={view === 'list' ? 'admin-tab active' : 'admin-tab'}
          onClick={() => { setView('list'); resetForm(); }}
        >
          {t('admin.list_posts')}
        </button>
        <button
          className={view === 'form' ? 'admin-tab active' : 'admin-tab'}
          onClick={handleNew}
        >
          {t('admin.new_post')}
        </button>
      </div>

      {/* VUE LISTE */}
      {view === 'list' && (
        <div className="admin-list">
          {loading ? (
            <p>Chargement...</p>
          ) : posts.length === 0 ? (
            <p className="lead">{t('admin.no_posts')}</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="admin-post-item">
                <div className="admin-post-info">
                  <div className="admin-post-status">
                    {post.published !== false
                      ? <span className="status-published">{t('admin.status_published')}</span>
                      : <span className="status-draft">{t('admin.status_draft')}</span>}
                  </div>
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                  <div className="admin-post-meta">
                    <span>📁 {post.category}</span>
                    <span>✍️ {post.author}</span>
                  </div>
                </div>
                <div className="admin-post-actions">
                  <button className="btn-edit" onClick={() => handleEdit(post)}>
                    {t('admin.edit')}
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(post)}>
                    {t('admin.delete')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* VUE FORMULAIRE */}
      {view === 'form' && (
        <div className="admin-form-wrapper">
          <h3>{editingPost ? t('admin.edit_post') : t('admin.new_post')}</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>{t('admin.form_title')}</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label>{t('admin.form_excerpt')}</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows="2"
              required
            />

            <label>{t('admin.form_content')}</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows="10"
              required
            />

            <div className="admin-form-row">
              <div>
                <label>{t('admin.form_category')}</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="news">{t('blog.category_news')}</option>
                  <option value="advice">{t('blog.category_advice')}</option>
                  <option value="success">{t('blog.category_success')}</option>
                  <option value="events">{t('blog.category_events')}</option>
                </select>
              </div>
              <div>
                <label>{t('admin.form_author')}</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
            </div>

            <label>{t('admin.form_image')}</label>
            <input
              type="url"
              placeholder="https://exemple.com/image.jpg"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <div className="admin-checkbox">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              <label htmlFor="published">{t('admin.form_published')}</label>
            </div>

            <div className="admin-form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => { resetForm(); setView('list'); }}
                disabled={saving}
              >
                {t('admin.form_cancel')}
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving
                  ? t('admin.form_saving')
                  : (editingPost ? t('admin.form_update') : t('admin.form_save'))}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;