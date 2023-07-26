import ProductCard from '@/components/ProductCard';
import { Slider } from '@/components/ui/slider';
import { useGetProductsQuery } from '@/redux/feature/product/productApi';
import { setPriceRange } from '@/redux/feature/product/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';

const Catalog = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log(data?.data);
  // const { toast } = useToast();
  console.log(error);

  if (isLoading) {
    <h2>spinner</h2>;
  }

  const { priceRange, status } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  let productsData;

  if (status) {
    productsData = data?.data?.filter(
      (item: { status: boolean; price: number }) =>
        item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = data?.data?.filter(
      (item: { price: number }) => item.price < priceRange
    );
  } else {
    productsData = data?.data;
  }
  console.log(productsData);

  return (
    <>
      <h2 className="font-bold text-center text-3xl mb-4">Book Catalog</h2>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
          <div className="space-y-3 ">
            <h1 className="text-2xl uppercase">Price Range</h1>
            <div className="max-w-xl">
              <Slider
                defaultValue={[150]}
                max={150}
                min={0}
                step={1}
                onValueChange={(value) => handleSlider(value)}
              />
            </div>
            <div>From 0$ To {priceRange}$</div>
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {data?.data?.map((product: IProduct) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalog;
