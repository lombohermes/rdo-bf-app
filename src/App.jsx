import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

/* ============================================================
   1. HEADER
   ============================================================ */
const Header = ({ page, setPage }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'opportunities', label: t('nav.opportunities') },
    { id: 'pricing', label: t('nav.pricing') },
    { id: 'events', label: t('nav.events') },
    { id: 'members', label: t('nav.members') },
    { id: 'partners', label: t('nav.partners') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setPage('home')}>
        <span className="logo-icon">RDO</span>
        <span className="logo-text">-BF</span>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

      <ul className={menuOpen ? 'open' : ''}>
        {menuItems.map(item => (
          <li
            key={item.id}
            className={page === item.id ? 'active' : ''}
            onClick={() => { setPage(item.id); setMenuOpen(false); }}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <button className="btn-join" onClick={() => setPage('register')}>
        {t('nav.join')}
      </button>

      <div className="lang-selector">
        <select value={i18n.language} onChange={changeLanguage}>
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
    </nav>
  );
};

/* ============================================================
   2. HERO CAROUSEL
   ============================================================ */
const HeroCarousel = ({ setPage }) => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 'vision',
      image: '/images/vision.jpg',
      fallback: 'linear-gradient(135deg, #007A33 0%, #004d20 100%)',
      badge: t('hero.vision_badge'),
      title: t('hero.vision_title'),
      subtitle: t('hero.vision_desc'),
      cta: t('hero.vision_cta'),
      action: 'about'
    },
    {
      id: 'mission',
      image: '/images/mission.jpg',
      fallback: 'linear-gradient(135deg, #C8102E 0%, #8B0000 100%)',
      badge: t('hero.mission_badge'),
      title: t('hero.mission_title'),
      subtitle: t('hero.mission_desc'),
      cta: t('hero.mission_cta'),
      action: 'about'
    },
    {
      id: 'event',
      image: '/images/event.jpg',
      fallback: 'linear-gradient(135deg, #FFC72C 0%, #C8102E 100%)',
      badge: t('hero.event_badge'),
      title: t('hero.event_title'),
      subtitle: t('hero.event_desc'),
      cta: t('hero.event_cta'),
      action: 'events'
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div className="hero-carousel">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${slide.image}), ${slide.fallback}` }}
      >
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-slide" key={slide.id + current}>
        <div className="hero-badge">{slide.badge}</div>
        <h1 className="hero-title">{slide.title}</h1>
        <p className="hero-description">{slide.subtitle}</p>
        <button className="btn-primary btn-large" onClick={() => setPage(slide.action)}>
          {slide.cta}
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <button
        className="carousel-arrow left"
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
      >‹</button>
      <button
        className="carousel-arrow right"
        onClick={() => setCurrent((current + 1) % slides.length)}
      >›</button>
    </div>
  );
};

/* ============================================================
   3. AFFICHE PREMIER ÉVÉNEMENT
   ============================================================ */
const FirstEventBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="first-event-section">
      <div className="first-event-container">
        <div className="event-poster">
          <div className="poster-content">
            <div className="poster-badge">{t('firstEvent.badge')}</div>
            <div className="poster-logo">RDO-BF</div>
            <h2>{t('firstEvent.title')}</h2>
            <div className="poster-divider"></div>
            <p className="poster-date">{t('firstEvent.date')}</p>
            <p className="poster-location">{t('firstEvent.location')}</p>
            <p className="poster-time">{t('firstEvent.time')}</p>
            <div className="poster-divider"></div>
            <p className="poster-tagline">{t('firstEvent.tagline')}</p>
          </div>
        </div>

        <div className="event-info">
          <h2>{t('firstEvent.headline')}</h2>
          <p>{t('firstEvent.description')}</p>
          <ul className="event-highlights">
            <li>{t('firstEvent.highlight1')}</li>
            <li>{t('firstEvent.highlight2')}</li>
            <li>{t('firstEvent.highlight3')}</li>
            <li>{t('firstEvent.highlight4')}</li>
            <li>{t('firstEvent.highlight5')}</li>
          </ul>
          <button className="btn-primary btn-large">{t('firstEvent.cta')}</button>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   4. PAGE ACCUEIL
   ============================================================ */
const Home = ({ setPage }) => {
  const { t } = useTranslation();
  return (
    <>
      <HeroCarousel setPage={setPage} />
      <FirstEventBanner />

      <section className="container">
        <h2>{t('home.discover_title')}</h2>
        <div className="grid">
          <div className="card">
            <h3>🚀 {t('home.entrepreneurs')}</h3>
            <p>{t('home.entrepreneurs_desc')}</p>
          </div>
          <div className="card">
            <h3>💼 {t('home.investors')}</h3>
            <p>{t('home.investors_desc')}</p>
          </div>
          <div className="card">
            <h3>🤝 {t('home.professionals')}</h3>
            <p>{t('home.professionals_desc')}</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h3>{t('home.cta_title')}</h3>
        <button className="btn-primary btn-large" onClick={() => setPage('register')}>
          {t('home.cta_button')}
        </button>
      </section>
    </>
  );
};

/* ============================================================
   5. PAGE À PROPOS
   ============================================================ */
const About = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h2>{t('about.title')}</h2>
      <p className="lead">{t('about.lead')}</p>

      <div className="about-grid">
        <div className="about-card">
          <h3>{t('about.vision_title')}</h3>
          <p>{t('about.vision_text')}</p>
        </div>
        <div className="about-card">
          <h3>{t('about.mission_title')}</h3>
          <p>{t('about.mission_text')}</p>
        </div>
        <div className="about-card">
          <h3>{t('about.objectives_title')}</h3>
          <ul>
            <li>{t('about.objective1')}</li>
            <li>{t('about.objective2')}</li>
            <li>{t('about.objective3')}</li>
            <li>{t('about.objective4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   6. PAGE OPPORTUNITÉS
   ============================================================ */
const Opportunities = () => {
  const { t } = useTranslation();

  const opportunities = [
    { icon: "💰", title: t('opportunities.funding'), desc: t('opportunities.funding_desc') },
    { icon: "🤝", title: t('opportunities.partnership'), desc: t('opportunities.partnership_desc') },
    { icon: "💼", title: t('opportunities.business'), desc: t('opportunities.business_desc') },
    { icon: "👥", title: t('opportunities.jobs'), desc: t('opportunities.jobs_desc') },
    { icon: "🏦", title: t('opportunities.finance'), desc: t('opportunities.finance_desc') },
    { icon: "🎓", title: t('opportunities.training'), desc: t('opportunities.training_desc') },
    { icon: "🌐", title: t('opportunities.networking'), desc: t('opportunities.networking_desc') },
    { icon: "🚀", title: t('opportunities.cofounders'), desc: t('opportunities.cofounders_desc') },
  ];

  return (
    <div className="container">
      <h2>{t('opportunities.title')}</h2>
      <p className="lead">{t('opportunities.lead')}</p>
      <div className="grid">
        {opportunities.map((o, i) => (
          <div key={i} className="card opportunity-card">
            <div className="opp-icon">{o.icon}</div>
            <h3>{o.title}</h3>
            <p>{o.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   7. PAGE MEMBRES
   ============================================================ */
const Members = () => {
  const { t } = useTranslation();

  const members = [
    { icon: "🚀", title: t('members.entrepreneurs'), desc: t('members.entrepreneurs_desc') },
    { icon: "💼", title: t('members.investors'), desc: t('members.investors_desc') },
    { icon: "🎓", title: t('members.professionals'), desc: t('members.professionals_desc') },
    { icon: "💡", title: t('members.project_holders'), desc: t('members.project_holders_desc') },
    { icon: "🏢", title: t('members.companies'), desc: t('members.companies_desc') },
    { icon: "🏛️", title: t('members.organizations'), desc: t('members.organizations_desc') },
  ];

  return (
    <div className="container">
      <h2>{t('members.title')}</h2>
      <p className="lead">{t('members.lead')}</p>
      <div className="grid">
        {members.map((m, i) => (
          <div key={i} className="card">
            <div className="opp-icon">{m.icon}</div>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   8. PAGE PARTENAIRES
   ============================================================ */
const Partners = () => {
  const { t } = useTranslation();

  const partners = [
    { logo: null, icon: "🏦", name: "Banque Atlantique", type: "Institution financière" },
    { logo: null, icon: "🏢", name: "Orange Burkina", type: "Télécommunications" },
    { logo: null, icon: "🌾", name: "SOFITEX", type: "Agro-industrie" },
    { logo: null, icon: "💼", name: "CCIA-BF", type: "Chambre de Commerce" },
    { logo: null, icon: "🎓", name: "Université de Ouaga", type: "Éducation" },
    { logo: null, icon: "⚡", name: "SONABEL", type: "Énergie" },
    { logo: null, icon: "🚀", name: "Startup Burkina", type: "Incubateur" },
    { logo: null, icon: "🏛️", name: "Ministère Économie", type: "Institution publique" },
    { logo: null, icon: "💎", name: "Chambre des Mines", type: "Industrie minière" },
    { logo: null, icon: "📡", name: "Telecel Faso", type: "Télécommunications" },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="container">
      <h2>{t('partners.title')}</h2>
      <p className="lead">{t('partners.lead')}</p>

      <div className="partners-carousel">
        <div className="partners-track">
          {duplicatedPartners.map((p, i) => (
            <div key={i} className="partner-card">
              <div className="partner-logo-box">
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="partner-logo-img" />
                ) : (
                  <div className="partner-icon">{p.icon}</div>
                )}
              </div>
              <h4>{p.name}</h4>
              <p>{p.type}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section" style={{ marginTop: '60px' }}>
        <h3>{t('partners.cta_title')}</h3>
        <p style={{ color: '#fff', marginBottom: '20px', opacity: 0.9 }}>
          {t('partners.cta_desc')}
        </p>
        <button className="btn-primary btn-large">{t('partners.cta_button')}</button>
      </div>
    </div>
  );
};

/* ============================================================
   9. PAGE CONTACT
   ============================================================ */
const Contact = () => {
  const { t } = useTranslation();

  const contactInfos = [
    { icon: "📍", title: t('contact.address_title'), lines: [t('contact.address_line1'), t('contact.address_line2')] },
    { icon: "📞", title: t('contact.phone_title'), lines: ["+226 XX XX XX XX", "+226 XX XX XX XX"] },
    { icon: "💬", title: t('contact.whatsapp_title'), lines: ["+226 XX XX XX XX", t('contact.whatsapp_hours')] },
    { icon: "✉️", title: t('contact.email_title'), lines: ["contact@rdo-bf.com", "info@rdo-bf.com"] },
  ];

  return (
    <div className="container">
      <h2>{t('contact.title')}</h2>
      <p className="lead">{t('contact.lead')}</p>

      <div className="contact-cards">
        {contactInfos.map((info, i) => (
          <div key={i} className="contact-card">
            <div className="contact-card-icon">{info.icon}</div>
            <h4>{info.title}</h4>
            {info.lines.map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="contact-bottom-grid">
        <form className="contact-form-box" onSubmit={(e) => { e.preventDefault(); alert('OK !'); }}>
          <h3>{t('contact.form_title')}</h3>
          <div className="form-row">
            <input type="text" placeholder={t('contact.form_name')} required />
            <input type="email" placeholder={t('contact.form_email')} required />
          </div>
          <input type="text" placeholder={t('contact.form_subject')} required />
          <textarea placeholder={t('contact.form_message')} rows="5" required></textarea>
          <button type="submit" className="btn-primary">{t('contact.form_button')}</button>
        </form>

        <div className="contact-social-box">
          <h3>{t('contact.social_title')}</h3>
          <p>{t('contact.social_desc')}</p>
          <div className="social-icons-vertical">
            <a href="#" className="social-link">📘 Facebook</a>
            <a href="#" className="social-link">💼 LinkedIn</a>
            <a href="#" className="social-link">📸 Instagram</a>
            <a href="#" className="social-link">🎵 TikTok</a>
            <a href="#" className="social-link">𝕏 Twitter / X</a>
            <a href="#" className="social-link">▶️ YouTube</a>
            <a href="#" className="social-link">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   10. PAGE INSCRIPTION
   ============================================================ */
const Register = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState('entrepreneur');

  return (
    <div className="container">
      <h2>{t('register.title')}</h2>
      <form onSubmit={(e) => { e.preventDefault(); alert('OK !'); }}>
        <label>{t('register.label_role')}</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="entrepreneur">{t('register.role_entrepreneur')}</option>
          <option value="investisseur">{t('register.role_investor')}</option>
          <option value="professionnel">{t('register.role_professional')}</option>
          <option value="porteur">{t('register.role_project')}</option>
        </select>
        <input type="text" placeholder={t('register.name')} required />
        <input type="email" placeholder={t('register.email')} required />
        <input type="password" placeholder={t('register.password')} required />
        {role === 'entrepreneur' && (
          <div className="upload-section">
            <label>{t('register.upload_bp')}</label>
            <input type="file" accept=".pdf" />
            <p><i>{t('register.upload_note')}</i></p>
          </div>
        )}
        <button type="submit" className="btn-primary">{t('register.submit')}</button>
      </form>
    </div>
  );
};

/* ============================================================
   11. PAGE ÉVÉNEMENTS
   ============================================================ */
const Events = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h2>{t('events.title')}</h2>
      <div className="event-card">
        <h3>{t('events.card_title')}</h3>
        <p><strong>{t('events.date_label')}</strong> {t('events.date_value')}</p>
        <p><strong>{t('events.location_label')}</strong> {t('events.location_value')}</p>
        <p><strong>{t('events.price_label')}</strong> {t('events.price_value')}</p>
        <button className="btn-primary">{t('events.buy_ticket')}</button>
      </div>
    </div>
  );
};

/* ============================================================
   12. PAGE TARIFS
   ============================================================ */
const Pricing = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h2>{t('pricing.title')}</h2>
      <div className="pricing-grid">
        <div className="plan">
          <h3>{t('pricing.free')}</h3>
          <p className="price">{t('pricing.free_price')}</p>
          <ul>
            <li>{t('pricing.free_f1')}</li>
            <li>{t('pricing.free_f2')}</li>
            <li>{t('pricing.free_f3')}</li>
          </ul>
          <button className="btn-primary">{t('pricing.free_btn')}</button>
        </div>
        <div className="plan premium">
          <h3>{t('pricing.standard')}</h3>
          <p className="price">{t('pricing.standard_price')}</p>
          <ul>
            <li>{t('pricing.standard_f1')}</li>
            <li>{t('pricing.standard_f2')}</li>
            <li>{t('pricing.standard_f3')}</li>
          </ul>
          <button className="btn-primary">{t('pricing.standard_btn')}</button>
        </div>
        <div className="plan vip">
          <h3>{t('pricing.prestige')}</h3>
          <p className="price">{t('pricing.prestige_price')}</p>
          <ul>
            <li>{t('pricing.prestige_f1')}</li>
            <li>{t('pricing.prestige_f2')}</li>
            <li>{t('pricing.prestige_f3')}</li>
            <li>{t('pricing.prestige_f4')}</li>
          </ul>
          <button className="btn-primary">{t('pricing.prestige_btn')}</button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   13. FOOTER
   ============================================================ */
const Footer = ({ setPage }) => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h4>{t('footer.about_title')}</h4>
          <ul className="footer-links">
            <li onClick={() => setPage('about')}>→ {t('footer.about_us')}</li>
            <li onClick={() => setPage('about')}>→ {t('footer.vision')}</li>
            <li onClick={() => setPage('about')}>→ {t('footer.mission')}</li>
            <li onClick={() => setPage('about')}>→ {t('footer.objectives')}</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t('footer.nav_title')}</h4>
          <ul className="footer-links">
            <li onClick={() => setPage('home')}>→ {t('nav.home')}</li>
            <li onClick={() => setPage('opportunities')}>→ {t('nav.opportunities')}</li>
            <li onClick={() => setPage('pricing')}>→ {t('nav.pricing')}</li>
            <li onClick={() => setPage('events')}>→ {t('nav.events')}</li>
            <li onClick={() => setPage('members')}>→ {t('nav.members')}</li>
            <li onClick={() => setPage('partners')}>→ {t('nav.partners')}</li>
            <li onClick={() => setPage('contact')}>→ {t('nav.contact')}</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t('footer.contact_title')}</h4>
          <ul className="footer-contact">
            <li>📞 +226 XX XX XX XX</li>
            <li>💬 WhatsApp : +226 XX XX XX XX</li>
            <li>📍 Ouagadougou, Burkina Faso</li>
            <li>✉️ contact@rdo-bf.com</li>
          </ul>
          <h4 style={{ marginTop: '20px' }}>{t('footer.follow_us')}</h4>
          <div className="social-icons">
            <a href="#" className="social-btn" title="Facebook">📘</a>
            <a href="#" className="social-btn" title="LinkedIn">💼</a>
            <a href="#" className="social-btn" title="Instagram">📸</a>
            <a href="#" className="social-btn" title="TikTok">🎵</a>
            <a href="#" className="social-btn" title="X">𝕏</a>
            <a href="#" className="social-btn" title="YouTube">▶️</a>
            <a href="#" className="social-btn" title="WhatsApp">💬</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>{t('footer.info_title')}</h4>
          <ul className="footer-links">
            <li>→ {t('footer.terms')}</li>
            <li>→ {t('footer.privacy')}</li>
            <li>→ {t('footer.legal')}</li>
            <li>→ {t('footer.faq')}</li>
          </ul>
          <h4 style={{ marginTop: '20px' }}>{t('footer.newsletter')}</h4>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Merci !'); }}>
            <input type="email" placeholder={t('footer.newsletter_placeholder')} required />
            <button type="submit">{t('footer.newsletter_btn')}</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

/* ============================================================
   14. APP PRINCIPALE
   ============================================================ */
function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App">
      <Header page={page} setPage={setPage} />
      <main className="main-content">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'about' && <About />}
        {page === 'opportunities' && <Opportunities />}
        {page === 'pricing' && <Pricing />}
        {page === 'events' && <Events />}
        {page === 'members' && <Members />}
        {page === 'partners' && <Partners />}
        {page === 'contact' && <Contact />}
        {page === 'register' && <Register />}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}

export default App;