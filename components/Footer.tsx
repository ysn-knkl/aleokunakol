import React from 'react';

const Footer: React.FC = () => (
  <footer className="mt-20">
    <div className="h-72 w-full overflow-hidden">
      <iframe /* map aynı */ />
    </div>

    <div className="bg-surface-50 border-t border-brand-300/30">
      <div className="container-x grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h4 className="text-text-primary text-lg font-semibold">QRI Reflex Therapie</h4>
          <p className="text-text-secondary mt-3">Refleks entegrasyonu ve düzenleyici terapi yaklaşımları.</p>
        </div>
        <div>
          <h5 className="text-text-primary font-semibold">İletişim</h5>
          <ul className="mt-3 space-y-1 text-text-secondary">
            <li>Argentinierstraße 18/3, 1040 Wien</li>
            <li>info@qri-therapie.at</li>
            <li>+43 660 1234567</li>
          </ul>
        </div>
        <div>
          <h5 className="text-text-primary font-semibold">Hızlı Bağlantılar</h5>
          <ul className="mt-3 space-y-1">
            <li><a href="#about" className="nav-link">Über Mich</a></li>
            <li><a href="#services" className="nav-link">Hizmetler</a></li>
            <li><a href="#contact" className="nav-link">Randevu</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-300/30">
        <div className="container-x flex flex-col md:flex-row items-center justify-between py-5">
          <p className="text-text-muted text-sm">© {new Date().getFullYear()} QRI Reflex Therapie.</p>
          <p className="text-text-muted text-sm">Vienna, Austria</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
