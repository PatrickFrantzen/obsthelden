import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent {
  private router = inject(Router);

  showCompleted = false;
  userName = 'Max Mustermann'; // Beispielname, kann dynamisch gesetzt werden

  tasks = [
    {
      title: 'Tisch abräumen',
      description: 'Nach dem Essen',
      done: false,
      childName: 'Max',
    },
    {
      title: 'Spielzeug wegräumen',
      description: 'Wohnzimmer aufräumen',
      done: true,
      childName: 'Lena',
    },
  ];

  filteredTasks() {
    return this.tasks.filter((task) => this.showCompleted || !task.done);
  }

  navigateToNewTask() {
    this.router.navigate(['/new-task']);
  }
}
