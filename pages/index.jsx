import { Navbar } from "@/components/homepage/navbar";
import { Hero } from "@/components/homepage/hero"; 
import { Feature } from "@/components/homepage/feature"; 
import { CTA } from "@/components/homepage/cta"; 
import { Testimonials } from "@/components/homepage/testimonials"; 
import { FAQ } from "@/components/homepage/faq"; 
import { Contact } from "@/components/homepage/contact"; 
import { Footer } from "@/components/homepage/footer"; 
import { Pricing } from "@/components/homepage/pricing"; 
import { Why } from "@/components/homepage/why"; 
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          Assistant Marketer | A marketing assistant for early-stage founders 🚀
        </title>
      </Head>
      <div key="1" className="bg-white">
        <Navbar />
        <Hero />
        <Feature />
        <CTA />
        <Testimonials />
        <Why />
        <Pricing />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
