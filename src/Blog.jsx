import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPosts } from './firebase';
import './Blog.css';

const Blog = ({ setPage, setSelectedPost }) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.filter(p => p.published !== false));
      } catch (err) {
        console.error('Erreur chargement articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchSearch =
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'all' || post.category === category;
    return matchSearch && matchCategory;
  });

  const handleReadPost = (post) => {
    setSelectedPost(post);
    setPage('post');
  };

  if (loading) {
    return (
      <div className="container">
        <h2>{t('blog.title')}</h2>
        <p className="lead">{t('blog.loading')}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{t('blog.title')}</h2>
      <p className="lead">{t('blog.subtitle')}</p>

      <div className="blog-filters">
        <input
          type="text"
          placeholder={t('blog.search_placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="blog-search"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="blog-select"
        >
          <option value="all">{t('blog.all_categories')}</option>
          <option value="news">{t('blog.category_news')}</option>
          <option value="advice">{t('blog.category_advice')}</option>
          <option value="success">{t('blog.category_success')}</option>
          <option value="events">{t('blog.category_events')}</option>
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="lead" style={{ marginTop: '40px' }}>{t('blog.no_posts')}</p>
      ) : (
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="blog-card"
              onClick={() => handleReadPost(post)}
            >
              {post.image && (
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
              )}
              <div className="blog-card-body">
                <span className="blog-category">
                  {post.category || t('blog.category_news')}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span>✍️ {t('blog.by')} {post.author || 'RDO-BF'}</span>
                  <span className="blog-read-more">{t('blog.read_more')} →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;