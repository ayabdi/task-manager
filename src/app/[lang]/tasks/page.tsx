import Header from '@/app/components/tasks/Header'
import TaskBoard from '@/app/components/tasks/TaskBoard'
import TaskEditor from '@/app/components/tasks/TaskEditor'
import { SocketProvider } from '@/providers/socket-provider'
import { getDictionary } from '../dictonaries'
import { TaskProviderProvider } from '@/providers/tasks-provider'
import { getTasks } from '@/services/taskService'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { fetchUserRecord } from '@/services/userService'

export default async function TasksPage({ params: { lang } }: { params: { lang: string } }) {
  const session = await getServerSession(authOptions)
  const tasks = await getTasks(session!.userId)
  const user = await fetchUserRecord()
  const dict = await getDictionary(lang)

  return (
    <TaskProviderProvider value={{ tasks, dict: dict.tasks, user }}>
      <SocketProvider>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 w-full font-Inter">
          <div className="w-[1240px] mx-auto">
            <Header />
            <TaskBoard />
            <TaskEditor />
          </div>
        </div>
      </SocketProvider>
    </TaskProviderProvider>
  )
}
