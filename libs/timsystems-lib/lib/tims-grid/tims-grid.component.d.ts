import { OnInit, PipeTransform } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
export declare class TimsGridComponent implements OnInit {
    paginator: MatPaginator;
    sort: MatSort;
    sortable: boolean;
    dataProvider: Function;
    columnIds: string[];
    columnNames: string[];
    columnPipes: PipeTransform[];
    buttons: string[];
    buttonActions: Function[];
    displayDetails: boolean;
    resultsLength: number;
    isLoadingResults: boolean;
    isRateLimitReached: boolean;
    expandedElement: any;
    data: any[];
    constructor();
    getField: (source: any, fieldPath: string) => any;
    ngOnInit(): void;
    refresh: () => void;
    removeElement: (elementToDelete: any) => void;
    toggleExpand: (clickedElement: any) => any;
}
