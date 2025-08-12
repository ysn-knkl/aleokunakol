import { useEffect } from 'react';

declare global {
  interface Window {
    disqus_config?: () => void;
  }
}

const DisqusThread = () => {
  useEffect(() => {
    window.disqus_config = function () {
      // @ts-ignore
      this.page.url = window.location.href;
      // @ts-ignore
      this.page.identifier = window.location.pathname || 'qri-home';
    };

    const d = document;
    const s = d.createElement('script');
    s.src = `https://${process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}.disqus.com/embed.js`;
    s.setAttribute('data-timestamp', Date.now().toString());
    (d.head || d.body).appendChild(s);

    return () => {
      const thread = document.getElementById('disqus_thread');
      if (thread) thread.innerHTML = '';
    };
  }, []);

  return <div id="disqus_thread" />;
};

export default DisqusThread;
