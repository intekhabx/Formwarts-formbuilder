
"use client"

import { useEffect } from "react";
import CTA from "~/components/Home/Cta";
import Features from "~/components/Home/Features";
import Footer from "~/components/Home/Footer";
import FormPreview from "~/components/Home/FormPreview";
import Hero from "~/components/Home/Hero";
import Marquee from "~/components/Home/Marquee";
import Navbar from "~/components/Home/Navbar";
import Pricing from "~/components/Home/Pricing";
import StarsBackground from "~/components/Home/StarsBackground";
import Steps from "~/components/Home/Steps";
import Testimonials from "~/components/Home/Testimonials";
import Themes from "~/components/Home/Themes";
import { useUser } from "~/hooks/api/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    if(user && user.id){
      router.replace('/dashboard');
    }
    // else{
    //   router.replace('/login');
    // }
  }, [user, router])
  

  return (
    <main className="noise relative min-h-screen bg-[#0a0600] text-[#e8d5a3]">
      <StarsBackground />
      <Navbar />
      <Hero />
      <Marquee />
      <FormPreview />
      <Features />
      <Themes />
      <Steps />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />

    </main>
  );
}
