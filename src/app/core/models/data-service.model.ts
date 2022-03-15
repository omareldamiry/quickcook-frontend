import { Observable } from "rxjs";
import { ApiResponse } from "./api-response.model";

export abstract class DataService<T, Q> {
    abstract fetchAll(): Observable<ApiResponse>;
    abstract fetch(query?: Q): Observable<ApiResponse>;
    abstract create(value: T): Observable<ApiResponse>;
    abstract update(value: T): Observable<ApiResponse>;
    abstract delete(value: number): Observable<ApiResponse>;
}
