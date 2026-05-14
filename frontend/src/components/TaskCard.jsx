import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Circle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Trash2, Calendar, SquarePen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import api from "@/lib/axios";
import { toast } from "sonner";
const TaskCard = ({task, index, handleTaskChanged}) => {

    const [isEditting, setIsEditting] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");


    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            
            toast.success("Task deleted")
            handleTaskChanged();
        } catch (error){
            console.error("Error deleting tasks:", error);
            toast.error("Failed to delete. Please try again.");
        }
    };

    const updateTask = async () => {
        try{
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`, {
                title: updateTaskTitle
            });
            toast.success(`Updated: ${updateTaskTitle}`);
            handleTaskChanged();
        } catch (error){
            console.error("Error updating tasks:", error);
            toast.error("Failed to update. Please try again.");
        }
    };

    const toggleTaskCompleteButton = async () => {
        try{
            if(task.status === "active"){
                await api.put(`/tasks/${task._id}`,{
                    status: "completed",
                    completedAt: new Date().toISOString(),
                });

                toast.success(`${task.title} completed`);
            } else {
                await api.put(`/tasks/${task._id}`,{
                    status: "active",
                    completedAt: null,
                });

                toast.success(`${task.title} actived`);
            }

            handleTaskChanged();
        } catch (error){
            console.error("Error changing status", error);
            toast.error("Failed to change. Please try again.")
        }
    }

    const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  }

    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 anime-fade-in group",
            task.status === "completed" && "opacity-75"
        )}

            style={{animationDelay: `${index * 50}ms`}}
        >
            
            <div className='flex items-center gap-4'>
                {/* Circle Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "completed" 
                        ? "text-success hover:text-success/80"
                        : "text-muted-foreground hover:text-primary" 
                    )}
                    onClick={toggleTaskCompleteButton}
                    >
                        {task.status === "completed" ? (
                            <CheckCircle2 className="size-5" />
                        ) : (
                            <Circle className="size-5"/>
                        )
                        }
                </Button>

                {/* Task Title */}
                <div className="flex-1 min-w-0">
                    {isEditting ? (
                        <Input 
                        placeholder="Edit task title"
                        className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        type="text"
                        value={updateTaskTitle}
                        onChange={ (e) => setUpdateTaskTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onBlur={()=>{
                            setIsEditting(false);
                            setUpdateTaskTitle(task.title || "");
                        }}
                        />
                    ) : (
                        <p 
                        className={cn(
                            "text-base transition-all duration-200",
                            task.status === "completed"
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                        )}
                        >
                            {task.title}
                        </p>
                    )}

                {/* new date and completed date */}
                    <div className="flex items-center gap-2 mt-1">
                    
                        <Calendar className="size-3 text-muted-foreground"/>
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>

                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground">-</span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleDateString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Edit Button and Delete Button */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">

                    {/* Edit Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditting(true);
                            setUpdateTaskTitle(task.title || "");
                        }}
                    >
                        <SquarePen className="size-4" />
                    </Button>

                    {/* Delete Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                        onClick={ () => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>

        </Card>
    );
}

export default TaskCard;