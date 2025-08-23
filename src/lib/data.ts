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

export const findUser = (id: string): User | undefined => {
    // Also allow finding by roll number for login purposes
    const byId = users.find(u => u.id === id);
    if (byId) return byId;
    const byRollNumber = users.find(u => String(u.rollNumber) === id);
    return byRollNumber;
}

export const findUserByRollNumber = (rollNumber: number): User | undefined => {
    return users.find(u => u.rollNumber === rollNumber);
};


export const updateUser = (updatedUser: User): void => {
    const index = users.findIndex(u => u.rollNumber === updatedUser.rollNumber);
    if (index !== -1) {
        // If the ID (based on name) has changed, we need to handle it carefully
        const oldId = users[index].id;
        if(oldId !== updatedUser.id) {
            // If we just update the user in place, the old ID might still be in the array
            // if another user was created with the same name. It's safer to remove the old
            // one and add the new one.
            const userWithNewIdIndex = users.findIndex(u => u.id === updatedUser.id);
            if(userWithNewIdIndex !== -1 && userWithNewIdIndex !== index) {
                // Someone else already has the new ID, which shouldn't happen if names are unique.
                // For this demo, we will just overwrite. A real app should handle this conflict.
                console.warn(`Warning: Duplicate ID detected for ${updatedUser.id}. Overwriting.`);
                users.splice(userWithNewIdIndex, 1);
            }
        }
        
        users[index] = updatedUser;

    } else {
        // This case shouldn't happen if we're only updating existing users.
        users.push(updatedUser);
    }
};
