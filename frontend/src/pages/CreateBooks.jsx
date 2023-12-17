import { useState } from "react";
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useMutation } from "react-query";
import { axios } from '../api/axios';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    await axios.post('/books', data);     
    // '/books' means VITE_PUBLIC_API_BASE_URL + '/books' equally
    // data object as a request body
  };

  const { mutate: createMutate } = useMutation(handleSaveBook, {
    onSuccess: () => {
      setLoading(false);
      enqueueSnackbar('Book Created successfully', { variant: 'success' });
      navigate('/');
    },
    onError: (error) => {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    },
  })

  const handleClickSaveBook = () => {
    createMutate();
  }

  // if (loading) {
  //   <Spinner />
  // }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleClickSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBooks