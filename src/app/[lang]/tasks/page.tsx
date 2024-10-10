import Header from "@/components/kanban/Header";
import TaskBoard from "@/components/kanban/TaskBoard";
import TaskEditor from "@/components/kanban/TaskEditor";
import { SocketProvider } from "@/providers/socket-provider";
import { getDictionary } from "../dictonaries";
import { TaskProviderProvider } from "@/providers/tasks-provider";
import { getTasks } from "@/services/taskService";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function TasksPage({ params: { lang } }: any) {
  const session = await getServerSession(authOptions);
  const tasks = await getTasks(session?.userId!);
  const dict = await getDictionary(lang);

  return (
    <TaskProviderProvider value={{ tasks, dict: dict.tasks }}>
      <SocketProvider>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 q-full font-Inter">
          <div className="w-[1240px] mx-auto">
            <Header />
            <TaskBoard />
            <TaskEditor />
          </div>
        </div>
      </SocketProvider>
    </TaskProviderProvider>
  );
}
