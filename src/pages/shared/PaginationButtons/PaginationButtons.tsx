import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { paginationVariants } from "./FramerVariables";

interface IProps {
  members?: any[]; // Allow undefined
  handlePageChange: (selectedPage: number) => void;
  currentPage: number;
  count: number;
}

const PaginationButtons = ({
  members,
  handlePageChange,
  currentPage,
  count,
}: IProps) => {
  const safeMembers = members ?? [];
  const totalItems = safeMembers.length;
  const pageCount = Math.ceil(totalItems / count);
  const validForcePage = pageCount > 0 ? currentPage : 0;

  const showNextButton = validForcePage < pageCount - 1;
  const showPrevButton = validForcePage > 0;

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          showNextButton ? (
            <button className="size-6 md:size-8 flex items-center justify-center bg-[#D3D3D3] rounded-md">
              <ArrowRight />
            </button>
          ) : null
        }
        previousLabel={
          showPrevButton ? (
            <button className="size-6 mr-4 md:size-8 flex items-center justify-center bg-[#D3D3D3] rounded-md">
              <ArrowLeft />
            </button>
          ) : null
        }
        onPageChange={({ selected }) => handlePageChange(selected)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        containerClassName="flex items-center justify-center"
        pageClassName="border border-solid border-[#D3D3D3] hover:bg-[#D3D3D3] flex items-center justify-center rounded-full mr-3 sm:mr-4 font-semibold p-2.5 md:p-4 w-1 h-1"
        activeClassName="bg-[#BCD358] text-white"
        forcePage={validForcePage}
      />
    </motion.div>
  );
};

export default PaginationButtons;
