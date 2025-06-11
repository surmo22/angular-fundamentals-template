import {Component, OnInit} from '@angular/core';
import {Course} from "@shared/models/course.model";
import {mockedCoursesList} from "@shared/mocks/mock";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  filterSearch($event: string) {
    console.log('Filter search:', $event);
    return;
  }
  courses: Course[] = [];
  isEditable = true;

  ngOnInit(): void {
    this.courses = mockedCoursesList.map(course => ({
      ...course,
      creationDate: course.creationDate ? new Date(course.creationDate) : undefined
    }));
    console.log('Courses after initialization:', this.courses);


  }

  onShowCourse(courseId: string): void {
    // Handle show course action
    console.log('Show course:', courseId);
    // Add navigation or modal display logic here
  }

  onEditCourse(courseId: string): void {
    // Handle edit course action
    console.log('Edit course:', courseId);
    // Add navigation to edit form or modal display logic here
  }

  onDeleteCourse(courseId: string): void {
    // Handle delete course action
    console.log('Delete course:', courseId);
    // Add confirmation dialog and deletion logic here
  }
}

