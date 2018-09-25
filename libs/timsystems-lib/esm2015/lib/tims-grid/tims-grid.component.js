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
const lod = _;
export class TimsGridComponent {
    constructor() {
        this.displayDetails = false;
        this.resultsLength = 0;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
        this.getField = (source, fieldPath) => lod.get(source, fieldPath, '');
        this.removeElement = elementToDelete => {
            this.data = this.data.filter(elem => elem !== elementToDelete);
        };
        this.toggleExpand = clickedElement => (this.expandedElement =
            !this.expandedElement || this.expandedElement !== clickedElement
                ? clickedElement
                : null);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
            return observableOf([]);
        }))
            .subscribe(data => (this.data = data));
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
                        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                    ])
                ]
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
    TimsGridComponent.prototype.removeElement;
    /** @type {?} */
    TimsGridComponent.prototype.toggleExpand;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltcy1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC90aW1zLWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFNBQVMsRUFDVCxLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O0FBRTVCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztBQW9GZCxNQUFNO0lBb0NKOzhCQVBpQixLQUFLOzZCQUVOLENBQUM7Z0NBQ0UsSUFBSTtrQ0FDRixLQUFLO3dCQUtmLENBQUMsTUFBTSxFQUFFLFNBQWlCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7NkJBeUN4RCxlQUFlLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxDQUFDO1NBQ2hFOzRCQUVjLGNBQWMsQ0FBQyxFQUFFLENBQzlCLENBQUMsSUFBSSxDQUFDLGVBQWU7WUFDbkIsQ0FBQyxJ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TCxLQUFLOzRCQUdMLEtBQUs7NkJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIElucHV0LFxuICBQaXBlVHJhbnNmb3JtXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yLCBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgbG9kID0gXztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtdGltcy1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1jb250YWluZXIgbWF0LWVsZXZhdGlvbi16OFwiPlxuICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1sb2FkaW5nLXNoYWRlXCIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzIHx8IGlzUmF0ZUxpbWl0UmVhY2hlZFwiPlxuICAgIDxtYXQtc3Bpbm5lciAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHNcIj48L21hdC1zcGlubmVyPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLXJhdGUtbGltaXQtcmVhY2hlZFwiICpuZ0lmPVwiaXNSYXRlTGltaXRSZWFjaGVkXCI+XG4gICAgICBEb8WhbG8gamUgZG8gZ3JlxaFrZSwgbW9saW1vIHByb3Zlcml0ZSB2YcWhdSBpbnRlcm5ldCBrb25la2NpanVcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImV4YW1wbGUtdGFibGUtY29udGFpbmVyXCI+XG5cbiAgICA8dGFibGUgbWF0LXRhYmxlIFtkYXRhU291cmNlXT1cImRhdGFcIiBjbGFzcz1cImV4YW1wbGUtdGFibGVcIiBtYXRTb3J0IG11bHRpVGVtcGxhdGVEYXRhUm93cyBtYXRTb3J0RGlzYWJsZUNsZWFyXG4gICAgICBtYXRTb3J0RGlyZWN0aW9uPVwiYXNjXCI+XG5cblxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJ7e2NvbHVtbn19XCIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5JZHM7IGxldCBpZD1pbmRleFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic29ydGFibGU7ZWxzZSBub3NvcnRcIj5cbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBkaXNhYmxlQ2xlYXI+IHt7Y29sdW1uTmFtZXNbaWRdfX0gPC90aD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9zb3J0PlxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+IHt7Y29sdW1uTmFtZXNbaWRdfX0gPC90aD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbiE9PSdidXR0b25zJztlbHNlIHRlc3RcIj5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+IDxzcGFuPnt7Z2V0RmllbGQocm93LGNvbHVtbil8Z2VuZXJhbDpjb2x1bW5QaXBlc1tpZF19fTwvc3Bhbj48L3RkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN0ZXN0PlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zLXBhbmVsXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6IChidXR0b25zLmxlbmd0aCoyMCkrJ3B4J31cIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnM7bGV0IGk9aW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8dGltcy1idXR0b24gW2J1dHRvbkFjdGlvbl09XCJidXR0b24hPT0nZGVsZXRlJz8gYnV0dG9uQWN0aW9uc1tpXTogcmVtb3ZlRWxlbWVudFwiIFt0YXJnZXRFbGVtZW50XT1cInJvd1wiXG4gICAgICAgICAgICAgICAgICBbYnV0dG9uVHlwZV09XCJidXR0b25cIj48L3RpbXMtYnV0dG9uPlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJleHBhbmRlZERldGFpbFwiPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCIgW2F0dHIuY29sc3Bhbl09XCJjb2x1bW5JZHMubGVuZ3RoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXRhaWxcIiBbQGRldGFpbEV4cGFuZF09XCJyb3cgPT0gZXhwYW5kZWRFbGVtZW50ID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnXCI+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGlhZ3JhbVwiPiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1wb3NpdGlvblwiPiB7e3Jvdy5ib2R5fX0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXN5bWJvbFwiPiBuZXN0byA8L2Rpdj5cbiAgICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LW5hbWVcIj4gbmVzdG8gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXdlaWdodFwiPiB7e3Jvdy5ib2R5fX0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPCEtLSA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIHt7cm93LmJvZHl9fVxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbi1hdHRyaWJ1dGlvblwiPiAtLSBJenZvciBuZWtpIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDx0ciBtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiY29sdW1uSWRzXCI+PC90cj5cbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBjb2x1bW5JZHM7XCIgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtcm93XCIgW2NsYXNzLmV4YW1wbGUtZXhwYW5kZWQtcm93XT1cImV4cGFuZGVkRWxlbWVudCA9PT0gcm93XCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZChyb3cpXCI+XG4gICAgICA8L3RyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXlEZXRhaWxzXCI+XG4gICAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBbJ2V4cGFuZGVkRGV0YWlsJ11cIiBjbGFzcz1cImV4YW1wbGUtZGV0YWlsLXJvd1wiPjwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cblxuICA8bWF0LXBhZ2luYXRvciBbbGVuZ3RoXT1cInJlc3VsdHNMZW5ndGhcIiBbcGFnZVNpemVPcHRpb25zXT1cIlsxMCwgMjAsIDUwLCAxMDBdXCIgW3BhZ2VTaXplXT1cIjIwXCI+PC9tYXQtcGFnaW5hdG9yPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgdGFibGV7d2lkdGg6MTAwJX10ci5leGFtcGxlLWRldGFpbC1yb3d7aGVpZ2h0OjB9LmJ1dHRvbnMtcGFuZWx7ZGlzcGxheTppbmxpbmUtZmxleDtmbGV4LWRpcmVjdGlvbjpyb3d9dHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTpob3ZlcntiYWNrZ3JvdW5kOiNmNWY1ZjV9dHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTphY3RpdmV7YmFja2dyb3VuZDojZWZlZmVmfS5leGFtcGxlLWVsZW1lbnQtcm93IHRke2JvcmRlci1ib3R0b20td2lkdGg6MH0uZXhhbXBsZS1lbGVtZW50LWRldGFpbHtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpmbGV4fS5leGFtcGxlLWVsZW1lbnQtZGlhZ3JhbXttaW4td2lkdGg6ODBweDtib3JkZXI6MnB4IHNvbGlkICMwMDA7cGFkZGluZzo4cHg7Zm9udC13ZWlnaHQ6bGlnaHRlcjttYXJnaW46OHB4IDA7aGVpZ2h0OjEwNHB4fS5leGFtcGxlLWVsZW1lbnQtc3ltYm9se2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6NDBweDtsaW5lLWhlaWdodDpub3JtYWx9LmV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbntwYWRkaW5nOjE2cHh9LmV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbi1hdHRyaWJ1dGlvbntvcGFjaXR5Oi41fS5leGFtcGxlLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5leGFtcGxlLWxvYWRpbmctc2hhZGV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2JvdHRvbTo1NnB4O3JpZ2h0OjA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xNSk7ei1pbmRleDoxO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uZXhhbXBsZS1yYXRlLWxpbWl0LXJlYWNoZWR7Y29sb3I6Izk4MDAwMDttYXgtd2lkdGg6MzYwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9YF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdkZXRhaWxFeHBhbmQnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2NvbGxhcHNlZCcsXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JywgbWluSGVpZ2h0OiAnMCcsIGRpc3BsYXk6ICdub25lJyB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbihcbiAgICAgICAgJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLFxuICAgICAgICBhbmltYXRlKCcyMjVtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknKVxuICAgICAgKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGltc0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcilcbiAgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG5cbiAgQFZpZXdDaGlsZChNYXRTb3J0KVxuICBzb3J0OiBNYXRTb3J0O1xuXG4gIEBJbnB1dCgpXG4gIHNvcnRhYmxlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGFQcm92aWRlcjogRnVuY3Rpb247XG5cbiAgQElucHV0KClcbiAgY29sdW1uSWRzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBjb2x1bW5OYW1lczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgY29sdW1uUGlwZXM6IFBpcGVUcmFuc2Zvcm1bXTtcblxuICBASW5wdXQoKVxuICBidXR0b25zOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBidXR0b25BY3Rpb25zOiBGdW5jdGlvbltdO1xuXG4gIEBJbnB1dCgpXG4gIGRpc3BsYXlEZXRhaWxzID0gZmFsc2U7XG5cbiAgcmVzdWx0c0xlbmd0aCA9IDA7XG4gIGlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICBpc1JhdGVMaW1pdFJlYWNoZWQgPSBmYWxzZTtcbiAgZXhwYW5kZWRFbGVtZW50OiBhbnk7XG4gIGRhdGE6IGFueVtdO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0RmllbGQgPSAoc291cmNlLCBmaWVsZFBhdGg6IHN0cmluZykgPT4gbG9kLmdldChzb3VyY2UsIGZpZWxkUGF0aCwgJycpO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmJ1dHRvbnMgJiYgdGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY29sdW1uSWRzLnB1c2goJ2J1dHRvbnMnKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIHVzZXIgY2hhbmdlcyB0aGUgc29ydCBvcmRlciwgcmVzZXQgYmFjayB0byB0aGUgZmlyc3QgcGFnZS5cbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZS5zdWJzY3JpYmUoKCkgPT4gKHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCA9IDApKTtcblxuICAgIG1lcmdlKHRoaXMuc29ydC5zb3J0Q2hhbmdlLCB0aGlzLnBhZ2luYXRvci5wYWdlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gPE9ic2VydmFibGU8YW55Pj4oXG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlcihcbiAgICAgICAgICAgICAgdGhpcy5zb3J0LmFjdGl2ZSxcbiAgICAgICAgICAgICAgdGhpcy5zb3J0LmRpcmVjdGlvbixcbiAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3IucGFnZUluZGV4LFxuICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvci5wYWdlU2l6ZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgLy8gRmxpcCBmbGFnIHRvIHNob3cgdGhhdCBsb2FkaW5nIGhhcyBmaW5pc2hlZC5cbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzUmF0ZUxpbWl0UmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVzdWx0c0xlbmd0aCA9IGRhdGEudG90YWxfY291bnQ7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuaXRlbXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICAvLyBDYXRjaCBpZiB0aGUgR2l0SHViIEFQSSBoYXMgcmVhY2hlZCBpdHMgcmF0ZSBsaW1pdC4gUmV0dXJuIGVtcHR5IGRhdGEuXG4gICAgICAgICAgdGhpcy5pc1JhdGVMaW1pdFJlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+ICh0aGlzLmRhdGEgPSBkYXRhKSk7XG4gIH1cblxuICByZW1vdmVFbGVtZW50ID0gZWxlbWVudFRvRGVsZXRlID0+IHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGVsZW0gPT4gZWxlbSAhPT0gZWxlbWVudFRvRGVsZXRlKTtcbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZCA9IGNsaWNrZWRFbGVtZW50ID0+XG4gICAgKHRoaXMuZXhwYW5kZWRFbGVtZW50ID1cbiAgICAgICF0aGlzLmV4cGFuZGVkRWxlbWVudCB8fCB0aGlzLmV4cGFuZGVkRWxlbWVudCAhPT0gY2xpY2tlZEVsZW1lbnRcbiAgICAgICAgPyBjbGlja2VkRWxlbWVudFxuICAgICAgICA6IG51bGwpXG59XG4iXX0=