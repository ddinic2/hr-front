(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@angular/animations'), require('@angular/material'), require('rxjs'), require('rxjs/operators'), require('lodash'), require('util'), require('@angular/common'), require('@angular/cdk/table'), require('@angular/forms'), require('@angular/platform-browser/animations'), require('angular-font-awesome')) :
    typeof define === 'function' && define.amd ? define('timsystems-lib', ['exports', '@angular/core', '@angular/common/http', '@angular/animations', '@angular/material', 'rxjs', 'rxjs/operators', 'lodash', 'util', '@angular/common', '@angular/cdk/table', '@angular/forms', '@angular/platform-browser/animations', 'angular-font-awesome'], factory) :
    (factory((global['timsystems-lib'] = {}),global.ng.core,global.ng.common.http,global.ng.animations,global.ng.material,global.rxjs,global.rxjs.operators,null,null,global.ng.common,global.ng.cdk.table,global.ng.forms,global.ng.platformBrowser.animations,null));
}(this, (function (exports,i0,i1,animations,material,rxjs,operators,_,util,common,table,forms,animations$1,angularFontAwesome) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TimsystemsLibService = (function () {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        TimsystemsLibService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ TimsystemsLibService.ngInjectableDef = i0.defineInjectable({ factory: function TimsystemsLibService_Factory() { return new TimsystemsLibService(i0.inject(i1.HttpClient)); }, token: TimsystemsLibService, providedIn: "root" });
        return TimsystemsLibService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TimsystemsLibComponent = (function () {
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
            { type: i0.Component, args: [{
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
    var TimsGridComponent = (function () {
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
                rxjs.merge(_this.sort.sortChange, _this.paginator.page)
                    .pipe(operators.startWith({}), operators.switchMap(function () {
                    _this.isLoadingResults = true;
                    return /** @type {?} */ ((_this.dataProvider(_this.sort.active, _this.sort.direction, _this.paginator.pageIndex, _this.paginator.pageSize)));
                }), operators.map(function (data) {
                    // Flip flag to show that loading has finished.
                    // Flip flag to show that loading has finished.
                    _this.isLoadingResults = false;
                    _this.isRateLimitReached = false;
                    _this.resultsLength = data.total_count;
                    console.log(data);
                    return data.items;
                }), operators.catchError(function () {
                    _this.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    _this.isRateLimitReached = true;
                    return rxjs.of([]);
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
            { type: i0.Component, args: [{
                        selector: 'tims-tims-grid',
                        template: "<div class=\"example-container mat-elevation-z8\">\n  <div class=\"example-loading-shade\" *ngIf=\"isLoadingResults || isRateLimitReached\">\n    <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n    <div class=\"example-rate-limit-reached\" *ngIf=\"isRateLimitReached\">\n      Do\u0161lo je do gre\u0161ke, molimo proverite va\u0161u internet konekciju\n    </div>\n  </div>\n\n  <div class=\"example-table-container\">\n\n    <table mat-table [dataSource]=\"data\" class=\"example-table\" matSort multiTemplateDataRows matSortDisableClear\n      matSortDirection=\"asc\">\n\n\n      <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of columnIds; let id=index\">\n        <ng-container *ngIf=\"sortable;else nosort\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header disableClear> {{columnNames[id]}} </th>\n        </ng-container>\n        <ng-template #nosort>\n          <th mat-header-cell *matHeaderCellDef> {{columnNames[id]}} </th>\n        </ng-template>\n        <ng-container *ngIf=\"column!=='buttons';else test\">\n          <td mat-cell *matCellDef=\"let row\"> <span>{{getField(row,column)|general:columnPipes[id]}}</span></td>\n        </ng-container>\n        <ng-template #test>\n          <td mat-cell *matCellDef=\"let row\">\n            <div class=\"buttons-panel\" [ngStyle]=\"{'width': (buttons.length*20)+'px'}\">\n              <ng-container *ngFor=\"let button of buttons;let i=index\">\n                <tims-button [buttonAction]=\"button!=='delete'? buttonActions[i]: removeElement\" [targetElement]=\"row\"\n                  [buttonType]=\"button\"></tims-button>\n              </ng-container>\n            </div>\n          </td>\n        </ng-template>\n      </ng-container>\n\n      <ng-container matColumnDef=\"expandedDetail\">\n        <td mat-cell *matCellDef=\"let row\" [attr.colspan]=\"columnIds.length\">\n          <div class=\"example-element-detail\" [@detailExpand]=\"row == expandedElement ? 'expanded' : 'collapsed'\">\n            <!-- <div class=\"example-element-diagram\"> -->\n            <!-- <div class=\"example-element-position\"> {{row.body}} </div> -->\n            <!-- <div class=\"example-element-symbol\"> nesto </div>\n              <!-- <div class=\"example-element-name\"> nesto </div> -->\n            <!-- <div class=\"example-element-weight\"> {{row.body}} </div> -->\n            <!-- </div> -->\n            <div class=\"example-element-description\">\n              {{row.body}}\n              <span class=\"example-element-description-attribution\"> -- Izvor neki </span>\n            </div>\n          </div>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"columnIds\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: columnIds;\" class=\"example-element-row\" [class.example-expanded-row]=\"expandedElement === row\"\n        (click)=\"toggleExpand(row)\">\n      </tr>\n      <ng-container *ngIf=\"displayDetails\">\n        <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"example-detail-row\"></tr>\n      </ng-container>\n    </table>\n  </div>\n\n  <mat-paginator [length]=\"resultsLength\" [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"20\"></mat-paginator>\n</div>\n",
                        styles: ["table{width:100%}tr.example-detail-row{height:0}.buttons-panel{display:inline-flex;flex-direction:row}tr.example-element-row:not(.example-expanded-row):hover{background:#f5f5f5}tr.example-element-row:not(.example-expanded-row):active{background:#efefef}.example-element-row td{border-bottom-width:0}.example-element-detail{overflow:hidden;display:flex}.example-element-diagram{min-width:80px;border:2px solid #000;padding:8px;font-weight:lighter;margin:8px 0;height:104px}.example-element-symbol{font-weight:700;font-size:40px;line-height:normal}.example-element-description{padding:16px}.example-element-description-attribution{opacity:.5}.example-container{position:relative;width:100%}.example-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.example-rate-limit-reached{color:#980000;max-width:360px;text-align:center}"],
                        animations: [
                            animations.trigger('detailExpand', [
                                animations.state('collapsed', animations.style({ height: '0px', minHeight: '0', display: 'none' })),
                                animations.state('expanded', animations.style({ height: '*' })),
                                animations.transition('expanded <=> collapsed', animations.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                            ]),
                        ],
                    },] },
        ];
        /** @nocollapse */
        TimsGridComponent.ctorParameters = function () { return []; };
        TimsGridComponent.propDecorators = {
            paginator: [{ type: i0.ViewChild, args: [material.MatPaginator,] }],
            sort: [{ type: i0.ViewChild, args: [material.MatSort,] }],
            sortable: [{ type: i0.Input }],
            dataProvider: [{ type: i0.Input }],
            columnIds: [{ type: i0.Input }],
            columnNames: [{ type: i0.Input }],
            columnPipes: [{ type: i0.Input }],
            buttons: [{ type: i0.Input }],
            buttonActions: [{ type: i0.Input }],
            displayDetails: [{ type: i0.Input }]
        };
        return TimsGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GeneralPipe = (function () {
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
                if (util.isArray(args)) {
                    args.forEach(function (pipe) {
                        value = ((pipe)).transform(value);
                    });
                }
                else {
                    value = ((args)).transform(value);
                }
                return value;
            };
        GeneralPipe.decorators = [
            { type: i0.Pipe, args: [{
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
    var GridConfigService = new i0.InjectionToken('GridConfig');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GridService = (function () {
        function GridService(config) {
            this.config = config;
            console.log('GridConfigService', config);
            if (this.config.buttons) {
                this.buttons = this.config.buttons;
            }
        }
        GridService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        /** @nocollapse */
        GridService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [GridConfigService,] }] }
            ];
        };
        /** @nocollapse */ GridService.ngInjectableDef = i0.defineInjectable({ factory: function GridService_Factory() { return new GridService(i0.inject(GridConfigService)); }, token: GridService, providedIn: "root" });
        return GridService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ButtonComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'tims-button',
                        template: "<div  class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [matTooltip]=\"buttonDef.text\" [name]=\"buttonDef.icon\" [animation]=\"buttonDef.animation\"></fa>\n</div>\n",
                        styles: [".button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}"],
                    },] },
        ];
        /** @nocollapse */
        ButtonComponent.ctorParameters = function () {
            return [
                { type: GridService }
            ];
        };
        ButtonComponent.propDecorators = {
            buttonType: [{ type: i0.Input }],
            targetElement: [{ type: i0.Input }],
            buttonAction: [{ type: i0.Input }]
        };
        return ButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TimsGridModule = (function () {
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angularFontAwesome.AngularFontAwesomeModule,
                            table.CdkTableModule,
                            material.MatTableModule,
                            material.MatPaginatorModule,
                            animations$1.BrowserAnimationsModule,
                            material.MatTooltipModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            i1.HttpClientModule,
                            material.MatCardModule,
                            material.MatProgressSpinnerModule,
                            material.MatMenuModule,
                            material.MatIconModule,
                            material.MatToolbarModule,
                            material.MatButtonModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatSelectModule,
                            material.MatSortModule,
                            material.MatTableModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
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
    var TimsystemsLibModule = (function () {
        function TimsystemsLibModule() {
        }
        TimsystemsLibModule.decorators = [
            { type: i0.NgModule, args: [{
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

    exports.TimsystemsLibService = TimsystemsLibService;
    exports.TimsystemsLibComponent = TimsystemsLibComponent;
    exports.TimsystemsLibModule = TimsystemsLibModule;
    exports.TimsGridModule = TimsGridModule;
    exports.ɵe = GridConfigService;
    exports.ɵc = ButtonComponent;
    exports.ɵb = GeneralPipe;
    exports.ɵd = GridService;
    exports.ɵa = TimsGridComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dlbmVyYWwucGlwZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24tY29uZmlnLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dyaWQuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRpbXN5c3RlbXNMaWJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGdldFJlcG9Jc3N1ZXMgPSAoXG4gICAgc29ydDogc3RyaW5nLFxuICAgIG9yZGVyOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8R2l0aHViQXBpPiA9PiB7XG4gICAgY29uc3QgaHJlZiA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3NlYXJjaC9pc3N1ZXMnO1xuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtocmVmfT9xPXJlcG86YW5ndWxhci9tYXRlcmlhbDImc29ydD0ke3NvcnR9Jm9yZGVyPSR7b3JkZXJ9JnBhZ2U9JHtwYWdlICtcbiAgICAgIDF9YDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEdpdGh1YkFwaT4ocmVxdWVzdFVybCk7XG4gIH1cbn1cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViQXBpIHtcbiAgaXRlbXM6IEdpdGh1Yklzc3VlW107XG4gIHRvdGFsX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViSXNzdWUge1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zeXN0ZW1zLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICB0aW1zeXN0ZW1zLWxpYiB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBsb2QgPSBfO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lciBtYXQtZWxldmF0aW9uLXo4XCI+XG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLWxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHMgfHwgaXNSYXRlTGltaXRSZWFjaGVkXCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVkXCIgKm5nSWY9XCJpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICAgIERvw4XCoWxvIGplIGRvIGdyZcOFwqFrZSwgbW9saW1vIHByb3Zlcml0ZSB2YcOFwqF1IGludGVybmV0IGtvbmVrY2lqdVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS10YWJsZS1jb250YWluZXJcIj5cblxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVwiIGNsYXNzPVwiZXhhbXBsZS10YWJsZVwiIG1hdFNvcnQgbXVsdGlUZW1wbGF0ZURhdGFSb3dzIG1hdFNvcnREaXNhYmxlQ2xlYXJcbiAgICAgIG1hdFNvcnREaXJlY3Rpb249XCJhc2NcIj5cblxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInt7Y29sdW1ufX1cIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbklkczsgbGV0IGlkPWluZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzb3J0YWJsZTtlbHNlIG5vc29ydFwiPlxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIGRpc2FibGVDbGVhcj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNub3NvcnQ+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uIT09J2J1dHRvbnMnO2Vsc2UgdGVzdFwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj4gPHNwYW4+e3tnZXRGaWVsZChyb3csY29sdW1uKXxnZW5lcmFsOmNvbHVtblBpcGVzW2lkXX19PC9zcGFuPjwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI3Rlc3Q+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtcGFuZWxcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogKGJ1dHRvbnMubGVuZ3RoKjIwKSsncHgnfVwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9ucztsZXQgaT1pbmRleFwiPlxuICAgICAgICAgICAgICAgIDx0aW1zLWJ1dHRvbiBbYnV0dG9uQWN0aW9uXT1cImJ1dHRvbiE9PSdkZWxldGUnPyBidXR0b25BY3Rpb25zW2ldOiByZW1vdmVFbGVtZW50XCIgW3RhcmdldEVsZW1lbnRdPVwicm93XCJcbiAgICAgICAgICAgICAgICAgIFtidXR0b25UeXBlXT1cImJ1dHRvblwiPjwvdGltcy1idXR0b24+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImV4cGFuZGVkRGV0YWlsXCI+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIiBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbklkcy5sZW5ndGhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRldGFpbFwiIFtAZGV0YWlsRXhwYW5kXT1cInJvdyA9PSBleHBhbmRlZEVsZW1lbnQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCdcIj5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kaWFncmFtXCI+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXBvc2l0aW9uXCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtc3ltYm9sXCI+IG5lc3RvIDwvZGl2PlxuICAgICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtbmFtZVwiPiBuZXN0byA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtd2VpZ2h0XCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge3tyb3cuYm9keX19XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9uXCI+IC0tIEl6dm9yIG5la2kgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJjb2x1bW5JZHNcIj48L3RyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGNvbHVtbklkcztcIiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1yb3dcIiBbY2xhc3MuZXhhbXBsZS1leHBhbmRlZC1yb3ddPVwiZXhwYW5kZWRFbGVtZW50ID09PSByb3dcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kKHJvdylcIj5cbiAgICAgIDwvdHI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheURldGFpbHNcIj5cbiAgICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IFsnZXhwYW5kZWREZXRhaWwnXVwiIGNsYXNzPVwiZXhhbXBsZS1kZXRhaWwtcm93XCI+PC90cj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuXG4gIDxtYXQtcGFnaW5hdG9yIFtsZW5ndGhdPVwicmVzdWx0c0xlbmd0aFwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwiWzEwLCAyMCwgNTAsIDEwMF1cIiBbcGFnZVNpemVdPVwiMjBcIj48L21hdC1wYWdpbmF0b3I+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B0YWJsZXt3aWR0aDoxMDAlfXRyLmV4YW1wbGUtZGV0YWlsLXJvd3toZWlnaHQ6MH0uYnV0dG9ucy1wYW5lbHtkaXNwbGF5OmlubGluZS1mbGV4O2ZsZXgtZGlyZWN0aW9uOnJvd310ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmhvdmVye2JhY2tncm91bmQ6I2Y1ZjVmNX10ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmFjdGl2ZXtiYWNrZ3JvdW5kOiNlZmVmZWZ9LmV4YW1wbGUtZWxlbWVudC1yb3cgdGR7Ym9yZGVyLWJvdHRvbS13aWR0aDowfS5leGFtcGxlLWVsZW1lbnQtZGV0YWlse292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmZsZXh9LmV4YW1wbGUtZWxlbWVudC1kaWFncmFte21pbi13aWR0aDo4MHB4O2JvcmRlcjoycHggc29saWQgIzAwMDtwYWRkaW5nOjhweDtmb250LXdlaWdodDpsaWdodGVyO21hcmdpbjo4cHggMDtoZWlnaHQ6MTA0cHh9LmV4YW1wbGUtZWxlbWVudC1zeW1ib2x7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZTo0MHB4O2xpbmUtaGVpZ2h0Om5vcm1hbH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9ue3BhZGRpbmc6MTZweH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9ue29wYWNpdHk6LjV9LmV4YW1wbGUtY29udGFpbmVye3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmV4YW1wbGUtbG9hZGluZy1zaGFkZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjU2cHg7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjE1KTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5leGFtcGxlLXJhdGUtbGltaXQtcmVhY2hlZHtjb2xvcjojOTgwMDAwO21heC13aWR0aDozNjBweDt0ZXh0LWFsaWduOmNlbnRlcn1gXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RldGFpbEV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnLCBkaXNwbGF5OiAnbm9uZScgfSkpLFxuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdleHBhbmRlZCA8PT4gY29sbGFwc2VkJywgYW5pbWF0ZSgnMjI1bXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpJykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKVxuICBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcblxuICBAVmlld0NoaWxkKE1hdFNvcnQpXG4gIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgQElucHV0KClcbiAgc29ydGFibGU6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZGF0YVByb3ZpZGVyOiBGdW5jdGlvbjtcblxuICBASW5wdXQoKVxuICBjb2x1bW5JZHM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbk5hbWVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBjb2x1bW5QaXBlczogUGlwZVRyYW5zZm9ybVtdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbnM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbnM6IEZ1bmN0aW9uW107XG5cbiAgQElucHV0KClcbiAgZGlzcGxheURldGFpbHMgPSBmYWxzZTtcblxuICByZXN1bHRzTGVuZ3RoID0gMDtcbiAgaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gIGlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICBleHBhbmRlZEVsZW1lbnQ6IGFueTtcbiAgZGF0YTogYW55W107XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRGaWVsZCA9IChzb3VyY2UsIGZpZWxkUGF0aDogc3RyaW5nKSA9PiBsb2QuZ2V0KHNvdXJjZSwgZmllbGRQYXRoLCAnJyk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICByZWZyZXNoID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmJ1dHRvbnMgJiYgdGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY29sdW1uSWRzLnB1c2goJ2J1dHRvbnMnKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIHVzZXIgY2hhbmdlcyB0aGUgc29ydCBvcmRlciwgcmVzZXQgYmFjayB0byB0aGUgZmlyc3QgcGFnZS5cbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZS5zdWJzY3JpYmUoKCkgPT4gKHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCA9IDApKTtcblxuICAgIG1lcmdlKHRoaXMuc29ydC5zb3J0Q2hhbmdlLCB0aGlzLnBhZ2luYXRvci5wYWdlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gPE9ic2VydmFibGU8YW55Pj4oXG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlcih0aGlzLnNvcnQuYWN0aXZlLCB0aGlzLnNvcnQuZGlyZWN0aW9uLCB0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXgsIHRoaXMucGFnaW5hdG9yLnBhZ2VTaXplKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgLy8gRmxpcCBmbGFnIHRvIHNob3cgdGhhdCBsb2FkaW5nIGhhcyBmaW5pc2hlZC5cbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVzdWx0c0xlbmd0aCA9IGRhdGEudG90YWxfY291bnQ7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuaXRlbXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICAvLyBDYXRjaCBpZiB0aGUgR2l0SHViIEFQSSBoYXMgcmVhY2hlZCBpdHMgcmF0ZSBsaW1pdC4gUmV0dXJuIGVtcHR5IGRhdGEuXG4gICAgICAgICAgdGhpcy5pc1JhdGVMaW1pdFJlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+ICh0aGlzLmRhdGEgPSBkYXRhKSk7XG4gIH07XG5cbiAgcmVtb3ZlRWxlbWVudCA9IGVsZW1lbnRUb0RlbGV0ZSA9PiB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihlbGVtID0+IGVsZW0gIT09IGVsZW1lbnRUb0RlbGV0ZSk7XG4gIH07XG5cbiAgdG9nZ2xlRXhwYW5kID0gY2xpY2tlZEVsZW1lbnQgPT5cbiAgICAodGhpcy5leHBhbmRlZEVsZW1lbnQgPSAhdGhpcy5leHBhbmRlZEVsZW1lbnQgfHwgdGhpcy5leHBhbmRlZEVsZW1lbnQgIT09IGNsaWNrZWRFbGVtZW50ID8gY2xpY2tlZEVsZW1lbnQgOiBudWxsKTtcbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICd1dGlsJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZ2VuZXJhbCdcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xuICAgIGlmICghYXJncykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShhcmdzKSkge1xuICAgICAgYXJncy5mb3JFYWNoKHBpcGUgPT4ge1xuICAgICAgICB2YWx1ZSA9ICg8UGlwZVRyYW5zZm9ybT5waXBlKS50cmFuc2Zvcm0odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPmFyZ3MpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkQ29uZmlnIHtcclxuICBidXR0b25zOiBNYXA8c3RyaW5nLCBCdXR0b24+O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgR3JpZENvbmZpZ1NlcnZpY2UgPSBuZXcgSW5qZWN0aW9uVG9rZW48R3JpZENvbmZpZz4oJ0dyaWRDb25maWcnKTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYnV0dG9uLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkU2VydmljZSB7XG4gIGJ1dHRvbnM7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoR3JpZENvbmZpZ1NlcnZpY2UpIHByaXZhdGUgY29uZmlnKSB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRDb25maWdTZXJ2aWNlJywgY29uZmlnKTtcbiAgICBpZiAodGhpcy5jb25maWcuYnV0dG9ucykge1xuICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5jb25maWcuYnV0dG9ucztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vZ3JpZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgIGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiIChjbGljayk9XCJjb25jcmV0ZUJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50LCRldmVudClcIj5cbiAgPGZhIFttYXRUb29sdGlwXT1cImJ1dHRvbkRlZi50ZXh0XCIgW25hbWVdPVwiYnV0dG9uRGVmLmljb25cIiBbYW5pbWF0aW9uXT1cImJ1dHRvbkRlZi5hbmltYXRpb25cIj48L2ZhPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmJ1dHRvbi1jb250YWluZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzU0NTRjNzttYXJnaW46NHB4O2xpbmUtaGVpZ2h0OjEwMCU7ZmxleDoxfS5idXR0b24tY29udGFpbmVyOmhvdmVye2NvbG9yOm9yYW5nZX1gXSxcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYnV0dG9uVHlwZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRhcmdldEVsZW1lbnQ7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uOiBGdW5jdGlvbjtcblxuICBidXR0b25EZWY6IEJ1dHRvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWRTZXJ2OiBHcmlkU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25UeXBlKSB7XG4gICAgICB0aGlzLmJ1dHRvbkRlZiA9IHRoaXMuZ3JpZFNlcnYuYnV0dG9ucy5nZXQodGhpcy5idXR0b25UeXBlKTtcbiAgICB9XG4gIH1cblxuICBjb25jcmV0ZUJ1dHRvbkFjdGlvbiA9ICh0YXJnZXRFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aGlzLmJ1dHRvbkFjdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRpbXNHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi90aW1zLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNvcnRNb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRUb29sYmFyTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0VG9vbHRpcCxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgR2VuZXJhbFBpcGUgfSBmcm9tICcuL2dlbmVyYWwucGlwZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZm9udC1hd2Vzb21lJztcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi9ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JpZENvbmZpZywgR3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2J1dHRvbi1jb25maWcnO1xuXG4vLyBleHBvcnQgY29uc3QgYnV0dG9uczogTWFwPHN0cmluZywgQnV0dG9uPiA9IG5ldyBNYXAoW1xuLy8gICBbJ2VkaXQnLCBuZXcgQnV0dG9uKCdJem1lbmknLCAncGVuY2lsLXNxdWFyZS1vJyldLFxuLy8gICBbJ2RlbGV0ZScsIG5ldyBCdXR0b24oJ09icmnDhcKhaScsICd0cmFzaC1vJyldLFxuLy8gICBbJ3ZpZXcnLCBuZXcgQnV0dG9uKCdEZXRhbGppJywgJ2FkZHJlc3MtY2FyZC1vJyldLFxuLy8gICBbJ3NhdmUnLCBuZXcgQnV0dG9uKCdTYcOEwo11dmFqJywgJ2Zsb3BweS1vJyldLFxuLy8gICBbJ2FwcHJvdmUnLCBuZXcgQnV0dG9uKCdPZG9icmknLCAnY2hlY2snKV0sXG4vLyAgIFsnZGVueScsIG5ldyBCdXR0b24oJ09kYmlqJywgJ2JhbicpXSxcbi8vICAgWydnZW5lcmF0ZScsIG5ldyBCdXR0b24oJ0dlbmVyacOFwqFpIGRva3VtZW50JywgJ2ZpbGUtdGV4dCcpXSxcbi8vIF0pO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1zR3JpZENvbXBvbmVudCwgR2VuZXJhbFBpcGUsIEJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zR3JpZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0dyaWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVGltc0dyaWRNb2R1bGUge1xuICBzdGF0aWMgc2V0Q29uZmlnKGNvbmZpZzogR3JpZENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVGltc0dyaWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgR3JpZFNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBHcmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltc3lzdGVtc0xpYkNvbXBvbmVudCB9IGZyb20gJy4vdGltc3lzdGVtcy1saWIuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbXNHcmlkTW9kdWxlIH0gZnJvbSAnLi90aW1zLWdyaWQvdGltcy1ncmlkLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUaW1zR3JpZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1RpbXN5c3RlbXNMaWJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVGltc0dyaWRNb2R1bGUsIFRpbXN5c3RlbXNMaWJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRpbXN5c3RlbXNMaWJNb2R1bGUge31cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIkNvbXBvbmVudCIsIm1lcmdlIiwic3RhcnRXaXRoIiwic3dpdGNoTWFwIiwibWFwIiwiY2F0Y2hFcnJvciIsIm9ic2VydmFibGVPZiIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJWaWV3Q2hpbGQiLCJNYXRQYWdpbmF0b3IiLCJNYXRTb3J0IiwiSW5wdXQiLCJpc0FycmF5IiwiUGlwZSIsIkluamVjdGlvblRva2VuIiwiSW5qZWN0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJBbmd1bGFyRm9udEF3ZXNvbWVNb2R1bGUiLCJDZGtUYWJsZU1vZHVsZSIsIk1hdFRhYmxlTW9kdWxlIiwiTWF0UGFnaW5hdG9yTW9kdWxlIiwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUiLCJNYXRUb29sdGlwTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdFRvb2xiYXJNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRGb3JtRmllbGRNb2R1bGUiLCJNYXRJbnB1dE1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdFNvcnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQVFFLDhCQUFvQixJQUFnQjtZQUFwQyxpQkFBd0M7WUFBcEIsU0FBSSxHQUFKLElBQUksQ0FBWTtpQ0FFcEIsVUFDZCxJQUFZLEVBQ1osS0FBYSxFQUNiLElBQVk7O2dCQUVaLElBQU0sSUFBSSxHQUFHLHNDQUFzQyxDQUFDOztnQkFDcEQsSUFBTSxVQUFVLEdBQU0sSUFBSSx1Q0FBa0MsSUFBSSxlQUFVLEtBQUssZUFBUyxJQUFJO29CQUMxRixDQUFDLENBQUUsQ0FBQztnQkFFTixPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFZLFVBQVUsQ0FBQyxDQUFDO2FBQzdDO1NBWnVDOztvQkFKekNBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O3dCQUpRQyxhQUFVOzs7O21DQUZuQjs7Ozs7OztBQ0FBO1FBYUU7U0FBaUI7Ozs7UUFFakIseUNBQVE7OztZQUFSO2FBQ0M7O29CQWRGQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjt3QkFDL0IsUUFBUSxFQUFFLHNEQUlUO3dCQUNELE1BQU0sRUFBRSxFQUFFO3FCQUNYOzs7O3FDQVZEOzs7Ozs7O0FDQUE7SUFPQSxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7O1FBa0haO1lBQUEsaUJBQWdCO2tDQVBDLEtBQUs7aUNBRU4sQ0FBQztvQ0FDRSxJQUFJO3NDQUNGLEtBQUs7NEJBS2YsVUFBQyxNQUFNLEVBQUUsU0FBaUIsSUFBSyxPQUFBLEdBQUcsQ0FB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