/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
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
                return observableOf([]);
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
export { TimsGridComponent };
if (false) {
    /** @type {?} */
    TimsGridComponent.prototype.paginator;
    /** @type {?} */
    TimsGridComponent.prototype.sort;
    /** @type {?} */
    TimsGridComponent.prototype.sortable;
    /** @type {?} */
    TimsGridComponent.prototype.dataProvider;
    /** @type {?} */
    TimsGridComponent.prototype.columnIds;
    /** @type {?} */
    TimsGridComponent.prototype.columnNames;
    /** @type {?} */
    TimsGridComponent.prototype.columnPipes;
    /** @type {?} */
    TimsGridComponent.prototype.buttons;
    /** @type {?} */
    TimsGridComponent.prototype.buttonActions;
    /** @type {?} */
    TimsGridComponent.prototype.displayDetails;
    /** @type {?} */
    TimsGridComponent.prototype.resultsLength;
    /** @type {?} */
    TimsGridComponent.prototype.isLoadingResults;
    /** @type {?} */
    TimsGridComponent.prototype.isRateLimitReached;
    /** @type {?} */
    TimsGridComponent.prototype.expandedElement;
    /** @type {?} */
    TimsGridComponent.prototype.data;
    /** @type {?} */
    TimsGridComponent.prototype.getField;
    /** @type {?} */
    TimsGridComponent.prototype.refresh;
    /** @type {?} */
    TimsGridComponent.prototype.removeElement;
    /** @type {?} */
    TimsGridComponent.prototype.toggleExpand;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltcy1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC90aW1zLWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsSUFBSSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOztBQUU1QixJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7O0lBa0haO1FBQUEsaUJBQWdCOzhCQVBDLEtBQUs7NkJBRU4sQ0FBQztnQ0FDRSxJQUFJO2tDQUNGLEtBQUs7d0JBS2YsVUFBQyxNQUFNLEVBQUUsU0FBaUIsSUFBSyxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBOUIsQ0FBOEI7dUJBTTlEO1lBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoQzs7WUFFRCxBQURBLG9FQUFvRTtZQUNwRSxL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LFNBQUMsT0FBTzsyQkFHakIsS0FBSzsrQkFHTCxLQUFLOzRCQUdMLEtBQUs7OEJBR0wsS0FBSzs4QkFHTCxLQUFLOzBCQUdMLEtBQUs7Z0NBR0wsS0FBSztpQ0FHTCxLQUFLOzs0QkFqSFI7O1NBcUZhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciwgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IGxvZCA9IF87XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLXRpbXMtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImV4YW1wbGUtY29udGFpbmVyIG1hdC1lbGV2YXRpb24tejhcIj5cbiAgPGRpdiBjbGFzcz1cImV4YW1wbGUtbG9hZGluZy1zaGFkZVwiICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0cyB8fCBpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+PC9tYXQtc3Bpbm5lcj5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1yYXRlLWxpbWl0LXJlYWNoZWRcIiAqbmdJZj1cImlzUmF0ZUxpbWl0UmVhY2hlZFwiPlxuICAgICAgRG/FoWxvIGplIGRvIGdyZcWha2UsIG1vbGltbyBwcm92ZXJpdGUgdmHFoXUgaW50ZXJuZXQga29uZWtjaWp1XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLXRhYmxlLWNvbnRhaW5lclwiPlxuXG4gICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhXCIgY2xhc3M9XCJleGFtcGxlLXRhYmxlXCIgbWF0U29ydCBtdWx0aVRlbXBsYXRlRGF0YVJvd3MgbWF0U29ydERpc2FibGVDbGVhclxuICAgICAgbWF0U29ydERpcmVjdGlvbj1cImFzY1wiPlxuXG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwie3tjb2x1bW59fVwiICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uSWRzOyBsZXQgaWQ9aW5kZXhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvcnRhYmxlO2Vsc2Ugbm9zb3J0XCI+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXIgZGlzYWJsZUNsZWFyPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI25vc29ydD5cbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4hPT0nYnV0dG9ucyc7ZWxzZSB0ZXN0XCI+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPiA8c3Bhbj57e2dldEZpZWxkKHJvdyxjb2x1bW4pfGdlbmVyYWw6Y29sdW1uUGlwZXNbaWRdfX08L3NwYW4+PC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVzdD5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1wYW5lbFwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiAoYnV0dG9ucy5sZW5ndGgqMjApKydweCd9XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zO2xldCBpPWluZGV4XCI+XG4gICAgICAgICAgICAgICAgPHRpbXMtYnV0dG9uIFtidXR0b25BY3Rpb25dPVwiYnV0dG9uIT09J2RlbGV0ZSc/IGJ1dHRvbkFjdGlvbnNbaV06IHJlbW92ZUVsZW1lbnRcIiBbdGFyZ2V0RWxlbWVudF09XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgW2J1dHRvblR5cGVdPVwiYnV0dG9uXCI+PC90aW1zLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiZXhwYW5kZWREZXRhaWxcIj5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiIFthdHRyLmNvbHNwYW5dPVwiY29sdW1uSWRzLmxlbmd0aFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGV0YWlsXCIgW0BkZXRhaWxFeHBhbmRdPVwicm93ID09IGV4cGFuZGVkRWxlbWVudCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJ1wiPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRpYWdyYW1cIj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtcG9zaXRpb25cIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1zeW1ib2xcIj4gbmVzdG8gPC9kaXY+XG4gICAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1uYW1lXCI+IG5lc3RvIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC13ZWlnaHRcIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7e3Jvdy5ib2R5fX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb25cIj4gLS0gSXp2b3IgbmVraSA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImNvbHVtbklkc1wiPjwvdHI+XG4gICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogY29sdW1uSWRzO1wiIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXJvd1wiIFtjbGFzcy5leGFtcGxlLWV4cGFuZGVkLXJvd109XCJleHBhbmRlZEVsZW1lbnQgPT09IHJvd1wiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmQocm93KVwiPlxuICAgICAgPC90cj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5RGV0YWlsc1wiPlxuICAgICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogWydleHBhbmRlZERldGFpbCddXCIgY2xhc3M9XCJleGFtcGxlLWRldGFpbC1yb3dcIj48L3RyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG5cbiAgPG1hdC1wYWdpbmF0b3IgW2xlbmd0aF09XCJyZXN1bHRzTGVuZ3RoXCIgW3BhZ2VTaXplT3B0aW9uc109XCJbMTAsIDIwLCA1MCwgMTAwXVwiIFtwYWdlU2l6ZV09XCIyMFwiPjwvbWF0LXBhZ2luYXRvcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYHRhYmxle3dpZHRoOjEwMCV9dHIuZXhhbXBsZS1kZXRhaWwtcm93e2hlaWdodDowfS5idXR0b25zLXBhbmVse2Rpc3BsYXk6aW5saW5lLWZsZXg7ZmxleC1kaXJlY3Rpb246cm93fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6aG92ZXJ7YmFja2dyb3VuZDojZjVmNWY1fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6YWN0aXZle2JhY2tncm91bmQ6I2VmZWZlZn0uZXhhbXBsZS1lbGVtZW50LXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9LmV4YW1wbGUtZWxlbWVudC1kZXRhaWx7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6ZmxleH0uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW17bWluLXdpZHRoOjgwcHg7Ym9yZGVyOjJweCBzb2xpZCAjMDAwO3BhZGRpbmc6OHB4O2ZvbnQtd2VpZ2h0OmxpZ2h0ZXI7bWFyZ2luOjhweCAwO2hlaWdodDoxMDRweH0uZXhhbXBsZS1lbGVtZW50LXN5bWJvbHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjQwcHg7bGluZS1oZWlnaHQ6bm9ybWFsfS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb257cGFkZGluZzoxNnB4fS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb257b3BhY2l0eTouNX0uZXhhbXBsZS1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0uZXhhbXBsZS1sb2FkaW5nLXNoYWRle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3R0b206NTZweDtyaWdodDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTUpO3otaW5kZXg6MTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVke2NvbG9yOiM5ODAwMDA7bWF4LXdpZHRoOjM2MHB4O3RleHQtYWxpZ246Y2VudGVyfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGV0YWlsRXhwYW5kJywgW1xuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JywgbWluSGVpZ2h0OiAnMCcsIGRpc3BsYXk6ICdub25lJyB9KSksXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCcyMjVtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbXNHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpXG4gIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U29ydClcbiAgc29ydDogTWF0U29ydDtcblxuICBASW5wdXQoKVxuICBzb3J0YWJsZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBkYXRhUHJvdmlkZXI6IEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbklkczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgY29sdW1uTmFtZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtblBpcGVzOiBQaXBlVHJhbnNmb3JtW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uczogRnVuY3Rpb25bXTtcblxuICBASW5wdXQoKVxuICBkaXNwbGF5RGV0YWlscyA9IGZhbHNlO1xuXG4gIHJlc3VsdHNMZW5ndGggPSAwO1xuICBpc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gIGV4cGFuZGVkRWxlbWVudDogYW55O1xuICBkYXRhOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldEZpZWxkID0gKHNvdXJjZSwgZmllbGRQYXRoOiBzdHJpbmcpID0+IGxvZC5nZXQoc291cmNlLCBmaWVsZFBhdGgsICcnKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYnV0dG9ucyAmJiB0aGlzLmJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaCgnYnV0dG9ucycpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBzb3J0IG9yZGVyLCByZXNldCBiYWNrIHRvIHRoZSBmaXJzdCBwYWdlLlxuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5wYWdpbmF0b3IucGFnZUluZGV4ID0gMCkpO1xuXG4gICAgbWVyZ2UodGhpcy5zb3J0LnNvcnRDaGFuZ2UsIHRoaXMucGFnaW5hdG9yLnBhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiA8T2JzZXJ2YWJsZTxhbnk+PihcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyKHRoaXMuc29ydC5hY3RpdmUsIHRoaXMuc29ydC5kaXJlY3Rpb24sIHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCwgdGhpcy5wYWdpbmF0b3IucGFnZVNpemUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChkYXRhID0+IHtcbiAgICAgICAgICAvLyBGbGlwIGZsYWcgdG8gc2hvdyB0aGF0IGxvYWRpbmcgaGFzIGZpbmlzaGVkLlxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzTGVuZ3RoID0gZGF0YS50b3RhbF9jb3VudDtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGF0YS5pdGVtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIC8vIENhdGNoIGlmIHRoZSBHaXRIdWIgQVBJIGhhcyByZWFjaGVkIGl0cyByYXRlIGxpbWl0LiBSZXR1cm4gZW1wdHkgZGF0YS5cbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4gKHRoaXMuZGF0YSA9IGRhdGEpKTtcbiAgfTtcblxuICByZW1vdmVFbGVtZW50ID0gZWxlbWVudFRvRGVsZXRlID0+IHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGVsZW0gPT4gZWxlbSAhPT0gZWxlbWVudFRvRGVsZXRlKTtcbiAgfTtcblxuICB0b2dnbGVFeHBhbmQgPSBjbGlja2VkRWxlbWVudCA9PlxuICAgICh0aGlzLmV4cGFuZGVkRWxlbWVudCA9ICF0aGlzLmV4cGFuZGVkRWxlbWVudCB8fCB0aGlzLmV4cGFuZGVkRWxlbWVudCAhPT0gY2xpY2tlZEVsZW1lbnQgPyBjbGlja2VkRWxlbWVudCA6IG51bGwpO1xufVxuIl19