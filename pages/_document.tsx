import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
   render() {
      return (
         <Html lang="fi">
            <Head>
               <link
                  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,400;0,700;0,900;1,200;1,400;1,700;1,900&display=swap"
                  rel="stylesheet"
               />
               <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
