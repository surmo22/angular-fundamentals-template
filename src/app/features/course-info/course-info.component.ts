import {Component, OnInit} from '@angular/core';
import {Course} from "@shared/models/course.model";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  displayedCourse: Course | null = null;

  constructor(
  ){}

  ngOnInit(): void {

  }
}
