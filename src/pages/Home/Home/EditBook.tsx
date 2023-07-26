import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  useEditBookMutation,
  useSingleProductQuery,
} from '@/redux/feature/product/productApi';

const EditBook = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data: product, isLoading, error } = useSingleProductQuery(id);
  const [editBook] = useEditBookMutation();

  console.log(isLoading, error);

  const { user } = useAppSelector((state) => state.user);

  const { register, handleSubmit } = useForm<IProduct>();

  console.log(product);

  const handleAddBook = (data: IProduct) => {
    const priceAsNumber = Number(data.price);
    const addBook = {
      email: user?.email,
      title: data.title,
      author: data.author,
      image: data.image,
      publicationDate: product?.publicationDate,
      genre: data.genre,
      price: priceAsNumber,
    };

    editBook({ id, data: addBook })
      .unwrap()
      .then(() => {
        toast({
          description: 'Book details updated successfully!',
        });
        navigate(`/products`);
      })
      .catch((error) => {
        console.error('Error updating book details:', error);
        toast({
          description: 'Failed to update book details. Please try again later.',
        });
      });
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <div className="my-2 justify-center items-center">
          <div className="card shadow-2xl p-8">
            <form onSubmit={handleSubmit(handleAddBook)}>
              <div className="grid grid-cols-2 gap-6">
                <Input
                  id="title"
                  type="text"
                  defaultValue={product?.title}
                  {...register('title')}
                />

                <Input
                  id="title"
                  type="email"
                  placeholder={user?.email ? user.email : ''}
                  readOnly
                />
                <Input
                  id="author"
                  type="text"
                  defaultValue={product?.author}
                  {...register('author')}
                />

                <Input
                  id="price"
                  type="text"
                  defaultValue={product?.price}
                  {...register('price')}
                />

                <Input
                  id="image"
                  type="text"
                  defaultValue={product?.image}
                  {...register('image')}
                />
              </div>

              <div className="mt-4 justify-center text-center">
                <Button>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
