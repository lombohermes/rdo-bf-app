import React from 'react';
import { useTranslation } from 'react-i18next';

const Post = ({ post, setPage }) => {
  const { t } = useTranslation();

  if (!post) {
    return (
      <div className="container">
        <h2>Article introuvable</h2>
        <button className="btn-primary" onClick={() => setPage('blog')}>
          {t('blog.back_to_blog')}
        </button>
      </div>
    );
  }

  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <div className="container post-container">
      <button className="btn-back" onClick={() => setPage('blog')}>
        {t('blog.back_to_blog')}
      </button>

      <article className="post-article">
        <span className="blog-category">
          {post.category || t('blog.category_news')}
        </span>
        <h1>{post.title}</h1>

        <div className="post-meta">
          <span>✍️ {t('blog.by')} {post.author || 'RDO-BF'}</span>
          <span>📅 {date}</span>
        </div>

        {post.image && (
          <img src={post.image} alt={post.title} className="post-image" />
        )}

        <div className="post-content">
          {post.content?.split('\n').map((paragraph, i) =>
            paragraph.trim() ? <p key={i}>{paragraph}</p> : <br key={i} />
          )}
        </div>
      </article>
    </div>
  );
};

export default Post;