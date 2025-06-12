import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiResponse} from "@shared/models/api-response";
import {Course} from "@shared/models/course.model";
import {HttpClient} from "@angular/common/http";
import {Author} from "@shared/models/author.model";

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private http: HttpClient) {}
    getAll(): Observable<ApiResponse<Course[]>> {
        const observable = this.http.get<ApiResponse<Course[]>>("/courses/all");
        observable.subscribe()
        return observable;
    }

    createCourse(course: Course): Observable<ApiResponse<Course>> { // replace 'any' with the required interface
        return this.http.post<ApiResponse<Course>>("/courses/add", course)
    }

    editCourse(id: string, course: Course): Observable<ApiResponse<Course>> { // replace 'any' with the required interface
        return this.http.put<ApiResponse<Course>>(`/courses/${id}`, course)
    }

    getCourse(id: string): Observable<ApiResponse<Course>> {
        return this.http.get<ApiResponse<Course>>(`/courses/${id}`);
    }

    deleteCourse(id: string) : Observable<ApiResponse<string>> {
        return this.http.delete<ApiResponse<string>>(`/courses/${id}`);
    }

    filterCourses(value: string): Observable<ApiResponse<Course[]>> {
        return this.http.get<ApiResponse<Course[]>>(`/courses/filter`, {
            params: {
                title: value
            }
        });
    }

    getAllAuthors() : Observable<ApiResponse<Author[]>> {
        return this.http.get<ApiResponse<Author[]>>("/authors/all");
    }

    createAuthor(name: string): Observable<ApiResponse<Author>> {
        return this.http.post<ApiResponse<Author>>("/authors/add", {name});
    }

    getAuthorById(id: string): Observable<ApiResponse<Author>> {
        return this.http.get<ApiResponse<Author>>(`/authors/${id}`);
    }
}
