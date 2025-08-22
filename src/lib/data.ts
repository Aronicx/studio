import type { User } from './types';

const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Saanvi", "Aanya", "Aadhya", "Ananya", "Pari", "Diya", "Myra", "Anika", "Sara", "Kiara"];
const lastNames = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Reddy", "Mehta", "Shah", "Joshi"];
const colleges = ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "BITS Pilani", "NIT Trichy", "VIT Vellore"];
const hobbiesList = ["Reading", "Gaming", "Coding", "Music", "Sports", "Movies", "Dancing", "Cooking", "Traveling", "Photography"];

function generatePassword(length = 12): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 1; i <= count; i++) {
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const id = name.toLowerCase().replace(/\s+/g, '-') + `-${i}`;
    users.push({
      id: id,
      name: name,
      rollNumber: i,
      college: colleges[Math.floor(Math.random() * colleges.length)],
      contact: {
        phone: `+91 98765${String(Math.floor(10000 + Math.random() * 90000))}`,
        instagram: `${name.toLowerCase().replace(/\s+/g, ".")}._`,
        snapchat: `${name.toLowerCase().replace(/\s+/g, "")}snaps`,
        discord: `${name.replace(/\s+/g, "")}#${String(Math.floor(1000 + Math.random() * 9000))}`,
        gmail: `${name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
        other: ""
      },
      hobbies: [...new Set(Array.from({ length: Math.ceil(Math.random() * 3) + 1 }, () => hobbiesList[Math.floor(Math.random() * hobbiesList.length)]))],
      profilePicture: `https://placehold.co/400x400.png`,
      dailyThought: "Aspire to inspire before we expire. This is a default thought, feel free to change it!",
      password: generatePassword(),
      passwordChanged: false,
    });
  }
  return users;
};

export const users: User[] = generateUsers(200);

export const findUser = (id: string): User | undefined => users.find(u => u.id === id);
