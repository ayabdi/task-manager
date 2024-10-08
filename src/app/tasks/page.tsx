"use client";

import Header from "@/components/kanban/Header";
import TaskBoard from "@/components/kanban/TaskBoard";
import TaskEditor from "@/components/kanban/TaskEditor";
import { SocketProvider } from "@/providers/socket-provider";

export default function TasksPage() {
  return (
    <SocketProvider>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 q-full font-Inter">
        <div className="w-[1240px] mx-auto">
          <Header />
          <TaskBoard />
          <TaskEditor />
        </div>
      </div>
    </SocketProvider>
  );
}
