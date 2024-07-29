"use client";
import React from "react";
import ThemeSwitch from "../components/ThemeSwitch";

function MainComponent() {
  const [lists, setLists] = React.useState([
    { id: 1, name: "Main Building Punch List" },
    { id: 2, name: "Electrical Systems Punch List" },
  ]);
  const [tasks, setTasks] = React.useState([
    { id: 1, listId: 1, name: "Fix leaking pipe in room 201" },
    { id: 2, listId: 1, name: "Replace broken window in lobby" },
  ]);
  const [selectedList, setSelectedList] = React.useState(1);
  const [editingList, setEditingList] = React.useState(null);
  const [editingTask, setEditingTask] = React.useState(null);

  const addList = (name) => {
    const newList = { id: Date.now(), name };
    setLists([...lists, newList]);
  };

  const updateList = (id, name) => {
    setLists(lists.map((list) => (list.id === id ? { ...list, name } : list)));
    setEditingList(null);
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
    setTasks(tasks.filter((task) => task.listId !== id));
  };

  const addTask = (name) => {
    const newTask = { id: Date.now(), listId: selectedList, name };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, name) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name } : task)));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const shareList = (id) => {
    const list = lists.find((l) => l.id === id);
    const listTasks = tasks.filter((t) => t.listId === id);
    alert(
      `Sharing list: ${list.name}\nTasks: ${listTasks
        .map((t) => t.name)
        .join(", ")}`
    );
  };

  return (
    <div className="min-h-screen dark:bg-slate-600 bg-gray-100 p-8 font-sans">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-center dark:text-gray-100 text-slate-800">
          Construction Site Punch Lists
        </h1>
        <ThemeSwitch />
      </header>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-20">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-6">My Punch Lists</h2>
          <ul className="space-y-2">
            {lists.map((list) => (
              <li
                key={list.id}
                className="flex items-center justify-between bg-gray-100 dark:bg-slate-600 p-3 rounded"
              >
                {editingList === list.id ? (
                  <input
                    type="text"
                    name="editListName"
                    value={list.name}
                    onChange={(e) => updateList(list.id, e.target.value)}
                    onBlur={() => setEditingList(null)}
                    className="w-full p-1 border rounded"
                    autoFocus
                  />
                ) : (
                  <span onClick={() => setSelectedList(list.id)}>
                    {list.name}
                  </span>
                )}
                <div>
                  <button
                    onClick={() => setEditingList(list.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => deleteList(list.id)}
                    className="text-red-500 hover:text-red-700 mr-2"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button
                    onClick={() => shareList(list.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <i className="fas fa-share"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Punch List</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addList(e.target.listName.value);
              e.target.listName.value = "";
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="listName"
              placeholder="Enter list name"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create List
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Tasks for {lists.find((l) => l.id === selectedList)?.name}
          </h3>
          <ul className="space-y-2 mb-4">
            {tasks
              .filter((task) => task.listId === selectedList)
              .map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between bg-gray-100 dark:bg-slate-600 p-3 rounded"
                >
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      name="editTaskName"
                      value={task.name}
                      onChange={(e) => updateTask(task.id, e.target.value)}
                      onBlur={() => setEditingTask(null)}
                      className="w-full p-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <span>{task.name}</span>
                  )}
                  <div>
                    <button
                      onClick={() => setEditingTask(task.id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
          </ul>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask(e.target.taskName.value);
              e.target.taskName.value = "";
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="taskName"
              placeholder="Enter new task"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
