import { BsPlus } from "react-icons/bs";

const CreateListBtn = () => {
  const getMovies = () => {};

  // console.log("Data: ", data);
  // console.log("Loading: ", isLoading);
  // console.log("Error: ", error);

  return (
    <button>
      <BsPlus onClick={getMovies} />
    </button>
  );
};

export default CreateListBtn;
