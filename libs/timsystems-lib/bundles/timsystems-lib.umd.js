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
    exports.TimsGridComponent = TimsGridComponent;
    exports.ɵd = GridConfigService;
    exports.ɵb = ButtonComponent;
    exports.ɵa = GeneralPipe;
    exports.ɵc = GridService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dlbmVyYWwucGlwZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24tY29uZmlnLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dyaWQuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRpbXN5c3RlbXNMaWJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGdldFJlcG9Jc3N1ZXMgPSAoXG4gICAgc29ydDogc3RyaW5nLFxuICAgIG9yZGVyOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8R2l0aHViQXBpPiA9PiB7XG4gICAgY29uc3QgaHJlZiA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3NlYXJjaC9pc3N1ZXMnO1xuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtocmVmfT9xPXJlcG86YW5ndWxhci9tYXRlcmlhbDImc29ydD0ke3NvcnR9Jm9yZGVyPSR7b3JkZXJ9JnBhZ2U9JHtwYWdlICtcbiAgICAgIDF9YDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEdpdGh1YkFwaT4ocmVxdWVzdFVybCk7XG4gIH1cbn1cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViQXBpIHtcbiAgaXRlbXM6IEdpdGh1Yklzc3VlW107XG4gIHRvdGFsX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViSXNzdWUge1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zeXN0ZW1zLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICB0aW1zeXN0ZW1zLWxpYiB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBsb2QgPSBfO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lciBtYXQtZWxldmF0aW9uLXo4XCI+XG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLWxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHMgfHwgaXNSYXRlTGltaXRSZWFjaGVkXCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVkXCIgKm5nSWY9XCJpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICAgIERvw4XCoWxvIGplIGRvIGdyZcOFwqFrZSwgbW9saW1vIHByb3Zlcml0ZSB2YcOFwqF1IGludGVybmV0IGtvbmVrY2lqdVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS10YWJsZS1jb250YWluZXJcIj5cblxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVwiIGNsYXNzPVwiZXhhbXBsZS10YWJsZVwiIG1hdFNvcnQgbXVsdGlUZW1wbGF0ZURhdGFSb3dzIG1hdFNvcnREaXNhYmxlQ2xlYXJcbiAgICAgIG1hdFNvcnREaXJlY3Rpb249XCJhc2NcIj5cblxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInt7Y29sdW1ufX1cIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbklkczsgbGV0IGlkPWluZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzb3J0YWJsZTtlbHNlIG5vc29ydFwiPlxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIGRpc2FibGVDbGVhcj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNub3NvcnQ+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uIT09J2J1dHRvbnMnO2Vsc2UgdGVzdFwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj4gPHNwYW4+e3tnZXRGaWVsZChyb3csY29sdW1uKXxnZW5lcmFsOmNvbHVtblBpcGVzW2lkXX19PC9zcGFuPjwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI3Rlc3Q+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtcGFuZWxcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogKGJ1dHRvbnMubGVuZ3RoKjIwKSsncHgnfVwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9ucztsZXQgaT1pbmRleFwiPlxuICAgICAgICAgICAgICAgIDx0aW1zLWJ1dHRvbiBbYnV0dG9uQWN0aW9uXT1cImJ1dHRvbiE9PSdkZWxldGUnPyBidXR0b25BY3Rpb25zW2ldOiByZW1vdmVFbGVtZW50XCIgW3RhcmdldEVsZW1lbnRdPVwicm93XCJcbiAgICAgICAgICAgICAgICAgIFtidXR0b25UeXBlXT1cImJ1dHRvblwiPjwvdGltcy1idXR0b24+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImV4cGFuZGVkRGV0YWlsXCI+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIiBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbklkcy5sZW5ndGhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRldGFpbFwiIFtAZGV0YWlsRXhwYW5kXT1cInJvdyA9PSBleHBhbmRlZEVsZW1lbnQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCdcIj5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kaWFncmFtXCI+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXBvc2l0aW9uXCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtc3ltYm9sXCI+IG5lc3RvIDwvZGl2PlxuICAgICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtbmFtZVwiPiBuZXN0byA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtd2VpZ2h0XCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge3tyb3cuYm9keX19XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9uXCI+IC0tIEl6dm9yIG5la2kgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJjb2x1bW5JZHNcIj48L3RyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGNvbHVtbklkcztcIiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1yb3dcIiBbY2xhc3MuZXhhbXBsZS1leHBhbmRlZC1yb3ddPVwiZXhwYW5kZWRFbGVtZW50ID09PSByb3dcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kKHJvdylcIj5cbiAgICAgIDwvdHI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheURldGFpbHNcIj5cbiAgICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IFsnZXhwYW5kZWREZXRhaWwnXVwiIGNsYXNzPVwiZXhhbXBsZS1kZXRhaWwtcm93XCI+PC90cj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuXG4gIDxtYXQtcGFnaW5hdG9yIFtsZW5ndGhdPVwicmVzdWx0c0xlbmd0aFwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwiWzEwLCAyMCwgNTAsIDEwMF1cIiBbcGFnZVNpemVdPVwiMjBcIj48L21hdC1wYWdpbmF0b3I+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B0YWJsZXt3aWR0aDoxMDAlfXRyLmV4YW1wbGUtZGV0YWlsLXJvd3toZWlnaHQ6MH0uYnV0dG9ucy1wYW5lbHtkaXNwbGF5OmlubGluZS1mbGV4O2ZsZXgtZGlyZWN0aW9uOnJvd310ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmhvdmVye2JhY2tncm91bmQ6I2Y1ZjVmNX10ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmFjdGl2ZXtiYWNrZ3JvdW5kOiNlZmVmZWZ9LmV4YW1wbGUtZWxlbWVudC1yb3cgdGR7Ym9yZGVyLWJvdHRvbS13aWR0aDowfS5leGFtcGxlLWVsZW1lbnQtZGV0YWlse292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmZsZXh9LmV4YW1wbGUtZWxlbWVudC1kaWFncmFte21pbi13aWR0aDo4MHB4O2JvcmRlcjoycHggc29saWQgIzAwMDtwYWRkaW5nOjhweDtmb250LXdlaWdodDpsaWdodGVyO21hcmdpbjo4cHggMDtoZWlnaHQ6MTA0cHh9LmV4YW1wbGUtZWxlbWVudC1zeW1ib2x7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZTo0MHB4O2xpbmUtaGVpZ2h0Om5vcm1hbH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9ue3BhZGRpbmc6MTZweH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9ue29wYWNpdHk6LjV9LmV4YW1wbGUtY29udGFpbmVye3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmV4YW1wbGUtbG9hZGluZy1zaGFkZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjU2cHg7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjE1KTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5leGFtcGxlLXJhdGUtbGltaXQtcmVhY2hlZHtjb2xvcjojOTgwMDAwO21heC13aWR0aDozNjBweDt0ZXh0LWFsaWduOmNlbnRlcn1gXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RldGFpbEV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnLCBkaXNwbGF5OiAnbm9uZScgfSkpLFxuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdleHBhbmRlZCA8PT4gY29sbGFwc2VkJywgYW5pbWF0ZSgnMjI1bXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpJykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKVxuICBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcblxuICBAVmlld0NoaWxkKE1hdFNvcnQpXG4gIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgQElucHV0KClcbiAgc29ydGFibGU6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZGF0YVByb3ZpZGVyOiBGdW5jdGlvbjtcblxuICBASW5wdXQoKVxuICBjb2x1bW5JZHM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbk5hbWVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBjb2x1bW5QaXBlczogUGlwZVRyYW5zZm9ybVtdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbnM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbnM6IEZ1bmN0aW9uW107XG5cbiAgQElucHV0KClcbiAgZGlzcGxheURldGFpbHMgPSBmYWxzZTtcblxuICByZXN1bHRzTGVuZ3RoID0gMDtcbiAgaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gIGlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICBleHBhbmRlZEVsZW1lbnQ6IGFueTtcbiAgZGF0YTogYW55W107XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRGaWVsZCA9IChzb3VyY2UsIGZpZWxkUGF0aDogc3RyaW5nKSA9PiBsb2QuZ2V0KHNvdXJjZSwgZmllbGRQYXRoLCAnJyk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICByZWZyZXNoID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmJ1dHRvbnMgJiYgdGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY29sdW1uSWRzLnB1c2goJ2J1dHRvbnMnKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIHVzZXIgY2hhbmdlcyB0aGUgc29ydCBvcmRlciwgcmVzZXQgYmFjayB0byB0aGUgZmlyc3QgcGFnZS5cbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZS5zdWJzY3JpYmUoKCkgPT4gKHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCA9IDApKTtcblxuICAgIG1lcmdlKHRoaXMuc29ydC5zb3J0Q2hhbmdlLCB0aGlzLnBhZ2luYXRvci5wYWdlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gPE9ic2VydmFibGU8YW55Pj4oXG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlcih0aGlzLnNvcnQuYWN0aXZlLCB0aGlzLnNvcnQuZGlyZWN0aW9uLCB0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXgsIHRoaXMucGFnaW5hdG9yLnBhZ2VTaXplKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgLy8gRmxpcCBmbGFnIHRvIHNob3cgdGhhdCBsb2FkaW5nIGhhcyBmaW5pc2hlZC5cbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVzdWx0c0xlbmd0aCA9IGRhdGEudG90YWxfY291bnQ7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuaXRlbXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICAvLyBDYXRjaCBpZiB0aGUgR2l0SHViIEFQSSBoYXMgcmVhY2hlZCBpdHMgcmF0ZSBsaW1pdC4gUmV0dXJuIGVtcHR5IGRhdGEuXG4gICAgICAgICAgdGhpcy5pc1JhdGVMaW1pdFJlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+ICh0aGlzLmRhdGEgPSBkYXRhKSk7XG4gIH1cblxuICByZW1vdmVFbGVtZW50ID0gZWxlbWVudFRvRGVsZXRlID0+IHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGVsZW0gPT4gZWxlbSAhPT0gZWxlbWVudFRvRGVsZXRlKTtcbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZCA9IGNsaWNrZWRFbGVtZW50ID0+XG4gICAgKHRoaXMuZXhwYW5kZWRFbGVtZW50ID0gIXRoaXMuZXhwYW5kZWRFbGVtZW50IHx8IHRoaXMuZXhwYW5kZWRFbGVtZW50ICE9PSBjbGlja2VkRWxlbWVudCA/IGNsaWNrZWRFbGVtZW50IDogbnVsbClcbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICd1dGlsJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZ2VuZXJhbCdcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xuICAgIGlmICghYXJncykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShhcmdzKSkge1xuICAgICAgYXJncy5mb3JFYWNoKHBpcGUgPT4ge1xuICAgICAgICB2YWx1ZSA9ICg8UGlwZVRyYW5zZm9ybT5waXBlKS50cmFuc2Zvcm0odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPmFyZ3MpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkQ29uZmlnIHtcclxuICBidXR0b25zOiBNYXA8c3RyaW5nLCBCdXR0b24+O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgR3JpZENvbmZpZ1NlcnZpY2UgPSBuZXcgSW5qZWN0aW9uVG9rZW48R3JpZENvbmZpZz4oJ0dyaWRDb25maWcnKTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYnV0dG9uLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkU2VydmljZSB7XG4gIGJ1dHRvbnM7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoR3JpZENvbmZpZ1NlcnZpY2UpIHByaXZhdGUgY29uZmlnKSB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRDb25maWdTZXJ2aWNlJywgY29uZmlnKTtcbiAgICBpZiAodGhpcy5jb25maWcuYnV0dG9ucykge1xuICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5jb25maWcuYnV0dG9ucztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vZ3JpZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgIGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiIChjbGljayk9XCJjb25jcmV0ZUJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50LCRldmVudClcIj5cbiAgPGZhIFttYXRUb29sdGlwXT1cImJ1dHRvbkRlZi50ZXh0XCIgW25hbWVdPVwiYnV0dG9uRGVmLmljb25cIiBbYW5pbWF0aW9uXT1cImJ1dHRvbkRlZi5hbmltYXRpb25cIj48L2ZhPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmJ1dHRvbi1jb250YWluZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzU0NTRjNzttYXJnaW46NHB4O2xpbmUtaGVpZ2h0OjEwMCU7ZmxleDoxfS5idXR0b24tY29udGFpbmVyOmhvdmVye2NvbG9yOm9yYW5nZX1gXSxcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYnV0dG9uVHlwZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRhcmdldEVsZW1lbnQ7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uOiBGdW5jdGlvbjtcblxuICBidXR0b25EZWY6IEJ1dHRvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWRTZXJ2OiBHcmlkU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25UeXBlKSB7XG4gICAgICB0aGlzLmJ1dHRvbkRlZiA9IHRoaXMuZ3JpZFNlcnYuYnV0dG9ucy5nZXQodGhpcy5idXR0b25UeXBlKTtcbiAgICB9XG4gIH1cblxuICBjb25jcmV0ZUJ1dHRvbkFjdGlvbiA9ICh0YXJnZXRFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aGlzLmJ1dHRvbkFjdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGltc0dyaWRDb21wb25lbnQgfSBmcm9tICcuL3RpbXMtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBNYXRCdXR0b25Nb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRNZW51TW9kdWxlLFxuICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gIE1hdFNlbGVjdE1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRUb29sdGlwLFxuICBNYXRUb29sdGlwTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBHZW5lcmFsUGlwZSB9IGZyb20gJy4vZ2VuZXJhbC5waXBlJztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQW5ndWxhckZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1mb250LWF3ZXNvbWUnO1xuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuL2dyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBHcmlkQ29uZmlnLCBHcmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYnV0dG9uLWNvbmZpZyc7XG5cbi8vIGV4cG9ydCBjb25zdCBidXR0b25zOiBNYXA8c3RyaW5nLCBCdXR0b24+ID0gbmV3IE1hcChbXG4vLyAgIFsnZWRpdCcsIG5ldyBCdXR0b24oJ0l6bWVuaScsICdwZW5jaWwtc3F1YXJlLW8nKV0sXG4vLyAgIFsnZGVsZXRlJywgbmV3IEJ1dHRvbignT2JyacOFwqFpJywgJ3RyYXNoLW8nKV0sXG4vLyAgIFsndmlldycsIG5ldyBCdXR0b24oJ0RldGFsamknLCAnYWRkcmVzcy1jYXJkLW8nKV0sXG4vLyAgIFsnc2F2ZScsIG5ldyBCdXR0b24oJ1Nhw4TCjXV2YWonLCAnZmxvcHB5LW8nKV0sXG4vLyAgIFsnYXBwcm92ZScsIG5ldyBCdXR0b24oJ09kb2JyaScsICdjaGVjaycpXSxcbi8vICAgWydkZW55JywgbmV3IEJ1dHRvbignT2RiaWonLCAnYmFuJyldLFxuLy8gICBbJ2dlbmVyYXRlJywgbmV3IEJ1dHRvbignR2VuZXJpw4XCoWkgZG9rdW1lbnQnLCAnZmlsZS10ZXh0JyldLFxuLy8gXSk7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQW5ndWxhckZvbnRBd2Vzb21lTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RpbXNHcmlkQ29tcG9uZW50LCBHZW5lcmFsUGlwZSwgQnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbXNHcmlkQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbR3JpZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZE1vZHVsZSB7XG4gIHN0YXRpYyBzZXRDb25maWcoY29uZmlnOiBHcmlkQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUaW1zR3JpZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBHcmlkU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1zeXN0ZW1zTGliQ29tcG9uZW50IH0gZnJvbSAnLi90aW1zeXN0ZW1zLWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltc0dyaWRNb2R1bGUgfSBmcm9tICcuL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1RpbXNHcmlkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVGltc3lzdGVtc0xpYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zR3JpZE1vZHVsZSwgVGltc3lzdGVtc0xpYkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYk1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiQ29tcG9uZW50IiwibWVyZ2UiLCJzdGFydFdpdGgiLCJzd2l0Y2hNYXAiLCJtYXAiLCJjYXRjaEVycm9yIiwib2JzZXJ2YWJsZU9mIiwidHJpZ2dlciIsInN0YXRlIiwic3R5bGUiLCJ0cmFuc2l0aW9uIiwiYW5pbWF0ZSIsIlZpZXdDaGlsZCIsIk1hdFBhZ2luYXRvciIsIk1hdFNvcnQiLCJJbnB1dCIsImlzQXJyYXkiLCJQaXBlIiwiSW5qZWN0aW9uVG9rZW4iLCJJbmplY3QiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSIsIkNka1RhYmxlTW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRQYWdpbmF0b3JNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIk1hdFRvb2x0aXBNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0VG9vbGJhck1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEZvcm1GaWVsZE1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0U2VsZWN0TW9kdWxlIiwiTWF0U29ydE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBUUUsOEJBQW9CLElBQWdCO1lBQXBDLGlCQUF3QztZQUFwQixTQUFJLEdBQUosSUFBSSxDQUFZO2lDQUVwQixVQUNkLElBQVksRUFDWixLQUFhLEVBQ2IsSUFBWTs7Z0JBRVosSUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7O2dCQUNwRCxJQUFNLFVBQVUsR0FBTSxJQUFJLHVDQUFrQyxJQUFJLGVBQVUsS0FBSyxlQUFTLElBQUk7b0JBQzFGLENBQUMsQ0FBRSxDQUFDO2dCQUVOLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVksVUFBVSxDQUFDLENBQUM7YUFDN0M7U0FadUM7O29CQUp6Q0EsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7d0JBSlFDLGFBQVU7Ozs7bUNBRm5COzs7Ozs7O0FDQUE7UUFhRTtTQUFpQjs7OztRQUVqQix5Q0FBUTs7O1lBQVI7YUFDQzs7b0JBZEZDLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUscUJBQXFCO3dCQUMvQixRQUFRLEVBQUUsc0RBSVQ7d0JBQ0QsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7Ozs7cUNBVkQ7Ozs7Ozs7QUNBQTtJQU9BLElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQzs7UUFrSFo7WUFBQSxpQkFBZ0I7a0NBUEMsS0FBSztpQ0FFTixDQUFDO29DQUNFLElBQUk7c0NBQ0YsS0FBSzs0QkFLZixVQUFDLE1BQU0sRUFBRSxTQUFpQixJQUFLLE9BQUEsR0FBRyxDQUFDLEdB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