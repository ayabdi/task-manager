'use client'

import React, { useState } from 'react'

import { Team } from '@prisma/client'
import Button from '../Button'
import useTeamForm from '@/app/hooks/useTeamForm'
import ListBox from '../ListBox'

const TeamForm = ({ teams, dict }: { teams: Team[]; dict: any }) => {
  const { loading, onSubmit, selectedTeam, selectTeam } = useTeamForm(teams)
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
