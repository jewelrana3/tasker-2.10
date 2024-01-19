import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoFound from "./NoFound";
import SearchBox from "./SearchBox";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateToTask, setUpdateToTask] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }

  function handEditTask(task) {
    setUpdateToTask(task);
    setShowAddModal(true);
  }

  function onCloseClick() {
    setShowAddModal(false);
    setUpdateToTask(null);
  }

  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleAllDelete() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFevarate(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];

    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  }

  function handleSearch(searchTerm) {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filtered]);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          updateToTask={updateToTask}
          onCloseClick={onCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchBox onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            handleAllDelete={handleAllDelete}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFevarate}
            />
          ) : (
            <NoFound />
          )}
        </div>
      </div>
    </section>
  );
}
