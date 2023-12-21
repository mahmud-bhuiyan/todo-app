// import { FaRegTrashAlt } from "react-icons/fa";
// import { formatDate } from "../../utils/FormatDate";
// import { useContext } from "react";
// import { TodoContext } from "../../Context/TodoContext";

import { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from "../../utils/FormatDate";

const CompleteTodo = ({ todo }) => {
  const { handleDelete } = useContext(TodoContext);
  const { _id, title, description, dueDate } = todo;

  return (
    <tr>
      <td className="py-2 px-4 border">{title}</td>
      <td className="py-2 px-4 border">{description}</td>
      <td className="py-2 px-4 border">{formatDate(dueDate)}</td>
      <td className="py-2 px-4 border flex justify-center">
        <FaRegTrashAlt
          onClick={() => handleDelete(_id)}
          className="cursor-pointer text-[16px]"
        />
      </td>
    </tr>
  );
};

export default CompleteTodo;
