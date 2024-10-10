import { useState } from "react";
import { useRouter } from "next/navigation";
import { Team } from "@prisma/client";

const useTeamForm = (teams: Team[]) => {
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const selectTeam = (name: string) => {
    const team = teams.find((t) => t.name === name);
    if (team) {
      setSelectedTeam(team);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    // Accept teamName as a parameter
    e.preventDefault();
    if (!selectedTeam) return;

    setLoading(true);
    try {
      const response = await fetch("/api/team/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId: selectedTeam }), // Use teamName directly
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

  return { loading, onSubmit, selectTeam, selectedTeam};
};

export default useTeamForm;
