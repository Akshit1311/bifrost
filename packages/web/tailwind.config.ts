import { Pixelify_Sans } from "next/font/google";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        publicSans: ["var(--font-publicSans)", ...fontFamily.sans],
        pixelifySans: ["var(--font-pixelifySans)", ...fontFamily.sans],
      },

      colors: {
        main: "var(--main)",
        overlay: "var(--overlay)",
        bg: "var(--bg)",
        bw: "var(--bw)",
        blank: "var(--blank)",
        text: "var(--text)",
        mtext: "var(--mtext)",
        border: "var(--border)",
        ring: "var(--ring)",
        ringOffset: "var(--ring-offset)",

        secondaryBlack: "#212121",
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        shadow: "var(--shadow)",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      fontWeight: {
        base: "500",
        heading: "700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
