import {Component, OnInit} from '@angular/core';
import {Course} from "@shared/models/course.model";
import {CoursesStoreService} from "@app/services/courses-store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  displayedCourse: Course | null = null;

  constructor(private route:ActivatedRoute,
              private courseStoreService: CoursesStoreService,
              private router:Router
  ){}

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseStoreService.getCourse(courseId);
      this.courseStoreService.course$.subscribe(course => {this.displayedCourse = course;})
    }
  }

  navigateBack(){
    this.router.navigate(['/courses']);
  }
}
