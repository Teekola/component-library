import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import GlobalStyle from "styles/globalStyle";

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <GlobalStyle />
         <ThemeProvider defaultTheme="light">
            <Component {...pageProps} />
         </ThemeProvider>
      </>
   );
}
