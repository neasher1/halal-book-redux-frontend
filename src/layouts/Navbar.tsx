import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/Cart';
import logo from '../assets/images/halalBook-logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/feature/user/userSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProduct } from '@/types/globalTypes';
import { useGetProductsQuery } from '@/redux/feature/product/productApi';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { register, watch } = useForm();
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const { data: products } = useGetProductsQuery(undefined);
  const searchTerm = watch('search', '');
  console.log(products?.data);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  const handleToggleSearch = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  const handleChange = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filteredBooks = products?.data?.filter((book: IProduct) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const genre = book.genre.toLowerCase();
      return (
        title.includes(searchTermLowerCase) ||
        author.includes(searchTermLowerCase) ||
        genre.includes(searchTermLowerCase)
      );
    });
    setSearchResults(filteredBooks || []);
  };

  console.log(searchResults);

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <Link to="/">
            <div className="flex items-center justify-between gap-2">
              <img className="h-12" src={logo} alt="log" />
              <h2 className="font-bold">Halal Book</h2>
            </div>
          </Link>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products">All Books</Link>
                </Button>
              </li>
              {user.email && (
                <li>
                  <Button variant="link" asChild>
                    <Link to="/add-books">Add Books</Link>
                  </Button>
                </li>
              )}
              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" onClick={handleToggleSearch}>
                  <HiOutlineSearch size="25" />
                </Button>
              </li>
              {isSearchOpen && (
                <li>
                  <form>
                    <input
                      type="text"
                      placeholder="Search by title, author, or genre..."
                      className="border border-gray-300 rounded py-1 px-2 w-64"
                      {...register('search')}
                      onChange={handleChange}
                    />
                  </form>
                </li>
              )}
              {searchResults.length > 0 && isSearchOpen && (
                <li>
                  <ul className="border border-gray-300 rounded p-2 mt-2 bg-white">
                    {searchResults.map((book) => (
                      <li key={book._id}>
                        <Link to={`/product-details/${book._id}`}>
                          {book.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              <li>
                <Cart />
              </li>
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem> */}
                    {!user.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Signup
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}

                    {user.email && (
                      <DropdownMenuItem
                        onClick={handleLogOut}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
