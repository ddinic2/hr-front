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
                    return /** @type {?} */ ((_this.dataProvider(_this.sort.active, _this.sort.direction, _this.paginator.pageIndex)));
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
                        template: "<div class=\"example-container mat-elevation-z8\">\n  <div class=\"example-loading-shade\" *ngIf=\"isLoadingResults || isRateLimitReached\">\n    <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n    <div class=\"example-rate-limit-reached\" *ngIf=\"isRateLimitReached\">\n      Do\u0161lo je do gre\u0161ke, molimo proverite va\u0161u internet konekciju\n    </div>\n  </div>\n\n  <div class=\"example-table-container\">\n\n    <table mat-table [dataSource]=\"data\" class=\"example-table\" matSort multiTemplateDataRows matSortActive=\"state\"\n      matSortDisableClear matSortDirection=\"asc\">\n\n\n      <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of columnIds; let id=index\">\n        <ng-container *ngIf=\"sortable;else nosort\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header disableClear> {{columnNames[id]}} </th>\n        </ng-container>\n        <ng-template #nosort>\n          <th mat-header-cell *matHeaderCellDef> {{columnNames[id]}} </th>\n        </ng-template>\n        <ng-container *ngIf=\"column!=='buttons';else test\">\n          <td mat-cell *matCellDef=\"let row\"> <span>{{getField(row,column)|general:columnPipes[id]}}</span></td>\n        </ng-container>\n        <ng-template #test>\n          <td mat-cell *matCellDef=\"let row\">\n            <div class=\"buttons-panel\" [ngStyle]=\"{'width': (buttons.length*20)+'px'}\">\n              <ng-container *ngFor=\"let button of buttons;let i=index\">\n                <tims-button [buttonAction]=\"button!=='delete'? buttonActions[i]: removeElement\" [targetElement]=\"row\"\n                  [buttonType]=\"button\"></tims-button>\n              </ng-container>\n            </div>\n          </td>\n        </ng-template>\n      </ng-container>\n\n      <ng-container matColumnDef=\"expandedDetail\">\n        <td mat-cell *matCellDef=\"let row\" [attr.colspan]=\"columnIds.length\">\n          <div class=\"example-element-detail\" [@detailExpand]=\"row == expandedElement ? 'expanded' : 'collapsed'\">\n            <!-- <div class=\"example-element-diagram\"> -->\n            <!-- <div class=\"example-element-position\"> {{row.body}} </div> -->\n            <!-- <div class=\"example-element-symbol\"> nesto </div>\n              <!-- <div class=\"example-element-name\"> nesto </div> -->\n            <!-- <div class=\"example-element-weight\"> {{row.body}} </div> -->\n            <!-- </div> -->\n            <div class=\"example-element-description\">\n              {{row.body}}\n              <span class=\"example-element-description-attribution\"> -- Izvor neki </span>\n            </div>\n          </div>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"columnIds\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: columnIds;\" class=\"example-element-row\" [class.example-expanded-row]=\"expandedElement === row\"\n        (click)=\"toggleExpand(row)\">\n      </tr>\n      <ng-container *ngIf=\"displayDetails\">\n        <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"example-detail-row\"></tr>\n      </ng-container>\n    </table>\n  </div>\n\n  <mat-paginator [length]=\"resultsLength\" [pageSize]=\"30\"></mat-paginator>\n</div>\n",
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
        ['save', new Button('Sačuvaj', 'floppy-o')]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuc2VydmljZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2dlbmVyYWwucGlwZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24udHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvdGltcy1ncmlkLm1vZHVsZS50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXN5c3RlbXMtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICBnZXRSZXBvSXNzdWVzID0gKFxuICAgIHNvcnQ6IHN0cmluZyxcbiAgICBvcmRlcjogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlclxuICApOiBPYnNlcnZhYmxlPEdpdGh1YkFwaT4gPT4ge1xuICAgIGNvbnN0IGhyZWYgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9zZWFyY2gvaXNzdWVzJztcbiAgICBjb25zdCByZXF1ZXN0VXJsID0gYCR7aHJlZn0/cT1yZXBvOmFuZ3VsYXIvbWF0ZXJpYWwyJnNvcnQ9JHtzb3J0fSZvcmRlcj0ke29yZGVyfSZwYWdlPSR7cGFnZSArXG4gICAgICAxfWA7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxHaXRodWJBcGk+KHJlcXVlc3RVcmwpO1xuICB9XG59XG5leHBvcnQgaW50ZXJmYWNlIEdpdGh1YkFwaSB7XG4gIGl0ZW1zOiBHaXRodWJJc3N1ZVtdO1xuICB0b3RhbF9jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdpdGh1Yklzc3VlIHtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBudW1iZXI6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtdGltc3lzdGVtcy1saWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgdGltc3lzdGVtcy1saWIgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFRpbXN5c3RlbXNMaWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgSW5wdXQsXG4gIFBpcGVUcmFuc2Zvcm1cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBsb2QgPSBfO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lciBtYXQtZWxldmF0aW9uLXo4XCI+XG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLWxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHMgfHwgaXNSYXRlTGltaXRSZWFjaGVkXCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVkXCIgKm5nSWY9XCJpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICAgIERvw4XCoWxvIGplIGRvIGdyZcOFwqFrZSwgbW9saW1vIHByb3Zlcml0ZSB2YcOFwqF1IGludGVybmV0IGtvbmVrY2lqdVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS10YWJsZS1jb250YWluZXJcIj5cblxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVwiIGNsYXNzPVwiZXhhbXBsZS10YWJsZVwiIG1hdFNvcnQgbXVsdGlUZW1wbGF0ZURhdGFSb3dzIG1hdFNvcnRBY3RpdmU9XCJzdGF0ZVwiXG4gICAgICBtYXRTb3J0RGlzYWJsZUNsZWFyIG1hdFNvcnREaXJlY3Rpb249XCJhc2NcIj5cblxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInt7Y29sdW1ufX1cIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbklkczsgbGV0IGlkPWluZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzb3J0YWJsZTtlbHNlIG5vc29ydFwiPlxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIGRpc2FibGVDbGVhcj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNub3NvcnQ+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3tjb2x1bW5OYW1lc1tpZF19fSA8L3RoPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uIT09J2J1dHRvbnMnO2Vsc2UgdGVzdFwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj4gPHNwYW4+e3tnZXRGaWVsZChyb3csY29sdW1uKXxnZW5lcmFsOmNvbHVtblBpcGVzW2lkXX19PC9zcGFuPjwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI3Rlc3Q+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtcGFuZWxcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogKGJ1dHRvbnMubGVuZ3RoKjIwKSsncHgnfVwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9ucztsZXQgaT1pbmRleFwiPlxuICAgICAgICAgICAgICAgIDx0aW1zLWJ1dHRvbiBbYnV0dG9uQWN0aW9uXT1cImJ1dHRvbiE9PSdkZWxldGUnPyBidXR0b25BY3Rpb25zW2ldOiByZW1vdmVFbGVtZW50XCIgW3RhcmdldEVsZW1lbnRdPVwicm93XCJcbiAgICAgICAgICAgICAgICAgIFtidXR0b25UeXBlXT1cImJ1dHRvblwiPjwvdGltcy1idXR0b24+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImV4cGFuZGVkRGV0YWlsXCI+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIiBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbklkcy5sZW5ndGhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRldGFpbFwiIFtAZGV0YWlsRXhwYW5kXT1cInJvdyA9PSBleHBhbmRlZEVsZW1lbnQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCdcIj5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kaWFncmFtXCI+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXBvc2l0aW9uXCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtc3ltYm9sXCI+IG5lc3RvIDwvZGl2PlxuICAgICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtbmFtZVwiPiBuZXN0byA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtd2VpZ2h0XCI+IHt7cm93LmJvZHl9fSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8IS0tIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge3tyb3cuYm9keX19XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9uXCI+IC0tIEl6dm9yIG5la2kgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJjb2x1bW5JZHNcIj48L3RyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGNvbHVtbklkcztcIiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1yb3dcIiBbY2xhc3MuZXhhbXBsZS1leHBhbmRlZC1yb3ddPVwiZXhwYW5kZWRFbGVtZW50ID09PSByb3dcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kKHJvdylcIj5cbiAgICAgIDwvdHI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheURldGFpbHNcIj5cbiAgICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IFsnZXhwYW5kZWREZXRhaWwnXVwiIGNsYXNzPVwiZXhhbXBsZS1kZXRhaWwtcm93XCI+PC90cj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuXG4gIDxtYXQtcGFnaW5hdG9yIFtsZW5ndGhdPVwicmVzdWx0c0xlbmd0aFwiIFtwYWdlU2l6ZV09XCIzMFwiPjwvbWF0LXBhZ2luYXRvcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYHRhYmxle3dpZHRoOjEwMCV9dHIuZXhhbXBsZS1kZXRhaWwtcm93e2hlaWdodDowfS5idXR0b25zLXBhbmVse2Rpc3BsYXk6aW5saW5lLWZsZXg7ZmxleC1kaXJlY3Rpb246cm93fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6aG92ZXJ7YmFja2dyb3VuZDojZjVmNWY1fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6YWN0aXZle2JhY2tncm91bmQ6I2VmZWZlZn0uZXhhbXBsZS1lbGVtZW50LXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9LmV4YW1wbGUtZWxlbWVudC1kZXRhaWx7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6ZmxleH0uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW17bWluLXdpZHRoOjgwcHg7Ym9yZGVyOjJweCBzb2xpZCAjMDAwO3BhZGRpbmc6OHB4O2ZvbnQtd2VpZ2h0OmxpZ2h0ZXI7bWFyZ2luOjhweCAwO2hlaWdodDoxMDRweH0uZXhhbXBsZS1lbGVtZW50LXN5bWJvbHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjQwcHg7bGluZS1oZWlnaHQ6bm9ybWFsfS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb257cGFkZGluZzoxNnB4fS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb257b3BhY2l0eTouNX0uZXhhbXBsZS1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0uZXhhbXBsZS1sb2FkaW5nLXNoYWRle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3R0b206NTZweDtyaWdodDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTUpO3otaW5kZXg6MTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVke2NvbG9yOiM5ODAwMDA7bWF4LXdpZHRoOjM2MHB4O3RleHQtYWxpZ246Y2VudGVyfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGV0YWlsRXhwYW5kJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdjb2xsYXBzZWQnLFxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnLCBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdleHBhbmRlZCA8PT4gY29sbGFwc2VkJyxcbiAgICAgICAgYW5pbWF0ZSgnMjI1bXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpJylcbiAgICAgIClcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbXNHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpXG4gIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U29ydClcbiAgc29ydDogTWF0U29ydDtcblxuICBASW5wdXQoKVxuICBzb3J0YWJsZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBkYXRhUHJvdmlkZXI6IEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbklkczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgY29sdW1uTmFtZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtblBpcGVzOiBQaXBlVHJhbnNmb3JtW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uczogRnVuY3Rpb25bXTtcblxuICBASW5wdXQoKVxuICBkaXNwbGF5RGV0YWlscyA9IGZhbHNlO1xuXG4gIHJlc3VsdHNMZW5ndGggPSAwO1xuICBpc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gIGV4cGFuZGVkRWxlbWVudDogYW55O1xuICBkYXRhOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldEZpZWxkID0gKHNvdXJjZSwgZmllbGRQYXRoOiBzdHJpbmcpID0+IGxvZC5nZXQoc291cmNlLCBmaWVsZFBhdGgsICcnKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25zICYmIHRoaXMuYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNvbHVtbklkcy5wdXNoKCdidXR0b25zJyk7XG4gICAgfVxuICAgIC8vIElmIHRoZSB1c2VyIGNoYW5nZXMgdGhlIHNvcnQgb3JkZXIsIHJlc2V0IGJhY2sgdG8gdGhlIGZpcnN0IHBhZ2UuXG4gICAgdGhpcy5zb3J0LnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+ICh0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXggPSAwKSk7XG5cbiAgICBtZXJnZSh0aGlzLnNvcnQuc29ydENoYW5nZSwgdGhpcy5wYWdpbmF0b3IucGFnZSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIDxPYnNlcnZhYmxlPGFueT4+KFxuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIoXG4gICAgICAgICAgICAgIHRoaXMuc29ydC5hY3RpdmUsXG4gICAgICAgICAgICAgIHRoaXMuc29ydC5kaXJlY3Rpb24sXG4gICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleFxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgLy8gRmxpcCBmbGFnIHRvIHNob3cgdGhhdCBsb2FkaW5nIGhhcyBmaW5pc2hlZC5cbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVzdWx0c0xlbmd0aCA9IGRhdGEudG90YWxfY291bnQ7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuaXRlbXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICAvLyBDYXRjaCBpZiB0aGUgR2l0SHViIEFQSSBoYXMgcmVhY2hlZCBpdHMgcmF0ZSBsaW1pdC4gUmV0dXJuIGVtcHR5IGRhdGEuXG4gICAgICAgICAgdGhpcy5pc1JhdGVMaW1pdFJlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+ICh0aGlzLmRhdGEgPSBkYXRhKSk7XG4gIH1cblxuICByZW1vdmVFbGVtZW50ID0gZWxlbWVudFRvRGVsZXRlID0+IHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGVsZW0gPT4gZWxlbSAhPT0gZWxlbWVudFRvRGVsZXRlKTtcbiAgfTtcblxuICB0b2dnbGVFeHBhbmQgPSBjbGlja2VkRWxlbWVudCA9PlxuICAgICh0aGlzLmV4cGFuZGVkRWxlbWVudCA9XG4gICAgICAhdGhpcy5leHBhbmRlZEVsZW1lbnQgfHwgdGhpcy5leHBhbmRlZEVsZW1lbnQgIT09IGNsaWNrZWRFbGVtZW50XG4gICAgICAgID8gY2xpY2tlZEVsZW1lbnRcbiAgICAgICAgOiBudWxsKTtcbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICd1dGlsJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZ2VuZXJhbCdcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xuICAgIGlmICghYXJncykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShhcmdzKSkge1xuICAgICAgYXJncy5mb3JFYWNoKHBpcGUgPT4ge1xuICAgICAgICB2YWx1ZSA9ICg8UGlwZVRyYW5zZm9ybT5waXBlKS50cmFuc2Zvcm0odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPmFyZ3MpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIHtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgaWNvbjogc3RyaW5nO1xyXG4gIGFuaW1hdGlvbj86IHN0cmluZztcclxuICBhbHRlcm5hdGVJY29uPzogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdGV4dDogc3RyaW5nLFxyXG4gICAgaWNvbjogc3RyaW5nLFxyXG4gICAgYWx0ZXJuYXRlSWNvbj86IHN0cmluZyxcclxuICAgIGFuaW1hdGlvbj86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIHRoaXMuaWNvbiA9IGljb247XHJcbiAgICB0aGlzLmFsdGVybmF0ZUljb24gPSBhbHRlcm5hdGVJY29uID8gYWx0ZXJuYXRlSWNvbiA6IG51bGw7XHJcbiAgICB0aGlzLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IG1hdFRvb2x0aXA9XCJJbmZvIGFib3V0IHRoZSBhY3Rpb25cIiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIiAoY2xpY2spPVwiY29uY3JldGVCdXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCwkZXZlbnQpXCI+XG4gIDxmYSBbbmFtZV09XCJidXR0b25EZWYuaWNvblwiIFthbmltYXRpb25dPVwiYnV0dG9uRGVmLmFuaW1hdGlvblwiPjwvZmE+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuYnV0dG9uLWNvbnRhaW5lcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojNTQ1NGM3O21hcmdpbjo0cHg7bGluZS1oZWlnaHQ6MTAwJTtmbGV4OjF9LmJ1dHRvbi1jb250YWluZXI6aG92ZXJ7Y29sb3I6b3JhbmdlfWBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvblR5cGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0YXJnZXRFbGVtZW50O1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbjogRnVuY3Rpb247XG5cbiAgYnV0dG9uRGVmOiBCdXR0b247XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25UeXBlKSB7XG4gICAgICB0aGlzLmJ1dHRvbkRlZiA9IGJ1dHRvbnMuZ2V0KHRoaXMuYnV0dG9uVHlwZSk7XG4gICAgfVxuICB9XG5cbiAgY29uY3JldGVCdXR0b25BY3Rpb24gPSAodGFyZ2V0RWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50KTtcbiAgfVxufVxuXG5jb25zdCBidXR0b25zOiBNYXA8c3RyaW5nLCBCdXR0b24+ID0gbmV3IE1hcChbXG4gIFsnZWRpdCcsIG5ldyBCdXR0b24oJ0l6bWVuaScsICdwZW5jaWwtc3F1YXJlLW8nKV0sXG4gIFsnZGVsZXRlJywgbmV3IEJ1dHRvbignT2JyacOFwqFpJywgJ3RyYXNoLW8nKV0sXG4gIFsndmlldycsIG5ldyBCdXR0b24oJ0RldGFsamknLCAnYWRkcmVzcy1jYXJkLW8nKV0sXG4gIFsnc2F2ZScsIG5ldyBCdXR0b24oJ1Nhw4TCjXV2YWonLCAnZmxvcHB5LW8nKV1cbl0pO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUaW1zR3JpZENvbXBvbmVudCB9IGZyb20gJy4vdGltcy1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7XG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0Q2FyZE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgR2VuZXJhbFBpcGUgfSBmcm9tICcuL2dlbmVyYWwucGlwZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZm9udC1hd2Vzb21lJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQW5ndWxhckZvbnRBd2Vzb21lTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RpbXNHcmlkQ29tcG9uZW50LCBHZW5lcmFsUGlwZSwgQnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbXNHcmlkQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbXN5c3RlbXNMaWJDb21wb25lbnQgfSBmcm9tICcuL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1zR3JpZE1vZHVsZSB9IGZyb20gJy4vdGltcy1ncmlkL3RpbXMtZ3JpZC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVGltc0dyaWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1zeXN0ZW1zTGliQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbXNHcmlkTW9kdWxlLCBUaW1zeXN0ZW1zTGliQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJDb21wb25lbnQiLCJtZXJnZSIsInN0YXJ0V2l0aCIsInN3aXRjaE1hcCIsIm1hcCIsImNhdGNoRXJyb3IiLCJvYnNlcnZhYmxlT2YiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJhbmltYXRlIiwiVmlld0NoaWxkIiwiTWF0UGFnaW5hdG9yIiwiTWF0U29ydCIsIklucHV0IiwiaXNBcnJheSIsIlBpcGUiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSIsIkNka1RhYmxlTW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRQYWdpbmF0b3JNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJNYXRDYXJkTW9kdWxlIiwiTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIiwiTWF0TWVudU1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRUb29sYmFyTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0Rm9ybUZpZWxkTW9kdWxlIiwiTWF0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