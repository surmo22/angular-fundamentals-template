import {Action, createReducer, on} from '@ngrx/store';
import {Course} from "@shared/models/course.model";
import * as CoursesActions from "@app/store/courses/courses.actions";

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: Course[]

    course: Course | null;

    isAllCoursesLoading: boolean;

    isSingleCourseLoading: boolean;

    isSearchState: boolean;

    errorMessage: string;
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

// @ts-ignore
export const coursesReducer = createReducer(initialState,
    on(CoursesActions.requestAllCourses, (state): CoursesState => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: "",
    })),

    on(CoursesActions.requestAllCoursesSuccess, (state, {courses}): CoursesState => ({
            ...state,
            allCourses: courses,
            isAllCoursesLoading: false,
            errorMessage: "",
        }
    )),

    on(CoursesActions.requestAllCoursesFail, (state, {error}): CoursesState => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestSingleCourse, (state): CoursesState => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: "",
    })),

    on(CoursesActions.requestSingleCourseSuccess, (state, {course}): CoursesState => ({
        ...state,
        course: course,
        isSingleCourseLoading: false,
    })),

    on(CoursesActions.requestSingleCourseFail, (state, {error}): CoursesState => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestCreateCourse, (state): CoursesState => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: "",
    })),

    on(CoursesActions.requestCreateCourseSuccess, (state, {course}): CoursesState => ({
        ...state,
        allCourses: [...state.allCourses, course],
        errorMessage: "",
    })),

    on(CoursesActions.requestCreateCourseFail, (state, {error}): CoursesState => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestEditCourse, (state): CoursesState => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: "",
    })),

    on(CoursesActions.requestEditCourseSuccess, (state, {course}): CoursesState => ({
        ...state,
        allCourses: state.allCourses.map(c => c.id === course.id ? course : c),
        isSingleCourseLoading: false,
        errorMessage: "",
    })),

    on(CoursesActions.requestEditCourseFail, (state, { error}) : CoursesState => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestDeleteCourse, (state): CoursesState => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: "",
    })),

    on(CoursesActions.requestDeleteCourseSuccess, (state, {id}): CoursesState => ({
        ...state,
        allCourses: state.allCourses.filter(c => c.id !== id),
        isSingleCourseLoading: false,
    })),

    on(CoursesActions.requestDeleteCourseFail, (state, {error}): CoursesState => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestFilteredCourses, (state): CoursesState => ({
        ...state,
        isSearchState: true,
        errorMessage: "",
        isAllCoursesLoading: true,
    })),

    on(CoursesActions.requestFilteredCoursesSuccess, (state, {courses}): CoursesState => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
        isAllCoursesLoading: false,
        errorMessage: ""
    })),

    on(CoursesActions.requestFilteredCoursesFail, (state, {error}): CoursesState => ({
        ...state,
        isAllCoursesLoading: true,
        isSearchState: false,
        errorMessage: error,
    }))
)

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
