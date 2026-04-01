import { OnInit, signal } from '@angular/core';
import { User } from '../../../core/services/user';
import { Component  } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { App } from '../../../app';


@Component({
  selector: 'app-user',
  imports: [CommonModule],
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






