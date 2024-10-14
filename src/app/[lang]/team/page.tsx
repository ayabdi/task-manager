import TeamForm from "@/app/components/team/TeamForm";
import { getTeams } from "@/services/teamService";
import { getDictionary } from "../dictonaries";
import Image from "next/image";
import logo from '@/app/icons/logo.svg'

export default async function TeamsPage({ params: { lang } }: { params: { lang: string } }) {
  const teams = await getTeams();
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src={logo}
          className="mx-auto h-14 w-auto"
          width={56}
          height={56}
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {dict.team.header}
        </h2>
      </div>

      <TeamForm teams={teams} dict={dict.team} />
    </div>
  );
}
