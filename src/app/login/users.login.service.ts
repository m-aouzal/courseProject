import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({
  providedIn: 'root',
})
export class UsersloginService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4kcqCD1icQ70YH5iYBpDMwfKqfIBvWp8',
      { email: email, password: password, returnSecureToken: true }
    );
  }

  logout() {
    return;
  }
}

//   // Authenticate a user based on provided email and password
//   authenticateUser(email: string, password: string): Promise<boolean> {
//     return new Promise<boolean>((resolve) => {
//       setTimeout(() => {
//         const authenticatedUser = this.dummyUsers.find(user => user.email === email && user.password === password);
//         if (authenticatedUser) {
//           const token = this.generateAuthToken(); // Generate a token (implement this)
//           localStorage.setItem('role', authenticatedUser.status);
//           localStorage.setItem('authToken', token); // Store the token in localStorage
//           resolve(true); // Resolve with true if authentication is successful
//         } else {
//           resolve(false); // Resolve with false if authentication fails
//         }
//       }, 5000); // Simulate a 5-second delay
//     });
//   }

//   // Get the current authenticated user or return null
//   getCurrentUser(): User | null {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       const authenticatedUser = this.dummyUsers.find(user => user.email === token);
//       return authenticatedUser || null;
//     }
//     return null;
//   }

//   // Check if a user is authenticated
//   isAuthenticated(): boolean {
//     const currentUser = this.getCurrentUser();
//     return currentUser !== null;
//   }

//   // Generate a random authentication token
//   generateAuthToken(): string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const tokenLength = 32;
//     let token = '';
//     for (let i = 0; i < tokenLength; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       token += characters[randomIndex];
//     }
//     return token;
//   }

//   // Log out the user by removing authentication-related data from localStorage
//   logout() {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userId');
//   }
// }
