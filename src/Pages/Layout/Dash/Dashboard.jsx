/* eslint-disable no-unused-vars */
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaCalendar } from "react-icons/fa";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useEffect} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import NavDash from "./Components/NavDash";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Manually trigger the queries when user data is available
    if (user?.email) {
      queryClient.refetchQueries(['tasks']);
      queryClient.refetchQueries(['ongoingTasks']);
      queryClient.refetchQueries(['completedTasks']);
    }
  }, [user?.email, queryClient]);

  const { data: tasks, refetch: refetchTasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', user?.email], // Use user?.email as part of the query key
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }

      const res = await axiosPublic.get(`/tasks/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: ongoingTasks, refetch: refetchOngoing, isLoading: ongoingLoading } = useQuery({
    queryKey: ['ongoingTasks', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }

      const res = await axiosPublic.get(`/ongoingTasks/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: completedTasks, refetch: refetchCompleted, isLoading: completedLoading } = useQuery({
    queryKey: ['completedTasks', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }

      const res = await axiosPublic.get(`/completedTasks/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    axiosPublic.put(`/updateTaskStatus/${draggableId}`, {
      newStatus: destination.droppableId,
    }).then(() => {
      refetchTasks();
      refetchOngoing()
      refetchCompleted()
    });
  };

  const handleDelete = (id) => {
    axiosPublic.delete(`/deleteTask/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast('Task Deleted Successfully');
        refetchTasks();
        refetchOngoing()
        refetchCompleted()
      }
    });
  };

  
  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();

    const daysDifference = Math.floor((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

    if (daysDifference <= 1) {
      return 'red';
    } else if (daysDifference >= 2 && daysDifference <= 6) {
      return 'yellow';
    } else {
      return '';
    }
  };

  return (
    <div>
      <NavDash title={`Welcome ${user?.displayName}`} btn='Add Task' profile={user?.photoURL} refetch={refetchTasks} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-3">
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex-1 bg-base-300 min-h-screen"
              >
                <h1 className="text-center bg-green-300 p-3 font-bold text-base-300">To-do</h1>
                <div>
                  {tasks?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card card-compact m-2 bg-base-100 shadow-xl"
                        >
                          <div className="card-body space-y-1">
                            <div className="flex justify-between items-center">
                              <h2 className="font-bold">{task.title}</h2>
                              <button
                                onClick={() => handleDelete(task._id)}
                                className="btn btn-xs text-red-500"
                              >
                                <RiDeleteBin2Fill />
                              </button>
                            </div>
                            <p className="text-xs">{task.description}</p>
                            <div className="flex justify-between">
                              <div className="flex items-center text-xs space-x-2">
                                <p className="font-semibold">Priority :</p>
                                {task?.priority === 'High' ? (
                                  <FcHighPriority />
                                ) : task?.priority === 'Moderate' ? (
                                  <FcMediumPriority />
                                ) : (
                                  <FcLowPriority />
                                )}
                                <span> {task.priority}</span>
                              </div>
                              <div className="flex items-center text-xs space-x-1">
                                <p className="font-semibold">Deadline:</p>
                                <span style={{ color: isDeadlineNear(task.deadline) }}>
                                  <FaCalendar />
                                </span>
                                <span>{task.deadline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="ongoing">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex-1 bg-base-300 min-h-screen"
              >
                <h1 className="text-center bg-green-400 p-3 font-bold text-base-300">On Going</h1>
                <div>
                  {ongoingTasks?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card card-compact m-2 bg-base-100 shadow-xl"
                        >
                          <div className="card-body space-y-1">
                            <div className="flex justify-between items-center">
                              <h2 className="font-bold">{task.title}</h2>
                              <button
                                onClick={() => handleDelete(task._id)}
                                className="btn btn-xs text-red-500"
                              >
                                <RiDeleteBin2Fill />
                              </button>
                            </div>
                            <p className="text-xs">{task.description}</p>
                            <div className="flex justify-between">
                              <div className="flex items-center text-xs space-x-2">
                                <p className="font-semibold">Priority :</p>
                                {task?.priority === 'High' ? (
                                  <FcHighPriority />
                                ) : task?.priority === 'Moderate' ? (
                                  <FcMediumPriority />
                                ) : (
                                  <FcLowPriority />
                                )}
                                <span> {task.priority}</span>
                              </div>
                              <div className="flex items-center text-xs space-x-1">
                                <p className="font-semibold">Deadline:</p>
                                <span style={{ color: isDeadlineNear(task.deadline) }}>
                                  <FaCalendar />
                                </span>
                                <span>{task.deadline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="completed">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex-1 bg-base-300 min-h-screen"
              >
                <h1 className="text-center bg-green-500 p-3 font-bold text-base-300">Completed</h1>
                <div>
                  {completedTasks?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card card-compact m-2 bg-base-100 shadow-xl"
                        >
                          <div className="card-body space-y-1">
                            <div className="flex justify-between items-center">
                              <h2 className="font-bold">{task.title}</h2>
                              <button
                                onClick={() => handleDelete(task._id)}
                                className="btn btn-xs text-red-500"
                              >
                                <RiDeleteBin2Fill />
                              </button>
                            </div>
                            <p className="text-xs">{task.description}</p>
                            <div className="flex justify-between">
                              <div className="flex items-center text-xs space-x-2">
                                <p className="font-semibold">Priority :</p>
                                {task?.priority === 'High' ? (
                                  <FcHighPriority />
                                ) : task?.priority === 'Moderate' ? (
                                  <FcMediumPriority />
                                ) : (
                                  <FcLowPriority />
                                )}
                                <span> {task.priority}</span>
                              </div>
                              <div className="flex items-center text-xs space-x-1">
                                <p className="font-semibold">Deadline:</p>
                                <span style={{ color: isDeadlineNear(task.deadline) }}>
                                  <FaCalendar />
                                </span>
                                <span>{task.deadline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
