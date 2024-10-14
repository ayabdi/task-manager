/**
 * Represents a team within the application domain.
 */
export class Team {
    constructor(
      public readonly id: string,
      public name: string,
      public description: string | null,
      public memberIds: string[]
    ) {
      // Ensure that the name is provided
      if (!name) {
        throw new Error('Name is required');
      }
    }
  }