import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Team } from '@prisma/client'
import { User } from '@/domain/entities/User'
import { toast } from 'react-toastify'

// Custom hook for managing team selection and submission
const useTeamForm = (teams: Team[], user: User) => {
  // State to hold the selected team and loading status
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams.find(t => t.id === user.teamId) || teams[0])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Function to select a team by name
  const selectTeam = (name: string) => {
    const team = teams.find(t => t.name === name)
    if (team) {
      setSelectedTeam(team)
    }
  }

  // Function to handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission
    if (!selectedTeam) return // Exit if no team is selected

    setLoading(true) // Set loading state to true
    try {
      const response = await fetch('/api/team/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamId: selectedTeam.id }) // Send selected team ID
      })

      if (!response.ok) {
        throw new Error('Failed to join team') // Handle error response
      }

      router.push('/tasks') // Redirect to tasks page on success
    } catch (data: any) {
      toast.error(data.error)
    } finally {
      setLoading(false) // Reset loading state
    }
  }

  return { loading, onSubmit, selectTeam, selectedTeam } // Expose state and functions
}

export default useTeamForm
