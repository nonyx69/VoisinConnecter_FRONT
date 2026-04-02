import { Component, OnInit } from '@angular/core';
import { Admin, StatsData } from '../../../shared/models/admin.model';
import { App } from '../../../app';
import { AdminService } from '../../../core/services/admin';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent implements OnInit {
  stats: StatsData | null = null;
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';

  constructor(
    private adminService: AdminService,
    private userService: User,
    private StatsData: StatsData,
    private app: App,
  ) {}

  ngOnInit(): void {

    this.loadStats();
    this.loadUsers();
  }

  loadStats(): void {
    this.adminService.getStats().subscribe({
      next: (response) => {
        if (response.result) {
          this.stats = response.result;
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    });
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (response) => {
        if (response.result) {
          this.users = response.result;
          this.filteredUsers = [...this.users];
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    });
  }

  filterUsers(): void {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.users.filter(user =>
      user.Nom.toLowerCase().includes(query) ||
      user.prenom.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }

  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          this.filterUsers();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }
}
