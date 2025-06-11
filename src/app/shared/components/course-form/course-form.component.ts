import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {mockedAuthorsList} from "@shared/mocks/mock";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

  }

  courseForm: FormGroup = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(2)]],
    description: ["", [Validators.required, Validators.minLength(2)]],
    author: ["", [Validators.pattern("^[A-Za-z0-9]+$"), Validators.minLength(2)]],
    authors: this.fb.array(mockedAuthorsList),
    courseAuthors: this.fb.array([]),
    duration: ["", [Validators.required, Validators.min(0)]],
  });
  protected submitted: boolean = false;

  ngOnInit(): void {
  }

  protected getAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  protected getCourseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  protected createNewAuthor(): void {
    if (this.courseForm.controls["author"].value === "") {
      alert("Do not add empty");
    } else {
      this.getAuthors().push(
          this.fb.group({
            name: [this.courseForm.controls["author"].value],
            id: [crypto.randomUUID()],
          })
      );

      this.courseForm.controls["author"].setValue("");
    }
  }

  protected addToCourseAuthors(id: number) {
    const author = this.getAuthors().at(id);
    if (author) {
      this.getCourseAuthors().push(this.fb.group({
        author: author.get('name')?.value,
        id: author.get('id')?.value
      }));
      this.getAuthors().removeAt(id);
    }
  }

  protected removeFromCourseAuthors(id: number) {
    const author = this.getCourseAuthors().at(id);
    this.getAuthors().push(author);
    this.getCourseAuthors().removeAt(id);
  }

  protected deleteAuthor(id: number) {
    this.getAuthors().removeAt(id);
  }

  protected submit() {
    console.log(this.courseForm);
    this.submitted = true;
  }
}