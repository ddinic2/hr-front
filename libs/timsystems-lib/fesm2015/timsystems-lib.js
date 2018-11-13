import { Injectable, Inject, InjectionToken, Component, Input, Pipe, NgModule, ViewChild, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { isArray } from 'util';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TimsystemsLibService {
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
/** @nocollapse */ TimsystemsLibService.ngInjectableDef = defineInjectable({ factory: function TimsystemsLibService_Factory() { return new TimsystemsLibService(inject(HttpClient)); }, token: TimsystemsLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TimsystemsLibComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TimsystemsLibComponent.decorators = [
    { type: Component, args: [{
                selector: 'tims-timsystems-lib',
                template: `
    <p>
      timsystems-lib works!
    </p>
  `,
                styles: []
            },] },
];
/** @nocollapse */
TimsystemsLibComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const lod = _;
class TimsGridComponent {
    constructor() {
        this.displayDetails = false;
        this.resultsLength = 0;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
        this.getField = (source, fieldPath) => lod.get(source, fieldPath, '');
        this.refresh = () => {
            if (this.buttons && this.buttons.length > 0) {
                this.columnIds.push('buttons');
            }
            // If the user changes the sort order, reset back to the first page.
            this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
            merge(this.sort.sortChange, this.paginator.page)
                .pipe(startWith({}), switchMap(() => {
                this.isLoadingResults = true;
                return /** @type {?} */ ((this.dataProvider(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)));
            }), map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = data.total_count;
                console.log(data);
                return data.items;
            }), catchError(() => {
                this.isLoadingResults = false;
                // Catch if the GitHub API has reached its rate limit. Return empty data.
                this.isRateLimitReached = true;
                return of([]);
            }))
                .subscribe(data => (this.data = data));
        };
        this.removeElement = elementToDelete => {
            this.data = this.data.filter(elem => elem !== elementToDelete);
        };
        this.toggleExpand = clickedElement => (this.expandedElement = !this.expandedElement || this.expandedElement !== clickedElement ? clickedElement : null);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.refresh();
    }
}
TimsGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'tims-tims-grid',
                template: `<div class="example-container mat-elevation-z8">
  <div class="example-loading-shade" *ngIf="isLoadingResults || isRateLimitReached">
    <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
    <div class="example-rate-limit-reached" *ngIf="isRateLimitReached">
      Došlo je do greške, molimo proverite vašu internet konekciju
    </div>
  </div>

  <div class="example-table-container">

    <table mat-table [dataSource]="data" class="example-table" matSort multiTemplateDataRows matSortDisableClear
      matSortDirection="asc">


      <ng-container matColumnDef="{{column}}" *ngFor="let column of columnIds; let id=index">
        <ng-container *ngIf="sortable;else nosort">
          <th mat-header-cell *matHeaderCellDef mat-sort-header disableClear> {{columnNames[id]}} </th>
        </ng-container>
        <ng-template #nosort>
          <th mat-header-cell *matHeaderCellDef> {{columnNames[id]}} </th>
        </ng-template>
        <ng-container *ngIf="column!=='buttons';else test">
          <td mat-cell *matCellDef="let row"> <span>{{getField(row,column)|general:columnPipes[id]}}</span></td>
        </ng-container>
        <ng-template #test>
          <td mat-cell *matCellDef="let row">
            <div class="buttons-panel" [ngStyle]="{'width': (buttons.length*20)+'px'}">
              <ng-container *ngFor="let button of buttons;let i=index">
                <tims-button [buttonAction]="button!=='delete'? buttonActions[i]: removeElement" [targetElement]="row"
                  [buttonType]="button"></tims-button>
              </ng-container>
            </div>
          </td>
        </ng-template>
      </ng-container>

      <ng-container matColumnDef="expandedDetail">
        <td mat-cell *matCellDef="let row" [attr.colspan]="columnIds.length">
          <div class="example-element-detail" [@detailExpand]="row == expandedElement ? 'expanded' : 'collapsed'">
            <!-- <div class="example-element-diagram"> -->
            <!-- <div class="example-element-position"> {{row.body}} </div> -->
            <!-- <div class="example-element-symbol"> nesto </div>
              <!-- <div class="example-element-name"> nesto </div> -->
            <!-- <div class="example-element-weight"> {{row.body}} </div> -->
            <!-- </div> -->
            <div class="example-element-description">
              {{row.body}}
              <span class="example-element-description-attribution"> -- Izvor neki </span>
            </div>
          </div>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnIds"></tr>
      <tr mat-row *matRowDef="let row; columns: columnIds;" class="example-element-row" [class.example-expanded-row]="expandedElement === row"
        (click)="toggleExpand(row)">
      </tr>
      <ng-container *ngIf="displayDetails">
        <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
      </ng-container>
    </table>
  </div>

  <mat-paginator [length]="resultsLength" [pageSizeOptions]="[10, 20, 50, 100]" [pageSize]="20"></mat-paginator>
</div>
`,
                styles: [`table{width:100%}tr.example-detail-row{height:0}.buttons-panel{display:inline-flex;flex-direction:row}tr.example-element-row:not(.example-expanded-row):hover{background:#f5f5f5}tr.example-element-row:not(.example-expanded-row):active{background:#efefef}.example-element-row td{border-bottom-width:0}.example-element-detail{overflow:hidden;display:flex}.example-element-diagram{min-width:80px;border:2px solid #000;padding:8px;font-weight:lighter;margin:8px 0;height:104px}.example-element-symbol{font-weight:700;font-size:40px;line-height:normal}.example-element-description{padding:16px}.example-element-description-attribution{opacity:.5}.example-container{position:relative;width:100%}.example-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.example-rate-limit-reached{color:#980000;max-width:360px;text-align:center}`],
                animations: [
                    trigger('detailExpand', [
                        state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
                        state('expanded', style({ height: '*' })),
                        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                    ]),
                ],
            },] },
];
/** @nocollapse */
TimsGridComponent.ctorParameters = () => [];
TimsGridComponent.propDecorators = {
    paginator: [{ type: ViewChild, args: [MatPaginator,] }],
    sort: [{ type: ViewChild, args: [MatSort,] }],
    sortable: [{ type: Input }],
    dataProvider: [{ type: Input }],
    columnIds: [{ type: Input }],
    columnNames: [{ type: Input }],
    columnPipes: [{ type: Input }],
    buttons: [{ type: Input }],
    buttonActions: [{ type: Input }],
    displayDetails: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GeneralPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        if (!args) {
            return value;
        }
        if (isArray(args)) {
            args.forEach(pipe => {
                value = (/** @type {?} */ (pipe)).transform(value);
            });
        }
        else {
            value = (/** @type {?} */ (args)).transform(value);
        }
        return value;
    }
}
GeneralPipe.decorators = [
    { type: Pipe, args: [{
                name: 'general'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const GridConfigService = new InjectionToken('GridConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GridService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        console.log('GridConfigService', config);
        if (this.config.buttons) {
            this.buttons = this.config.buttons;
        }
    }
}
GridService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
/** @nocollapse */
GridService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [GridConfigService,] }] }
];
/** @nocollapse */ GridService.ngInjectableDef = defineInjectable({ factory: function GridService_Factory() { return new GridService(inject(GridConfigService)); }, token: GridService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ButtonComponent {
    /**
     * @param {?} gridServ
     */
    constructor(gridServ) {
        this.gridServ = gridServ;
        this.concreteButtonAction = (targetElement, event) => {
            if (this.buttonAction) {
                event.stopPropagation();
                this.buttonAction(targetElement);
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.buttonType) {
            this.buttonDef = this.gridServ.buttons.get(this.buttonType);
        }
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'tims-button',
                template: `<div  class="button-container" (click)="concreteButtonAction(targetElement,$event)">
  <fa [matTooltip]="buttonDef.text" [name]="buttonDef.icon" [animation]="buttonDef.animation"></fa>
</div>
`,
                styles: [`.button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}`],
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: GridService }
];
ButtonComponent.propDecorators = {
    buttonType: [{ type: Input }],
    targetElement: [{ type: Input }],
    buttonAction: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TimsGridModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static setConfig(config) {
        return {
            ngModule: TimsGridModule,
            providers: [
                GridService,
                {
                    provide: GridConfigService,
                    useValue: config,
                },
            ],
        };
    }
}
TimsGridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    AngularFontAwesomeModule,
                    CdkTableModule,
                    MatTableModule,
                    MatPaginatorModule,
                    BrowserAnimationsModule,
                    MatTooltipModule,
                    FormsModule,
                    ReactiveFormsModule,
                    HttpClientModule,
                    MatCardModule,
                    MatProgressSpinnerModule,
                    MatMenuModule,
                    MatIconModule,
                    MatToolbarModule,
                    MatButtonModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    MatSortModule,
                    MatTableModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                declarations: [TimsGridComponent, GeneralPipe, ButtonComponent],
                exports: [TimsGridComponent],
                providers: [GridService],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TimsystemsLibModule {
}
TimsystemsLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [TimsGridModule],
                declarations: [TimsystemsLibComponent],
                exports: [TimsGridModule, TimsystemsLibComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { TimsystemsLibService, TimsystemsLibComponent, TimsystemsLibModule, TimsGridModule, TimsGridComponent, GridConfigService as ɵd, ButtonComponent as ɵb, GeneralPipe as ɵa, GridService as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIuanMubWFwIiwic291cmNlcyI6WyJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zeXN0ZW1zLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL3RpbXMtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvZ2VuZXJhbC5waXBlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2J1dHRvbi1jb25maWcudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvZ3JpZC5zZXJ2aWNlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL3RpbXMtZ3JpZC5tb2R1bGUudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zeXN0ZW1zLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYlNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgZ2V0UmVwb0lzc3VlcyA9IChcbiAgICBzb3J0OiBzdHJpbmcsXG4gICAgb3JkZXI6IHN0cmluZyxcbiAgICBwYWdlOiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxHaXRodWJBcGk+ID0+IHtcbiAgICBjb25zdCBocmVmID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL2lzc3Vlcyc7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IGAke2hyZWZ9P3E9cmVwbzphbmd1bGFyL21hdGVyaWFsMiZzb3J0PSR7c29ydH0mb3JkZXI9JHtvcmRlcn0mcGFnZT0ke3BhZ2UgK1xuICAgICAgMX1gO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8R2l0aHViQXBpPihyZXF1ZXN0VXJsKTtcbiAgfVxufVxuZXhwb3J0IGludGVyZmFjZSBHaXRodWJBcGkge1xuICBpdGVtczogR2l0aHViSXNzdWVbXTtcbiAgdG90YWxfY291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRodWJJc3N1ZSB7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgbnVtYmVyOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLXRpbXN5c3RlbXMtbGliJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIHRpbXN5c3RlbXMtbGliIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciwgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IGxvZCA9IF87XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLXRpbXMtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImV4YW1wbGUtY29udGFpbmVyIG1hdC1lbGV2YXRpb24tejhcIj5cbiAgPGRpdiBjbGFzcz1cImV4YW1wbGUtbG9hZGluZy1zaGFkZVwiICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0cyB8fCBpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+PC9tYXQtc3Bpbm5lcj5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1yYXRlLWxpbWl0LXJlYWNoZWRcIiAqbmdJZj1cImlzUmF0ZUxpbWl0UmVhY2hlZFwiPlxuICAgICAgRG/DhcKhbG8gamUgZG8gZ3Jlw4XCoWtlLCBtb2xpbW8gcHJvdmVyaXRlIHZhw4XCoXUgaW50ZXJuZXQga29uZWtjaWp1XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLXRhYmxlLWNvbnRhaW5lclwiPlxuXG4gICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhXCIgY2xhc3M9XCJleGFtcGxlLXRhYmxlXCIgbWF0U29ydCBtdWx0aVRlbXBsYXRlRGF0YVJvd3MgbWF0U29ydERpc2FibGVDbGVhclxuICAgICAgbWF0U29ydERpcmVjdGlvbj1cImFzY1wiPlxuXG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwie3tjb2x1bW59fVwiICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uSWRzOyBsZXQgaWQ9aW5kZXhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvcnRhYmxlO2Vsc2Ugbm9zb3J0XCI+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXIgZGlzYWJsZUNsZWFyPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI25vc29ydD5cbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4hPT0nYnV0dG9ucyc7ZWxzZSB0ZXN0XCI+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPiA8c3Bhbj57e2dldEZpZWxkKHJvdyxjb2x1bW4pfGdlbmVyYWw6Y29sdW1uUGlwZXNbaWRdfX08L3NwYW4+PC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVzdD5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1wYW5lbFwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiAoYnV0dG9ucy5sZW5ndGgqMjApKydweCd9XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zO2xldCBpPWluZGV4XCI+XG4gICAgICAgICAgICAgICAgPHRpbXMtYnV0dG9uIFtidXR0b25BY3Rpb25dPVwiYnV0dG9uIT09J2RlbGV0ZSc/IGJ1dHRvbkFjdGlvbnNbaV06IHJlbW92ZUVsZW1lbnRcIiBbdGFyZ2V0RWxlbWVudF09XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgW2J1dHRvblR5cGVdPVwiYnV0dG9uXCI+PC90aW1zLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiZXhwYW5kZWREZXRhaWxcIj5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiIFthdHRyLmNvbHNwYW5dPVwiY29sdW1uSWRzLmxlbmd0aFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGV0YWlsXCIgW0BkZXRhaWxFeHBhbmRdPVwicm93ID09IGV4cGFuZGVkRWxlbWVudCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJ1wiPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRpYWdyYW1cIj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtcG9zaXRpb25cIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1zeW1ib2xcIj4gbmVzdG8gPC9kaXY+XG4gICAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1uYW1lXCI+IG5lc3RvIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC13ZWlnaHRcIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7e3Jvdy5ib2R5fX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb25cIj4gLS0gSXp2b3IgbmVraSA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImNvbHVtbklkc1wiPjwvdHI+XG4gICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogY29sdW1uSWRzO1wiIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXJvd1wiIFtjbGFzcy5leGFtcGxlLWV4cGFuZGVkLXJvd109XCJleHBhbmRlZEVsZW1lbnQgPT09IHJvd1wiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmQocm93KVwiPlxuICAgICAgPC90cj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5RGV0YWlsc1wiPlxuICAgICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogWydleHBhbmRlZERldGFpbCddXCIgY2xhc3M9XCJleGFtcGxlLWRldGFpbC1yb3dcIj48L3RyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG5cbiAgPG1hdC1wYWdpbmF0b3IgW2xlbmd0aF09XCJyZXN1bHRzTGVuZ3RoXCIgW3BhZ2VTaXplT3B0aW9uc109XCJbMTAsIDIwLCA1MCwgMTAwXVwiIFtwYWdlU2l6ZV09XCIyMFwiPjwvbWF0LXBhZ2luYXRvcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYHRhYmxle3dpZHRoOjEwMCV9dHIuZXhhbXBsZS1kZXRhaWwtcm93e2hlaWdodDowfS5idXR0b25zLXBhbmVse2Rpc3BsYXk6aW5saW5lLWZsZXg7ZmxleC1kaXJlY3Rpb246cm93fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6aG92ZXJ7YmFja2dyb3VuZDojZjVmNWY1fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6YWN0aXZle2JhY2tncm91bmQ6I2VmZWZlZn0uZXhhbXBsZS1lbGVtZW50LXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9LmV4YW1wbGUtZWxlbWVudC1kZXRhaWx7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6ZmxleH0uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW17bWluLXdpZHRoOjgwcHg7Ym9yZGVyOjJweCBzb2xpZCAjMDAwO3BhZGRpbmc6OHB4O2ZvbnQtd2VpZ2h0OmxpZ2h0ZXI7bWFyZ2luOjhweCAwO2hlaWdodDoxMDRweH0uZXhhbXBsZS1lbGVtZW50LXN5bWJvbHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjQwcHg7bGluZS1oZWlnaHQ6bm9ybWFsfS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb257cGFkZGluZzoxNnB4fS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb257b3BhY2l0eTouNX0uZXhhbXBsZS1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0uZXhhbXBsZS1sb2FkaW5nLXNoYWRle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3R0b206NTZweDtyaWdodDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTUpO3otaW5kZXg6MTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVke2NvbG9yOiM5ODAwMDA7bWF4LXdpZHRoOjM2MHB4O3RleHQtYWxpZ246Y2VudGVyfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGV0YWlsRXhwYW5kJywgW1xuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JywgbWluSGVpZ2h0OiAnMCcsIGRpc3BsYXk6ICdub25lJyB9KSksXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCcyMjVtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbXNHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpXG4gIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U29ydClcbiAgc29ydDogTWF0U29ydDtcblxuICBASW5wdXQoKVxuICBzb3J0YWJsZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBkYXRhUHJvdmlkZXI6IEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbklkczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgY29sdW1uTmFtZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtblBpcGVzOiBQaXBlVHJhbnNmb3JtW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uczogRnVuY3Rpb25bXTtcblxuICBASW5wdXQoKVxuICBkaXNwbGF5RGV0YWlscyA9IGZhbHNlO1xuXG4gIHJlc3VsdHNMZW5ndGggPSAwO1xuICBpc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gIGV4cGFuZGVkRWxlbWVudDogYW55O1xuICBkYXRhOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldEZpZWxkID0gKHNvdXJjZSwgZmllbGRQYXRoOiBzdHJpbmcpID0+IGxvZC5nZXQoc291cmNlLCBmaWVsZFBhdGgsICcnKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYnV0dG9ucyAmJiB0aGlzLmJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaCgnYnV0dG9ucycpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBzb3J0IG9yZGVyLCByZXNldCBiYWNrIHRvIHRoZSBmaXJzdCBwYWdlLlxuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5wYWdpbmF0b3IucGFnZUluZGV4ID0gMCkpO1xuXG4gICAgbWVyZ2UodGhpcy5zb3J0LnNvcnRDaGFuZ2UsIHRoaXMucGFnaW5hdG9yLnBhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiA8T2JzZXJ2YWJsZTxhbnk+PihcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyKHRoaXMuc29ydC5hY3RpdmUsIHRoaXMuc29ydC5kaXJlY3Rpb24sIHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCwgdGhpcy5wYWdpbmF0b3IucGFnZVNpemUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChkYXRhID0+IHtcbiAgICAgICAgICAvLyBGbGlwIGZsYWcgdG8gc2hvdyB0aGF0IGxvYWRpbmcgaGFzIGZpbmlzaGVkLlxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzTGVuZ3RoID0gZGF0YS50b3RhbF9jb3VudDtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGF0YS5pdGVtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIC8vIENhdGNoIGlmIHRoZSBHaXRIdWIgQVBJIGhhcyByZWFjaGVkIGl0cyByYXRlIGxpbWl0LiBSZXR1cm4gZW1wdHkgZGF0YS5cbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4gKHRoaXMuZGF0YSA9IGRhdGEpKTtcbiAgfVxuXG4gIHJlbW92ZUVsZW1lbnQgPSBlbGVtZW50VG9EZWxldGUgPT4ge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoZWxlbSA9PiBlbGVtICE9PSBlbGVtZW50VG9EZWxldGUpO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kID0gY2xpY2tlZEVsZW1lbnQgPT5cbiAgICAodGhpcy5leHBhbmRlZEVsZW1lbnQgPSAhdGhpcy5leHBhbmRlZEVsZW1lbnQgfHwgdGhpcy5leHBhbmRlZEVsZW1lbnQgIT09IGNsaWNrZWRFbGVtZW50ID8gY2xpY2tlZEVsZW1lbnQgOiBudWxsKVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ3V0aWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdnZW5lcmFsJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW5lcmFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KGFyZ3MpKSB7XG4gICAgICBhcmdzLmZvckVhY2gocGlwZSA9PiB7XG4gICAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPnBpcGUpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSAoPFBpcGVUcmFuc2Zvcm0+YXJncykudHJhbnNmb3JtKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDb25maWcge1xyXG4gIGJ1dHRvbnM6IE1hcDxzdHJpbmcsIEJ1dHRvbj47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBHcmlkQ29uZmlnU2VydmljZSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxHcmlkQ29uZmlnPignR3JpZENvbmZpZycpO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9idXR0b24tY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcbiAgYnV0dG9ucztcbiAgY29uc3RydWN0b3IoQEluamVjdChHcmlkQ29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWcpIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZENvbmZpZ1NlcnZpY2UnLCBjb25maWcpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5idXR0b25zKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmNvbmZpZy5idXR0b25zO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuLi9ncmlkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGRpdiAgY2xhc3M9XCJidXR0b24tY29udGFpbmVyXCIgKGNsaWNrKT1cImNvbmNyZXRlQnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQsJGV2ZW50KVwiPlxuICA8ZmEgW21hdFRvb2x0aXBdPVwiYnV0dG9uRGVmLnRleHRcIiBbbmFtZV09XCJidXR0b25EZWYuaWNvblwiIFthbmltYXRpb25dPVwiYnV0dG9uRGVmLmFuaW1hdGlvblwiPjwvZmE+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuYnV0dG9uLWNvbnRhaW5lcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojNTQ1NGM3O21hcmdpbjo0cHg7bGluZS1oZWlnaHQ6MTAwJTtmbGV4OjF9LmJ1dHRvbi1jb250YWluZXI6aG92ZXJ7Y29sb3I6b3JhbmdlfWBdLFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBidXR0b25UeXBlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdGFyZ2V0RWxlbWVudDtcblxuICBASW5wdXQoKVxuICBidXR0b25BY3Rpb246IEZ1bmN0aW9uO1xuXG4gIGJ1dHRvbkRlZjogQnV0dG9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZFNlcnY6IEdyaWRTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuYnV0dG9uRGVmID0gdGhpcy5ncmlkU2Vydi5idXR0b25zLmdldCh0aGlzLmJ1dHRvblR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmNyZXRlQnV0dG9uQWN0aW9uID0gKHRhcmdldEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMuYnV0dG9uQWN0aW9uKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuYnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUaW1zR3JpZENvbXBvbmVudCB9IGZyb20gJy4vdGltcy1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7XG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0Q2FyZE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIE1hdFRvb2x0aXAsXG4gIE1hdFRvb2x0aXBNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEdlbmVyYWxQaXBlIH0gZnJvbSAnLi9nZW5lcmFsLnBpcGUnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWZvbnQtYXdlc29tZSc7XG5pbXBvcnQgeyBHcmlkU2VydmljZSB9IGZyb20gJy4vZ3JpZC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyaWRDb25maWcsIEdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9idXR0b24tY29uZmlnJztcblxuLy8gZXhwb3J0IGNvbnN0IGJ1dHRvbnM6IE1hcDxzdHJpbmcsIEJ1dHRvbj4gPSBuZXcgTWFwKFtcbi8vICAgWydlZGl0JywgbmV3IEJ1dHRvbignSXptZW5pJywgJ3BlbmNpbC1zcXVhcmUtbycpXSxcbi8vICAgWydkZWxldGUnLCBuZXcgQnV0dG9uKCdPYnJpw4XCoWknLCAndHJhc2gtbycpXSxcbi8vICAgWyd2aWV3JywgbmV3IEJ1dHRvbignRGV0YWxqaScsICdhZGRyZXNzLWNhcmQtbycpXSxcbi8vICAgWydzYXZlJywgbmV3IEJ1dHRvbignU2HDhMKNdXZhaicsICdmbG9wcHktbycpXSxcbi8vICAgWydhcHByb3ZlJywgbmV3IEJ1dHRvbignT2RvYnJpJywgJ2NoZWNrJyldLFxuLy8gICBbJ2RlbnknLCBuZXcgQnV0dG9uKCdPZGJpaicsICdiYW4nKV0sXG4vLyAgIFsnZ2VuZXJhdGUnLCBuZXcgQnV0dG9uKCdHZW5lcmnDhcKhaSBkb2t1bWVudCcsICdmaWxlLXRleHQnKV0sXG4vLyBdKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBbmd1bGFyRm9udEF3ZXNvbWVNb2R1bGUsXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVGltc0dyaWRDb21wb25lbnQsIEdlbmVyYWxQaXBlLCBCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbVGltc0dyaWRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtHcmlkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbXNHcmlkTW9kdWxlIHtcbiAgc3RhdGljIHNldENvbmZpZyhjb25maWc6IEdyaWRDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRpbXNHcmlkTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEdyaWRTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogR3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbXN5c3RlbXNMaWJDb21wb25lbnQgfSBmcm9tICcuL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1zR3JpZE1vZHVsZSB9IGZyb20gJy4vdGltcy1ncmlkL3RpbXMtZ3JpZC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVGltc0dyaWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1zeXN0ZW1zTGliQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbXNHcmlkTW9kdWxlLCBUaW1zeXN0ZW1zTGliQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsib2JzZXJ2YWJsZU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQVFFLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7NkJBRXBCLENBQ2QsSUFBWSxFQUNaLEtBQWEsRUFDYixJQUFZOztZQUVaLE1BQU0sSUFBSSxHQUFHLHNDQUFzQyxDQUFDOztZQUNwRCxNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksa0NBQWtDLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSTtnQkFDMUYsQ0FBQyxFQUFFLENBQUM7WUFFTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFZLFVBQVUsQ0FBQyxDQUFDO1NBQzdDO0tBWnVDOzs7WUFKekMsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBSlEsVUFBVTs7Ozs7Ozs7QUNGbkI7SUFhRSxpQkFBaUI7Ozs7SUFFakIsUUFBUTtLQUNQOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsTUFBTSxFQUFFLEVBQUU7YUFDWDs7Ozs7Ozs7O0FDVkQ7QUFPQSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7QUE4RWQ7SUFvQ0U7OEJBUGlCLEtBQUs7NkJBRU4sQ0FBQztnQ0FDRSxJQUFJO2tDQUNGLEtBQUs7d0JBS2YsQ0FBQyxNQUFNLEVBQUUsU0FBaUIsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO3VCQU05RDtZQUNSLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hDOztZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2lCQUM3QyxJQUFJLENBQ0gsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLFNBQVMsQ0FBQztnQkFDUixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUM3QiwwQkFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQzNHO2FBQ0gsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxJQUFJOztnQkFFTixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNuQixDQUFDLEVBQ0YsVUFBVSxDQUFDO2dCQUNULElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7O2dCQUU5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixPQUFPQSxFQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDekIsQ0FBQyxDQUNIO2lCQUNBLFNBQVMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzFDOzZCQUVlLGVBQWU7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLGVBQWUsQ0FBQyxDQUFDO1NBQ2hFOzRCQUVjLGNBQWMsS0FDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxjQUFjLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQztLQS9Dbkc7Ozs7SUFJaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjs7O1lBdkhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaUVYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLG82QkFBbzZCLENBQUM7Z0JBQzk2QixVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLGNBQWMsRUFBRTt3QkFDdEIsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7d0JBQzdFLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ3pDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztxQkFDdEYsQ0FBQztpQkFDSDthQUNGOzs7Ozt3QkFFRSxTQUFTLFNBQUMsWUFBWTttQkFHdEIsU0FBUyxTQUFDLE9BQU87dUJBR2pCLEtBQUs7MkJBR0wsS0FBSzt3QkFHTCxLQUFLOzBCQUdMLEtBQUs7MEJBR0wsS0FBSztzQkFHTCxLQUFLOzRCQUdMLEtBQUs7NkJBR0wsS0FBSzs7Ozs7OztBQ2pIUjs7Ozs7O0lBT0UsU0FBUyxDQUFDLEtBQVUsRUFBRSxJQUFVO1FBQzlCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUNmLEtBQUssR0FBRyxtQkFBZ0IsSUFBSSxHQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsS0FBSyxHQUFHLG1CQUFnQixJQUFJLEdBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxLQUFLLENBQUM7S0FDZDs7O1lBaEJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsU0FBUzthQUNoQjs7Ozs7OztBQ0pEO0FBTUEsTUFBYSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBYSxZQUFZLENBQUM7Ozs7OztBQ1A3RTs7OztJQVFFLFlBQStDLE1BQU07UUFBTixXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ3BDO0tBQ0Y7OztZQVZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs0Q0FHYyxNQUFNLFNBQUMsaUJBQWlCOzs7Ozs7OztBQ1J2Qzs7OztJQXdCRSxZQUFvQixRQUFxQjtRQUFyQixhQUFRLEdBQVIsUUFBUSxDQUFhO29DQVFsQixDQUFDLGFBQWEsRUFBRSxLQUFpQjtZQUN0RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNsQztTQUNGO0tBYjRDOzs7O0lBRTdDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO0tBQ0Y7OztZQTFCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7O0NBR1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMseUhBQXlILENBQUM7YUFDcEk7Ozs7WUFUUSxXQUFXOzs7eUJBV2pCLEtBQUs7NEJBR0wsS0FBSzsyQkFHTCxLQUFLOzs7Ozs7O0FDbkJSOzs7OztJQXVFRSxPQUFPLFNBQVMsQ0FBQyxNQUFrQjtRQUNqQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1g7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7OztZQTFDRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osd0JBQXdCO29CQUN4QixjQUFjO29CQUNkLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQix1QkFBdUI7b0JBQ3ZCLGdCQUFnQjtvQkFDaEIsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYix3QkFBd0I7b0JBQ3hCLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2Ysa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixjQUFjO29CQUNkLFdBQVc7b0JBQ1gsbUJBQW1CO2lCQUNwQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO2dCQUMvRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDNUIsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQ3pCOzs7Ozs7O0FDckVEOzs7WUFJQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLHNCQUFzQixDQUFDO2FBQ2xEOzs7Ozs7Ozs7Ozs7Ozs7In0=