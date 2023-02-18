import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      dir='ltr'
      lang='en'
      className='h-full antialiased text-gray-900 scroll-smooth'
    >
      <Head>
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        <meta charSet='utf-8' />
      </Head>
      <body className='min-h-screen h-full bg-gray-100 font-sans text-base font-normal tracking-normal'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
