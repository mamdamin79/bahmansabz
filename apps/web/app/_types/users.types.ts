export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  age: number;
  gender: string;
  image: string;
  role: string;
  company: {
    name: string;
    title: string;
    department: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

/** Single user from GET /users/:id (DummyJSON) */
export interface UserDetail extends User {
  maidenName?: string;
  birthDate?: string;
  bloodGroup?: string;
  university?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
  };
}
