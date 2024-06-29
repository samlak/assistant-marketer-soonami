import Head from 'next/head';
import { Toaster } from "@/components/ui/toaster";
import Providers from '@/lib/providers';

export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <meta
          name='description'
          content='A marketing assistant that helps you go from 0 to 10k users. The platform helps you drive your initial customer acquisition and promotion so that you can focus on your business.'
        />
        <link rel='canonical' href='https://assistantmarketer.com/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='A marketing assistant for early stage founders' />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property='og:description'
          content='A marketing assistant that helps you go from 0 to 10k users. The platform helps you drive your initial customer acquisition and promotion so that you can focus on your business.'
        />
        <meta property='og:image' content="./og_image.png" />
        <meta
          property='og:url'
          content='https://assistantmarketer.com/'
        />
        <meta property='og:site_name' content='Assistant Marketer' />
        <meta name='twitter:title' content='A marketing assistant for early stage founders' />
        <meta
          name='twitter:description'
          content='A marketing assistant that helps you go from 0 to 10k users. The platform helps you drive your initial customer acquisition and promotion so that you can focus on your business.'
        />
        <meta name='twitter:image' content='./og_image.png' />
        <meta name='twitter:site' content='@devsamlak' />
        <meta name='twitter:creator' content='@devsamlak' />
        <meta name='robots' content='index, follow' />
      </Head>
      <Providers>
        {children}
        <Toaster />
      </Providers>
    </>
  );
}
