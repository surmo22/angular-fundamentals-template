import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '@shared/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShowCourse(courseId: string): void {
    this.showCourse.emit(courseId);
  }

  onEditCourse(courseId: string): void {
    this.editCourse.emit(courseId);
  }

  onDeleteCourse(courseId: string): void {
    this.deleteCourse.emit(courseId);
  }
}