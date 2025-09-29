import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/436605733620" // numaranızı buraya girin (ülke koduyla)
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition"
            aria-label="WhatsApp"
        >
            <FaWhatsapp className="text-3xl" />
        </a>
    );
}