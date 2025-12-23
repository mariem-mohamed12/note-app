import HeroSection from "@/components/herosection/herosection";
import MyNotes from "@/components/mynotes/mynotes";

export default function Note() {
  return (
    <main className="bg-[#ECF4FE]">
      <HeroSection />
      <section className="bg-white py-16">
        <MyNotes />
      </section>
    </main>
  );
}
