import {
    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    assignUserToTeam,
  } from '@/services/teamService';
  import { prismaMock } from '../../../jest.setup';
  
  describe('Team Service', () => {
    describe('getTeams', () => {
        it('should fetch all teams', async () => {
            // Simplified and unique mock data
            const teams = [
              {
                id: 'team-1',
                name: 'Team 1',
                description: 'Description 1',
                createdAt: new Date('2024-10-13T07:30:13.185Z'),
                updatedAt: new Date('2024-10-13T07:30:13.185Z'),
              },
              {
                id: 'team-2',
                name: 'Team 2',
                description: 'Description 2',
                createdAt: new Date('2024-10-13T07:30:13.185Z'),
                updatedAt: new Date('2024-10-13T07:30:13.185Z'),
              },
            ];
      
            // Mock the Prisma client's findMany method to return the expected teams
            prismaMock.team.findMany.mockResolvedValue(teams);
      
            // Call the getTeams function
            const result = await getTeams();
      
            // Assert that the result matches the expected teams
            expect(result).toEqual(teams);
          });
    });
  
    describe('getTeamById', () => {
      it('should fetch a team by ID', async () => {
        const team = { id: 'team-1', name: 'Team 1', description: 'Description 1', createdAt: new Date(), updatedAt: new Date() };
        prismaMock.team.findUnique.mockResolvedValue(team);
  
        const result = await getTeamById('team-1');
  
        expect(result).toEqual(team);
      });
  
      it('should return null if team not found', async () => {
        prismaMock.team.findUnique.mockResolvedValue(null);
  
        const result = await getTeamById('non-existent-id');
  
        expect(result).toBeNull();
      });
    });
  
    describe('createTeam', () => {
      it('should create a new team', async () => {
        const teamData = { name: 'New Team', description: 'New Description' };
        const createdTeam = { id: 'team-3', ...teamData, createdAt: new Date(), updatedAt: new Date() };
        prismaMock.team.create.mockResolvedValue(createdTeam);
  
        const result = await createTeam(teamData);
  
        expect(result).toEqual(createdTeam);
      });
    });
  
    describe('updateTeam', () => {
      it('should update an existing team', async () => {
        const team = {
          id: 'team-1',
          name: 'Team 1',
          description: 'Description 1',
          members: [{ id: 'user-123' }],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const updates = { name: 'Updated Team' };
        const updatedTeam = { ...team, ...updates };
  
        prismaMock.team.findUnique.mockResolvedValue(team);
        prismaMock.team.update.mockResolvedValue(updatedTeam);
  
        const result = await updateTeam('team-1', updates, 'user-123');
  
        expect(result).toEqual(updatedTeam);
      });
  
      it('should throw an error if team does not exist', async () => {
        prismaMock.team.findUnique.mockResolvedValue(null);
  
        await expect(updateTeam('non-existent-id', {}, 'user-123')).rejects.toThrow(
          'Team does not exist'
        );
      });
  
      it('should throw an error if user is not a member', async () => {
        const team = {
          id: 'team-1',
          name: 'Team 1',
          description: 'Description 1',
          members: [{ id: 'user-456' }],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
  
        prismaMock.team.findUnique.mockResolvedValue(team);
  
        await expect(updateTeam('team-1', {}, 'user-123')).rejects.toThrow(
          'User is not a member of the team'
        );
      });
    });
  
    describe('deleteTeam', () => {
      it('should delete a team', async () => {
        const team = {
          id: 'team-1',
          name: 'Team 1',
          description: 'Description 1',
          members: [{ id: 'user-123' }],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
  
        prismaMock.team.findUnique.mockResolvedValue(team);
        prismaMock.team.delete.mockResolvedValue(team);
  
        const result = await deleteTeam('team-1', 'user-123');
  
        expect(result).toEqual(team);
      });
  
      it('should throw an error if team does not exist', async () => {
        prismaMock.team.findUnique.mockResolvedValue(null);
  
        await expect(deleteTeam('non-existent-id', 'user-123')).rejects.toThrow(
          'Team does not exist'
        );
      });
  
      it('should throw an error if user is not a member', async () => {
        const team = {
          id: 'team-1',
          name: 'Team 1',
          description: 'Description 1',
          members: [{ id: 'user-456' }],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
  
        prismaMock.team.findUnique.mockResolvedValue(team);
  
        await expect(deleteTeam('team-1', 'user-123')).rejects.toThrow(
          'User is not a member of the team'
        );
      });
    });
  
    describe('assignUserToTeam', () => {
      it('should assign a user to a team', async () => {
        const user = { id: 'user-123', teamId: null };
        const updatedUser = { ...user, teamId: 'team-1' };
  
        prismaMock.user.update.mockResolvedValue(updatedUser);
  
        const result = await assignUserToTeam('user-123', 'team-1');
  
        expect(result).toEqual(updatedUser);
      });
    });
  });