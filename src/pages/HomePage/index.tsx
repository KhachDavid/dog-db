import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchBreedsRequest,
  fetchDogsRequest,
  searchDogsRequest,
} from "../../store/actions/dog.actions";
import {
  selectBreeds,
  selectDogIds,
  selectDogs,
} from "../../store/sagas/selectors";
import CustomTable from "../../components/CustomTable";
import CustomPagination from "../../components/CustomPagination";
import DogAnimation from "../../components/DogAnimation";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
import CustomImage from "../../components/CustomImage";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const COLUMN_TO_EXCLUDE = ["img", "id"];

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const dogBreeds = useSelector(selectBreeds);
  const dogID = useSelector(selectDogIds);
  const dogList = useSelector(selectDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDog, setActiveDog] = useState<Dog>();

  const closeActiveDog = () => {
    setActiveDog(null);
  };

  const onRowClick = (dog) => {
    setActiveDog(dog);
  };

  useEffect(() => {
    // Dispatch the action when the component first loads
    dispatch(fetchBreedsRequest());
    dispatch(searchDogsRequest({}));
  }, [dispatch]); // The empty dependency array ensures this effect runs once on mount

  useEffect(() => {
    console.log(dogBreeds);
  }, [dogBreeds]);

  useEffect(() => {
    dispatch(fetchDogsRequest());
  }, [dispatch, dogID]);

  if (dogList.length === 0) {
    return <DogAnimation />;
  }

  let columns = Object.keys(dogList[0]).map((key) => ({
    id: key,
    label: key,
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  }));

  const handlePageClick = (event, page) => {
    setCurrentPage(event);
  };

  columns = columns.filter((column) => !COLUMN_TO_EXCLUDE.includes(column.id));

  return (
    <div className="dog-view-container">
      <div className="content-container">
        <div className="table-container">
          <div className="table-scroll">
            <CustomTable
              rows={dogList || []}
              columns={columns}
              onRowClick={onRowClick}
              preSort={true}
            />
          </div>
        </div>
        {activeDog && (
          <div className="active-dog-container">
            <div className="dog-header">
              <button className="close-button" onClick={closeActiveDog}>
                <CloseIcon />
              </button>
            </div>
            <div className="dog-details">
              <h2>{activeDog.name}</h2>
              <CustomImage url={activeDog.img} />
            </div>
          </div>
        )}
      </div>
      <div className="pagination-container">
        <CustomPagination
          page={currentPage}
          totalPages={Math.ceil(10000 / 25)}
          onChangePage={handlePageClick}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
};

export default HomePage;
