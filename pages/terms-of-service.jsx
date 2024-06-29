import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer"; 
import { TermsOfService } from "@/components/legal/terms-of-service";
import Head from "next/head";

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>
          Terms of Service | Assistant Marketer
        </title>
      </Head>
      <div key="1" className="bg-white">
        <Navbar />
        <TermsOfService />
        <Footer />
      </div>
    </>
  );
}
