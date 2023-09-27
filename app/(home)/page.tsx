import Hero from '@/components/home/hero';
import FooterFull from '@/components/shared/footer/footer-full';
import NavbarFull from '@/components/shared/navbar/navbar-full';

const HomePage = () => {
  return (
    <>
      <NavbarFull />
      <main>
        <Hero />
      </main>
      <FooterFull />
    </>
  );
};

export default HomePage;
