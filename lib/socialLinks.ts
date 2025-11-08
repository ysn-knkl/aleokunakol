import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";

export type SocialLink = {
  key: "instagram" | "facebook" | "youtube";
  href: string;
  fallbackLabel: string;
  Icon: IconType;
  color: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "instagram",
    href: "https://www.instagram.com/ale.reflexintegration",
    fallbackLabel: "Instagram",
    Icon: FaInstagram,
    color: "#E4405F", // Instagram pembe-kırmızı
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/AleReflexIntegration",
    fallbackLabel: "Facebook",
    Icon: FaFacebook,
    color: "#1877F2", // Facebook mavi
  },
  {
    key: "youtube",
    href: "https://www.youtube.com/@beholistic3017",
    fallbackLabel: "YouTube",
    Icon: FaYoutube,
    color: "#FF0000", // YouTube kırmızı
  },
];