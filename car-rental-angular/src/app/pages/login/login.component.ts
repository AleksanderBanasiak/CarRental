import {Component, OnInit} from '@angular/core';
import {AuthRequest} from "../../services/models/auth-request";
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {TokenService} from "../../services/token/token.service";
import {animate, state, style, transition, trigger} from "@angular/animations";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('toggleAnimation', [
      state('inactive', style({
        opacity: 1,
        transform: 'translateX(0)',
        borderRadius: '100px 0  0 100px'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateX(-100%)',
        borderRadius: '0 100px 100px 0'
      })),
      transition('inactive <=> active', animate('0.6s ease-in-out'))
    ]),
    trigger('toggleSlideAnimation', [
      state('left', style({
        transform: 'translateX(0)',
        opacity: 0,
      })),
      state('right', style({
        transform: 'translateX(100%)',
        opacity: 1,
      })),
      transition(
        'left => right',[
          animate('0s', style({ opacity: 0 })),
          animate('0.6s ease-in-out'),
      ])
    ]),
    trigger('toggleSlideAnimation2', [
      state('left', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      state('right', style({
        transform: 'translateX(100%)',
        opacity: 0,
      })),
      transition(
        'right => left',[
          animate('0s', style({ opacity: 0 })),
          animate('0.6s ease-in-out'),
        ])
    ]),
    trigger('panel', [
      state('inactive', style({
        transform: 'translateX(0)',
        opacity: 0,
      })),
      state('active', style({
        transform: 'translateX(100%)',
        opacity: 1,
      }))
    ]),
    trigger('panel2', [
      state('inactive', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      state('active', style({
        transform: 'translateX(100%)',
        opacity: 0,
      }))
    ])
  ]
})
export class LoginComponent implements OnInit{




  authRequest: AuthRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService
  ) {
  }


  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['cars']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        }else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

  register() {
    // this.router.navigate(['register']);
    setTimeout(() => { this.router.navigate(['register']); }, 600);
  }

  ngOnInit(): void {
  }

  isActive: boolean = false;
  toggleAnimation() {
    this.isActive = !this.isActive;
    setTimeout(() => { this.router.navigate(['register']); }, 600);

  }


}
