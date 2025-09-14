// components/admin/AdminShell.tsx
import * as React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function AdminShell({ title = "Admin Panel", children }: Props) {
  return (
    <>
      <Head>
        <title>{title} | QRI Reflex</title>
        <meta name="robots" content="noindex" />
      </Head>

      {/* Üst navigasyon */}
      <Navbar />

      {/* İçerik: fixed navbar boşluğu */}
      <main className="pt-28 pb-16">
        {/* Üst başlık kartı */}
        <section className="container-x">
          <div className="rounded-2xl bg-gradient-to-r from-brand-50 to-surface-50 border border-brand-300/30 p-6 md:p-8 shadow-soft">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              {title}
            </h1>
            <p className="mt-3 text-text-secondary">
              Kullanıcı yönetimi ve egzersiz atama modülü.
            </p>
          </div>
        </section>

        {/* Sayfa özel içerik */}
        <section className="container-x mt-10">{children}</section>
      </main>

      {/* Alt bilgi */}
      <Footer showMaps={false} />
    </>
  );
}