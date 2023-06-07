import { AuthStrategy } from "../../enums/authStrategy.enum";

export interface User {
  username: string;
  authSet: string[];
  authStrategy: AuthStrategy;
}

export interface UserSet {
  authStrategy: string;
  set: (
    | {
        id: string;
        item: ({ id: string; word: string } | { id: string; link: string })[];
      }
    | string
  )[];
}
