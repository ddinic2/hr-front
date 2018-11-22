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
    var TimsystemsLibModule = (function () {
        function TimsystemsLibModule() {
        }
        TimsystemsLibModule.decorators = [
            { type: i0.NgModule, args: [{
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
    var TimsGridComponent = (function () {
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
                var _this = this;
                if (this.buttonType) {
                    this.buttonDef = this.gridServ.buttons.find(function (item) { return item.name === _this.buttonType; });
                }
            };
        ButtonComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'tims-button',
                        template: "<div  class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [matTooltip]=\"buttonDef.button.text\" [name]=\"buttonDef.button.icon\" [animation]=\"buttonDef.button.animation\"></fa>\n</div>\n",
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.TimsystemsLibService = TimsystemsLibService;
    exports.TimsystemsLibComponent = TimsystemsLibComponent;
    exports.TimsystemsLibModule = TimsystemsLibModule;
    exports.TimsGridModule = TimsGridModule;
    exports.TimsGridComponent = TimsGridComponent;
    exports.ɵe = GridConfigService;
    exports.ɵb = ButtonComponent;
    exports.ɵa = GeneralPipe;
    exports.ɵc = GridService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLm1vZHVsZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dlbmVyYWwucGlwZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24tY29uZmlnLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dyaWQuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRpbXN5c3RlbXNMaWJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGdldFJlcG9Jc3N1ZXMgPSAoXG4gICAgc29ydDogc3RyaW5nLFxuICAgIG9yZGVyOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8R2l0aHViQXBpPiA9PiB7XG4gICAgY29uc3QgaHJlZiA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3NlYXJjaC9pc3N1ZXMnO1xuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtocmVmfT9xPXJlcG86YW5ndWxhci9tYXRlcmlhbDImc29ydD0ke3NvcnR9Jm9yZGVyPSR7b3JkZXJ9JnBhZ2U9JHtwYWdlICtcbiAgICAgIDF9YDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEdpdGh1YkFwaT4ocmVxdWVzdFVybCk7XG4gIH1cbn1cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViQXBpIHtcbiAgaXRlbXM6IEdpdGh1Yklzc3VlW107XG4gIHRvdGFsX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViSXNzdWUge1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zeXN0ZW1zLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICB0aW1zeXN0ZW1zLWxpYiB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltc3lzdGVtc0xpYkNvbXBvbmVudCB9IGZyb20gJy4vdGltc3lzdGVtcy1saWIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW1RpbXN5c3RlbXNMaWJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVGltc3lzdGVtc0xpYkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yLCBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgbG9kID0gXztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtdGltcy1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1jb250YWluZXIgbWF0LWVsZXZhdGlvbi16OFwiPlxuICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1sb2FkaW5nLXNoYWRlXCIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzIHx8IGlzUmF0ZUxpbWl0UmVhY2hlZFwiPlxuICAgIDxtYXQtc3Bpbm5lciAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHNcIj48L21hdC1zcGlubmVyPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLXJhdGUtbGltaXQtcmVhY2hlZFwiICpuZ0lmPVwiaXNSYXRlTGltaXRSZWFjaGVkXCI+XG4gICAgICBEb8OFwqFsbyBqZSBkbyBncmXDhcKha2UsIG1vbGltbyBwcm92ZXJpdGUgdmHDhcKhdSBpbnRlcm5ldCBrb25la2NpanVcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImV4YW1wbGUtdGFibGUtY29udGFpbmVyXCI+XG5cbiAgICA8dGFibGUgbWF0LXRhYmxlIFtkYXRhU291cmNlXT1cImRhdGFcIiBjbGFzcz1cImV4YW1wbGUtdGFibGVcIiBtYXRTb3J0IG11bHRpVGVtcGxhdGVEYXRhUm93cyBtYXRTb3J0RGlzYWJsZUNsZWFyXG4gICAgICBtYXRTb3J0RGlyZWN0aW9uPVwiYXNjXCI+XG5cblxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJ7e2NvbHVtbn19XCIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5JZHM7IGxldCBpZD1pbmRleFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic29ydGFibGU7ZWxzZSBub3NvcnRcIj5cbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBkaXNhYmxlQ2xlYXI+IHt7Y29sdW1uTmFtZXNbaWRdfX0gPC90aD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9zb3J0PlxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+IHt7Y29sdW1uTmFtZXNbaWRdfX0gPC90aD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbiE9PSdidXR0b25zJztlbHNlIHRlc3RcIj5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+IDxzcGFuPnt7Z2V0RmllbGQocm93LGNvbHVtbil8Z2VuZXJhbDpjb2x1bW5QaXBlc1tpZF19fTwvc3Bhbj48L3RkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN0ZXN0PlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zLXBhbmVsXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6IChidXR0b25zLmxlbmd0aCoyMCkrJ3B4J31cIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnM7bGV0IGk9aW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8dGltcy1idXR0b24gW2J1dHRvbkFjdGlvbl09XCJidXR0b24hPT0nZGVsZXRlJz8gYnV0dG9uQWN0aW9uc1tpXTogcmVtb3ZlRWxlbWVudFwiIFt0YXJnZXRFbGVtZW50XT1cInJvd1wiXG4gICAgICAgICAgICAgICAgICBbYnV0dG9uVHlwZV09XCJidXR0b25cIj48L3RpbXMtYnV0dG9uPlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJleHBhbmRlZERldGFpbFwiPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCIgW2F0dHIuY29sc3Bhbl09XCJjb2x1bW5JZHMubGVuZ3RoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXRhaWxcIiBbQGRldGFpbEV4cGFuZF09XCJyb3cgPT0gZXhwYW5kZWRFbGVtZW50ID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnXCI+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGlhZ3JhbVwiPiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1wb3NpdGlvblwiPiB7e3Jvdy5ib2R5fX0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXN5bWJvbFwiPiBuZXN0byA8L2Rpdj5cbiAgICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LW5hbWVcIj4gbmVzdG8gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXdlaWdodFwiPiB7e3Jvdy5ib2R5fX0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPCEtLSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIHt7cm93LmJvZHl9fVxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbi1hdHRyaWJ1dGlvblwiPiAtLSBJenZvciBuZWtpIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDx0ciBtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiY29sdW1uSWRzXCI+PC90cj5cbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBjb2x1bW5JZHM7XCIgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtcm93XCIgW2NsYXNzLmV4YW1wbGUtZXhwYW5kZWQtcm93XT1cImV4cGFuZGVkRWxlbWVudCA9PT0gcm93XCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZChyb3cpXCI+XG4gICAgICA8L3RyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXlEZXRhaWxzXCI+XG4gICAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBbJ2V4cGFuZGVkRGV0YWlsJ11cIiBjbGFzcz1cImV4YW1wbGUtZGV0YWlsLXJvd1wiPjwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cblxuICA8bWF0LXBhZ2luYXRvciBbbGVuZ3RoXT1cInJlc3VsdHNMZW5ndGhcIiBbcGFnZVNpemVPcHRpb25zXT1cIlsxMCwgMjAsIDUwLCAxMDBdXCIgW3BhZ2VTaXplXT1cIjIwXCI+PC9tYXQtcGFnaW5hdG9yPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgdGFibGV7d2lkdGg6MTAwJX10ci5leGFtcGxlLWRldGFpbC1yb3d7aGVpZ2h0OjB9LmJ1dHRvbnMtcGFuZWx7ZGlzcGxheTppbmxpbmUtZmxleDtmbGV4LWRpcmVjdGlvbjpyb3d9dHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTpob3ZlcntiYWNrZ3JvdW5kOiNmNWY1ZjV9dHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTphY3RpdmV7YmFja2dyb3VuZDojZWZlZmVmfS5leGFtcGxlLWVsZW1lbnQtcm93IHRke2JvcmRlci1ib3R0b20td2lkdGg6MH0uZXhhbXBsZS1lbGVtZW50LWRldGFpbHtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpmbGV4fS5leGFtcGxlLWVsZW1lbnQtZGlhZ3JhbXttaW4td2lkdGg6ODBweDtib3JkZXI6MnB4IHNvbGlkICMwMDA7cGFkZGluZzo4cHg7Zm9udC13ZWlnaHQ6bGlnaHRlcjttYXJnaW46OHB4IDA7aGVpZ2h0OjEwNHB4fS5leGFtcGxlLWVsZW1lbnQtc3ltYm9se2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6NDBweDtsaW5lLWhlaWdodDpub3JtYWx9LmV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbntwYWRkaW5nOjE2cHh9LmV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbi1hdHRyaWJ1dGlvbntvcGFjaXR5Oi41fS5leGFtcGxlLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5leGFtcGxlLWxvYWRpbmctc2hhZGV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2JvdHRvbTo1NnB4O3JpZ2h0OjA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xNSk7ei1pbmRleDoxO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uZXhhbXBsZS1yYXRlLWxpbWl0LXJlYWNoZWR7Y29sb3I6Izk4MDAwMDttYXgtd2lkdGg6MzYwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9YF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdkZXRhaWxFeHBhbmQnLCBbXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnLCBtaW5IZWlnaHQ6ICcwJywgZGlzcGxheTogJ25vbmUnIH0pKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzIyNW1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKScpKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVGltc0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcilcbiAgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG5cbiAgQFZpZXdDaGlsZChNYXRTb3J0KVxuICBzb3J0OiBNYXRTb3J0O1xuXG4gIEBJbnB1dCgpXG4gIHNvcnRhYmxlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGFQcm92aWRlcjogRnVuY3Rpb247XG5cbiAgQElucHV0KClcbiAgY29sdW1uSWRzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBjb2x1bW5OYW1lczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgY29sdW1uUGlwZXM6IFBpcGVUcmFuc2Zvcm1bXTtcblxuICBASW5wdXQoKVxuICBidXR0b25zOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBidXR0b25BY3Rpb25zOiBGdW5jdGlvbltdO1xuXG4gIEBJbnB1dCgpXG4gIGRpc3BsYXlEZXRhaWxzID0gZmFsc2U7XG5cbiAgcmVzdWx0c0xlbmd0aCA9IDA7XG4gIGlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICBpc1JhdGVMaW1pdFJlYWNoZWQgPSBmYWxzZTtcbiAgZXhwYW5kZWRFbGVtZW50OiBhbnk7XG4gIGRhdGE6IGFueVtdO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0RmllbGQgPSAoc291cmNlLCBmaWVsZFBhdGg6IHN0cmluZykgPT4gbG9kLmdldChzb3VyY2UsIGZpZWxkUGF0aCwgJycpO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcmVmcmVzaCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5idXR0b25zICYmIHRoaXMuYnV0dG9ucy5sZW5ndGggPiAwICYmICF0aGlzLmNvbHVtbklkcy5zb21lKGl0ZW0gPT4gaXRlbSA9PT0gJ2J1dHRvbnMnKSkge1xuICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaCgnYnV0dG9ucycpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBzb3J0IG9yZGVyLCByZXNldCBiYWNrIHRvIHRoZSBmaXJzdCBwYWdlLlxuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5wYWdpbmF0b3IucGFnZUluZGV4ID0gMCkpO1xuXG4gICAgbWVyZ2UodGhpcy5zb3J0LnNvcnRDaGFuZ2UsIHRoaXMucGFnaW5hdG9yLnBhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiA8T2JzZXJ2YWJsZTxhbnk+PihcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyKHRoaXMuc29ydC5hY3RpdmUsIHRoaXMuc29ydC5kaXJlY3Rpb24sIHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCwgdGhpcy5wYWdpbmF0b3IucGFnZVNpemUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChkYXRhID0+IHtcbiAgICAgICAgICAvLyBGbGlwIGZsYWcgdG8gc2hvdyB0aGF0IGxvYWRpbmcgaGFzIGZpbmlzaGVkLlxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzTGVuZ3RoID0gZGF0YS50b3RhbF9jb3VudDtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGF0YS5pdGVtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIC8vIENhdGNoIGlmIHRoZSBHaXRIdWIgQVBJIGhhcyByZWFjaGVkIGl0cyByYXRlIGxpbWl0LiBSZXR1cm4gZW1wdHkgZGF0YS5cbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4gKHRoaXMuZGF0YSA9IGRhdGEpKTtcbiAgfVxuXG4gIHJlbW92ZUVsZW1lbnQgPSBlbGVtZW50VG9EZWxldGUgPT4ge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoZWxlbSA9PiBlbGVtICE9PSBlbGVtZW50VG9EZWxldGUpO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kID0gY2xpY2tlZEVsZW1lbnQgPT5cbiAgICAodGhpcy5leHBhbmRlZEVsZW1lbnQgPSAhdGhpcy5leHBhbmRlZEVsZW1lbnQgfHwgdGhpcy5leHBhbmRlZEVsZW1lbnQgIT09IGNsaWNrZWRFbGVtZW50ID8gY2xpY2tlZEVsZW1lbnQgOiBudWxsKVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ3V0aWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdnZW5lcmFsJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW5lcmFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KGFyZ3MpKSB7XG4gICAgICBhcmdzLmZvckVhY2gocGlwZSA9PiB7XG4gICAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPnBpcGUpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSAoPFBpcGVUcmFuc2Zvcm0+YXJncykudHJhbnNmb3JtKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCdXR0b25EZWZpbml0aW9uIH0gZnJvbSAnLi9idXR0b24nO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkQ29uZmlnIHtcclxuICBidXR0b25zOiBCdXR0b25EZWZpbml0aW9uW107XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBHcmlkQ29uZmlnU2VydmljZSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxHcmlkQ29uZmlnPignR3JpZENvbmZpZycpO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyaWRDb25maWdTZXJ2aWNlLCBHcmlkQ29uZmlnIH0gZnJvbSAnLi9idXR0b24tY29uZmlnJztcbmltcG9ydCB7IEJ1dHRvbkRlZmluaXRpb24gfSBmcm9tICcuL2J1dHRvbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkU2VydmljZSB7XG4gIGJ1dHRvbnM6IEJ1dHRvbkRlZmluaXRpb25bXTtcbiAgY29uc3RydWN0b3IoQEluamVjdChHcmlkQ29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWc6IEdyaWRDb25maWcpIHtcbiAgICBpZiAodGhpcy5jb25maWcuYnV0dG9ucykge1xuICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5jb25maWcuYnV0dG9ucztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnV0dG9uRGVmaW5pdGlvbiB9IGZyb20gJy4uL2J1dHRvbic7XG5pbXBvcnQgeyBHcmlkU2VydmljZSB9IGZyb20gJy4uL2dyaWQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIiAoY2xpY2spPVwiY29uY3JldGVCdXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCwkZXZlbnQpXCI+XG4gIDxmYSBbbWF0VG9vbHRpcF09XCJidXR0b25EZWYuYnV0dG9uLnRleHRcIiBbbmFtZV09XCJidXR0b25EZWYuYnV0dG9uLmljb25cIiBbYW5pbWF0aW9uXT1cImJ1dHRvbkRlZi5idXR0b24uYW5pbWF0aW9uXCI+PC9mYT5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5idXR0b24tY29udGFpbmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiM1NDU0Yzc7bWFyZ2luOjRweDtsaW5lLWhlaWdodDoxMDAlO2ZsZXg6MX0uYnV0dG9uLWNvbnRhaW5lcjpob3Zlcntjb2xvcjpvcmFuZ2V9YF0sXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvblR5cGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0YXJnZXRFbGVtZW50O1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbjogRnVuY3Rpb247XG5cbiAgYnV0dG9uRGVmOiBCdXR0b25EZWZpbml0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZFNlcnY6IEdyaWRTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuYnV0dG9uRGVmID0gdGhpcy5ncmlkU2Vydi5idXR0b25zLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IHRoaXMuYnV0dG9uVHlwZSk7XG4gICAgfVxuICB9XG5cbiAgY29uY3JldGVCdXR0b25BY3Rpb24gPSAodGFyZ2V0RWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5idXR0b25BY3Rpb24pIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5idXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUaW1zR3JpZENvbXBvbmVudCB9IGZyb20gJy4vdGltcy1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7XG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0Q2FyZE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIE1hdFRvb2x0aXAsXG4gIE1hdFRvb2x0aXBNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEdlbmVyYWxQaXBlIH0gZnJvbSAnLi9nZW5lcmFsLnBpcGUnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWZvbnQtYXdlc29tZSc7XG5pbXBvcnQgeyBHcmlkU2VydmljZSB9IGZyb20gJy4vZ3JpZC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyaWRDb25maWcsIEdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9idXR0b24tY29uZmlnJztcblxuLy8gZXhwb3J0IGNvbnN0IGJ1dHRvbnM6IE1hcDxzdHJpbmcsIEJ1dHRvbj4gPSBuZXcgTWFwKFtcbi8vICAgWydlZGl0JywgbmV3IEJ1dHRvbignSXptZW5pJywgJ3BlbmNpbC1zcXVhcmUtbycpXSxcbi8vICAgWydkZWxldGUnLCBuZXcgQnV0dG9uKCdPYnJpw4XCoWknLCAndHJhc2gtbycpXSxcbi8vICAgWyd2aWV3JywgbmV3IEJ1dHRvbignRGV0YWxqaScsICdhZGRyZXNzLWNhcmQtbycpXSxcbi8vICAgWydzYXZlJywgbmV3IEJ1dHRvbignU2HDhMKNdXZhaicsICdmbG9wcHktbycpXSxcbi8vICAgWydhcHByb3ZlJywgbmV3IEJ1dHRvbignT2RvYnJpJywgJ2NoZWNrJyldLFxuLy8gICBbJ2RlbnknLCBuZXcgQnV0dG9uKCdPZGJpaicsICdiYW4nKV0sXG4vLyAgIFsnZ2VuZXJhdGUnLCBuZXcgQnV0dG9uKCdHZW5lcmnDhcKhaSBkb2t1bWVudCcsICdmaWxlLXRleHQnKV0sXG4vLyBdKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBbmd1bGFyRm9udEF3ZXNvbWVNb2R1bGUsXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVGltc0dyaWRDb21wb25lbnQsIEdlbmVyYWxQaXBlLCBCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbVGltc0dyaWRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtHcmlkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbXNHcmlkTW9kdWxlIHtcbiAgc3RhdGljIHNldENvbmZpZyhjb25maWc6IEdyaWRDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRpbXNHcmlkTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEdyaWRTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogR3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiQ29tcG9uZW50IiwiTmdNb2R1bGUiLCJtZXJnZSIsInN0YXJ0V2l0aCIsInN3aXRjaE1hcCIsIm1hcCIsImNhdGNoRXJyb3IiLCJvYnNlcnZhYmxlT2YiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJhbmltYXRlIiwiVmlld0NoaWxkIiwiTWF0UGFnaW5hdG9yIiwiTWF0U29ydCIsIklucHV0IiwiaXNBcnJheSIsIlBpcGUiLCJJbmplY3Rpb25Ub2tlbiIsIkluamVjdCIsIkNvbW1vbk1vZHVsZSIsIkFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSIsIkNka1RhYmxlTW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRQYWdpbmF0b3JNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIk1hdFRvb2x0aXBNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0VG9vbGJhck1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEZvcm1GaWVsZE1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0U2VsZWN0TW9kdWxlIiwiTWF0U29ydE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBUUUsOEJBQW9CLElBQWdCO1lBQXBDLGlCQUF3QztZQUFwQixTQUFJLEdBQUosSUFBSSxDQUFZO2lDQUVwQixVQUNkLElBQVksRUFDWixLQUFhLEVBQ2IsSUFBWTs7Z0JBRVosSUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7O2dCQUNwRCxJQUFNLFVBQVUsR0FBTSxJQUFJLHVDQUFrQyxJQUFJLGVBQVUsS0FBSyxlQUFTLElBQUk7b0JBQzFGLENBQUMsQ0FBRSxDQUFDO2dCQUVOLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVksVUFBVSxDQUFDLENBQUM7YUFDN0M7U0FadUM7O29CQUp6Q0EsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7d0JBSlFDLGFBQVU7Ozs7bUNBRm5COzs7Ozs7O0FDQUE7UUFhRTtTQUFpQjs7OztRQUVqQix5Q0FBUTs7O1lBQVI7YUFDQzs7b0JBZEZDLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUscUJBQXFCO3dCQUMvQixRQUFRLEVBQUUsc0RBSVQ7d0JBQ0QsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7Ozs7cUNBVkQ7Ozs7Ozs7QUNBQTs7OztvQkFHQ0MsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxFQUFFO3dCQUNYLFlBQVksRUFBRSxDQUFDLHNCQUFz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