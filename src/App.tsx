import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Анимация при скролле — Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ============================================
          ХЕДЕР — Fixed, blur, минимализм
          ============================================ */}
      <header className="header">
        {/* Логотип */}
        <div className="flex items-center gap-3">
          <span className="logo-text">ЛВ</span>
          {/* Подпись появляется только на десктопе */}
          <span className="logo-subtitle hidden xl:block">Бьюти-студия</span>
        </div>

        {/* Кнопка «Записаться» — десктоп */}
        <button className="btn-header btn-header-desktop">Записаться</button>

        {/* Бургер — мобильная версия */}
        <button
          className="burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* ============================================
          МОБИЛЬНОЕ МЕНЮ — Полноэкранное
          ============================================ */}
      <nav className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        {/* Крестик закрытия */}
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Закрыть меню"
        ></button>

        {/* Навигация */}
        <a href="#about" onClick={() => setMenuOpen(false)}>О студии</a>
        <a href="#gallery" onClick={() => setMenuOpen(false)}>Галерея</a>
        <a href="#contacts" onClick={() => setMenuOpen(false)}>Контакты</a>
      </nav>

      {/* ============================================
          HERO СЕКЦИЯ — 100vh, фото-плейсхолдер
          ============================================ */}
      <section className="hero">
        {/* Градиент поверх фона */}
        <div className="hero-overlay"></div>

        {/* Бейдж скидки — правый верхний угол */}
        <div className="discount-badge">−20%</div>

        {/* Центральный контент */}
        <div className="hero-content">
          <p className="hero-location">БЦ O2 • БАРНАУЛ</p>
          <h1 className="hero-title">#ЗДЕСЬ ТВОРЯТ<br />КРАСОТУ</h1>
        </div>

        {/* Скролл-индикатор — стрелка вниз */}
        <div className="scroll-indicator">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3L10 17M10 17L4 11M10 17L16 11"
              stroke="rgba(250, 250, 248, 0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ============================================
          СЕКЦИЯ О СТУДИИ — Тёмный фон, две колонки
          ============================================ */}
      <section id="about" className="about-section">
        <div className="about-grid reveal">
          {/* Левая колонка — фото */}
          <div className="about-photos">
            <div className="about-photo photo-placeholder">[ФОТО мастера]</div>
            <div className="about-photo photo-placeholder">[ФОТО интерьера]</div>
          </div>

          {/* Правая колонка — текст */}
          <div>
            <p className="about-label">О студии</p>
            <h2 className="about-title">Концептуальная<br />бьюти-студия</h2>
            <p className="about-text">
              Мы расположены в премиальном бизнес-центре O2 на улице Партизанской.
              Профессионализм мастеров сочетается с эстетикой окружения
              и вниманием к каждой детали.
            </p>
            <p className="about-text">
              Пока вы ожидаете процедуру, наслаждайтесь кофе из кофемашины De'Longhi.
              Мы создали атмосферу, в которую хочется возвращаться.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          СЕКЦИЯ ГАЛЕРЕЯ — Masonry с разноразмерными фото
          ============================================ */}
      <section id="gallery" className="services-section">
        <div className="reveal gallery-header">
          <p className="services-label">Атмосфера</p>
          <h2 className="services-title">Эстетика пространства<br />и результаты работ</h2>
        </div>

        <div className="gallery-masonry reveal">
          <div className="gallery-item gallery-item-tall photo-placeholder">[ФОТО мастера за работой]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[ФОТО интерьера]</div>
          <div className="gallery-item gallery-item-wide photo-placeholder">[ФОТО маникюра]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[ФОТО деталей]</div>
          <div className="gallery-item gallery-item-tall photo-placeholder">[ФОТО укладки]</div>
          <div className="gallery-item gallery-item-wide photo-placeholder">[ФОТО ресепшн]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[ФОТО бровей]</div>
          <div className="gallery-item gallery-item-tall photo-placeholder">[ФОТО процесса]</div>
        </div>
      </section>

      {/* ============================================
          СЕКЦИЯ КОНТАКТЫ — Тёмный фон
          ============================================ */}
      <section id="contacts" className="contacts-section">
        <div className="reveal">
          <p className="contacts-label">Контакты</p>
          <h2 className="contacts-title">Как нас найти</h2>
        </div>

        <div className="contacts-grid reveal">
          <div>
            <p className="contact-item-label">Адрес</p>
            <p className="contact-item-value">
              г. Барнаул, ул. Партизанская<br />
              БЦ O2, 2 этаж
            </p>
          </div>
          <div>
            <p className="contact-item-label">Телефон</p>
            <p className="contact-item-value">
              <a href="tel:+73832000000">+7 (383) 200-00-00</a>
            </p>
          </div>
          <div>
            <p className="contact-item-label">Время работы</p>
            <p className="contact-item-value">
              Пн — Сб: 10:00 — 21:00<br />
              Вс: 11:00 — 19:00
            </p>
          </div>
          <div>
            <p className="contact-item-label">Соцсети</p>
            <p className="contact-item-value">
              <a href="#">VK</a><br />
              <a href="#">Telegram</a>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          ФУТЕР
          ============================================ */}
      <footer className="footer">
        <p className="footer-text">© 2026 БЬЮТИ-СТУДИЯ. БАРНАУЛ</p>
      </footer>
    </>
  );
}
