import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {CoursesService} from "@app/services/courses.service";
import {catchError, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {Action} from "@ngrx/store"
import * as CoursesActions from "@app/store/courses/courses.actions";
import {Course} from "@shared/models/course.model";
import {ApiResponse} from "@shared/models/api-response";

;

@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions,
                private coursesService: CoursesService,
                private router: Router) {}

    // Add your code here
    getAll$ = createEffect(() : Observable<Action> => {
        return this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            switchMap(() => this.coursesService.getAll().pipe(
                map((response: ApiResponse<Course[]>) =>
                    CoursesActions.requestAllCoursesSuccess({ courses: response.result })),
                catchError((error) =>
                    of(CoursesActions.requestAllCoursesFail({ error: error.message})))
            ))
        )
    });

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            switchMap(({ params }) =>
                this.coursesService.filterCourses(params).pipe(
                    map((filteredCourses) =>
                        CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses.result })
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestFilteredCoursesFail({ error: error.message }))
                    )
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            switchMap(({ id }) =>
                this.coursesService.getCourse(id).pipe(
                    map((response: ApiResponse<Course>) => CoursesActions.requestSingleCourseSuccess({ course: response.result })),
                    catchError((error) =>
                        of(CoursesActions.requestSingleCourseFail({ error: error.message }))
                    )
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap(({ id }) =>
                this.coursesService.deleteCourse(id).pipe(
                    map(() => CoursesActions.requestDeleteCourseSuccess({ id })),
                    mergeMap(() => of(CoursesActions.requestAllCourses())),
                    catchError((error) =>
                        of(CoursesActions.requestDeleteCourseFail({ error: error.message }))
                    )
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            switchMap(({ id, course }) =>
                this.coursesService.editCourse(id, course).pipe(
                    map((response) =>
                        CoursesActions.requestEditCourseSuccess({ course: response.result })
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestEditCourseFail({ error: error.message }))
                    )
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            switchMap(({ course }) =>
                this.coursesService.createCourse(course).pipe(
                    map((response) =>
                        CoursesActions.requestCreateCourseSuccess({ course: response.result })
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestCreateCourseFail({ error: error.message }))
                    )
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CoursesActions.requestCreateCourseSuccess,
                    CoursesActions.requestEditCourseSuccess,
                    CoursesActions.requestSingleCourseFail
                ),
                map(() => this.router.navigate(['/courses']))
            ),
        { dispatch: false }
    );
}
