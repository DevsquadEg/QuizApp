import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import type { Question } from "../../Interfaces/Questions";
import  type{ Quiz } from "../../Interfaces/Quiz";
import  type{ Student } from "../../Interfaces/Student";
import  type{ Group } from "../../Interfaces/Groups.interface";
export const quizApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://upskilling-egypt.com:3005/api",
  prepareHeaders: (headers) => {
  const cookie = Cookies.get("LOGEDDATA");

  if (cookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(cookie));
      const token = parsed?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (err) {
      console.error("Error parsing LOGEDDATA cookie:", err);
    }
  }

  return headers;
}
  }),
  tagTypes: ["Group", "Student", "Question", "Quiz", "QuizResult"],
  endpoints: (builder) => ({
    // Auth API
    
     login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Questions API
    getQuestions: builder.query<Question[], void>({
      query: () => "/question",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Question" as const,
                id: _id,
              })),
              { type: "Question" as const, id: "LIST" },
            ]
          : [{ type: "Question" as const, id: "LIST" }],
    }),
    getQuestionById: builder.query({
      query: (id) => `/question/${id}`,
      providesTags: (result, error, id) => [{ type: "Question", id }],
    }),
    createQuestion: builder.mutation({
      query: (questionData) => ({
        url: "/question",
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/question/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),
    searchQuestions: builder.query({
      query: (params) => ({
        url: "/question/search",
        params,
      }),
      providesTags: [{ type: "Question", id: "SEARCH" }],
    }),

    // Groups API
    GetGroups: builder.query<Group[], void>({
      query: () => "/group",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Group" as const, id: _id })),
              { type: "Group" as const, id: "LIST" },
            ]
          : [{ type: "Group" as const, id: "LIST" }],
    }),
    getGroupById: builder.query({
      query: (id) => `/group/${id}`,
      providesTags: (id) => [{ type: "Group", id }],
    }),
    createGroup: builder.mutation({
      query: (groupdata) => ({
        url: "/group",
        method: "POST",
        body: groupdata,
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }, "Student"],
    }),
    updateGroup: builder.mutation({
      query: ({ id, data }) => ({
        url: `/group/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ({ id }) => [
        { type: "Group", id },
        { type: "Group", id: "LIST" },
        "Student",
      ],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [
        { type: "Group", id },
        { type: "Group", id: "LIST" },
        "Student",
      ],
    }),

    // Students API
    getStudents: builder.query<Student[], void>({
      query: () => "/student",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Student" as const,
                id: _id,
              })),
              { type: "Student" as const, id: "LIST" },
            ]
          : [{ type: "Student" as const, id: "LIST" }],
    }),
    getStudentsWithoutGroup: builder.query({
      query: () => "/student/without-group",
      providesTags: ["Student"],
    }),
    getStudentById: builder.query({
      query: (id) => `/student/${id}`,
      providesTags: (id) => [{ type: "Student", id }],
    }),
    getTopFiveStudents: builder.query({
      query: () => "/student/top-five",
      providesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [
        { type: "Student", id },
        { type: "Student", id: "LIST" },
        "Student",
        "Group",
      ],
    }),
    addStudentToGroup: builder.mutation({
      query: ({ studentId, groupId }) => ({
        url: `/student/${studentId}/${groupId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { studentId, groupId }) => [
        { type: "Student", id: studentId },
        { type: "Group", id: groupId },
        "Student",
        "Group",
      ],
    }),
    deleteStudentFromGroup: builder.mutation({
      query: ({ studentId, groupId }) => ({
        url: `/student/${studentId}/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { studentId, groupId }) => [
        { type: "Student", id: studentId },
        { type: "Group", id: groupId },
        "Student",
        "Group",
      ],
    }),
    updateStudentGroup: builder.mutation({
      query: ({ studentId, groupId }) => ({
        url: `/student/${studentId}/${groupId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { studentId, groupId }) => [
        { type: "Student", id: studentId },
        { type: "Group", id: groupId },
        "Student",
        "Group",
      ],
    }),

    // Quiz API
    getAllQuizzes: builder.query<Quiz[], void>({
      query: () => "/quiz",
      providesTags: ["Quiz"],
    }),
    getQuizById: builder.query<Quiz, string>({
      query: (id) => `/quiz/${id}`,
      providesTags: (result, error, id) => [{ type: "Quiz", id }],
    }),
    createQuiz: builder.mutation({
      query: (newQuiz) => ({
        url: "/quiz",
        method: "POST",
        body: newQuiz,
      }),
      invalidatesTags: [{ type: "Quiz", id: "LIST" }, "Quiz"],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quiz/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Quiz", id }],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Quiz", id: "LIST" }, "Quiz"],
    }),
    joinQuiz: builder.mutation({
      query: (joinData) => ({
        url: "/quiz/join",
        method: "POST",
        body: joinData,
      }),
      invalidatesTags: ["Quiz"],
    }),
    submitQuiz: builder.mutation({
      query: ({ id, answers }) => ({
        url: `/quiz/submit/${id}`,
        method: "POST",
        body: answers,
      }),
      invalidatesTags: [{ type: "QuizResult", id: "LIST" }, "Quiz"],
    }),
    getQuizQuestionsWithoutAnswers: builder.query({
      query: (id) => `/quiz/without-answers/${id}`,
    }),
    getAllQuizResults: builder.query({
      query: () => "/quiz/result",
      providesTags: ["QuizResult"],
    }),
    getFirstFiveIncomingQuizzes: builder.query({
      query: () => "/quiz/incomming",
      providesTags: ["Quiz"],
    }),
    getLastFiveCompletedQuizzes: builder.query({
      query: () => "/quiz/completed",
      providesTags: ["Quiz"],
    }),
    reassignQuiz: builder.mutation({
      query: (id) => ({
        url: `/quiz/reassign/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
 
  // Questions hooks
    useLoginMutation,
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useSearchQuestionsQuery,
  // Group hooks
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useGetGroupByIdQuery,
  useGetGroupsQuery,
  // Students hooks
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useGetStudentsWithoutGroupQuery,
  useGetTopFiveStudentsQuery,
  useAddStudentToGroupMutation,
  useUpdateStudentGroupMutation,
  useDeleteStudentFromGroupMutation,
  useDeleteStudentMutation,
  // Quiz hooks
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useJoinQuizMutation,
  useSubmitQuizMutation,
  useGetQuizQuestionsWithoutAnswersQuery,
  useGetAllQuizResultsQuery,
  useGetFirstFiveIncomingQuizzesQuery,
  useGetLastFiveCompletedQuizzesQuery,
  useReassignQuizMutation,
} = quizApi;
