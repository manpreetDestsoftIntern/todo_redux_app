import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Check, Trash2, CirclePlay, CirclePause } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, startTimmer, stopTimmer, toggleComplete, stopWatch, startStopWatch } from "../features/notes/noteSlice"
export default function Home() {
  const [input, setInput] = useState("");
  const [isRunning, setRunStatus] = useState(false);
  const tasks = useSelector(state => state.notes.tasks); // Get tasks from store
  const timer = useSelector(state => state.notes.timer);  // Access the timer state

  const dispatch = useDispatch()

  const addTask = () => {
    if (input.trim() !== "") {
      dispatch(add(input)); // Dispatch add action
      setInput("");
    }
  };

  const toggleTask = (id) => {
    dispatch(toggleComplete(id)); // Dispatch add action
  };

  const deleteTask = (id) => {
    dispatch(remove(id)); // Dispatch remove action
  };

  const startTimmerFnc = (id) => {
    dispatch(startTimmer(id)); // Dispatch remove action
    setRunStatus(true)
  };
  const removeTimmerFnc = (id) => {
    dispatch(stopTimmer(id)); // Dispatch remove action
    setRunStatus(true)
  };
  const timmerToggle = (id) => {
    if (isRunning){
      // dispatch(stopWatch())
      removeTimmerFnc(id)
      setRunStatus(false)
    }else {
      // dispatch(startStopWatch())
      startTimmerFnc(id)
      setRunStatus(true)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex justify-between items-center p-2">
          <Card className="w-full rounded-lg flex justify-between items-center p-2">
            <CardContent
              className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}
            >
              {task.text}
            </CardContent>
            <div className="flex gap-0">
              <Button variant="ghost" onClick={() => toggleTask(task.id)}>
                <Check className="text-green-500" />
              </Button>
              <Button variant="ghost" onClick={() => timmerToggle(task.id)} title="Timer">
                {task.isRunning ? <CirclePause className="text-green-500"/> : <CirclePlay className="text-green-500" />}
              </Button>
              <Button variant="ghost" onClick={() => deleteTask(task.id)}>
                <Trash2 className="text-red-500" />
              </Button>
            </div>
          </Card>
          <Card className="rounded-full ml-6">
              <div>{task.currentTime ? task.currentTime : "0:00:00"}</div>
              {/* <div>{tasks.updatedTime}, {task.min}, {task.sec}, {task.count}</div> */}
          </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
