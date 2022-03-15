import { DataSource } from "@angular/cdk/collections";
import { catchError, finalize, Observable, of, ReplaySubject } from "rxjs";
import { ApiResponse } from "./api-response.model";
import { DataService } from "./data-service.model";
import { TableQuery } from "./table-query.model";

export class AsyncTableDataSource<T, Q extends TableQuery, S extends DataService<T, Q>> extends DataSource<T> {

    private _dataSource = new ReplaySubject<T[]>();
    private _isLoading = new ReplaySubject<boolean>();

    public loading$ = this._isLoading.asObservable();
    public length = 0;
    
    constructor(private service: S) {
        super();
    }

    connect(): Observable<readonly T[]> {
        return this._dataSource.asObservable();
    }

    disconnect(): void {
        this._dataSource.complete();
        this._isLoading.complete();
    }

    setData(data: T[]) {
        this._dataSource.next(data);
    }

    loadData(query?: Q) {
        this._isLoading.next(true);
        this.service.fetch(query).pipe(
            catchError(() => of<ApiResponse>()),
            finalize(() => this._isLoading.next(false))
        )
        .subscribe(response => {
            console.log(response);
            this._dataSource.next(response.data.result);
            this.length = response.data.length
        });
    }
}
