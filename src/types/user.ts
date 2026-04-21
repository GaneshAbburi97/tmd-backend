export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  preferences: Record<string, unknown>;
}
