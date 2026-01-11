export interface SocialNetwork {
  key: string;
  name: string;
  icon: string;
  brand_color: string;
  url: string;
}

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    key: "facebook",
    name: "Facebook",
    icon: "i-simple-icons-facebook",
    brand_color: "#1877F2",
    url: "https://www.facebook.com/",
  },
  {
    key: "instagram",
    name: "Instagram",
    icon: "i-simple-icons-instagram",
    brand_color: "#E4405F",
    url: "https://www.instagram.com/",
  },
  {
    key: "twitter",
    name: "X (Twitter)",
    icon: "i-simple-icons-twitter",
    brand_color: "#1DA1F2",
    url: "https://twitter.com/",
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: "i-simple-icons-tiktok",
    brand_color: "#000000",
    url: "https://www.tiktok.com/@",
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: "i-simple-icons-youtube",
    brand_color: "#FF0000",
    url: "https://www.youtube.com/",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    icon: "i-simple-icons-linkedin",
    brand_color: "#0A66C2",
    url: "https://www.linkedin.com/",
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    icon: "i-simple-icons-whatsapp",
    brand_color: "#25D366",
    url: "https://wa.me/",
  },
  {
    key: "telegram",
    name: "Telegram",
    icon: "i-simple-icons-telegram",
    brand_color: "#229ED9",
    url: "https://t.me/",
  },
  {
    key: "pinterest",
    name: "Pinterest",
    icon: "i-simple-icons-pinterest",
    brand_color: "#E60023",
    url: "https://www.pinterest.com/",
  },
  {
    key: "custom",
    name: "Personalizado",
    icon: "i-lucide-link",
    brand_color: "#000000",
    url: "https://www.custom.com/",
  },
];
