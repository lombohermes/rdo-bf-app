import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPosts } from './firebase';
import './Gallery.css';

/* ============================================================
   1. GALERIE PHOTOS
   ============================================================ */
export const PhotoGallery = () => {
  const { t } = useTranslation();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 📸 POUR AJOUTER VOS PHOTOS :
  // 1. Placez vos images dans public/images/galerie/
  // 2. Ajoutez une ligne dans ce tableau
  const photos = [
    { src: '/images/galerie/photo1.jpg', alt: 'Lancement RDO-BF' },
    { src: '/images/galerie/photo2.jpg', alt: 'Dîner d\'affaires' },
    { src: '/images/galerie/photo3.jpg', alt: 'Networking' },
    { src: '/images/galerie/photo4.jpg', alt: 'Présentation de projet' },
    { src: '/images/galerie/photo5.jpg', alt: 'Conférence' },
    { src: '/images/galerie/photo6.jpg', alt: 'Atelier business plan' },
    { src: '/images/galerie/photo7.jpg', alt: 'Remise de prix' },
    { src: '/images/galerie/photo8.jpg', alt: 'Cocktail' },
  ];

  return (
    <section className="gallery-section">
      <div className="container">
        <h2>{t('gallery.photos_title')}</h2>
        <p className="lead">{t('gallery.photos_subtitle')}</p>

        <div className="photo-grid">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="photo-item"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div
                className="photo-thumb"
                style={{
                  backgroundImage: `url(${photo.src})`,
                  backgroundColor: ['#C8102E', '#007A33', '#FFC72C', '#004aad'][i % 4]
                }}
              >
                <span className="photo-overlay">🔍</span>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta">
          <button className="btn-primary btn-large">{t('gallery.view_all')}</button>
        </div>
      </div>

      {selectedPhoto && (
        <div className="lightbox" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
            ✕
          </button>
          <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
          <p className="lightbox-caption">{selectedPhoto.alt}</p>
        </div>
      )}
    </section>
  );
};

/* ============================================================
   2. GALERIE VIDÉOS YOUTUBE
   ============================================================ */
export const VideoGallery = () => {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);

  // 🎥 POUR AJOUTER VOS VIDÉOS :
  // Remplacez les IDs par vos vrais IDs YouTube
  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Lancement officiel du RDO-BF',
      description: 'Retour sur la soirée de lancement du réseau'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Interview d\'un entrepreneur financé',
      description: 'Awa raconte comment elle a trouvé son investisseur'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Dîner d\'Affaires - Highlights',
      description: 'Les meilleurs moments du premier dîner'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Atelier Business Plan',
      description: 'Formation intensive pour entrepreneurs'
    },
  ];

  return (
    <section className="video-section">
      <div className="container">
        <h2>{t('gallery.videos_title')}</h2>
        <p className="lead">{t('gallery.videos_subtitle')}</p>

        <div className="video-grid">
          {videos.map((video, i) => (
            <div
              key={i}
              className="video-card"
              onClick={() => setActiveVideo(video)}
            >
              <div className="video-thumb">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('no-thumbnail');
                  }}
                />
                <div className="video-play">▶</div>
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="video-modal" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setActiveVideo(null)}>
              ✕
            </button>
            <div className="video-iframe-container">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3>{activeVideo.title}</h3>
            <p>{activeVideo.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

/* ============================================================
   3. APERÇU DU BLOG (3 derniers articles)
   ============================================================ */
export const BlogPreview = ({ setPage, setSelectedPost }) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        const publishedPosts = data.filter(p => p.published !== false);
        setPosts(publishedPosts.slice(0, 3));
      } catch (err) {
        console.error('Erreur chargement articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleReadPost = (post) => {
    setSelectedPost(post);
    setPage('post');
  };

  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <section className="blog-preview-section">
      <div className="container">
        <h2>{t('blog.latest_title')}</h2>
        <p className="lead">{t('blog.latest_subtitle')}</p>

        {loading ? (
          <p className="lead">{t('blog.loading')}</p>
        ) : (
          <>
            <div className="blog-preview-grid">
              {posts.map(post => (
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

            <div className="blog-preview-cta">
              <button
                className="btn-primary btn-large"
                onClick={() => setPage('blog')}
              >
                {t('blog.view_all_posts')} →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};