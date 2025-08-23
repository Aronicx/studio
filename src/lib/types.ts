export interface User {
  id: string;
  name: string;
  rollNumber: number;
  contact: {
    phone?: string;
    instagram?: string;
    snapchat?: string;
    discord?: string;
    gmail?: string;
    other?: string;
  };
  college: string;
  hobbies: string[];
  profilePicture: string;
  dailyThought: string;
  password: string;
  passwordChanges: number;
}
