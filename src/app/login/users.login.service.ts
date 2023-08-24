import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersloginService {

  constructor() { }
  dummyUsers: User[] = [
    {
      id: 1,
      username: 'aouzal',
      email: 'aouzal@example.com',
      password: 'a',
      status: 'admin'
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
      status: 'client'
    },
    {
      id: 3,
      username: 'user3',
      email: 'user3@example.com',
      password: 'password3',
      status: 'client'
    },
    {
      id: 4,
      username: 'user4',
      email: 'user4@example.com',
      password: 'password4',
      status: 'client'
    },
    {
      id: 5,
      username: 'user5',
      email: 'user5@example.com',
      password: 'password5',
      status: 'client'
    }
  ];


  authenticateUser(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const authenticatedUser = this.dummyUsers.find(user => user.email === email && user.password === password);
        if (authenticatedUser) {
          const token = this.generateAuthToken(); // Generate a token (implement this)
          localStorage.setItem('role', authenticatedUser.status);
          localStorage.setItem('authToken', token); 
 
          // Store the token in localStorage
          resolve(true);
        } else {
          resolve(false);
        }
      }, 5000); // Simulate a 5-second delay
    });
  }

  getCurrentUser(): User | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const authenticatedUser = this.dummyUsers.find(user => user.email === token); // In this example, token is the email
      return authenticatedUser || null;
    }
    return null;
  }


  isAuthenticated(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser !== null;
  }

  generateAuthToken(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 32;
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }



}
