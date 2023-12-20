import { axiosSecure } from "../../utils/axios";
// =============================================
//                   Create Todo
// =============================================
export const createTodo = async (taskDetails) => {
  try {
    const response = await axiosSecure.post("/tasks/", taskDetails);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error.response?.data?.msg);
    throw error.response?.data?.msg;
  }
};
