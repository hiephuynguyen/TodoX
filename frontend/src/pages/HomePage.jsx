import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {

  const [taskBuffer, settaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);


  useEffect(() =>{
    setPage(1);
  },[filter,dateQuery]);

  //logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      settaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks. Please try again.");
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if(page<totalPages){
      setPage( (prev) => prev + 1 );
    }
  }

  const handlePrev = () => {
    if(page>1){
      setPage( (prev) => prev - 1 );
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }


  //Variable
  const filteredTasks = taskBuffer.filter((task) => {
    switch(filter){
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const visibleTask = filteredTasks.slice(
    (page -1)* visibleTaskLimit,
     page * visibleTaskLimit
  );

  if (visibleTask.length === 0){
    handlePrev;
  }
  
  const totalPages= Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full relative bg-white">
  {/* Teal Glow Right */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#ffffff",
      backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(56, 193, 182, 0.5),
          transparent 70%
        )
      `,
      filter: "blur(80px)",
      backgroundRepeat: "no-repeat",
    }}
  />
     {/* Your Content/Components */}
     <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

          {/* Đầu Trang */}
          <Header />

          {/* Tạo Nhiệm Vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thống Kê và Bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

          {/* Danh Sách Nhiệm Vụ */}
          <TaskList filteredTasks={visibleTask} 
                    filter={filter}
                    handleTaskChanged={handleTaskChanged} />

          {/* Phân Trang và Lọc Theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />


            <DateTimeFilter 
              dateQuery={dateQuery} 
              setDateQuery={setDateQuery}/>
          </div>

          {/* Chân Trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
          
        </div>
      </div>
</div>
      
  );
};

export default HomePage;