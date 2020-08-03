export interface UserNonConfidentialData {
  userName: string;
  email: string;
}

interface User extends UserNonConfidentialData {
  creationDate: string;
  password: string;
}

export default User;
