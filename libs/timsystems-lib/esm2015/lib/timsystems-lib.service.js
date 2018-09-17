/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class TimsystemsLibService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.getRepoIssues = (sort, order, page) => {
            /** @type {?} */
            const href = 'https://api.github.com/search/issues';
            /** @type {?} */
            const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page +
                1}`;
            return this.http.get(requestUrl);
        };
    }
}
TimsystemsLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
TimsystemsLibService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ TimsystemsLibService.ngInjectableDef = i0.defineInjectable({ factory: function TimsystemsLibService_Factory() { return new TimsystemsLibService(i0.inject(i1.HttpClient)); }, token: TimsystemsLibService, providedIn: "root" });
if (false) {
    /** @type {?} */
    TimsystemsLibService.prototype.getRepoIssues;
    /** @type {?} */
    TimsystemsLibService.prototype.http;
}
/**
 * @record
 */
export function GithubApi() { }
/** @type {?} */
GithubApi.prototype.items;
/** @type {?} */
GithubApi.prototype.total_count;
/**
 * @record
 */
export function GithubIssue() { }
/** @type {?} */
GithubIssue.prototype.created_at;
/** @type {?} */
GithubIssue.prototype.number;
/** @type {?} */
GithubIssue.prototype.state;
/** @type {?} */
GithubIssue.prototype.title;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXN5c3RlbXMtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFLbEQsTUFBTTs7OztJQUNKLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7NkJBRXBCLENBQ2QsSUFBWSxFQUNaLEtBQWEsRUFDYixJQUFZLEVBQ1csRUFBRTs7WUFDekIsTUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7O1lBQ3BELE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxrQ0FBa0MsSUFBSSxVQUFVLEtBQUssU0FBUyxJQUFJO2dCQUMxRixDQUFDLEVBQUUsQ0FBQztZQUVOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBWSxVQUFVLENBQUMsQ0FBQztTQUM3QztLQVp1Qzs7O1lBSnpDLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpRLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICBnZXRSZXBvSXNzdWVzID0gKFxuICAgIHNvcnQ6IHN0cmluZyxcbiAgICBvcmRlcjogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlclxuICApOiBPYnNlcnZhYmxlPEdpdGh1YkFwaT4gPT4ge1xuICAgIGNvbnN0IGhyZWYgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9zZWFyY2gvaXNzdWVzJztcbiAgICBjb25zdCByZXF1ZXN0VXJsID0gYCR7aHJlZn0/cT1yZXBvOmFuZ3VsYXIvbWF0ZXJpYWwyJnNvcnQ9JHtzb3J0fSZvcmRlcj0ke29yZGVyfSZwYWdlPSR7cGFnZSArXG4gICAgICAxfWA7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxHaXRodWJBcGk+KHJlcXVlc3RVcmwpO1xuICB9XG59XG5leHBvcnQgaW50ZXJmYWNlIEdpdGh1YkFwaSB7XG4gIGl0ZW1zOiBHaXRodWJJc3N1ZVtdO1xuICB0b3RhbF9jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdpdGh1Yklzc3VlIHtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBudW1iZXI6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn1cbiJdfQ==