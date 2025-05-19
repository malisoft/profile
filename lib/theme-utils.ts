import { Theme } from "@/types";

export function getThemeStyles(theme: Theme) {
  switch (theme) {
    case "gradient":
      return {
        container: {
          background: "linear-gradient(to bottom right, #4F46E5, #7C3AED)",
          color: "#FFFFFF",
        },
        header: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "1rem",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        },
        profileImage: {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
        name: {
          color: "#FFFFFF",
        },
        description: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        socialLink: {
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(5px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          color: "#FFFFFF",
        },
        shareButton: {
          color: "#FFFFFF",
          background: "rgba(255, 255, 255, 0.2)",
        },
      };
    case "dark":
      return {
        container: {
          background: "#121212",
          color: "#FFFFFF",
        },
        header: {
          padding: "1.5rem 0",
        },
        profileImage: {
          borderColor: "#2D2D2D",
        },
        name: {
          color: "#FFFFFF",
        },
        description: {
          color: "#A1A1AA",
        },
        socialLink: {
          background: "#1F1F1F",
          borderColor: "#2D2D2D",
          color: "#FFFFFF",
        },
        shareButton: {
          color: "#FFFFFF",
          background: "#2D2D2D",
        },
      };
    case "minimal":
    default:
      return {
        container: {},
        header: {
          padding: "1.5rem 0",
        },
        profileImage: {
          borderColor: "var(--border)",
        },
        name: {},
        description: {},
        socialLink: {
          background: "var(--background)",
          borderColor: "var(--border)",
        },
        shareButton: {},
      };
  }
}
