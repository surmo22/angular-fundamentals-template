import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {mockedAuthorsList} from "@shared/mocks/mock";
import {CoursesStoreService} from "@app/services/courses-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Author} from "@shared/models/author.model";
import {Course} from "@shared/models/course.model";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary,
              private courseStoreService: CoursesStoreService,
              private router: Router,
              private route: ActivatedRoute) {
    library.addIconPacks(fas);

  }
  
  allAuthors: Author[] = [];
  editCourse: Course | null = null;
  
  courseForm: FormGroup = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(2)]],
    description: ["", [Validators.required, Validators.minLength(2)]],
    author: ["", [Validators.pattern("^[A-Za-z0-9]+$"), Validators.minLength(2)]],
    authors: this.fb.array<Author>([]),
    courseAuthors: this.fb.array<Author>([]),
    duration: ["", [Validators.required, Validators.min(0)]],
  });
  protected submitted: boolean = false;

  ngOnInit(): void {
    this.courseStoreService.authors$.subscribe((authors) => {
      this.allAuthors = authors;
      // Instead of setting value, create form groups for each author
      const authorsArray = this.courseForm.get('authors') as FormArray;
      authorsArray.clear(); // Clear existing items
      authors.forEach(author => {
        authorsArray.push(new FormControl(author, { nonNullable: true }));
      });
    });

    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseStoreService.getCourse(courseId);
      this.courseStoreService.course$.subscribe(course => {
        if (course) {
          this.editCourse = course;
          this.courseForm.patchValue({
            title: course.title,
            description: course.description,
            duration: course.duration
          });

          // Handle course authors
          const courseAuthorsArray = this.courseForm.get('courseAuthors') as FormArray;
          courseAuthorsArray.clear();

          // Filter and add course authors
          const courseAuthors = this.allAuthors.filter(author =>
              course.authors.includes(author.id)
          );

          courseAuthors.forEach(author => {
            courseAuthorsArray.push(new FormControl(author, { nonNullable: true }))
          });

          // Update available authors
          const authorsArray = this.courseForm.get('authors') as FormArray;
          authorsArray.clear();
          const availableAuthors = this.allAuthors.filter(author =>
              !course.authors.includes(author.id)
          );
          availableAuthors.forEach(author => {
            authorsArray.push(this.fb.group({
              name: author.name,
              id: author.id
            }));
          });
        }
      });
    }

  }

  protected getAuthors(): FormArray<FormControl<Author>> {
    return this.courseForm.get("authors") as FormArray;
  }

  protected getCourseAuthors(): FormArray<FormControl<Author>> {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  protected createNewAuthor(): void {
    const authorName = this.courseForm.controls["author"].value;

    if (authorName === "") {
      alert("Do not add empty");
    } else {
      this.courseStoreService.createAuthor(authorName)
          .subscribe({
            next: (response) => {
              if (response.successful) {
                this.getAuthors().push(new FormControl(response.result, { nonNullable: true }));
              }
            }
          });

      this.courseForm.controls["author"].setValue("");
    }
  }

  protected addToCourseAuthors(id: number) {
    const author = this.getAuthors().at(id);
    if (author) {
      this.getCourseAuthors().push(new FormControl(author.value, { nonNullable: true }));
      this.getAuthors().removeAt(id);
    }
  }

  protected removeFromCourseAuthors(id: number) {
    const author = this.getCourseAuthors().at(id);
    this.getAuthors().push(new FormControl(author.value, { nonNullable: true }));

    this.getCourseAuthors().removeAt(id);
  }

  protected deleteAuthor(id: number) {
    this.getAuthors().removeAt(id);
  }

  protected submit() {
    if (this.courseForm.valid) {
      const authorIds = this.getCourseAuthors().value.map(author => author.id);
      const submittedCourse = {
        id: "",
        title: this.courseForm.controls["title"].value,
        description: this.courseForm.controls["description"].value,
        duration: this.courseForm.controls["duration"].value,
        authors: authorIds
      }

      if (this.editCourse){
        this.courseStoreService.editCourse(this.editCourse.id, submittedCourse).subscribe({
          next: (response) => {
            if (response.successful) {
              this.router.navigate(['/courses']).catch(() => {});
            }
          }
        })
      }
      else {
        this.courseStoreService.createCourse(submittedCourse).subscribe({
          next: (response) => {
            if (response.successful) {
              this.router.navigate(['/courses']).catch(() => {});
            }
          }
        })
      }
    }
  }
}