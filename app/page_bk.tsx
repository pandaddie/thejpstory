import InvitationEnvelope from "@/components/InvitationEnvelope";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Traditional from "@/components/Traditional";
import Registry from "@/components/Registry";
import RSVP from "@/components/RSVP";
import Accommodation from "@/components/Accommodation";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <InvitationEnvelope />

      <Navbar />

      <main>
        <Hero />
        <Story />
        <Traditional />
        <Registry />
        <RSVP />
        <Accommodation />
        <FAQs />
      </main>

      <Footer />
    </>
  );
}
