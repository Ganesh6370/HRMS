import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core-module/auth-service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  hide: boolean = true;
  submitClicked: boolean = false;

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]], // Changed 'email' to 'username'
    password: ['', [Validators.required]]
  });
  

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['main']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitClicked = false;
      
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      const deviceId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
      const rememberLogin = true; 
      const returnUrl = 'string'; 
  
      this.auth.login(username, password, deviceId, rememberLogin, returnUrl).subscribe(
        (result) => {
          console.log(result);
          if (result.statusCode === 200) {
            this.router.navigate(['/main']);
          } else {
            // Handle unsuccessful login, maybe show an error message
            alert(result.message); // Assuming the error message is provided in the result object
          }
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    } else {
      this.submitClicked=true;
}
}
}