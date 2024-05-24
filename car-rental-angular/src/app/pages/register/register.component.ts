import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit{

  registerRequest: RegistrationRequest = {name: '', email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
  }


  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    })

  }

  login() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }


  isActive: boolean = true;
  toggleAnimation() {
    this.isActive = !this.isActive;
    setTimeout(() => { this.router.navigate(['login']); }, 600);

  }

}
