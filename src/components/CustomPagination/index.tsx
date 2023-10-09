import React from "react";
import CustomButton from "../CustomButton";
import { theme } from "../../styles/_styles.scss";

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onChangePage: (newPage: number) => void;
  rowsPerPage: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  totalPages,
  onChangePage,
  rowsPerPage,
}) => {
  const handleClick = (newPage: number) => {
    onChangePage(newPage);
  };

  const totalPagesArray = [...Array(totalPages).keys()].map((i) => i + 1);

  // Calculate start and end page numbers for the current group of page buttons
  const startPage = Math.max(page - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <>
      {/* Display previous button if not on the first page group */}
      {startPage > 1 && (
        <CustomButton
          variant="outlined"
          onClick={() => handleClick(1)}
          sx={{
            py: "12px",
            px: "24px",
            m: "8px",
            borderRadius: "8px",
            borderColor: theme,
            backgroundColor: "#fff",
            color: theme,
            "&:hover": {
                backgroundColor: theme,
                color: "#fff",
                borderColor: "#fff",
              },
          }}
          label="&lt;&lt;"
        />
      )}
      {/* Display page CustomButtons for the current group */}
      {totalPagesArray.slice(startPage - 1, endPage).map((pageNumber) => (
        <CustomButton
          key={pageNumber}
          variant={pageNumber === page ? "contained" : "outlined"}
          onClick={() => handleClick(pageNumber)}
          sx={{
            py: "12px",
            px: "24px",
            m: "8px",
            borderRadius: "8px",
            borderColor: theme,
            backgroundColor: pageNumber === page ? theme : "#fff",
            color: pageNumber === page ? "#fff" : theme,
            "&:hover": {
                backgroundColor: theme,
                color: "#fff",
                borderColor: "#fff",
              },
          }}
          label={pageNumber.toString()}
        />
      ))}
      {/* Display next CustomButton if not on the last page group */}
      {endPage < totalPages && (
        <CustomButton
          variant="outlined"
          onClick={() => handleClick(endPage + 1)}
          sx={{
            py: "12px",
            px: "24px",
            m: "8px",
            borderRadius: "8px",
            borderColor: theme,
            backgroundColor: "#fff",
            color: theme,
            "&:hover": {
                backgroundColor: theme,
                color: "#fff",
                borderColor: "#fff",
              },
          }}
          label="&gt;&gt;"
        />
      )}
    </>
  );
};

export default CustomPagination;
