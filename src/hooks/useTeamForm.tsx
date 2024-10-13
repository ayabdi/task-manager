import { useState } from "react";
import { useRouter } from "next/navigation";
import { Team } from "@prisma/client";

// Custom hook for managing team selection and submission
const useTeamForm = (teams: Team[]) => {
  // State to hold the selected team and loading status
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to select a team by name
  const selectTeam = (name: string) => {
    const team = teams.find((t) => t.name === name);
    if (team) {
      setSelectedTeam(team);
    }
  };

  // Function to handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (!selectedTeam) return; // Exit if no team is selected

    setLoading(true); // Set loading state to true
    try {
      const response = await fetch("/api/team/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId: selectedTeam }), // Send selected team ID
      });

      if (!response.ok) {
        throw new Error("Failed to join team"); // Handle error response
      }

      router.push("/tasks"); // Redirect to tasks page on success
    } catch (error) {
      console.error(error); // Log any errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { loading, onSubmit, selectTeam, selectedTeam }; // Expose state and functions
};

export default useTeamForm;