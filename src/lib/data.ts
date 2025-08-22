import type { User } from './types';

// The app will start with a single template user.
// The user can then click on it to edit it and make it their own.
const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 1; i <= count; i++) {
    users.push({
      id: `enter-your-name-${i}`,
      name: "Enter Your Name",
      rollNumber: i,
      college: "Your College",
      contact: {
        phone: "",
        instagram: "",
        snapchat: "",
        discord: "",
        gmail: "",
        other: ""
      },
      hobbies: ["Edit to add your hobbies"],
      profilePicture: `https://placehold.co/400x400.png`,
      dailyThought: "This is your space to share a thought. Make it unique!",
      password: "password", // Default password
      passwordChanged: false,
    });
  }
  return users;
};

export let users: User[] = generateUsers(200);

export const findUser = (id: string): User | undefined => users.find(u => u.id === id);

export const updateUser = (updatedUser: User): void => {
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;

        // A real app would save to a database here.
        // For this demo, we can simulate persistence if needed,
        // but for now, it's just in-memory.
    }
};
