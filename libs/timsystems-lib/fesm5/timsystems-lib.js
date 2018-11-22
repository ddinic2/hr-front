import { Injectable, Pipe, InjectionToken, Inject, Component, Input, NgModule, ViewChild, defineInjectable, inject } from '@angular/core';
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
var TimsystemsLibModule = /** @class */ (function () {
    function TimsystemsLibModule() {
    }
    TimsystemsLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [TimsystemsLibComponent],
                    exports: [TimsystemsLibComponent]
                },] },
    ];
    return TimsystemsLibModule;
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
            if (_this.buttons && _this.buttons.length > 0 && !_this.columnIds.some(function (item) { return item === 'buttons'; })) {
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
        var _this = this;
        if (this.buttonType) {
            this.buttonDef = this.gridServ.buttons.find(function (item) { return item.name === _this.buttonType; });
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tims-button',
                    template: "<div  class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [matTooltip]=\"buttonDef.button.text\" [name]=\"buttonDef.button.icon\" [animation]=\"buttonDef.button.animation\"></fa>\n</div>\n",
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { TimsystemsLibService, TimsystemsLibComponent, TimsystemsLibModule, TimsGridModule, TimsGridComponent, GridConfigService as ɵe, ButtonComponent as ɵb, GeneralPipe as ɵa, GridService as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIuanMubWFwIiwic291cmNlcyI6WyJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zeXN0ZW1zLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIubW9kdWxlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL3RpbXMtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvZ2VuZXJhbC5waXBlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2J1dHRvbi1jb25maWcudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvZ3JpZC5zZXJ2aWNlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL3RpbXMtZ3JpZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYlNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgZ2V0UmVwb0lzc3VlcyA9IChcbiAgICBzb3J0OiBzdHJpbmcsXG4gICAgb3JkZXI6IHN0cmluZyxcbiAgICBwYWdlOiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxHaXRodWJBcGk+ID0+IHtcbiAgICBjb25zdCBocmVmID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL2lzc3Vlcyc7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IGAke2hyZWZ9P3E9cmVwbzphbmd1bGFyL21hdGVyaWFsMiZzb3J0PSR7c29ydH0mb3JkZXI9JHtvcmRlcn0mcGFnZT0ke3BhZ2UgK1xuICAgICAgMX1gO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8R2l0aHViQXBpPihyZXF1ZXN0VXJsKTtcbiAgfVxufVxuZXhwb3J0IGludGVyZmFjZSBHaXRodWJBcGkge1xuICBpdGVtczogR2l0aHViSXNzdWVbXTtcbiAgdG90YWxfY291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRodWJJc3N1ZSB7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgbnVtYmVyOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLXRpbXN5c3RlbXMtbGliJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIHRpbXN5c3RlbXMtbGliIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1zeXN0ZW1zTGliQ29tcG9uZW50IH0gZnJvbSAnLi90aW1zeXN0ZW1zLWxpYi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbVGltc3lzdGVtc0xpYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zeXN0ZW1zTGliQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBsb2QgPSBfO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lciBtYXQtZWxldmF0aW9uLXo4XCI+XG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLWxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHMgfHwgaXNSYXRlTGltaXRSZWFjaGVkXCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVkXCIgKm5nSWY9XCJpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICAgIERvw4XCoWxvIGplIGRvIGdyZcOFwqFrZSwgbW9saW1vIHByb3Zlcml0ZSB2YcOFwqF1IGludGVybmV0IGtvbmVrY2lqdVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS10YWJsZS1jb250YWluZXJcIj5cblxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVwiIGNsYXNzPVwiZXhhbXBsZS10YWJsZVwiIG1hdFNvcnQgbXVsdGlUZW1wbGF0ZURhdGFSb3dzIG1hdFNvcnREaXNhYmxlQ2xlYXJcbiAgICAgIG1hdFNvcnREaXJlY3Rpb249XCJhc2NcIj5cblxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInt7Y29sdW1ufX1cIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbklkczsgbGV0IGlkPWluZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzb3J0YWJsZTtlbHNlIG5vc29ydFwiPlxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIGRpc2FibGVDbGVhcj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNub3NvcnQ+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uIT09J2J1dHRvbnMnO2Vsc2UgdGVzdFwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj4gPHNwYW4+e3tnZXRGaWVsZChyb3csY29sdW1uKXxnZW5lcmFsOmNvbHVtblBpcGVzW2lkXX19PC9zcGFuPjwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI3Rlc3Q+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtcGFuZWxcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogKGJ1dHRvbnMubGVuZ3RoKjIwKSsncHgnfVwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9ucztsZXQgaT1pbmRleFwiPlxuICAgICAgICAgICAgICAgIDx0aW1zLWJ1dHRvbiBbYnV0dG9uQWN0aW9uXT1cImJ1dHRvbiE9PSdkZWxldGUnPyBidXR0b25BY3Rpb25zW2ldOiByZW1vdmVFbGVtZW50XCIgW3RhcmdldEVsZW1lbnRdPVwicm93XCJcbiAgICAgICAgICAgICAgICAgIFtidXR0b25UeXBlXT1cImJ1dHRvblwiPjwvdGltcy1idXR0b24+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImV4cGFuZGVkRGV0YWlsXCI+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIiBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbklkcy5sZW5ndGhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRldGFpbFwiIFtAZGV0YWlsRXhwYW5kXT1cInJvdyA9PSBleHBhbmRlZEVsZW1lbnQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCdcIj5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kaWFncmFtXCI+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXBvc2l0aW9uXCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtc3ltYm9sXCI+IG5lc3RvIDwvZGl2PlxuICAgICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtbmFtZVwiPiBuZXN0byA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtd2VpZ2h0XCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge3tyb3cuYm9keX19XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9uXCI+IC0tIEl6dm9yIG5la2kgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJjb2x1bW5JZHNcIj48L3RyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGNvbHVtbklkcztcIiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1yb3dcIiBbY2xhc3MuZXhhbXBsZS1leHBhbmRlZC1yb3ddPVwiZXhwYW5kZWRFbGVtZW50ID09PSByb3dcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kKHJvdylcIj5cbiAgICAgIDwvdHI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheURldGFpbHNcIj5cbiAgICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IFsnZXhwYW5kZWREZXRhaWwnXVwiIGNsYXNzPVwiZXhhbXBsZS1kZXRhaWwtcm93XCI+PC90cj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuXG4gIDxtYXQtcGFnaW5hdG9yIFtsZW5ndGhdPVwicmVzdWx0c0xlbmd0aFwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwiWzEwLCAyMCwgNTAsIDEwMF1cIiBbcGFnZVNpemVdPVwiMjBcIj48L21hdC1wYWdpbmF0b3I+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B0YWJsZXt3aWR0aDoxMDAlfXRyLmV4YW1wbGUtZGV0YWlsLXJvd3toZWlnaHQ6MH0uYnV0dG9ucy1wYW5lbHtkaXNwbGF5OmlubGluZS1mbGV4O2ZsZXgtZGlyZWN0aW9uOnJvd310ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmhvdmVye2JhY2tncm91bmQ6I2Y1ZjVmNX10ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmFjdGl2ZXtiYWNrZ3JvdW5kOiNlZmVmZWZ9LmV4YW1wbGUtZWxlbWVudC1yb3cgdGR7Ym9yZGVyLWJvdHRvbS13aWR0aDowfS5leGFtcGxlLWVsZW1lbnQtZGV0YWlse292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmZsZXh9LmV4YW1wbGUtZWxlbWVudC1kaWFncmFte21pbi13aWR0aDo4MHB4O2JvcmRlcjoycHggc29saWQgIzAwMDtwYWRkaW5nOjhweDtmb250LXdlaWdodDpsaWdodGVyO21hcmdpbjo4cHggMDtoZWlnaHQ6MTA0cHh9LmV4YW1wbGUtZWxlbWVudC1zeW1ib2x7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZTo0MHB4O2xpbmUtaGVpZ2h0Om5vcm1hbH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9ue3BhZGRpbmc6MTZweH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9ue29wYWNpdHk6LjV9LmV4YW1wbGUtY29udGFpbmVye3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmV4YW1wbGUtbG9hZGluZy1zaGFkZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjU2cHg7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjE1KTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5leGFtcGxlLXJhdGUtbGltaXQtcmVhY2hlZHtjb2xvcjojOTgwMDAwO21heC13aWR0aDozNjBweDt0ZXh0LWFsaWduOmNlbnRlcn1gXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RldGFpbEV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnLCBkaXNwbGF5OiAnbm9uZScgfSkpLFxuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdleHBhbmRlZCA8PT4gY29sbGFwc2VkJywgYW5pbWF0ZSgnMjI1bXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpJykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKVxuICBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcblxuICBAVmlld0NoaWxkKE1hdFNvcnQpXG4gIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgQElucHV0KClcbiAgc29ydGFibGU6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZGF0YVByb3ZpZGVyOiBGdW5jdGlvbjtcblxuICBASW5wdXQoKVxuICBjb2x1bW5JZHM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbk5hbWVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBjb2x1bW5QaXBlczogUGlwZVRyYW5zZm9ybVtdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbnM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbnM6IEZ1bmN0aW9uW107XG5cbiAgQElucHV0KClcbiAgZGlzcGxheURldGFpbHMgPSBmYWxzZTtcblxuICByZXN1bHRzTGVuZ3RoID0gMDtcbiAgaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gIGlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICBleHBhbmRlZEVsZW1lbnQ6IGFueTtcbiAgZGF0YTogYW55W107XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRGaWVsZCA9IChzb3VyY2UsIGZpZWxkUGF0aDogc3RyaW5nKSA9PiBsb2QuZ2V0KHNvdXJjZSwgZmllbGRQYXRoLCAnJyk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICByZWZyZXNoID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmJ1dHRvbnMgJiYgdGhpcy5idXR0b25zLmxlbmd0aCA+IDAgJiYgIXRoaXMuY29sdW1uSWRzLnNvbWUoaXRlbSA9PiBpdGVtID09PSAnYnV0dG9ucycpKSB7XG4gICAgICB0aGlzLmNvbHVtbklkcy5wdXNoKCdidXR0b25zJyk7XG4gICAgfVxuICAgIC8vIElmIHRoZSB1c2VyIGNoYW5nZXMgdGhlIHNvcnQgb3JkZXIsIHJlc2V0IGJhY2sgdG8gdGhlIGZpcnN0IHBhZ2UuXG4gICAgdGhpcy5zb3J0LnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+ICh0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXggPSAwKSk7XG5cbiAgICBtZXJnZSh0aGlzLnNvcnQuc29ydENoYW5nZSwgdGhpcy5wYWdpbmF0b3IucGFnZSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIDxPYnNlcnZhYmxlPGFueT4+KFxuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIodGhpcy5zb3J0LmFjdGl2ZSwgdGhpcy5zb3J0LmRpcmVjdGlvbiwgdGhpcy5wYWdpbmF0b3IucGFnZUluZGV4LCB0aGlzLnBhZ2luYXRvci5wYWdlU2l6ZSlcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKGRhdGEgPT4ge1xuICAgICAgICAgIC8vIEZsaXAgZmxhZyB0byBzaG93IHRoYXQgbG9hZGluZyBoYXMgZmluaXNoZWQuXG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5pc1JhdGVMaW1pdFJlYWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlc3VsdHNMZW5ndGggPSBkYXRhLnRvdGFsX2NvdW50O1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHJldHVybiBkYXRhLml0ZW1zO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgICAgICAgLy8gQ2F0Y2ggaWYgdGhlIEdpdEh1YiBBUEkgaGFzIHJlYWNoZWQgaXRzIHJhdGUgbGltaXQuIFJldHVybiBlbXB0eSBkYXRhLlxuICAgICAgICAgIHRoaXMuaXNSYXRlTGltaXRSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKFtdKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiAodGhpcy5kYXRhID0gZGF0YSkpO1xuICB9XG5cbiAgcmVtb3ZlRWxlbWVudCA9IGVsZW1lbnRUb0RlbGV0ZSA9PiB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihlbGVtID0+IGVsZW0gIT09IGVsZW1lbnRUb0RlbGV0ZSk7XG4gIH1cblxuICB0b2dnbGVFeHBhbmQgPSBjbGlja2VkRWxlbWVudCA9PlxuICAgICh0aGlzLmV4cGFuZGVkRWxlbWVudCA9ICF0aGlzLmV4cGFuZGVkRWxlbWVudCB8fCB0aGlzLmV4cGFuZGVkRWxlbWVudCAhPT0gY2xpY2tlZEVsZW1lbnQgPyBjbGlja2VkRWxlbWVudCA6IG51bGwpXG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAndXRpbCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2dlbmVyYWwnXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkoYXJncykpIHtcbiAgICAgIGFyZ3MuZm9yRWFjaChwaXBlID0+IHtcbiAgICAgICAgdmFsdWUgPSAoPFBpcGVUcmFuc2Zvcm0+cGlwZSkudHJhbnNmb3JtKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9ICg8UGlwZVRyYW5zZm9ybT5hcmdzKS50cmFuc2Zvcm0odmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJ1dHRvbkRlZmluaXRpb24gfSBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDb25maWcge1xyXG4gIGJ1dHRvbnM6IEJ1dHRvbkRlZmluaXRpb25bXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEdyaWRDb25maWdTZXJ2aWNlID0gbmV3IEluamVjdGlvblRva2VuPEdyaWRDb25maWc+KCdHcmlkQ29uZmlnJyk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JpZENvbmZpZ1NlcnZpY2UsIEdyaWRDb25maWcgfSBmcm9tICcuL2J1dHRvbi1jb25maWcnO1xuaW1wb3J0IHsgQnV0dG9uRGVmaW5pdGlvbiB9IGZyb20gJy4vYnV0dG9uJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcbiAgYnV0dG9uczogQnV0dG9uRGVmaW5pdGlvbltdO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEdyaWRDb25maWdTZXJ2aWNlKSBwcml2YXRlIGNvbmZpZzogR3JpZENvbmZpZykge1xuICAgIGlmICh0aGlzLmNvbmZpZy5idXR0b25zKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmNvbmZpZy5idXR0b25zO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXR0b25EZWZpbml0aW9uIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vZ3JpZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgIGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiIChjbGljayk9XCJjb25jcmV0ZUJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50LCRldmVudClcIj5cbiAgPGZhIFttYXRUb29sdGlwXT1cImJ1dHRvbkRlZi5idXR0b24udGV4dFwiIFtuYW1lXT1cImJ1dHRvbkRlZi5idXR0b24uaWNvblwiIFthbmltYXRpb25dPVwiYnV0dG9uRGVmLmJ1dHRvbi5hbmltYXRpb25cIj48L2ZhPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmJ1dHRvbi1jb250YWluZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzU0NTRjNzttYXJnaW46NHB4O2xpbmUtaGVpZ2h0OjEwMCU7ZmxleDoxfS5idXR0b24tY29udGFpbmVyOmhvdmVye2NvbG9yOm9yYW5nZX1gXSxcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYnV0dG9uVHlwZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRhcmdldEVsZW1lbnQ7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uOiBGdW5jdGlvbjtcblxuICBidXR0b25EZWY6IEJ1dHRvbkRlZmluaXRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkU2VydjogR3JpZFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5idXR0b25EZWYgPSB0aGlzLmdyaWRTZXJ2LmJ1dHRvbnMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gdGhpcy5idXR0b25UeXBlKTtcbiAgICB9XG4gIH1cblxuICBjb25jcmV0ZUJ1dHRvbkFjdGlvbiA9ICh0YXJnZXRFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aGlzLmJ1dHRvbkFjdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRpbXNHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi90aW1zLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNvcnRNb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRUb29sYmFyTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0VG9vbHRpcCxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgR2VuZXJhbFBpcGUgfSBmcm9tICcuL2dlbmVyYWwucGlwZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZm9udC1hd2Vzb21lJztcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi9ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JpZENvbmZpZywgR3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2J1dHRvbi1jb25maWcnO1xuXG4vLyBleHBvcnQgY29uc3QgYnV0dG9uczogTWFwPHN0cmluZywgQnV0dG9uPiA9IG5ldyBNYXAoW1xuLy8gICBbJ2VkaXQnLCBuZXcgQnV0dG9uKCdJem1lbmknLCAncGVuY2lsLXNxdWFyZS1vJyldLFxuLy8gICBbJ2RlbGV0ZScsIG5ldyBCdXR0b24oJ09icmnDhcKhaScsICd0cmFzaC1vJyldLFxuLy8gICBbJ3ZpZXcnLCBuZXcgQnV0dG9uKCdEZXRhbGppJywgJ2FkZHJlc3MtY2FyZC1vJyldLFxuLy8gICBbJ3NhdmUnLCBuZXcgQnV0dG9uKCdTYcOEwo11dmFqJywgJ2Zsb3BweS1vJyldLFxuLy8gICBbJ2FwcHJvdmUnLCBuZXcgQnV0dG9uKCdPZG9icmknLCAnY2hlY2snKV0sXG4vLyAgIFsnZGVueScsIG5ldyBCdXR0b24oJ09kYmlqJywgJ2JhbicpXSxcbi8vICAgWydnZW5lcmF0ZScsIG5ldyBCdXR0b24oJ0dlbmVyacOFwqFpIGRva3VtZW50JywgJ2ZpbGUtdGV4dCcpXSxcbi8vIF0pO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1zR3JpZENvbXBvbmVudCwgR2VuZXJhbFBpcGUsIEJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zR3JpZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0dyaWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVGltc0dyaWRNb2R1bGUge1xuICBzdGF0aWMgc2V0Q29uZmlnKGNvbmZpZzogR3JpZENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVGltc0dyaWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgR3JpZFNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBHcmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsib2JzZXJ2YWJsZU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQVFFLDhCQUFvQixJQUFnQjtRQUFwQyxpQkFBd0M7UUFBcEIsU0FBSSxHQUFKLElBQUksQ0FBWTs2QkFFcEIsVUFDZCxJQUFZLEVBQ1osS0FBYSxFQUNiLElBQVk7O1lBRVosSUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7O1lBQ3BELElBQU0sVUFBVSxHQUFNLElBQUksdUNBQWtDLElBQUksZUFBVSxLQUFLLGVBQVMsSUFBSTtnQkFDMUYsQ0FBQyxDQUFFLENBQUM7WUFFTixPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFZLFVBQVUsQ0FBQyxDQUFDO1NBQzdDO0tBWnVDOztnQkFKekMsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFKUSxVQUFVOzs7K0JBRm5COzs7Ozs7O0FDQUE7SUFhRTtLQUFpQjs7OztJQUVqQix5Q0FBUTs7O0lBQVI7S0FDQzs7Z0JBZEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxzREFJVDtvQkFDRCxNQUFNLEVBQUUsRUFBRTtpQkFDWDs7OztpQ0FWRDs7Ozs7OztBQ0FBOzs7O2dCQUdDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtvQkFDWCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDOzs4QkFQRDs7Ozs7OztBQ0FBO0FBT0EsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDOztJQWtIWjtRQUFBLGlCQUFnQjs4QkFQQyxLQUFLOzZCQUVOLENBQUM7Z0NBQ0UsSUFBSTtrQ0FDRixLQUFLO3dCQUtmLFVBQUMsTUFBTSxFQUFFLFNBQWlCLElBQUssT0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLEdBQUE7dUJBTTlEO1lBQ1IsSUFBSSxLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLFNBQVMsR0FBQSxDQUFDLEVBQUU7Z0JBQy9GLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hDOzs7WUFFRCxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBTSxRQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBQyxDQUFDLENBQUM7WUFFckUsS0FBSyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2lCQUM3QyxJQUFJLENBQ0gsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLFNBQVMsQ0FBQztnQkFDUixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUM3QiwwQkFDRSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQzNHO2FBQ0gsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxVQUFBLElBQUk7OztnQkFFTixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNuQixDQUFDLEVBQ0YsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7OztnQkFFOUIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDL0IsT0FBT0EsRUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pCLENBQUMsQ0FDSDtpQkFDQSxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksUUFBQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBQyxDQUFDLENBQUM7U0FDMUM7NkJBRWUsVUFBQSxlQUFlO1lBQzdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssZUFBZSxHQUFBLENBQUMsQ0FBQztTQUNoRTs0QkFFYyxVQUFBLGNBQWM7WUFDM0IsUUFBQyxLQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsS0FBSSxDQUFDLGVBQWUsSUFBSSxLQUFJLENBQUMsZUFBZSxLQUFLLGNBQWMsR0FBRyxjQUFjLEdBQUcsSUFBSTtTQUFDO0tBL0NuRzs7OztJQUloQixvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDaEI7O2dCQXZIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLCtyR0FpRVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsbzZCQUFvNkIsQ0FBQztvQkFDOTZCLFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsY0FBYyxFQUFFOzRCQUN0QixLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQzs0QkFDN0UsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDekMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO3lCQUN0RixDQUFDO3FCQUNIO2lCQUNGOzs7Ozs0QkFFRSxTQUFTLFNBQUMsWUFBWTt1QkFHdEIsU0FBUyxTQUFDLE9BQU87MkJBR2pCLEtBQUs7K0JBR0wsS0FBSzs0QkFHTCxLQUFLOzhCQUdMLEtBQUs7OEJBR0wsS0FBSzswQkFHTCxLQUFLO2dDQUdMLEtBQUs7aUNBR0wsS0FBSzs7NEJBakhSOzs7Ozs7O0FDQUE7Ozs7Ozs7O0lBT0UsK0JBQVM7Ozs7O0lBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVTtRQUM5QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNmLEtBQUssR0FBRyxtQkFBZ0IsSUFBSSxHQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsS0FBSyxHQUFHLG1CQUFnQixJQUFJLEdBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxLQUFLLENBQUM7S0FDZDs7Z0JBaEJGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEI7O3NCQUxEOzs7Ozs7O0FDQ0E7QUFNQSxJQUFhLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFhLFlBQVksQ0FBQzs7Ozs7O0FDUDdFO0lBU0UscUJBQStDLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDL0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ3BDO0tBQ0Y7O2dCQVRGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0RBR2MsTUFBTSxTQUFDLGlCQUFpQjs7O3NCQVR2Qzs7Ozs7OztBQ0FBO0lBd0JFLHlCQUFvQixRQUFxQjtRQUF6QyxpQkFBNkM7UUFBekIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtvQ0FRbEIsVUFBQyxhQUFhLEVBQUUsS0FBaUI7WUFDdEQsSUFBSSxLQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDbEM7U0FDRjtLQWI0Qzs7OztJQUU3QyxrQ0FBUTs7O0lBQVI7UUFBQSxpQkFJQztRQUhDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSSxDQUFDLFVBQVUsR0FBQSxDQUFDLENBQUM7U0FDcEY7S0FDRjs7Z0JBMUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLG9PQUdYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHlIQUF5SCxDQUFDO2lCQUNwSTs7OztnQkFUUSxXQUFXOzs7NkJBV2pCLEtBQUs7Z0NBR0wsS0FBSzsrQkFHTCxLQUFLOzswQkFuQlI7Ozs7Ozs7QUNBQTs7Ozs7OztJQXVFUyx3QkFBUzs7OztJQUFoQixVQUFpQixNQUFrQjtRQUNqQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1g7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7O2dCQTFDRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osd0JBQXdCO3dCQUN4QixjQUFjO3dCQUNkLGNBQWM7d0JBQ2Qsa0JBQWtCO3dCQUNsQix1QkFBdUI7d0JBQ3ZCLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYix3QkFBd0I7d0JBQ3hCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2Ysa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixjQUFjO3dCQUNkLFdBQVc7d0JBQ1gsbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO29CQUMvRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDNUIsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUN6Qjs7eUJBckVEOzs7Ozs7Ozs7Ozs7Ozs7In0=