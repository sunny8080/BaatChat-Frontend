import type { UserLoginType } from "../utils/constant";


// todo write js docs
export default interface UserInterface {
  id: string;
  name: string;
  email: string;
  username: string;
  isEmailVerified: boolean;
  avatarUrl: string;
  bio: string;
  loginType: UserLoginType;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

