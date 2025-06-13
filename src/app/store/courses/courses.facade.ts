import { Injectable } from '@angular/core';
import * as CoursesActions from './courses.actions';
import {
    isAllCoursesLoadingSelector,
    isSingleCourseLoadingSelector,
    isSearchingStateSelector,
    getCourses,
    getAllCourses,
    getCourse,
    getErrorMessage,
} from './courses.selectors';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {Course} from "@shared/models/course.model";
import {CoursesState} from "@app/store/courses/courses.reducer";


@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here
    public isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(isAllCoursesLoadingSelector));
    public isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(isSingleCourseLoadingSelector));
    public isSearchingState$: Observable<boolean> = this.store.pipe(select(isSearchingStateSelector));
    public courses$: Observable<Course[]> = this.store.pipe(select(getCourses));
    public allCourses$: Observable<Course[]> = this.store.pipe(select(getAllCourses));
    public course$: Observable<Course | null> = this.store.pipe(select(getCourse));
    public errorMessage$: Observable<string | null> = this.store.pipe(select(getErrorMessage));

    constructor(private store: Store<CoursesState>) {
    }

    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({params: { title: searchValue}}));
    }

    editCourse(body: Course, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
    }

    createCourse(body: Course): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }
}
