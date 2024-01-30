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
    // console.error(error.response?.data?.msg);
    throw error.response?.data?.msg;
  }
};

// =============================================
//                Get Todos for User
// =============================================
export const getUserTodos = async () => {
  try {
    const response = await axiosSecure.get("/tasks/");

    return response.data;
  } catch (error) {
    // console.error(error.response?.data?.msg);
    throw error.response?.data?.msg;
  }
};

// =============================================
//                  Delete Todo
// =============================================
export const deleteTodo = async (todoId) => {
  try {
    const response = await axiosSecure.delete(`/tasks/${todoId}`);

    return response.data;
  } catch (error) {
    // console.log(error);
    // console.error(error.response?.data?.msg);
    throw error.response?.data?.msg;
  }
};

// =============================================
//                Update Todo by ID
// =============================================
export const updateTodoById = async (taskId, taskDetails) => {
  try {
    const response = await axiosSecure.patch(`/tasks/${taskId}`, taskDetails);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating task. Error_Status:", error.response.status);
    throw error;
  }
};
