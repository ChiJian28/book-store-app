import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { formatDate } from "../utils/formatDate";
import { axios } from "../api/axios";

const ShowBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchBook();
  }, []);

  const fetchBook = async () => {
    const res = await axios.get(`books/${id}`);
    setLoading(false);
    return res.data;
  };

  const { data: book, isError, error } = useQuery({
    queryKey: ['book'],
    queryFn: () => fetchBook(),
  })

  if (isError) {
    return <h1>{error.message}</h1>
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book?._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book?.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book?.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book?.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{formatDate(book?.createdAt)}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{formatDate(book?.updatedAt)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook