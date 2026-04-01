import { Component, OnInit } from '@angular/core';
import { AdminService, User, StatsData } from '../../../core/services/admin';

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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadUsers();
  }

  loadStats(): void {
    this.adminService.getStats().subscribe({
      next: (res) => {
        if (res.status === 'ok' && res.result) {
          this.stats = res.result;
        }
      },
      error: (err) => console.error('Erreur lors du chargement des statistiques', err),
    });
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        if (res.status === 'success' && res.result) {
          this.users = res.result;
          this.filteredUsers = [...this.users];
        }
      },
      error: (err) => console.error('Erreur lors du chargement des utilisateurs', err),
    });
  }

  filterUsers(): void {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.users.filter(
      (user) =>
        user.id.toString().includes(query) ||
        (user.nom && user.nom.toLowerCase().includes(query)) ||
        (user.prenom && user.prenom.toLowerCase().includes(query)),
    );
  }

  deleteUser(id: number): void {
    if (confirm('Es-tu sûr de vouloir supprimer définitivement cet utilisateur ?')) {
      this.adminService.deleteUser(id).subscribe({
        next: (res) => {
          if (res.status === 'ok') {
            this.users = this.users.filter((u) => u.id !== id);
            this.filterUsers();

            if (this.stats) {
              this.stats.totalUsers--;
            }
          }
        },
        error: (err) => console.error("Erreur lors de la suppression de l'utilisateur", err),
      });
    }
  }
}
