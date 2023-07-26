import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { usePostBookMutation } from '@/redux/feature/product/productApi';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const navigation = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const [postBook, { isLoading }] = usePostBookMutation();

  console.log(isLoading);

  const { register, handleSubmit } = useForm<IProduct>();

  const handleAddBook = (data: IProduct) => {
    const priceAsNumber = Number(data.price);
    const addBook = {
      email: user?.email,
      title: data.title,
      author: data.author,
      image: data.image,
      publicationDate: `${date}.${month}.${year}`,
      genre: data.genre,
      price: priceAsNumber,
    };

    console.log(addBook);

    postBook(addBook)
      .unwrap()
      .then((response) => {
        toast({
          description: 'Book details updated successfully!',
        });
        console.log('Book added successfully:', response.data);
        navigation('/products');
      })
      .catch((error) => {
        console.error('Error adding book:', error);
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
                  placeholder="Name of Book title"
                  {...register('title', { required: 'title is required' })}
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
                  placeholder="Name of book author"
                  {...register('author', {
                    required: 'Please provided book author',
                  })}
                />

                <Input
                  id="genre"
                  type="text"
                  placeholder="Name of book genre"
                  {...register('genre', {
                    required: 'Please provided book genre',
                  })}
                />

                <Input
                  id="price"
                  type="number"
                  placeholder="book price"
                  {...register('price', {
                    required: 'Please provided book price',
                  })}
                />

                <Input
                  id="genre"
                  type="text"
                  placeholder="Please provided book image url"
                  {...register('image', {
                    required: 'Please provided book image url',
                  })}
                />
              </div>

              <div className="mt-4 justify-center text-center">
                <Button>Publish Book</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
