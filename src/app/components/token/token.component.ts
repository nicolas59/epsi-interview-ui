import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  token: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submit() {
    localStorage.setItem('token', this.token);
  }

}
