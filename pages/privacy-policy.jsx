import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer"; 
import { PrivacyPolicy } from "@/components/legal/privacy-policy";
import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>
          Privacy Policy | Assistant Marketer 
        </title>
      </Head>
      <div key="1" className="bg-white">
        <Navbar />
        <PrivacyPolicy />
        <Footer />
      </div>
    </>
  );
}
