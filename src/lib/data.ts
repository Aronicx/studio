
'use client';

import type { User } from './types';

// Function to safely access localStorage
const getLocalStorage = (key: string, defaultValue: any) => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue) {
            try {
                return JSON.parse(storedValue);
            } catch (error) {
                console.error("Error parsing JSON from localStorage", error);
                return defaultValue;
            }
        }
    }
    return defaultValue;
};

const setLocalStorage = (key: string, value: any) => {
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

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
      passwordChanges: 0,
    });
  }
  return users;
};


// Initialize users from localStorage or generate default
export let users: User[] = getLocalStorage('users', null);
if (!users) {
    users = generateUsers(200);
    setLocalStorage('users', users);
}


export const findUser = (id: string): User | undefined => {
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
        const oldId = users[index].id;
        if(oldId !== updatedUser.id) {
            const userWithNewIdIndex = users.findIndex(u => u.id === updatedUser.id);
            if(userWithNewIdIndex !== -1 && userWithNewIdIndex !== index) {
                console.warn(`Warning: Duplicate ID detected for ${updatedUser.id}. Overwriting.`);
                users.splice(userWithNewIdIndex, 1);
            }
        }
        
        users[index] = updatedUser;

    } else {
        users.push(updatedUser);
    }
    setLocalStorage('users', users); // Save updated users array to localStorage
};
