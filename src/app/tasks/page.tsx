"use client";

import Header from "@/components/kanban/Header";
import TaskBoard from "@/components/kanban/TaskBoard";

export default function TasksPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 q-full font-Inter">
      <div className="w-[1240px] mx-auto">
        <Header />
        <TaskBoard />
      </div>
    </div>
  );
}
