import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {Subscription} from "rxjs";
import {Course} from "@shared/models/course.model";
import {Author} from "@shared/models/author.model";
import {mockedAuthorsList} from "@shared/mocks/mock";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  subscriptions: Subscription[] =[];
  formFields = {
    title: 'title',
    description: 'description',
    duration: 'duration',
    newAuthor: 'newAuthor',
    authorName: 'name',
  }
  editCourse: Course | null = null;
  allAuthors: Author[] = [];

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.buildForm();
    this.allAuthors = mockedAuthorsList;
  }
  buildForm(): void {
    this.courseForm = this.fb.group({
      [this.formFields.title]: ['', [Validators.required, Validators.minLength(2)]],
      [this.formFields.description]: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      [this.formFields.newAuthor]: this.fb.group({
        [this.formFields.authorName]: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ]+$')]], // name control
      }),
      [this.formFields.duration]: ['', [Validators.required, Validators.min(0)]],
    });
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get titleControl(): FormControl{
    return this.courseForm.get(this.formFields.title)! as FormControl;
  }

  get descriptionControl(): FormControl{
    return this.courseForm.get(this.formFields.description)! as FormControl;
  }

  get durationControl(): FormControl{
    return this.courseForm.get(this.formFields.duration)! as FormControl;
  }

  get newAuthorGroup(): FormGroup{
    return this.courseForm.get(this.formFields.newAuthor)! as FormGroup;
  }

  get newAuthorNameControl(): FormControl{
    return this.courseForm.get(this.formFields.newAuthor)?.get(this.formFields.authorName)! as FormControl;
  }

  addAuthor() {
    if (this.newAuthorGroup?.valid) {
      this.authors.push(this.fb.group({
        id: [crypto.randomUUID().toString()],
        name: [this.newAuthorNameControl?.value]
      }));
      this.newAuthorNameControl?.setValue('');
    }
  }

  addAuthorToCourseAuthor(i: number) {
    this.courseAuthors.push(this.authors.at(i));
    this.authors.removeAt(i);
  }

  removeAuthor(i: number, id:string) {
    this.authors.removeAt(i);
    this.allAuthors = this.allAuthors.filter(author => author.id !== id);
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }

  formReset() {

  }

  onSubmit() {

  }

  removeCourseAuthor(i: number) {
    this.authors.push(this.courseAuthors.at(i));
    this.courseAuthors.removeAt(i);
  }
}
