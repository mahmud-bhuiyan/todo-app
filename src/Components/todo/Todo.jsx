import { formatDate } from "../../utils/FormatDate";
import { RiCloseCircleFill } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { deleteTodo } from "../../services/api/Todo";
import { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Todo = ({ todo }) => {
  const { _id, title, description, dueDate, status } = todo;

  const { setTodos } = useContext(TodoContext);

  const handleDelete = async (todoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTodo(todoId);

          // when deletion is successful, update the state
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo._id !== todoId)
          );
          toast.success(response.message);
        } catch (error) {
          toast.error("An error occurred!");
          console.log(error);
        }
      }
    });
  };

  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{formatDate(dueDate)}</td>
      <td>{status}</td>
      <td className="flex gap-2 justify-center">
        <RiCloseCircleFill
          className="text-lg"
          onClick={() => handleDelete(_id)}
        />
        <TiEdit className="text-lg" />
      </td>
    </tr>
  );
};

export default Todo;
