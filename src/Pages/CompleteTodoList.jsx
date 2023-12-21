import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import CompleteTodo from "./CompleteTodo";

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
        <title>Dashboard | TODO</title>
      </Helmet>

      <h2 className="text-2xl font-semibold text-center mb-3">
        Completed Todo List
      </h2>

      {loading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-md">
          <table className="table text-center">
            <thead>
              <tr className="font-bold bg-[#95BDFF] text-white">
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Due Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompletedTodos.length !== 0 ? (
                sortedCompletedTodos.map((todo) => (
                  <CompleteTodo key={todo._id} todo={todo} />
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <p className="text-white">No completed todos available.</p>
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
