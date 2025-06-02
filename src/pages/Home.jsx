import HeroBanner from "../components/HeroBanner";
import UnderSlider from "../components/UnderSlider";
import PromoProject from "../components/PromoProject";
import InvolveSection from "../components/InvolveSection";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <HeroBanner></HeroBanner>
      <UnderSlider />
      <PromoProject />
      <InvolveSection />
      <Newsletter />
    </>
  );
};

export default Home;
