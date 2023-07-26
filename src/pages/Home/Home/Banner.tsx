import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.png';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const viewBooks = () => {
    navigate('/products');
  };
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">HALAL BOOK</h1>
          <p className="text-secondary font-semibold text-xl">
            প্যারাডক্সিক্যাল সাজিদ
          </p>
          <div className="text-primary mt-8">
            <p className="text-xl">
              Discover a world of imagination at our enchanting book store!{' '}
              <br />
              Unleash your passion for reading as you explore captivating tales
              and literary wonders
            </p>
          </div>
          <Button onClick={viewBooks} className="mt-5">
            View Books
          </Button>
        </div>
        <div className="relative -right-14">
          <img src={banner} alt="" />
        </div>
      </div>
    </>
  );
};

export default Banner;
