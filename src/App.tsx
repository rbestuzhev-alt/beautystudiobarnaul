import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
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

  // Блокировка скролла при открытом меню.
  // Компенсация подёргивания решена через scrollbar-gutter: stable в CSS
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Блокировка скролла при открытой политике
  useEffect(() => {
    if (privacyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [privacyOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPrivacyOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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

        {/* Кнопка-пилюля + бургер */}
        <div className="header-actions">
          <button className="btn-pill">Записаться</button>

          <a href="#contacts" className="btn-phone" aria-label="Позвонить">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>

          <button
            className="burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
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
        >
          &times;
        </button>

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
              Наслаждайтесь кофе из кофемашины De'Longhi, ожидая процедуру у наших мастеров.
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
          <div className="gallery-item gallery-item-tall photo-placeholder">[Руки мастера в работе]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[Маникюр крупным планом]</div>
          <div className="gallery-item gallery-item-wide photo-placeholder">[Интерьер O2]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[Кофе-зона]</div>
          <div className="gallery-item gallery-item-tall photo-placeholder">[Оформление бровей]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[Процесс наращивания]</div>
          <div className="gallery-item gallery-item-wide photo-placeholder">[Ресепшн]</div>
          <div className="gallery-item gallery-item-tall photo-placeholder">[Детали укладки]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[Растения в студии]</div>
          <div className="gallery-item gallery-item-wide photo-placeholder">[Рабочее место мастера]</div>
          <div className="gallery-item gallery-item-tall photo-placeholder">[Педикюр результат]</div>
          <div className="gallery-item gallery-item-square photo-placeholder">[Полка с косметикой]</div>
          <div className="gallery-item gallery-item-wide photo-placeholder">[Зеркальная зона]</div>
          <div className="gallery-item gallery-item-tall photo-placeholder">[Портрет клиента]</div>
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

        <div className="contacts-layout reveal">
          <div className="contacts-info">
            <div className="contact-block">
              <p className="contact-item-label">Адрес</p>
              <p className="contact-item-value">
                г. Барнаул, ул. Партизанская<br />
                БЦ O2, 2 этаж
              </p>
            </div>

            <div className="contacts-actions">
              <p className="contact-item-label">Связаться</p>
              <a href="tel:+73832000000" className="btn-pill-light">+7 (383) 200-00-00</a>
              <div className="socials-row">
                <a href="#" className="btn-pill-outline">Telegram</a>
                <a href="#" className="btn-pill-outline">ВКонтакте</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          ФУТЕР
          ============================================ */}
      <footer className="footer-light">
        <div className="footer-logo-wrap">
          <span className="footer-logo">ЛВ</span>
          <span className="footer-logo-sub">Бьюти-студия</span>
        </div>
        <p className="footer-legal">© 2026 ЛВ Бьюти-студия. Барнаул</p>
        <p className="footer-legal privacy-trigger">
          Нажимая кнопку записи, вы соглашаетесь с{' '}
          <button className="privacy-link" onClick={() => setPrivacyOpen(true)}>
            политикой конфиденциальности
          </button>
        </p>
        <p className="footer-legal">Все права защищены</p>
      </footer>

      {/* МОДАЛЬНОЕ ОКНО ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ */}
      {privacyOpen && (
        <div className="privacy-modal" onClick={() => setPrivacyOpen(false)}>
          <div className="privacy-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="privacy-modal__close" onClick={() => setPrivacyOpen(false)}>&times;</button>
            <h2 className="privacy-modal__title"><em>политика</em> конфиденциальности</h2>
            <div className="privacy-modal__text">
              <p className="privacy-item"><strong>01 — Сбор данных.</strong> Мы собираем только ваше имя и номер телефона, необходимые для записи на услуги студии.</p>
              <p className="privacy-item"><strong>02 — Цель обработки.</strong> Данные используются исключительно для подтверждения визита, создания карточки клиента и напоминаний о записи.</p>
              <p className="privacy-item"><strong>03 — Интеграция с Dikidi.</strong> Для автоматизации процесса онлайн-записи мы используем защищенный сервис Dikidi. Ваши данные передаются в этот сервис только в минимально необходимом объеме и защищены его политиками безопасности.</p>
              <p className="privacy-item"><strong>04 — Защита информации.</strong> Мы не передаем ваши персональные данные третьим лицам, не связанным с непосредственным оказанием услуг нашей студии.</p>
              <p className="privacy-item"><strong>05 — Ваши права.</strong> Вы можете в любой момент отозвать согласие на обработку персональных данных, обратившись к администратору студии или через мессенджеры, указанные на сайте.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
