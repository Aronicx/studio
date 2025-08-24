
'use client';

import { db } from './firebase';
import { collection, doc, getDoc, getDocs, setDoc, writeBatch, deleteDoc } from 'firebase/firestore';
import type { User } from './types';

const usersCollection = collection(db, 'users');

const generateInitialUsers = (): Omit<User, 'id'>[] => {
  const users: Omit<User, 'id'>[] = [];
  for (let i = 1; i <= 200; i++) {
    users.push({
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

// Function to seed the database with initial users if it's empty
export const seedDatabase = async () => {
    const snapshot = await getDocs(usersCollection);
    if (snapshot.empty) {
        console.log("Database is empty, seeding with initial users...");
        const initialUsers = generateInitialUsers();
        const batch = writeBatch(db);

        initialUsers.forEach((userData) => {
            const nameId = `user-${userData.rollNumber}`;
            const userDocRef = doc(db, 'users', nameId);
            batch.set(userDocRef, { ...userData, id: nameId });
        });
        
        await batch.commit();
        console.log("Database seeded successfully.");
    } else {
        console.log("Database already contains users.");
    }
};


// In-memory cache to reduce Firestore reads
let allUsersCache: User[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const isCacheValid = () => {
    return allUsersCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION);
}

export const getAllUsers = async (): Promise<User[]> => {
    if (isCacheValid()) {
        return allUsersCache!;
    }

    const snapshot = await getDocs(usersCollection);
    if (snapshot.empty) {
        await seedDatabase();
        const seededSnapshot = await getDocs(usersCollection);
        allUsersCache = seededSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    } else {
        allUsersCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    }
    
    cacheTimestamp = Date.now();
    return allUsersCache;
}


export const findUser = async (id: string): Promise<User | null> => {
    const users = await getAllUsers();
    // Try finding by ID first.
    let user = users.find(u => u.id === id);
    if (user) return user;
    
    // If not found by ID, try finding by roll number as a fallback.
    user = users.find(u => String(u.rollNumber) === id);
    
    return user || null;
}

export const findUserByRollNumber = async (rollNumber: number): Promise<User | null> => {
    const users = await getAllUsers();
    const user = users.find(u => u.rollNumber === rollNumber);
    return user || null;
};


export const updateUser = async (originalId: string, updatedUser: User): Promise<void> => {
    // If the ID has changed, we need to delete the old document and create a new one.
    if (originalId !== updatedUser.id) {
        const oldDocRef = doc(db, 'users', originalId);
        const newDocRef = doc(db, 'users', updatedUser.id);
        
        const batch = writeBatch(db);
        batch.delete(oldDocRef);
        batch.set(newDocRef, updatedUser);
        await batch.commit();

        // If the logged in user changed their own ID, update localStorage
        if(localStorage.getItem('loggedInUserId') === originalId) {
            localStorage.setItem('loggedInUserId', updatedUser.id);
        }
    } else {
        // If ID is the same, just update the document.
        const userDocRef = doc(db, 'users', updatedUser.id);
        await setDoc(userDocRef, updatedUser, { merge: true });
    }

    // Invalidate cache
    allUsersCache = null;
    cacheTimestamp = null;
};
