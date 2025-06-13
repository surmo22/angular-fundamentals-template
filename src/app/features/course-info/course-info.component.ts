import {Component, OnInit} from '@angular/core';
import {Course} from "@shared/models/course.model";
import {CoursesStoreService} from "@app/services/courses-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  displayedCourse: Course | null = null;

  constructor(private route:ActivatedRoute,
              private coursesFacade: CoursesStateFacade,
              private router:Router
  ){}

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    if(courseId){
      this.coursesFacade.getSingleCourse(courseId);
      this.coursesFacade.course$.subscribe((course) => {
        this.displayedCourse = course;
      });
    }
  }

  navigateBack(){
    this.router.navigate(['/courses']);
  }
}
