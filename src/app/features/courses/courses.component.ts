import {Component, OnInit} from '@angular/core';
import {Course} from "@shared/models/course.model";
import {mockedCoursesList} from "@shared/mocks/mock";
import {CoursesService} from "@app/services/courses.service";
import {CoursesStoreService} from "@app/services/courses-store.service";
import {UserStoreService} from "@app/user/services/user-store.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  filterSearch($event: string) {
    if ($event.trim()) {
      this.courseService.filterCourses($event).subscribe({
        error: (error) => {
          console.error('Error filtering courses:', error);
        }
      });
    } else {
      this.courseService.getAll();
    }

  }
  courses$: Observable<Course[]> = this.courseService.courses$;
  isEditable = true;

  constructor(private courseService: CoursesStoreService,
              private userStoreService: UserStoreService,
              private router: Router) {}

  ngOnInit(): void {
    this.courseService.getAll();
    console.log('Courses after initialization:', this.courses$);
    this.userStoreService.isAdmin$
        .subscribe(isAdmin => { this.isEditable = isAdmin;});
  }

  onShowCourse(courseId: string): void {
    // Handle show course action
    console.log('Show course:', courseId);
    this.router.navigate(['/courses', courseId]);
    // Add navigation or modal display logic here
  }

  onEditCourse(courseId: string): void {
    // Handle edit course action
    this.router.navigate(['/courses/edit', courseId]);
    // Add navigation to edit form or modal display logic here
  }

  onDeleteCourse(courseId: string): void {
    // Handle delete course action
    this.courseService.deleteCourse(courseId);
    console.log('Delete course:', courseId);
    // Add confirmation dialog and deletion logic here
  }

  navigateToCoursesAdd() {
    this.router.navigate(['/courses/add']);
  }
}

