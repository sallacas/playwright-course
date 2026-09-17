export type User = {
  username: string;
  password: string;
  isActive: boolean;
};

export const usuarios: User[] = [
  { username: "standard_user", password: "secret_sauce", isActive: true },
  { username: "locked_out_user", password: "secret_sauce", isActive: false },
  { username: "problem_user", password: "secret_sauce", isActive: true },
  { username: "performance_glitch_user", password: "secret_sauce", isActive: true },
];