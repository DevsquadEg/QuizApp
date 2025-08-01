import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimationContainer from '../shared/AnimationContainer/AnimationContainer';
import PaginationButtons from '../shared/PaginationButtons/PaginationButtons';
import CookieServices from '../../Store/ResultsSlice/CookieServices';
import { useQuizzesResultsQuery } from '../../Store/ResultsSlice/ResultsSlice';
import useAuth from '../../Hooks/useAuth';

const Results = () => {

    // *************** Typescript Interface for Results Response ***************
     interface IResultsResponse {
  participants: [],
  quiz: {
    closed_at: string
    code: string
    createdAt: string
    description: string
    difficulty: string
    duration: number
    group: string
    instructor: string
    participants: number
    questions: []
    questions_number: number
    schadule: string
    score_per_question: number
    status: string
    title: string
    type: string
    updatedAt: string
    __v: number
    _id: string
  },
}


  //? *************** Get QuizzesResults ***************
  const { isLoading, data: quizzesResults } = useQuizzesResultsQuery(0)

  //! *************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(0)
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }
  const ResultsPerPage = 7;
  const startIndex = currentPage * ResultsPerPage;
  const endIndex = startIndex + ResultsPerPage;
  const currentResults = quizzesResults?.slice(startIndex, endIndex);
  const { logedInData } = useAuth();

  //! *************** Navigation To ResultsDetails  ***************
  const navigate = useNavigate();

  const handleResultDetails = (data: IResultsResponse) => {
    navigate('/dashboard/results-details', { state: data });
  }
  return <>

    <AnimationContainer>
      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {isLoading ?
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          : <div className='flex justify-between font-semibold'>
            <h2> Completed Quizzes</h2>
          </div>}
        <table className='w-full my-2 border-separate rounded-md border-slate-400'>
          <thead className='text-white '>
            {isLoading ? <tr className=' [&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_span]:inline-block [&_span]:h-[12px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md'>
              <th className='rounded-s-md'><span>{""}</span></th>
              <th className='hidden lg:table-cell'><span>{""}</span></th>
              <th className='hidden md:table-cell'><span>{""}</span></th>
              <th className='hidden md:table-cell'><span>{""}</span></th>
              <th><span>{""}</span></th>
              {logedInData?.profile?.role !== "Instructor" ? null : <th className='rounded-e-md'><span>{""}</span></th>}
            </tr> :
              <tr className='[&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_th]:font-semibold'>
                <th className='rounded-s-md'>TITLE</th>
                <th className='hidden lg:table-cell'>NUMBER OF QUESTIONS</th>
                <th className='hidden md:table-cell'>DIFFICULTY</th>
                <th className='hidden md:table-cell'>TYPE</th>
                <th>CLOSED AT</th>
                {logedInData?.profile?.role !== "Instructor" ? null : <th className='rounded-e-md'>DETAILS</th>}
              </tr>}

          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {isLoading ? Array.from({ length: 7 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200
             [&_td]:py-3 [&_td]:border [&_td]:border-slate-300
             [&_span]:inline-block [&_span]:h-[14px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md'>
              <td className='whitespace-nowrap '><span>{""}</span></td>
              <td className='hidden lg:table-cell'><span>{""}</span></td>
              <td className='hidden md:table-cell'><span>{""}</span></td>
              <td className='hidden md:table-cell'><span>{""}</span></td>
              <td><span>{""}</span></td>
              {logedInData?.profile?.role !== "Instructor" ? null : <td><span>{""}</span></td>}
            </tr>) : null}

            {currentResults?.map(({ quiz, participants }: IResultsResponse) => 
            <tr key={quiz?._id} className='bg-white dark:border-gray-700 hover:bg-blue-200
           [&_td]:py-3 [&_td]:border [&_td]:border-slate-300'>
              <td className='whitespace-nowrap font-medium truncate'>{quiz?.title}</td>
              <td className='hidden whitespace-nowrap font-medium truncate lg:table-cell'>{quiz?.questions_number}</td>
              <td className='hidden whitespace-nowrap font-medium truncate md:table-cell'>{quiz?.difficulty}</td>
              <td className='hidden whitespace-nowrap font-medium truncate md:table-cell'>{quiz?.type}</td>
              <td className='hidden whitespace-nowrap font-medium truncate md:table-cell'>{new Date(quiz?.closed_at).toLocaleDateString()}</td>
              {logedInData?.profile?.role !== "Instructor"? null : <td><button className=' cursor-pointer   rounded-3xl bg-[#BCD358] px-4 py-2  font-medium  text-black hover:bg-gray-200' onClick={() => handleResultDetails({ quiz, participants })} >View</button></td>}
            </tr>)}

          </tbody>

        </table>
        {!isLoading && <PaginationButtons members={quizzesResults} count={ResultsPerPage}  {...{ currentPage, handlePageChange }} />}

      </div>
    </AnimationContainer>
  </>
}

export default Results