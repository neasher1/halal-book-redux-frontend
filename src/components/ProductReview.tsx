import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  useGetCommentQuery,
  usePostCommentMutation,
} from '@/redux/feature/product/productApi';
import { useAppSelector } from '@/redux/hook';
import { Link } from 'lucide-react';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const { data } = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const { user } = useAppSelector((state) => state.user);
  const [postComment, { isLoading, isError, isSuccess }] =
    usePostCommentMutation();

  console.log(isLoading, isError, isSuccess);

  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(inputValue);
    const options = {
      id: id,
      data: { comment: inputValue },
    };
    postComment(options);

    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        {user?.email ? (
          <Button type="submit">Add Review</Button>
        ) : (
          <Link to="/login">
            <Button variant="default">login to add cart</Button>
          </Link>
        )}
      </form>

      <div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
