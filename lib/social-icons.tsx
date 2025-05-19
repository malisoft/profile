import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

export function getSocialIcon(platform: string) {
  const iconProps = { className: "h-5 w-5" };
  
  switch (platform.toLowerCase()) {
    case "twitter":
      return <Twitter {...iconProps} />;
    case "facebook":
      return <Facebook {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    case "youtube":
      return <Youtube {...iconProps} />;
    case "website":
      return <Globe {...iconProps} />;
    default:
      return <Globe {...iconProps} />;
  }
}
