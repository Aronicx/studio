import type { User } from './types';

// The app will start with a single template user.
// The user can then click on it to edit it and make it their own.
const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  if (count > 0) {
    users.push({
      id: "enter-your-name-1",
      name: "Enter Your Name",
      rollNumber: 1,
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

export const users: User[] = generateUsers(1);

export const findUser = (id: string): User | undefined => users.find(u => u.id === id);
