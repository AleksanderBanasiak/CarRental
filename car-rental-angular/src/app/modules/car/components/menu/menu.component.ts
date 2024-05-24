import {Component, OnInit} from '@angular/core';
import {AuthenticationControllerService} from "../../../../services/services/authentication-controller.service";
import {CarControllerService} from "../../../../services/services/car-controller.service";
import {findAllCars} from "../../../../services/fn/car-controller/find-all-cars";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.navv');
    linkColor.forEach(link => {
      if(window.location.href.endsWith(link.getAttribute('href') || '')){
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      })
    } );
  }

}
