import Footer from '@/layouts/Footer';
import Banner from './Banner';
import Catalog from './Catalog';

const HomePages = () => {
  return (
    <div>
      <Banner></Banner>
      <Catalog></Catalog>
      <Footer />
    </div>
  );
};

export default HomePages;
