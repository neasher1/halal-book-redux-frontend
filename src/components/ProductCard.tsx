import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addToCart } from '@/redux/feature/cart/cartSlice';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product._id}`} className="w-full">
          <img className="w-3/5" src={product?.image} alt="product" />
          <h1 className="text-xl font-semibold">{product?.title}</h1>
        </Link>
        <p>Author: {product?.author}</p>
        <p>Genre: {product?.genre}</p>
        <p>Publication Date: {product?.publicationDate}</p>
        <p className="text-sm">Price: ${product?.price}</p>
        {user?.email ? (
          <Button variant="default" onClick={() => handleAddProduct(product)}>
            Add to cart
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="default">login to add cart</Button>
          </Link>
        )}
      </div>
    </div>
  );
}