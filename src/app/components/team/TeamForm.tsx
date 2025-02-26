'use client'

import React from 'react'

import { Team } from '@prisma/client'
import Button from '../Button'
import useTeamForm from '@/app/hooks/useTeamForm'
import ListBox from '../ListBox'
import { User } from '@/domain/entities/User'

const TeamForm = ({ teams, dict, user }: { teams: Team[]; dict: any, user: User }) => {
  const { loading, onSubmit, selectedTeam, selectTeam } = useTeamForm(teams, user)
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-2" onSubmit={onSubmit}>
        {!!teams?.length && (
          <ListBox
            label={dict.teams}
            options={teams.map(t => t.name)}
            selected={selectedTeam?.name || teams[0].name || ''}
            setSelected={s => selectTeam(s)}
          />
        )}
        <div className="!mt-6">
          <Button type="submit" loading={loading}>
            {dict.joinTeam}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TeamForm
