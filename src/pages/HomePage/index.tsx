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
  selectDogCount,
} from "../../store/sagas/selectors";
import CustomPagination from "../../components/CustomPagination";
import CustomSearch from "../../components/CustomSearch";
import DogAnimation from "../../components/DogAnimation";
import "./styles.scss";
import CardView from "../../components/CardView";
import { dogBatchCount } from "../../constants/dog.constants";
import AdvancedSort from "../../components/AdvancedSort";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const dogBreeds = useSelector(selectBreeds);
  const dogID = useSelector(selectDogIds);
  const dogList = useSelector(selectDogs);
  const totalDogCount = useSelector(selectDogCount);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeBreeds, setActiveBreeds] = useState<string>(dogBreeds);
  const [selectedSort, setSelectedSort] = useState<string>("breed:asc");

  useEffect(() => {
    // Dispatch the action when the component first loads
    dispatch(fetchBreedsRequest());
    dispatch(searchDogsRequest({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      searchDogsRequest({
        from: (currentPage - 1) * dogBatchCount,
        breeds: activeBreeds,
        sort: selectedSort,
      })
    );
  }, [currentPage, dispatch, activeBreeds, selectedSort]);

  useEffect(() => {
    dispatch(fetchDogsRequest());
  }, [dispatch, dogID]);

  const handleBreedChange = (selectedBreeds) => {
    setActiveBreeds(selectedBreeds);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (dogList.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DogAnimation />
      </div>
    );
  }

  return (
    <div className="dog-view-container">
      <div className="filter-container">
        <div className="left-side">
          <CustomSearch dogBreeds={dogBreeds} onChange={handleBreedChange} />
        </div>
        <div className="right-side">
          <AdvancedSort selectedSort={selectedSort} changeSelectedSort={setSelectedSort} />
        </div>
      </div>
      <div className="content-container">
        <CardView dogs={dogList} />

        <div className="pagination-container">
          <CustomPagination
            page={currentPage}
            totalPages={Math.ceil(totalDogCount / dogBatchCount)}
            onChangePage={handlePageClick}
            rowsPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
