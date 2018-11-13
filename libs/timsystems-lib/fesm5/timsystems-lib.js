import { Injectable, Component, ViewChild, Input, Pipe, InjectionToken, Inject, NgModule, defineInjectable, inject } from '@angular/core';
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
var TimsystemsLibService = /** @class */ (function () {
    function TimsystemsLibService(http) {
        var _this = this;
        this.http = http;
        this.getRepoIssues = function (sort, order, page) {
            /** @type {?} */
            var href = 'https://api.github.com/search/issues';
            /** @type {?} */
            var requestUrl = href + "?q=repo:angular/material2&sort=" + sort + "&order=" + order + "&page=" + (page +
                1);
            return _this.http.get(requestUrl);
        };
    }
    TimsystemsLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TimsystemsLibService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ TimsystemsLibService.ngInjectableDef = defineInjectable({ factory: function TimsystemsLibService_Factory() { return new TimsystemsLibService(inject(HttpClient)); }, token: TimsystemsLibService, providedIn: "root" });
    return TimsystemsLibService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TimsystemsLibComponent = /** @class */ (function () {
    function TimsystemsLibComponent() {
    }
    /**
     * @return {?}
     */
    TimsystemsLibComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    TimsystemsLibComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tims-timsystems-lib',
                    template: "\n    <p>\n      timsystems-lib works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    TimsystemsLibComponent.ctorParameters = function () { return []; };
    return TimsystemsLibComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var lod = _;
var TimsGridComponent = /** @class */ (function () {
    function TimsGridComponent() {
        var _this = this;
        this.displayDetails = false;
        this.resultsLength = 0;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
        this.getField = function (source, fieldPath) { return lod.get(source, fieldPath, ''); };
        this.refresh = function () {
            if (_this.buttons && _this.buttons.length > 0) {
                _this.columnIds.push('buttons');
            }
            // If the user changes the sort order, reset back to the first page.
            // If the user changes the sort order, reset back to the first page.
            _this.sort.sortChange.subscribe(function () { return (_this.paginator.pageIndex = 0); });
            merge(_this.sort.sortChange, _this.paginator.page)
                .pipe(startWith({}), switchMap(function () {
                _this.isLoadingResults = true;
                return /** @type {?} */ ((_this.dataProvider(_this.sort.active, _this.sort.direction, _this.paginator.pageIndex, _this.paginator.pageSize)));
            }), map(function (data) {
                // Flip flag to show that loading has finished.
                // Flip flag to show that loading has finished.
                _this.isLoadingResults = false;
                _this.isRateLimitReached = false;
                _this.resultsLength = data.total_count;
                console.log(data);
                return data.items;
            }), catchError(function () {
                _this.isLoadingResults = false;
                // Catch if the GitHub API has reached its rate limit. Return empty data.
                // Catch if the GitHub API has reached its rate limit. Return empty data.
                _this.isRateLimitReached = true;
                return of([]);
            }))
                .subscribe(function (data) { return (_this.data = data); });
        };
        this.removeElement = function (elementToDelete) {
            _this.data = _this.data.filter(function (elem) { return elem !== elementToDelete; });
        };
        this.toggleExpand = function (clickedElement) {
            return (_this.expandedElement = !_this.expandedElement || _this.expandedElement !== clickedElement ? clickedElement : null);
        };
    }
    /**
     * @return {?}
     */
    TimsGridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.refresh();
    };
    TimsGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tims-tims-grid',
                    template: "<div class=\"example-container mat-elevation-z8\">\n  <div class=\"example-loading-shade\" *ngIf=\"isLoadingResults || isRateLimitReached\">\n    <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n    <div class=\"example-rate-limit-reached\" *ngIf=\"isRateLimitReached\">\n      Do\u0161lo je do gre\u0161ke, molimo proverite va\u0161u internet konekciju\n    </div>\n  </div>\n\n  <div class=\"example-table-container\">\n\n    <table mat-table [dataSource]=\"data\" class=\"example-table\" matSort multiTemplateDataRows matSortDisableClear\n      matSortDirection=\"asc\">\n\n\n      <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of columnIds; let id=index\">\n        <ng-container *ngIf=\"sortable;else nosort\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header disableClear> {{columnNames[id]}} </th>\n        </ng-container>\n        <ng-template #nosort>\n          <th mat-header-cell *matHeaderCellDef> {{columnNames[id]}} </th>\n        </ng-template>\n        <ng-container *ngIf=\"column!=='buttons';else test\">\n          <td mat-cell *matCellDef=\"let row\"> <span>{{getField(row,column)|general:columnPipes[id]}}</span></td>\n        </ng-container>\n        <ng-template #test>\n          <td mat-cell *matCellDef=\"let row\">\n            <div class=\"buttons-panel\" [ngStyle]=\"{'width': (buttons.length*20)+'px'}\">\n              <ng-container *ngFor=\"let button of buttons;let i=index\">\n                <tims-button [buttonAction]=\"button!=='delete'? buttonActions[i]: removeElement\" [targetElement]=\"row\"\n                  [buttonType]=\"button\"></tims-button>\n              </ng-container>\n            </div>\n          </td>\n        </ng-template>\n      </ng-container>\n\n      <ng-container matColumnDef=\"expandedDetail\">\n        <td mat-cell *matCellDef=\"let row\" [attr.colspan]=\"columnIds.length\">\n          <div class=\"example-element-detail\" [@detailExpand]=\"row == expandedElement ? 'expanded' : 'collapsed'\">\n            <!-- <div class=\"example-element-diagram\"> -->\n            <!-- <div class=\"example-element-position\"> {{row.body}} </div> -->\n            <!-- <div class=\"example-element-symbol\"> nesto </div>\n              <!-- <div class=\"example-element-name\"> nesto </div> -->\n            <!-- <div class=\"example-element-weight\"> {{row.body}} </div> -->\n            <!-- </div> -->\n            <div class=\"example-element-description\">\n              {{row.body}}\n              <span class=\"example-element-description-attribution\"> -- Izvor neki </span>\n            </div>\n          </div>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"columnIds\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: columnIds;\" class=\"example-element-row\" [class.example-expanded-row]=\"expandedElement === row\"\n        (click)=\"toggleExpand(row)\">\n      </tr>\n      <ng-container *ngIf=\"displayDetails\">\n        <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"example-detail-row\"></tr>\n      </ng-container>\n    </table>\n  </div>\n\n  <mat-paginator [length]=\"resultsLength\" [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"20\"></mat-paginator>\n</div>\n",
                    styles: ["table{width:100%}tr.example-detail-row{height:0}.buttons-panel{display:inline-flex;flex-direction:row}tr.example-element-row:not(.example-expanded-row):hover{background:#f5f5f5}tr.example-element-row:not(.example-expanded-row):active{background:#efefef}.example-element-row td{border-bottom-width:0}.example-element-detail{overflow:hidden;display:flex}.example-element-diagram{min-width:80px;border:2px solid #000;padding:8px;font-weight:lighter;margin:8px 0;height:104px}.example-element-symbol{font-weight:700;font-size:40px;line-height:normal}.example-element-description{padding:16px}.example-element-description-attribution{opacity:.5}.example-container{position:relative;width:100%}.example-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.example-rate-limit-reached{color:#980000;max-width:360px;text-align:center}"],
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
    TimsGridComponent.ctorParameters = function () { return []; };
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
    return TimsGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GeneralPipe = /** @class */ (function () {
    function GeneralPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    GeneralPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (!args) {
            return value;
        }
        if (isArray(args)) {
            args.forEach(function (pipe) {
                value = (/** @type {?} */ (pipe)).transform(value);
            });
        }
        else {
            value = (/** @type {?} */ (args)).transform(value);
        }
        return value;
    };
    GeneralPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'general'
                },] },
    ];
    return GeneralPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var GridConfigService = new InjectionToken('GridConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GridService = /** @class */ (function () {
    function GridService(config) {
        this.config = config;
        console.log('GridConfigService', config);
        if (this.config.buttons) {
            this.buttons = this.config.buttons;
        }
    }
    GridService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    /** @nocollapse */
    GridService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [GridConfigService,] }] }
    ]; };
    /** @nocollapse */ GridService.ngInjectableDef = defineInjectable({ factory: function GridService_Factory() { return new GridService(inject(GridConfigService)); }, token: GridService, providedIn: "root" });
    return GridService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ButtonComponent = /** @class */ (function () {
    function ButtonComponent(gridServ) {
        var _this = this;
        this.gridServ = gridServ;
        this.concreteButtonAction = function (targetElement, event) {
            if (_this.buttonAction) {
                event.stopPropagation();
                _this.buttonAction(targetElement);
            }
        };
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.buttonType) {
            this.buttonDef = this.gridServ.buttons.get(this.buttonType);
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tims-button',
                    template: "<div  class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [matTooltip]=\"buttonDef.text\" [name]=\"buttonDef.icon\" [animation]=\"buttonDef.animation\"></fa>\n</div>\n",
                    styles: [".button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}"],
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: GridService }
    ]; };
    ButtonComponent.propDecorators = {
        buttonType: [{ type: Input }],
        targetElement: [{ type: Input }],
        buttonAction: [{ type: Input }]
    };
    return ButtonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TimsGridModule = /** @class */ (function () {
    function TimsGridModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    TimsGridModule.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
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
    };
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
    return TimsGridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TimsystemsLibModule = /** @class */ (function () {
    function TimsystemsLibModule() {
    }
    TimsystemsLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [TimsGridModule],
                    declarations: [TimsystemsLibComponent],
                    exports: [TimsGridModule, TimsystemsLibComponent]
                },] },
    ];
    return TimsystemsLibModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { TimsystemsLibService, TimsystemsLibComponent, TimsystemsLibModule, TimsGridModule, GridConfigService as ɵe, ButtonComponent as ɵc, GeneralPipe as ɵb, GridService as ɵd, TimsGridComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIuanMubWFwIiwic291cmNlcyI6WyJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zeXN0ZW1zLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL3RpbXMtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvZ2VuZXJhbC5waXBlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2J1dHRvbi1jb25maWcudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvZ3JpZC5zZXJ2aWNlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL3RpbXMtZ3JpZC5tb2R1bGUudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zeXN0ZW1zLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYlNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgZ2V0UmVwb0lzc3VlcyA9IChcbiAgICBzb3J0OiBzdHJpbmcsXG4gICAgb3JkZXI6IHN0cmluZyxcbiAgICBwYWdlOiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxHaXRodWJBcGk+ID0+IHtcbiAgICBjb25zdCBocmVmID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL2lzc3Vlcyc7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IGAke2hyZWZ9P3E9cmVwbzphbmd1bGFyL21hdGVyaWFsMiZzb3J0PSR7c29ydH0mb3JkZXI9JHtvcmRlcn0mcGFnZT0ke3BhZ2UgK1xuICAgICAgMX1gO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8R2l0aHViQXBpPihyZXF1ZXN0VXJsKTtcbiAgfVxufVxuZXhwb3J0IGludGVyZmFjZSBHaXRodWJBcGkge1xuICBpdGVtczogR2l0aHViSXNzdWVbXTtcbiAgdG90YWxfY291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRodWJJc3N1ZSB7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgbnVtYmVyOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLXRpbXN5c3RlbXMtbGliJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIHRpbXN5c3RlbXMtbGliIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciwgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IGxvZCA9IF87XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLXRpbXMtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImV4YW1wbGUtY29udGFpbmVyIG1hdC1lbGV2YXRpb24tejhcIj5cbiAgPGRpdiBjbGFzcz1cImV4YW1wbGUtbG9hZGluZy1zaGFkZVwiICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0cyB8fCBpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+PC9tYXQtc3Bpbm5lcj5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1yYXRlLWxpbWl0LXJlYWNoZWRcIiAqbmdJZj1cImlzUmF0ZUxpbWl0UmVhY2hlZFwiPlxuICAgICAgRG/DhcKhbG8gamUgZG8gZ3Jlw4XCoWtlLCBtb2xpbW8gcHJvdmVyaXRlIHZhw4XCoXUgaW50ZXJuZXQga29uZWtjaWp1XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLXRhYmxlLWNvbnRhaW5lclwiPlxuXG4gICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhXCIgY2xhc3M9XCJleGFtcGxlLXRhYmxlXCIgbWF0U29ydCBtdWx0aVRlbXBsYXRlRGF0YVJvd3MgbWF0U29ydERpc2FibGVDbGVhclxuICAgICAgbWF0U29ydERpcmVjdGlvbj1cImFzY1wiPlxuXG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwie3tjb2x1bW59fVwiICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uSWRzOyBsZXQgaWQ9aW5kZXhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvcnRhYmxlO2Vsc2Ugbm9zb3J0XCI+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXIgZGlzYWJsZUNsZWFyPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI25vc29ydD5cbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4hPT0nYnV0dG9ucyc7ZWxzZSB0ZXN0XCI+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPiA8c3Bhbj57e2dldEZpZWxkKHJvdyxjb2x1bW4pfGdlbmVyYWw6Y29sdW1uUGlwZXNbaWRdfX08L3NwYW4+PC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVzdD5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1wYW5lbFwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiAoYnV0dG9ucy5sZW5ndGgqMjApKydweCd9XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zO2xldCBpPWluZGV4XCI+XG4gICAgICAgICAgICAgICAgPHRpbXMtYnV0dG9uIFtidXR0b25BY3Rpb25dPVwiYnV0dG9uIT09J2RlbGV0ZSc/IGJ1dHRvbkFjdGlvbnNbaV06IHJlbW92ZUVsZW1lbnRcIiBbdGFyZ2V0RWxlbWVudF09XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgW2J1dHRvblR5cGVdPVwiYnV0dG9uXCI+PC90aW1zLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiZXhwYW5kZWREZXRhaWxcIj5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiIFthdHRyLmNvbHNwYW5dPVwiY29sdW1uSWRzLmxlbmd0aFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGV0YWlsXCIgW0BkZXRhaWxFeHBhbmRdPVwicm93ID09IGV4cGFuZGVkRWxlbWVudCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJ1wiPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRpYWdyYW1cIj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtcG9zaXRpb25cIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1zeW1ib2xcIj4gbmVzdG8gPC9kaXY+XG4gICAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1uYW1lXCI+IG5lc3RvIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC13ZWlnaHRcIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7e3Jvdy5ib2R5fX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb25cIj4gLS0gSXp2b3IgbmVraSA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImNvbHVtbklkc1wiPjwvdHI+XG4gICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogY29sdW1uSWRzO1wiIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXJvd1wiIFtjbGFzcy5leGFtcGxlLWV4cGFuZGVkLXJvd109XCJleHBhbmRlZEVsZW1lbnQgPT09IHJvd1wiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmQocm93KVwiPlxuICAgICAgPC90cj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5RGV0YWlsc1wiPlxuICAgICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogWydleHBhbmRlZERldGFpbCddXCIgY2xhc3M9XCJleGFtcGxlLWRldGFpbC1yb3dcIj48L3RyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG5cbiAgPG1hdC1wYWdpbmF0b3IgW2xlbmd0aF09XCJyZXN1bHRzTGVuZ3RoXCIgW3BhZ2VTaXplT3B0aW9uc109XCJbMTAsIDIwLCA1MCwgMTAwXVwiIFtwYWdlU2l6ZV09XCIyMFwiPjwvbWF0LXBhZ2luYXRvcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYHRhYmxle3dpZHRoOjEwMCV9dHIuZXhhbXBsZS1kZXRhaWwtcm93e2hlaWdodDowfS5idXR0b25zLXBhbmVse2Rpc3BsYXk6aW5saW5lLWZsZXg7ZmxleC1kaXJlY3Rpb246cm93fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6aG92ZXJ7YmFja2dyb3VuZDojZjVmNWY1fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6YWN0aXZle2JhY2tncm91bmQ6I2VmZWZlZn0uZXhhbXBsZS1lbGVtZW50LXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9LmV4YW1wbGUtZWxlbWVudC1kZXRhaWx7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6ZmxleH0uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW17bWluLXdpZHRoOjgwcHg7Ym9yZGVyOjJweCBzb2xpZCAjMDAwO3BhZGRpbmc6OHB4O2ZvbnQtd2VpZ2h0OmxpZ2h0ZXI7bWFyZ2luOjhweCAwO2hlaWdodDoxMDRweH0uZXhhbXBsZS1lbGVtZW50LXN5bWJvbHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjQwcHg7bGluZS1oZWlnaHQ6bm9ybWFsfS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb257cGFkZGluZzoxNnB4fS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb257b3BhY2l0eTouNX0uZXhhbXBsZS1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0uZXhhbXBsZS1sb2FkaW5nLXNoYWRle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3R0b206NTZweDtyaWdodDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTUpO3otaW5kZXg6MTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVke2NvbG9yOiM5ODAwMDA7bWF4LXdpZHRoOjM2MHB4O3RleHQtYWxpZ246Y2VudGVyfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGV0YWlsRXhwYW5kJywgW1xuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JywgbWluSGVpZ2h0OiAnMCcsIGRpc3BsYXk6ICdub25lJyB9KSksXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCcyMjVtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbXNHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpXG4gIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U29ydClcbiAgc29ydDogTWF0U29ydDtcblxuICBASW5wdXQoKVxuICBzb3J0YWJsZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBkYXRhUHJvdmlkZXI6IEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbklkczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgY29sdW1uTmFtZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtblBpcGVzOiBQaXBlVHJhbnNmb3JtW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uczogRnVuY3Rpb25bXTtcblxuICBASW5wdXQoKVxuICBkaXNwbGF5RGV0YWlscyA9IGZhbHNlO1xuXG4gIHJlc3VsdHNMZW5ndGggPSAwO1xuICBpc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gIGV4cGFuZGVkRWxlbWVudDogYW55O1xuICBkYXRhOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldEZpZWxkID0gKHNvdXJjZSwgZmllbGRQYXRoOiBzdHJpbmcpID0+IGxvZC5nZXQoc291cmNlLCBmaWVsZFBhdGgsICcnKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYnV0dG9ucyAmJiB0aGlzLmJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaCgnYnV0dG9ucycpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBzb3J0IG9yZGVyLCByZXNldCBiYWNrIHRvIHRoZSBmaXJzdCBwYWdlLlxuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5wYWdpbmF0b3IucGFnZUluZGV4ID0gMCkpO1xuXG4gICAgbWVyZ2UodGhpcy5zb3J0LnNvcnRDaGFuZ2UsIHRoaXMucGFnaW5hdG9yLnBhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiA8T2JzZXJ2YWJsZTxhbnk+PihcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyKHRoaXMuc29ydC5hY3RpdmUsIHRoaXMuc29ydC5kaXJlY3Rpb24sIHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCwgdGhpcy5wYWdpbmF0b3IucGFnZVNpemUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChkYXRhID0+IHtcbiAgICAgICAgICAvLyBGbGlwIGZsYWcgdG8gc2hvdyB0aGF0IGxvYWRpbmcgaGFzIGZpbmlzaGVkLlxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzTGVuZ3RoID0gZGF0YS50b3RhbF9jb3VudDtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGF0YS5pdGVtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIC8vIENhdGNoIGlmIHRoZSBHaXRIdWIgQVBJIGhhcyByZWFjaGVkIGl0cyByYXRlIGxpbWl0LiBSZXR1cm4gZW1wdHkgZGF0YS5cbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4gKHRoaXMuZGF0YSA9IGRhdGEpKTtcbiAgfTtcblxuICByZW1vdmVFbGVtZW50ID0gZWxlbWVudFRvRGVsZXRlID0+IHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGVsZW0gPT4gZWxlbSAhPT0gZWxlbWVudFRvRGVsZXRlKTtcbiAgfTtcblxuICB0b2dnbGVFeHBhbmQgPSBjbGlja2VkRWxlbWVudCA9PlxuICAgICh0aGlzLmV4cGFuZGVkRWxlbWVudCA9ICF0aGlzLmV4cGFuZGVkRWxlbWVudCB8fCB0aGlzLmV4cGFuZGVkRWxlbWVudCAhPT0gY2xpY2tlZEVsZW1lbnQgPyBjbGlja2VkRWxlbWVudCA6IG51bGwpO1xufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ3V0aWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdnZW5lcmFsJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW5lcmFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KGFyZ3MpKSB7XG4gICAgICBhcmdzLmZvckVhY2gocGlwZSA9PiB7XG4gICAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPnBpcGUpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSAoPFBpcGVUcmFuc2Zvcm0+YXJncykudHJhbnNmb3JtKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDb25maWcge1xyXG4gIGJ1dHRvbnM6IE1hcDxzdHJpbmcsIEJ1dHRvbj47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBHcmlkQ29uZmlnU2VydmljZSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxHcmlkQ29uZmlnPignR3JpZENvbmZpZycpO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9idXR0b24tY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcbiAgYnV0dG9ucztcbiAgY29uc3RydWN0b3IoQEluamVjdChHcmlkQ29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWcpIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZENvbmZpZ1NlcnZpY2UnLCBjb25maWcpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5idXR0b25zKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmNvbmZpZy5idXR0b25zO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuLi9ncmlkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGRpdiAgY2xhc3M9XCJidXR0b24tY29udGFpbmVyXCIgKGNsaWNrKT1cImNvbmNyZXRlQnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQsJGV2ZW50KVwiPlxuICA8ZmEgW21hdFRvb2x0aXBdPVwiYnV0dG9uRGVmLnRleHRcIiBbbmFtZV09XCJidXR0b25EZWYuaWNvblwiIFthbmltYXRpb25dPVwiYnV0dG9uRGVmLmFuaW1hdGlvblwiPjwvZmE+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuYnV0dG9uLWNvbnRhaW5lcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojNTQ1NGM3O21hcmdpbjo0cHg7bGluZS1oZWlnaHQ6MTAwJTtmbGV4OjF9LmJ1dHRvbi1jb250YWluZXI6aG92ZXJ7Y29sb3I6b3JhbmdlfWBdLFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBidXR0b25UeXBlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdGFyZ2V0RWxlbWVudDtcblxuICBASW5wdXQoKVxuICBidXR0b25BY3Rpb246IEZ1bmN0aW9uO1xuXG4gIGJ1dHRvbkRlZjogQnV0dG9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZFNlcnY6IEdyaWRTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuYnV0dG9uRGVmID0gdGhpcy5ncmlkU2Vydi5idXR0b25zLmdldCh0aGlzLmJ1dHRvblR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmNyZXRlQnV0dG9uQWN0aW9uID0gKHRhcmdldEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMuYnV0dG9uQWN0aW9uKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuYnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGltc0dyaWRDb21wb25lbnQgfSBmcm9tICcuL3RpbXMtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBNYXRCdXR0b25Nb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRNZW51TW9kdWxlLFxuICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gIE1hdFNlbGVjdE1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRUb29sdGlwLFxuICBNYXRUb29sdGlwTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBHZW5lcmFsUGlwZSB9IGZyb20gJy4vZ2VuZXJhbC5waXBlJztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQW5ndWxhckZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1mb250LWF3ZXNvbWUnO1xuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuL2dyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBHcmlkQ29uZmlnLCBHcmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYnV0dG9uLWNvbmZpZyc7XG5cbi8vIGV4cG9ydCBjb25zdCBidXR0b25zOiBNYXA8c3RyaW5nLCBCdXR0b24+ID0gbmV3IE1hcChbXG4vLyAgIFsnZWRpdCcsIG5ldyBCdXR0b24oJ0l6bWVuaScsICdwZW5jaWwtc3F1YXJlLW8nKV0sXG4vLyAgIFsnZGVsZXRlJywgbmV3IEJ1dHRvbignT2JyacOFwqFpJywgJ3RyYXNoLW8nKV0sXG4vLyAgIFsndmlldycsIG5ldyBCdXR0b24oJ0RldGFsamknLCAnYWRkcmVzcy1jYXJkLW8nKV0sXG4vLyAgIFsnc2F2ZScsIG5ldyBCdXR0b24oJ1Nhw4TCjXV2YWonLCAnZmxvcHB5LW8nKV0sXG4vLyAgIFsnYXBwcm92ZScsIG5ldyBCdXR0b24oJ09kb2JyaScsICdjaGVjaycpXSxcbi8vICAgWydkZW55JywgbmV3IEJ1dHRvbignT2RiaWonLCAnYmFuJyldLFxuLy8gICBbJ2dlbmVyYXRlJywgbmV3IEJ1dHRvbignR2VuZXJpw4XCoWkgZG9rdW1lbnQnLCAnZmlsZS10ZXh0JyldLFxuLy8gXSk7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQW5ndWxhckZvbnRBd2Vzb21lTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RpbXNHcmlkQ29tcG9uZW50LCBHZW5lcmFsUGlwZSwgQnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbXNHcmlkQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbR3JpZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZE1vZHVsZSB7XG4gIHN0YXRpYyBzZXRDb25maWcoY29uZmlnOiBHcmlkQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUaW1zR3JpZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBHcmlkU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1zeXN0ZW1zTGliQ29tcG9uZW50IH0gZnJvbSAnLi90aW1zeXN0ZW1zLWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltc0dyaWRNb2R1bGUgfSBmcm9tICcuL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1RpbXNHcmlkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVGltc3lzdGVtc0xpYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zR3JpZE1vZHVsZSwgVGltc3lzdGVtc0xpYkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYk1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFRRSw4QkFBb0IsSUFBZ0I7UUFBcEMsaUJBQXdDO1FBQXBCLFNBQUksR0FBSixJQUFJLENBQVk7NkJBRXBCLFVBQ2QsSUFBWSxFQUNaLEtBQWEsRUFDYixJQUFZOztZQUVaLElBQU0sSUFBSSxHQUFHLHNDQUFzQyxDQUFDOztZQUNwRCxJQUFNLFVBQVUsR0FBTSxJQUFJLHVDQUFrQyxJQUFJLGVBQVUsS0FBSyxlQUFTLElBQUk7Z0JBQzFGLENBQUMsQ0FBRSxDQUFDO1lBRU4sT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBWSxVQUFVLENBQUMsQ0FBQztTQUM3QztLQVp1Qzs7Z0JBSnpDLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSlEsVUFBVTs7OytCQUZuQjs7Ozs7OztBQ0FBO0lBYUU7S0FB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