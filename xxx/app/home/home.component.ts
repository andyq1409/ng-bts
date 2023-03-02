import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

}
