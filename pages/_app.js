import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/animate.css'
import '../styles/flaticon.css'
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import '../styles/common.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Barristar – Tailwind Css Lawyer and Attorney Next Js Template</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </div>

  )
}

export default MyApp
