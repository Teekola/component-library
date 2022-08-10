import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "styles/resets.css";
import "styles/text.css";

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider defaultTheme="light">
         <Component {...pageProps} />
      </ThemeProvider>
   );
}
