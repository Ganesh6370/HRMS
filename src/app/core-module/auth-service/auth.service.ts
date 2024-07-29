import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: any;

  constructor(private http: HttpClient, private router: Router) { }
  
    private createHeaders(): HttpHeaders { 
      const token = localStorage.getItem('token');
      let headers = new HttpHeaders();
  
      if (token) {
        const authorizationHeader = `Bearer ${token}`;
        headers = headers.set('www-authenticate', authorizationHeader);
      }
  
      headers = headers.set('Content-Type', 'application/json');
      return headers;
    }

    getUserProfile(): Observable<any> { 
      const token = localStorage.getItem('token');
      if (!token) {
        return throwError('Token is not available.');
      }
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
      return this.http.get('https://ecomidentity.koiv.in/api/User', { headers: headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Unauthorized. Redirect to login page or handle accordingly.');
          }
          console.error('Error fetching user profile:', error);
          return throwError(error);
        })
      );
    }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

   
  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      
      return tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;

    }
    return null;
  }


  login(username: string, password: string, deviceId: string, rememberLogin: boolean, returnUrl: string): Observable<any> {
    const payload = { username, password, deviceId, rememberLogin, returnUrl };
    return this.http.post<any>('https://ecomidentity.koiv.in/api/Auth/login', payload)
      .pipe(
        map(response => {
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('username',response.data.userName);
          return response;
        }),
        catchError(error => {
          return throwError(new Error(error.error));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['login']);
 }

 changepassword(userEmail: string, oldPassword: string, newPassword: string): Observable<any> {
  const payload = { userEmail, oldPassword, newPassword };
  console.log('Change Password Payload:', payload);

  return this.http.post<any>('https://ecomidentity.koiv.in/api/User/ChangePassword', payload, { headers: this.createHeaders() }).pipe(
    map(response => {
      console.log('Change Password Response:', response);
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', response.data.userEmail);
      }
      return response;
    }),
    catchError(error => {
      console.error('Error changing password:', error);
      const errorMessage = error.error?.message || error.message || 'Error changing password';
      console.error('Detailed Error:', errorMessage);
      return throwError(new Error(errorMessage));
  })
 );
 }
 }