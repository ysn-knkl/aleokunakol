const Hero: React.FC = () => (
  <section
    id="hero"
    className="relative flex h-screen items-center justify-center"
  >
    <div
      className="absolute inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/ale-dashboard.jpg')" }}
    />
    {/* alttan hafif beyaz → okunabilirlik */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-700/35 via-white/0 to-white/70" />
    <div className="container-x text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-text-primary drop-shadow-sm">
        Çocuklar için güçlü bir başlangıç
      </h1>
      <p className="lead mt-4">
        QRI, refleks entegrasyonu ve duyusal düzenleme ile daha sakin bir beden
        ve zihin.
      </p>
      <a href="#contact" className="btn-primary mt-8">
        Randevu Al
      </a>
    </div>
  </section>
);

export default Hero;
