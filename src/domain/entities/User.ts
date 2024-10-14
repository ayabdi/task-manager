/**
 * Represents a user within the application domain.
 */
export class User {
    constructor(
      public readonly id: string,
      public name: string | null,
      public email: string,
      public password: string,
      public teamId: string | null
    ) {
      // Ensure that the email and password are provided
      if (!email) {
        throw new Error('Email is required');
      }
      if (!password) {
        throw new Error('Password is required');
      }
    }
  }