const TodoList = () => {
  return (
    <>
      <div className="text-center py-3 md:py-5 mb-3 bg-white rounded">
        <h3 className="text-sm sm:text-base md:text-xl mb-2">Todo List</h3>
        <button
          className="btn btn-sm btn-accent text-white"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Create Todo
        </button>
      </div>
      <div>
        <div className="mt-4 bg-slate-400 p-2 rounded"></div>
      </div>
    </>
  );
};

export default TodoList;
