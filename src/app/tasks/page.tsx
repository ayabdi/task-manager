"use client";

import { useEffect, useState } from "react";

export default function TasksPage() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);
  return <div>Hello</div>;
}
