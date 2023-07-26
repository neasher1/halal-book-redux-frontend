import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { addToCart } from '@/redux/feature/cart/cartSlice';
import {
  useDeleteBookMutation,
  useSingleProductQuery,
} from '@/redux/feature/product/productApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useSingleProductQuery(id, {
    pollingInterval: 3000,
  });
  const { user } = useAppSelector((state) => state.user);
  const [deleteBook] = useDeleteBookMutation();

  console.log(isLoading, error);
  console.log(product);

  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };

  const handleDelete = (id: string | undefined) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (shouldDelete) {
      deleteBook(id)
        .then(() => {
          toast({
            description: 'delete successfully',
          });
          navigate('/');
        })
        .catch((error) => {
          console.error('Error deleting book:', error);
        });
    }
  };

  const handleEdit = (id: string | undefined) => {
    navigate(`/edit-book/${id}`);
  };

  console.log(product);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {user?.email && (
          <div className="flex justify-between my-4">
            <Link to={`/edit-book/${id}`}>
              <Button onClick={() => handleEdit(id)}>Edit</Button>
            </Link>
            <Button onClick={() => handleDelete(id)} variant="destructive">
              Delete
            </Button>
          </div>
        )}
        <div className="flex max-w-7xl mx-auto items-center gap-8 border-b border-gray-300">
          <div className="w-[50%]">
            <img src={product?.image} alt="" />
          </div>
          <div className="w-[50%] space-y-3">
            <h1 className="text-3xl font-semibold">{product?.title}</h1>
            <p className="text-xl">Author: {product?.author}</p>
            <p className="text-xl">Genre: {product?.genre}</p>
            <p className="text-xl">
              Published Date: {product?.publicationDate}
            </p>
            <p className="text-xl">Price: ${product?.price}</p>
            <Button onClick={() => handleAddProduct(product)}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
