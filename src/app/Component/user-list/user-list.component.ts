import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  image: string;
  is_verified: boolean;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchEmail: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('users.json').subscribe(
      (data) => {
        console.log('Loaded users:', data);
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => console.error('Error loading users:', error)
    );
  }

  searchUsers() {
    console.log('Searching for:', this.searchEmail);
    if (this.searchEmail.trim()) {
      this.filteredUsers = this.users.filter((user) =>
        user.email.toLowerCase().includes(this.searchEmail.toLowerCase().trim())
      );
    } else {
      this.filteredUsers = this.users;
    }
    console.log('Filtered users:', this.filteredUsers);
  }

  resetSearch() {
    this.searchEmail = '';
    this.filteredUsers = this.users;
  }
}
