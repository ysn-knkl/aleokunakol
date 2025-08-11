import React from "react";
import Image from "next/image";

const Services: React.FC = () => (
  <section id="services" className="section bg-surface-100">
    <div className="container-x grid gap-10 md:grid-cols-2 items-center">
      <div>
        <h2 className="title">Refleks Entegrasyonu ile</h2>
        <ul className="mt-6 space-y-3 text-text-secondary text-lg">
          <li>• Davranışsal zorluklar azalır</li>
          <li>• Odaklanma ve öğrenme artar</li>
          <li>• Motor beceriler gelişir</li>
          <li>• Uyku düzeni desteklenir</li>
          <li>• Özgüven güçlenir</li>
        </ul>
      </div>
      <div className="relative h-72 md:h-[420px] rounded-xl2 overflow-hidden border border-brand-300/30 shadow-soft">
        <Image
          src="/services.jpg"
          alt="Refleks Terapisi"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  </section>
);

export default Services;
