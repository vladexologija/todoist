import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any = [];
  items: any = [];

  constructor(private service: ProjectsService) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.service.getProjects().subscribe(
      data => {
        this.projects = data;
        // REMOVE
        this.items = data[0].items;
        console.log('items', this.items);
      },
      err => console.log(err),
      () => { }
    );
  }

  addItem(item) {
    this.items.push(item);
  }

  saveItem(item) {
    // TODO use typescript
    // use two way data binding
    console.log('item', item);
    this.service.updateProjects(item.projectId, {});
  }

  toggleEditMode(id) {
    const item = this.items.find((i) => i.id === id);
    if (item.id === '12345') {
      this.items = this.items.filter((i) => i.id !== id);
    } else {
      item.isEditMode = !item.isEditMode;
    }
  }

}
