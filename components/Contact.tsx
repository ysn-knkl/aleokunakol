import React from 'react';
import dynamic from 'next/dynamic';
import ClientOnly from './common/ClientOnly';

const DisqusThread = dynamic(() => import('./DisqusThread'), { ssr: false });

const Contact: React.FC = () => (
  <section id="contact" className="section">
    <div className="container-x">
      <h2 className="title">İletişim & Randevu</h2>

      <div className="card mx-auto mt-8 max-w-4xl p-2">
        <iframe
          src="https://calendly.com/YOUR_USERNAME"
          className="h-[640px] w-full rounded-xl"
          title="Calendly"
        />
      </div>

      <div className="card mx-auto mt-10 max-w-4xl p-6">
        <h3 className="text-text-primary text-xl font-semibold mb-4">Yorumlar</h3>
        <DisqusThread />
      </div>
    </div>
  </section>
);


export default Contact;