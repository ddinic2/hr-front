import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export declare class TimsystemsLibService {
    private http;
    constructor(http: HttpClient);
    getRepoIssues: (sort: string, order: string, page: number) => Observable<GithubApi>;
}
export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
}
export interface GithubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
}
