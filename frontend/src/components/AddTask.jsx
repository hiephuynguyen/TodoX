import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({handleNewTaskAdded}) => {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if(newTaskTitle.trim()){
      try {
        await api.post("/tasks", {title: newTaskTitle });
        toast.success(`Task ${newTaskTitle} added.`);
        handleNewTaskAdded();
      } catch (error){
        console.error("Error by adding new Task",error);
        toast.error("Error by adding new Task");
      }

      setNewTaskTitle("");
    } else {
      toast.error("You need texting for the task");
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  }

  return (
    <Card className="p-6 border-0 bg-grandient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Enter a new task..."
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button 
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5"/>
          Add Task
        </Button>
      </div>

    </Card>
  );
};

export default AddTask;