import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import CompleteTodo from "../Components/todo/CompleteTodo";

const CompleteTodoList = () => {
  const { todos, loading } = useContext(TodoContext);

  // Filter todos with status "Completed"
  const completedTodos = todos.filter((todo) => todo.status === "Completed");

  // Sort completedTodos by dueDate in descending order
  const sortedCompletedTodos = completedTodos.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="">
      <Helmet>
        <title>Completed | DailyDocket</title>
      </Helmet>

      <h2 className="text-2xl font-semibold text-center mb-3">
        Completed Todo List
      </h2>

      {loading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 overflow-x-auto bg-white rounded-md">
          <table className="table text-center w-full ">
            <thead>
              <tr className="font-bold bg-[#95BDFF] text-white">
                <th className="py-2 px-4 border  w-[30%]">Title</th>
                <th className="py-2 px-4 border  w-[30%]">Description</th>
                <th className="py-2 px-4 border  w-[15%]">Due Date</th>
                <th className="py-2 px-4 border  w-[15%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompletedTodos.length !== 0 ? (
                sortedCompletedTodos.map((todo) => (
                  <CompleteTodo key={todo._id} todo={todo} />
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    <p>No completed todos available.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompleteTodoList;
