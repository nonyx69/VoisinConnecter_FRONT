import { OnInit, signal } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Component  } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { App } from '../../../app';


@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class Profil implements OnInit {
  pannelProfile = signal<User>(null);

  constructor(
    private route: ActivatedRoute,
    private userService: User,
    private app: App,
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');

    function openPannelProfil() {}

    function saveProfil() {}
  }
}






