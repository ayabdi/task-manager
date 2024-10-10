"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ListBox from "@/components/ListBox";
import { Team } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch("/api/team");
      const data = await response.json();

      if (data?.length) {
        setTeams(data);
        setSelectedTeam(data[0]);
      }
    };

    fetchTeams();
  }, []);

  const selectTeam = (name: string) => {
    const team = teams.find((t) => t.name === name);
    if (team) {
      setSelectedTeam(team);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam) return;

    setLoading(true);
    try {
      const response = await fetch("/api/team/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId: selectedTeam.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to join team");
      }

      router.push("/tasks");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=orange&shade=600"
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Join a Team, Collaborate!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-2"
          onSubmit={onSubmit}
        >
          <ListBox
            label="Teams"
            options={teams.map((t) => t.name)}
            selected={selectedTeam?.name || ""}
            setSelected={(s) => selectTeam(s)}
          />
          <div className="!mt-6">
            <Button type="submit" loading={loading}>
              Join Team
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
