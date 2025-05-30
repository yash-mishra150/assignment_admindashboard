import axios from "axios";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role?: string[];
  status?: string;
}

export const getUsersData = async (): Promise<User[]> => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    if (res.status !== 200) {
        throw new Error('Failed to fetch users data');
    }
    
    // Transform JSONPlaceholder data to match our User type
    return res.data.map((user: any) => ({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
      // We can keep these for background coloring if needed
      role: getRandomRoles(),
      // Randomly assign status for some users
      status: Math.random() > 0.7 ? "Not Logged In" : undefined
    }));
}

// Helper function to generate random roles
function getRandomRoles(): string[] {
  const allRoles = ["Admin", "Manager", "Auditor"];
  const numRoles = Math.floor(Math.random() * 3) + 1; // 1-3 roles
  const shuffled = [...allRoles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numRoles);
}