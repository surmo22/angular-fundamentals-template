import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiResponse} from "@shared/models/api-response";
import {Course} from "@shared/models/course.model";
import {HttpClient} from "@angular/common/http";
import {Author} from "@shared/models/author.model";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private apiUrl = `${environment.apiBaseUrl}/courses`;
    constructor(private http: HttpClient) {}
    getAll(): Observable<ApiResponse<Course[]>> {
        return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/all`);
    }

    createCourse(course: Course): Observable<ApiResponse<Course>> { // replace 'any' with the required interface
        return this.http.post<ApiResponse<Course>>(`${this.apiUrl}/courses/add`, course)
    }

    editCourse(id: string, course: Course): Observable<ApiResponse<Course>> { // replace 'any' with the required interface
        return this.http.put<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`, course)
    }

    getCourse(id: string): Observable<ApiResponse<Course>> {
        return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`);
    }

    deleteCourse(id: string) : Observable<ApiResponse<string>> {
        return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/courses/${id}`);
    }

    filterCourses(value: string): Observable<ApiResponse<Course[]>> {
        return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/filter`, {
            params: {
                title: value
            }
        });
    }

    getAllAuthors() : Observable<ApiResponse<Author[]>> {
        return this.http.get<ApiResponse<Author[]>>(`${this.apiUrl}/authors/all`);
    }

    createAuthor(name: string): Observable<ApiResponse<Author>> {
        return this.http.post<ApiResponse<Author>>(`${this.apiUrl}/authors/add`, {name});
    }

    getAuthorById(id: string): Observable<ApiResponse<Author>> {
        return this.http.get<ApiResponse<Author>>(`${this.apiUrl}/authors/${id}`);
    }
}
