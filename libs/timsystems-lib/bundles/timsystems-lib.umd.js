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
            this.removeElement = function (elementToDelete) {
                _this.data = _this.data.filter(function (elem) { return elem !== elementToDelete; });
            };
            this.toggleExpand = function (clickedElement) {
                return (_this.expandedElement =
                    !_this.expandedElement || _this.expandedElement !== clickedElement
                        ? clickedElement
                        : null);
            };
        }
        /**
         * @return {?}
         */
        TimsGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.buttons && this.buttons.length > 0) {
                    this.columnIds.push('buttons');
                }
                // If the user changes the sort order, reset back to the first page.
                this.sort.sortChange.subscribe(function () { return (_this.paginator.pageIndex = 0); });
                rxjs.merge(this.sort.sortChange, this.paginator.page)
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
        TimsGridComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'tims-tims-grid',
                        template: "<div class=\"example-container mat-elevation-z8\">\n  <div class=\"example-loading-shade\" *ngIf=\"isLoadingResults || isRateLimitReached\">\n    <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n    <div class=\"example-rate-limit-reached\" *ngIf=\"isRateLimitReached\">\n      Do\u0161lo je do gre\u0161ke, molimo proverite va\u0161u internet konekciju\n    </div>\n  </div>\n\n  <div class=\"example-table-container\">\n\n    <table mat-table [dataSource]=\"data\" class=\"example-table\" matSort multiTemplateDataRows matSortDisableClear\n      matSortDirection=\"asc\">\n\n\n      <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of columnIds; let id=index\">\n        <ng-container *ngIf=\"sortable;else nosort\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header disableClear> {{columnNames[id]}} </th>\n        </ng-container>\n        <ng-template #nosort>\n          <th mat-header-cell *matHeaderCellDef> {{columnNames[id]}} </th>\n        </ng-template>\n        <ng-container *ngIf=\"column!=='buttons';else test\">\n          <td mat-cell *matCellDef=\"let row\"> <span>{{getField(row,column)|general:columnPipes[id]}}</span></td>\n        </ng-container>\n        <ng-template #test>\n          <td mat-cell *matCellDef=\"let row\">\n            <div class=\"buttons-panel\" [ngStyle]=\"{'width': (buttons.length*20)+'px'}\">\n              <ng-container *ngFor=\"let button of buttons;let i=index\">\n                <tims-button [buttonAction]=\"button!=='delete'? buttonActions[i]: removeElement\" [targetElement]=\"row\"\n                  [buttonType]=\"button\"></tims-button>\n              </ng-container>\n            </div>\n          </td>\n        </ng-template>\n      </ng-container>\n\n      <ng-container matColumnDef=\"expandedDetail\">\n        <td mat-cell *matCellDef=\"let row\" [attr.colspan]=\"columnIds.length\">\n          <div class=\"example-element-detail\" [@detailExpand]=\"row == expandedElement ? 'expanded' : 'collapsed'\">\n            <!-- <div class=\"example-element-diagram\"> -->\n            <!-- <div class=\"example-element-position\"> {{row.body}} </div> -->\n            <!-- <div class=\"example-element-symbol\"> nesto </div>\n              <!-- <div class=\"example-element-name\"> nesto </div> -->\n            <!-- <div class=\"example-element-weight\"> {{row.body}} </div> -->\n            <!-- </div> -->\n            <div class=\"example-element-description\">\n              {{row.body}}\n              <span class=\"example-element-description-attribution\"> -- Izvor neki </span>\n            </div>\n          </div>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"columnIds\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: columnIds;\" class=\"example-element-row\" [class.example-expanded-row]=\"expandedElement === row\"\n        (click)=\"toggleExpand(row)\">\n      </tr>\n      <ng-container *ngIf=\"displayDetails\">\n        <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"example-detail-row\"></tr>\n      </ng-container>\n    </table>\n  </div>\n\n  <mat-paginator [length]=\"resultsLength\" [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"20\"></mat-paginator>\n</div>\n",
                        styles: ["table{width:100%}tr.example-detail-row{height:0}.buttons-panel{display:inline-flex;flex-direction:row}tr.example-element-row:not(.example-expanded-row):hover{background:#f5f5f5}tr.example-element-row:not(.example-expanded-row):active{background:#efefef}.example-element-row td{border-bottom-width:0}.example-element-detail{overflow:hidden;display:flex}.example-element-diagram{min-width:80px;border:2px solid #000;padding:8px;font-weight:lighter;margin:8px 0;height:104px}.example-element-symbol{font-weight:700;font-size:40px;line-height:normal}.example-element-description{padding:16px}.example-element-description-attribution{opacity:.5}.example-container{position:relative;width:100%}.example-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.example-rate-limit-reached{color:#980000;max-width:360px;text-align:center}"],
                        animations: [
                            animations.trigger('detailExpand', [
                                animations.state('collapsed', animations.style({ height: '0px', minHeight: '0', display: 'none' })),
                                animations.state('expanded', animations.style({ height: '*' })),
                                animations.transition('expanded <=> collapsed', animations.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                            ])
                        ]
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
    var Button = (function () {
        function Button(text, icon, alternateIcon, animation) {
            this.text = text;
            this.icon = icon;
            this.alternateIcon = alternateIcon ? alternateIcon : null;
            this.animation = animation;
        }
        return Button;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ButtonComponent = (function () {
        function ButtonComponent() {
            var _this = this;
            this.concreteButtonAction = function (targetElement, event) {
                event.stopPropagation();
                _this.buttonAction(targetElement);
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
                    this.buttonDef = buttons.get(this.buttonType);
                }
            };
        ButtonComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'tims-button',
                        template: "<div matTooltip=\"Info about the action\" class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [name]=\"buttonDef.icon\" [animation]=\"buttonDef.animation\"></fa>\n</div>\n",
                        styles: [".button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}"]
                    },] },
        ];
        /** @nocollapse */
        ButtonComponent.ctorParameters = function () { return []; };
        ButtonComponent.propDecorators = {
            buttonType: [{ type: i0.Input }],
            targetElement: [{ type: i0.Input }],
            buttonAction: [{ type: i0.Input }]
        };
        return ButtonComponent;
    }());
    /** @type {?} */
    var buttons = new Map([
        ['edit', new Button('Izmeni', 'pencil-square-o')],
        ['delete', new Button('Obriši', 'trash-o')],
        ['view', new Button('Detalji', 'address-card-o')],
        ['save', new Button('Sačuvaj', 'floppy-o')],
        ['approve', new Button('Odobri', 'check')],
        ['deny', new Button('Odbij', 'ban')]
    ]);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TimsGridModule = (function () {
        function TimsGridModule() {
        }
        TimsGridModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angularFontAwesome.AngularFontAwesomeModule,
                            table.CdkTableModule,
                            material.MatTableModule,
                            material.MatPaginatorModule,
                            animations$1.BrowserAnimationsModule,
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
                            forms.ReactiveFormsModule
                        ],
                        declarations: [TimsGridComponent, GeneralPipe, ButtonComponent],
                        exports: [TimsGridComponent]
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
    exports.ɵd = ButtonComponent;
    exports.ɵc = GeneralPipe;
    exports.ɵb = TimsGridComponent;
    exports.ɵa = TimsGridModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dlbmVyYWwucGlwZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24udHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvdGltcy1ncmlkLm1vZHVsZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICBnZXRSZXBvSXNzdWVzID0gKFxuICAgIHNvcnQ6IHN0cmluZyxcbiAgICBvcmRlcjogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlclxuICApOiBPYnNlcnZhYmxlPEdpdGh1YkFwaT4gPT4ge1xuICAgIGNvbnN0IGhyZWYgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9zZWFyY2gvaXNzdWVzJztcbiAgICBjb25zdCByZXF1ZXN0VXJsID0gYCR7aHJlZn0/cT1yZXBvOmFuZ3VsYXIvbWF0ZXJpYWwyJnNvcnQ9JHtzb3J0fSZvcmRlcj0ke29yZGVyfSZwYWdlPSR7cGFnZSArXG4gICAgICAxfWA7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxHaXRodWJBcGk+KHJlcXVlc3RVcmwpO1xuICB9XG59XG5leHBvcnQgaW50ZXJmYWNlIEdpdGh1YkFwaSB7XG4gIGl0ZW1zOiBHaXRodWJJc3N1ZVtdO1xuICB0b3RhbF9jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdpdGh1Yklzc3VlIHtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBudW1iZXI6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtdGltc3lzdGVtcy1saWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgdGltc3lzdGVtcy1saWIgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFRpbXN5c3RlbXNMaWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgSW5wdXQsXG4gIFBpcGVUcmFuc2Zvcm1cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBsb2QgPSBfO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lciBtYXQtZWxldmF0aW9uLXo4XCI+XG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLWxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHMgfHwgaXNSYXRlTGltaXRSZWFjaGVkXCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVkXCIgKm5nSWY9XCJpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICAgIERvw4XCoWxvIGplIGRvIGdyZcOFwqFrZSwgbW9saW1vIHByb3Zlcml0ZSB2YcOFwqF1IGludGVybmV0IGtvbmVrY2lqdVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS10YWJsZS1jb250YWluZXJcIj5cblxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVwiIGNsYXNzPVwiZXhhbXBsZS10YWJsZVwiIG1hdFNvcnQgbXVsdGlUZW1wbGF0ZURhdGFSb3dzIG1hdFNvcnREaXNhYmxlQ2xlYXJcbiAgICAgIG1hdFNvcnREaXJlY3Rpb249XCJhc2NcIj5cblxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInt7Y29sdW1ufX1cIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbklkczsgbGV0IGlkPWluZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzb3J0YWJsZTtlbHNlIG5vc29ydFwiPlxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIGRpc2FibGVDbGVhcj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNub3NvcnQ+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uIT09J2J1dHRvbnMnO2Vsc2UgdGVzdFwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj4gPHNwYW4+e3tnZXRGaWVsZChyb3csY29sdW1uKXxnZW5lcmFsOmNvbHVtblBpcGVzW2lkXX19PC9zcGFuPjwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI3Rlc3Q+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtcGFuZWxcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogKGJ1dHRvbnMubGVuZ3RoKjIwKSsncHgnfVwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9ucztsZXQgaT1pbmRleFwiPlxuICAgICAgICAgICAgICAgIDx0aW1zLWJ1dHRvbiBbYnV0dG9uQWN0aW9uXT1cImJ1dHRvbiE9PSdkZWxldGUnPyBidXR0b25BY3Rpb25zW2ldOiByZW1vdmVFbGVtZW50XCIgW3RhcmdldEVsZW1lbnRdPVwicm93XCJcbiAgICAgICAgICAgICAgICAgIFtidXR0b25UeXBlXT1cImJ1dHRvblwiPjwvdGltcy1idXR0b24+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImV4cGFuZGVkRGV0YWlsXCI+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIiBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbklkcy5sZW5ndGhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRldGFpbFwiIFtAZGV0YWlsRXhwYW5kXT1cInJvdyA9PSBleHBhbmRlZEVsZW1lbnQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCdcIj5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kaWFncmFtXCI+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXBvc2l0aW9uXCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtc3ltYm9sXCI+IG5lc3RvIDwvZGl2PlxuICAgICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtbmFtZVwiPiBuZXN0byA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtd2VpZ2h0XCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge3tyb3cuYm9keX19XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9uXCI+IC0tIEl6dm9yIG5la2kgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJjb2x1bW5JZHNcIj48L3RyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGNvbHVtbklkcztcIiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1yb3dcIiBbY2xhc3MuZXhhbXBsZS1leHBhbmRlZC1yb3ddPVwiZXhwYW5kZWRFbGVtZW50ID09PSByb3dcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kKHJvdylcIj5cbiAgICAgIDwvdHI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheURldGFpbHNcIj5cbiAgICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IFsnZXhwYW5kZWREZXRhaWwnXVwiIGNsYXNzPVwiZXhhbXBsZS1kZXRhaWwtcm93XCI+PC90cj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuXG4gIDxtYXQtcGFnaW5hdG9yIFtsZW5ndGhdPVwicmVzdWx0c0xlbmd0aFwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwiWzEwLCAyMCwgNTAsIDEwMF1cIiBbcGFnZVNpemVdPVwiMjBcIj48L21hdC1wYWdpbmF0b3I+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B0YWJsZXt3aWR0aDoxMDAlfXRyLmV4YW1wbGUtZGV0YWlsLXJvd3toZWlnaHQ6MH0uYnV0dG9ucy1wYW5lbHtkaXNwbGF5OmlubGluZS1mbGV4O2ZsZXgtZGlyZWN0aW9uOnJvd310ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmhvdmVye2JhY2tncm91bmQ6I2Y1ZjVmNX10ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmFjdGl2ZXtiYWNrZ3JvdW5kOiNlZmVmZWZ9LmV4YW1wbGUtZWxlbWVudC1yb3cgdGR7Ym9yZGVyLWJvdHRvbS13aWR0aDowfS5leGFtcGxlLWVsZW1lbnQtZGV0YWlse292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmZsZXh9LmV4YW1wbGUtZWxlbWVudC1kaWFncmFte21pbi13aWR0aDo4MHB4O2JvcmRlcjoycHggc29saWQgIzAwMDtwYWRkaW5nOjhweDtmb250LXdlaWdodDpsaWdodGVyO21hcmdpbjo4cHggMDtoZWlnaHQ6MTA0cHh9LmV4YW1wbGUtZWxlbWVudC1zeW1ib2x7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZTo0MHB4O2xpbmUtaGVpZ2h0Om5vcm1hbH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9ue3BhZGRpbmc6MTZweH0uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9ue29wYWNpdHk6LjV9LmV4YW1wbGUtY29udGFpbmVye3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmV4YW1wbGUtbG9hZGluZy1zaGFkZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjU2cHg7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjE1KTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5leGFtcGxlLXJhdGUtbGltaXQtcmVhY2hlZHtjb2xvcjojOTgwMDAwO21heC13aWR0aDozNjBweDt0ZXh0LWFsaWduOmNlbnRlcn1gXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RldGFpbEV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnY29sbGFwc2VkJyxcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnLCBtaW5IZWlnaHQ6ICcwJywgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAnZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsXG4gICAgICAgIGFuaW1hdGUoJzIyNW1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKScpXG4gICAgICApXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKVxuICBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcblxuICBAVmlld0NoaWxkKE1hdFNvcnQpXG4gIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgQElucHV0KClcbiAgc29ydGFibGU6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZGF0YVByb3ZpZGVyOiBGdW5jdGlvbjtcblxuICBASW5wdXQoKVxuICBjb2x1bW5JZHM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbk5hbWVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBjb2x1bW5QaXBlczogUGlwZVRyYW5zZm9ybVtdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbnM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbnM6IEZ1bmN0aW9uW107XG5cbiAgQElucHV0KClcbiAgZGlzcGxheURldGFpbHMgPSBmYWxzZTtcblxuICByZXN1bHRzTGVuZ3RoID0gMDtcbiAgaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gIGlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICBleHBhbmRlZEVsZW1lbnQ6IGFueTtcbiAgZGF0YTogYW55W107XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRGaWVsZCA9IChzb3VyY2UsIGZpZWxkUGF0aDogc3RyaW5nKSA9PiBsb2QuZ2V0KHNvdXJjZSwgZmllbGRQYXRoLCAnJyk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYnV0dG9ucyAmJiB0aGlzLmJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaCgnYnV0dG9ucycpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBzb3J0IG9yZGVyLCByZXNldCBiYWNrIHRvIHRoZSBmaXJzdCBwYWdlLlxuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5wYWdpbmF0b3IucGFnZUluZGV4ID0gMCkpO1xuXG4gICAgbWVyZ2UodGhpcy5zb3J0LnNvcnRDaGFuZ2UsIHRoaXMucGFnaW5hdG9yLnBhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiA8T2JzZXJ2YWJsZTxhbnk+PihcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyKFxuICAgICAgICAgICAgICB0aGlzLnNvcnQuYWN0aXZlLFxuICAgICAgICAgICAgICB0aGlzLnNvcnQuZGlyZWN0aW9uLFxuICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXgsXG4gICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yLnBhZ2VTaXplXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChkYXRhID0+IHtcbiAgICAgICAgICAvLyBGbGlwIGZsYWcgdG8gc2hvdyB0aGF0IGxvYWRpbmcgaGFzIGZpbmlzaGVkLlxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzTGVuZ3RoID0gZGF0YS50b3RhbF9jb3VudDtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGF0YS5pdGVtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIC8vIENhdGNoIGlmIHRoZSBHaXRIdWIgQVBJIGhhcyByZWFjaGVkIGl0cyByYXRlIGxpbWl0LiBSZXR1cm4gZW1wdHkgZGF0YS5cbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4gKHRoaXMuZGF0YSA9IGRhdGEpKTtcbiAgfVxuXG4gIHJlbW92ZUVsZW1lbnQgPSBlbGVtZW50VG9EZWxldGUgPT4ge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoZWxlbSA9PiBlbGVtICE9PSBlbGVtZW50VG9EZWxldGUpO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kID0gY2xpY2tlZEVsZW1lbnQgPT5cbiAgICAodGhpcy5leHBhbmRlZEVsZW1lbnQgPVxuICAgICAgIXRoaXMuZXhwYW5kZWRFbGVtZW50IHx8IHRoaXMuZXhwYW5kZWRFbGVtZW50ICE9PSBjbGlja2VkRWxlbWVudFxuICAgICAgICA/IGNsaWNrZWRFbGVtZW50XG4gICAgICAgIDogbnVsbClcbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICd1dGlsJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZ2VuZXJhbCdcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xuICAgIGlmICghYXJncykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShhcmdzKSkge1xuICAgICAgYXJncy5mb3JFYWNoKHBpcGUgPT4ge1xuICAgICAgICB2YWx1ZSA9ICg8UGlwZVRyYW5zZm9ybT5waXBlKS50cmFuc2Zvcm0odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPmFyZ3MpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIHtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgaWNvbjogc3RyaW5nO1xyXG4gIGFuaW1hdGlvbj86IHN0cmluZztcclxuICBhbHRlcm5hdGVJY29uPzogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdGV4dDogc3RyaW5nLFxyXG4gICAgaWNvbjogc3RyaW5nLFxyXG4gICAgYWx0ZXJuYXRlSWNvbj86IHN0cmluZyxcclxuICAgIGFuaW1hdGlvbj86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIHRoaXMuaWNvbiA9IGljb247XHJcbiAgICB0aGlzLmFsdGVybmF0ZUljb24gPSBhbHRlcm5hdGVJY29uID8gYWx0ZXJuYXRlSWNvbiA6IG51bGw7XHJcbiAgICB0aGlzLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IG1hdFRvb2x0aXA9XCJJbmZvIGFib3V0IHRoZSBhY3Rpb25cIiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIiAoY2xpY2spPVwiY29uY3JldGVCdXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCwkZXZlbnQpXCI+XG4gIDxmYSBbbmFtZV09XCJidXR0b25EZWYuaWNvblwiIFthbmltYXRpb25dPVwiYnV0dG9uRGVmLmFuaW1hdGlvblwiPjwvZmE+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuYnV0dG9uLWNvbnRhaW5lcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojNTQ1NGM3O21hcmdpbjo0cHg7bGluZS1oZWlnaHQ6MTAwJTtmbGV4OjF9LmJ1dHRvbi1jb250YWluZXI6aG92ZXJ7Y29sb3I6b3JhbmdlfWBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvblR5cGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0YXJnZXRFbGVtZW50O1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbjogRnVuY3Rpb247XG5cbiAgYnV0dG9uRGVmOiBCdXR0b247XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25UeXBlKSB7XG4gICAgICB0aGlzLmJ1dHRvbkRlZiA9IGJ1dHRvbnMuZ2V0KHRoaXMuYnV0dG9uVHlwZSk7XG4gICAgfVxuICB9XG5cbiAgY29uY3JldGVCdXR0b25BY3Rpb24gPSAodGFyZ2V0RWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50KTtcbiAgfVxufVxuXG5jb25zdCBidXR0b25zOiBNYXA8c3RyaW5nLCBCdXR0b24+ID0gbmV3IE1hcChbXG4gIFsnZWRpdCcsIG5ldyBCdXR0b24oJ0l6bWVuaScsICdwZW5jaWwtc3F1YXJlLW8nKV0sXG4gIFsnZGVsZXRlJywgbmV3IEJ1dHRvbignT2JyacOFwqFpJywgJ3RyYXNoLW8nKV0sXG4gIFsndmlldycsIG5ldyBCdXR0b24oJ0RldGFsamknLCAnYWRkcmVzcy1jYXJkLW8nKV0sXG4gIFsnc2F2ZScsIG5ldyBCdXR0b24oJ1Nhw4TCjXV2YWonLCAnZmxvcHB5LW8nKV0sXG4gIFsnYXBwcm92ZScsIG5ldyBCdXR0b24oJ09kb2JyaScsICdjaGVjaycpXSxcbiAgWydkZW55JywgbmV3IEJ1dHRvbignT2RiaWonLCAnYmFuJyldXG5dKTtcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGltc0dyaWRDb21wb25lbnQgfSBmcm9tICcuL3RpbXMtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBNYXRCdXR0b25Nb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRNZW51TW9kdWxlLFxuICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gIE1hdFNlbGVjdE1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEdlbmVyYWxQaXBlIH0gZnJvbSAnLi9nZW5lcmFsLnBpcGUnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWZvbnQtYXdlc29tZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1zR3JpZENvbXBvbmVudCwgR2VuZXJhbFBpcGUsIEJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zR3JpZENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGltc0dyaWRNb2R1bGUge31cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1zeXN0ZW1zTGliQ29tcG9uZW50IH0gZnJvbSAnLi90aW1zeXN0ZW1zLWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltc0dyaWRNb2R1bGUgfSBmcm9tICcuL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1RpbXNHcmlkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVGltc3lzdGVtc0xpYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zR3JpZE1vZHVsZSwgVGltc3lzdGVtc0xpYkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYk1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiQ29tcG9uZW50IiwibWVyZ2UiLCJzdGFydFdpdGgiLCJzd2l0Y2hNYXAiLCJtYXAiLCJjYXRjaEVycm9yIiwib2JzZXJ2YWJsZU9mIiwidHJpZ2dlciIsInN0YXRlIiwic3R5bGUiLCJ0cmFuc2l0aW9uIiwiYW5pbWF0ZSIsIlZpZXdDaGlsZCIsIk1hdFBhZ2luYXRvciIsIk1hdFNvcnQiLCJJbnB1dCIsImlzQXJyYXkiLCJQaXBlIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJBbmd1bGFyRm9udEF3ZXNvbWVNb2R1bGUiLCJDZGtUYWJsZU1vZHVsZSIsIk1hdFRhYmxlTW9kdWxlIiwiTWF0UGFnaW5hdG9yTW9kdWxlIiwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0VG9vbGJhck1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEZvcm1GaWVsZE1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0U2VsZWN0TW9kdWxlIiwiTWF0U29ydE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBUUUsOEJBQW9CLElBQWdCO1lBQXBDLGlCQUF3QztZQUFwQixTQUFJLEdBQUosSUFBSSxDQUFZO2lDQUVwQixVQUNkLElBQVksRUFDWixLQUFhLEVBQ2IsSUFBWTs7Z0JBRVosSUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7O2dCQUNwRCxJQUFNLFVBQVUsR0FBTSxJQUFJLHVDQUFrQyxJQUFJLGVBQVUsS0FBSyxlQUFTLElBQUk7b0JBQzFGLENBQUMsQ0FBRSxDQUFDO2dCQUVOLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVksVUFBVSxDQUFDLENBQUM7YUFDN0M7U0FadUM7O29CQUp6Q0EsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7d0JBSlFDLGFBQVU7Ozs7bUNBRm5COzs7Ozs7O0FDQUE7UUFhRTtTQUFpQjs7OztRQUVqQix5Q0FBUTs7O1lBQVI7YUFDQzs7b0JBZEZDLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUscUJBQXFCO3dCQUMvQixRQUFRLEVBQUUsc0RBSVQ7d0JBQ0QsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7Ozs7cUNBVkQ7Ozs7Ozs7QUNBQTtJQW1CQSxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7O1FBd0haO1lBQUEsaUJBQWdCO2tDQVBDLEtBQUs7aUNBRU4sQ0FBQztvQ0FDRSxJQUFJO3NDQUNGLEtBQUs7NEJBS2YsVUFBQyxNQUFNLEVBQUUsU0FBaUIsSUFBSyxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxF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