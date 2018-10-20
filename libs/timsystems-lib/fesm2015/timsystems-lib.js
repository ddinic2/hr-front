import { Injectable, Component, ViewChild, Input, Pipe, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule } from '@angular/material';
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
            return of([]);
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
class Button {
    /**
     * @param {?} text
     * @param {?} icon
     * @param {?=} alternateIcon
     * @param {?=} animation
     */
    constructor(text, icon, alternateIcon, animation) {
        this.text = text;
        this.icon = icon;
        this.alternateIcon = alternateIcon ? alternateIcon : null;
        this.animation = animation;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ButtonComponent {
    constructor() {
        this.concreteButtonAction = (targetElement, event) => {
            event.stopPropagation();
            this.buttonAction(targetElement);
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.buttonType) {
            this.buttonDef = buttons.get(this.buttonType);
        }
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'tims-button',
                template: `<div matTooltip="Info about the action" class="button-container" (click)="concreteButtonAction(targetElement,$event)">
  <fa [name]="buttonDef.icon" [animation]="buttonDef.animation"></fa>
</div>
`,
                styles: [`.button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}`]
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [];
ButtonComponent.propDecorators = {
    buttonType: [{ type: Input }],
    targetElement: [{ type: Input }],
    buttonAction: [{ type: Input }]
};
/** @type {?} */
const buttons = new Map([
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
class TimsGridModule {
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
                    ReactiveFormsModule
                ],
                declarations: [TimsGridComponent, GeneralPipe, ButtonComponent],
                exports: [TimsGridComponent]
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

export { TimsystemsLibService, TimsystemsLibComponent, TimsystemsLibModule, ButtonComponent as ɵd, GeneralPipe as ɵc, TimsGridComponent as ɵb, TimsGridModule as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltc3lzdGVtcy1saWIuanMubWFwIiwic291cmNlcyI6WyJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zeXN0ZW1zLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIuY29tcG9uZW50LnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL3RpbXMtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL3RpbXN5c3RlbXMtbGliL2xpYi90aW1zLWdyaWQvZ2VuZXJhbC5waXBlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltcy1ncmlkL2J1dHRvbi50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vdGltc3lzdGVtcy1saWIvbGliL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlLnRzIiwibmc6Ly90aW1zeXN0ZW1zLWxpYi9saWIvdGltc3lzdGVtcy1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRpbXN5c3RlbXNMaWJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGdldFJlcG9Jc3N1ZXMgPSAoXG4gICAgc29ydDogc3RyaW5nLFxuICAgIG9yZGVyOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8R2l0aHViQXBpPiA9PiB7XG4gICAgY29uc3QgaHJlZiA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3NlYXJjaC9pc3N1ZXMnO1xuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtocmVmfT9xPXJlcG86YW5ndWxhci9tYXRlcmlhbDImc29ydD0ke3NvcnR9Jm9yZGVyPSR7b3JkZXJ9JnBhZ2U9JHtwYWdlICtcbiAgICAgIDF9YDtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEdpdGh1YkFwaT4ocmVxdWVzdFVybCk7XG4gIH1cbn1cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViQXBpIHtcbiAgaXRlbXM6IEdpdGh1Yklzc3VlW107XG4gIHRvdGFsX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0aHViSXNzdWUge1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy10aW1zeXN0ZW1zLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICB0aW1zeXN0ZW1zLWxpYiB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVGltc3lzdGVtc0xpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBJbnB1dCxcbiAgUGlwZVRyYW5zZm9ybVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciwgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IGxvZCA9IF87XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLXRpbXMtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImV4YW1wbGUtY29udGFpbmVyIG1hdC1lbGV2YXRpb24tejhcIj5cbiAgPGRpdiBjbGFzcz1cImV4YW1wbGUtbG9hZGluZy1zaGFkZVwiICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0cyB8fCBpc1JhdGVMaW1pdFJlYWNoZWRcIj5cbiAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+PC9tYXQtc3Bpbm5lcj5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1yYXRlLWxpbWl0LXJlYWNoZWRcIiAqbmdJZj1cImlzUmF0ZUxpbWl0UmVhY2hlZFwiPlxuICAgICAgRG/DhcKhbG8gamUgZG8gZ3Jlw4XCoWtlLCBtb2xpbW8gcHJvdmVyaXRlIHZhw4XCoXUgaW50ZXJuZXQga29uZWtjaWp1XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJleGFtcGxlLXRhYmxlLWNvbnRhaW5lclwiPlxuXG4gICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhXCIgY2xhc3M9XCJleGFtcGxlLXRhYmxlXCIgbWF0U29ydCBtdWx0aVRlbXBsYXRlRGF0YVJvd3MgbWF0U29ydERpc2FibGVDbGVhclxuICAgICAgbWF0U29ydERpcmVjdGlvbj1cImFzY1wiPlxuXG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwie3tjb2x1bW59fVwiICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uSWRzOyBsZXQgaWQ9aW5kZXhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvcnRhYmxlO2Vsc2Ugbm9zb3J0XCI+XG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXIgZGlzYWJsZUNsZWFyPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI25vc29ydD5cbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPiB7e2NvbHVtbk5hbWVzW2lkXX19IDwvdGg+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4hPT0nYnV0dG9ucyc7ZWxzZSB0ZXN0XCI+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPiA8c3Bhbj57e2dldEZpZWxkKHJvdyxjb2x1bW4pfGdlbmVyYWw6Y29sdW1uUGlwZXNbaWRdfX08L3NwYW4+PC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVzdD5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1wYW5lbFwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiAoYnV0dG9ucy5sZW5ndGgqMjApKydweCd9XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zO2xldCBpPWluZGV4XCI+XG4gICAgICAgICAgICAgICAgPHRpbXMtYnV0dG9uIFtidXR0b25BY3Rpb25dPVwiYnV0dG9uIT09J2RlbGV0ZSc/IGJ1dHRvbkFjdGlvbnNbaV06IHJlbW92ZUVsZW1lbnRcIiBbdGFyZ2V0RWxlbWVudF09XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgW2J1dHRvblR5cGVdPVwiYnV0dG9uXCI+PC90aW1zLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiZXhwYW5kZWREZXRhaWxcIj5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiIFthdHRyLmNvbHNwYW5dPVwiY29sdW1uSWRzLmxlbmd0aFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGV0YWlsXCIgW0BkZXRhaWxFeHBhbmRdPVwicm93ID09IGV4cGFuZGVkRWxlbWVudCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJ1wiPlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LWRpYWdyYW1cIj4gLS0+XG4gICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtcG9zaXRpb25cIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1zeW1ib2xcIj4gbmVzdG8gPC9kaXY+XG4gICAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1uYW1lXCI+IG5lc3RvIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC13ZWlnaHRcIj4ge3tyb3cuYm9keX19IDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDwhLS0gPC9kaXY+IC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7e3Jvdy5ib2R5fX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJleGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb25cIj4gLS0gSXp2b3IgbmVraSA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImNvbHVtbklkc1wiPjwvdHI+XG4gICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogY29sdW1uSWRzO1wiIGNsYXNzPVwiZXhhbXBsZS1lbGVtZW50LXJvd1wiIFtjbGFzcy5leGFtcGxlLWV4cGFuZGVkLXJvd109XCJleHBhbmRlZEVsZW1lbnQgPT09IHJvd1wiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmQocm93KVwiPlxuICAgICAgPC90cj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5RGV0YWlsc1wiPlxuICAgICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogWydleHBhbmRlZERldGFpbCddXCIgY2xhc3M9XCJleGFtcGxlLWRldGFpbC1yb3dcIj48L3RyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG5cbiAgPG1hdC1wYWdpbmF0b3IgW2xlbmd0aF09XCJyZXN1bHRzTGVuZ3RoXCIgW3BhZ2VTaXplT3B0aW9uc109XCJbMTAsIDIwLCA1MCwgMTAwXVwiIFtwYWdlU2l6ZV09XCIyMFwiPjwvbWF0LXBhZ2luYXRvcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYHRhYmxle3dpZHRoOjEwMCV9dHIuZXhhbXBsZS1kZXRhaWwtcm93e2hlaWdodDowfS5idXR0b25zLXBhbmVse2Rpc3BsYXk6aW5saW5lLWZsZXg7ZmxleC1kaXJlY3Rpb246cm93fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6aG92ZXJ7YmFja2dyb3VuZDojZjVmNWY1fXRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6YWN0aXZle2JhY2tncm91bmQ6I2VmZWZlZn0uZXhhbXBsZS1lbGVtZW50LXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9LmV4YW1wbGUtZWxlbWVudC1kZXRhaWx7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6ZmxleH0uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW17bWluLXdpZHRoOjgwcHg7Ym9yZGVyOjJweCBzb2xpZCAjMDAwO3BhZGRpbmc6OHB4O2ZvbnQtd2VpZ2h0OmxpZ2h0ZXI7bWFyZ2luOjhweCAwO2hlaWdodDoxMDRweH0uZXhhbXBsZS1lbGVtZW50LXN5bWJvbHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjQwcHg7bGluZS1oZWlnaHQ6bm9ybWFsfS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb257cGFkZGluZzoxNnB4fS5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb257b3BhY2l0eTouNX0uZXhhbXBsZS1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0uZXhhbXBsZS1sb2FkaW5nLXNoYWRle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3R0b206NTZweDtyaWdodDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTUpO3otaW5kZXg6MTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmV4YW1wbGUtcmF0ZS1saW1pdC1yZWFjaGVke2NvbG9yOiM5ODAwMDA7bWF4LXdpZHRoOjM2MHB4O3RleHQtYWxpZ246Y2VudGVyfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGV0YWlsRXhwYW5kJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdjb2xsYXBzZWQnLFxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnLCBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdleHBhbmRlZCA8PT4gY29sbGFwc2VkJyxcbiAgICAgICAgYW5pbWF0ZSgnMjI1bXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpJylcbiAgICAgIClcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbXNHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpXG4gIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U29ydClcbiAgc29ydDogTWF0U29ydDtcblxuICBASW5wdXQoKVxuICBzb3J0YWJsZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBkYXRhUHJvdmlkZXI6IEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbklkczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgY29sdW1uTmFtZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtblBpcGVzOiBQaXBlVHJhbnNmb3JtW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uczogRnVuY3Rpb25bXTtcblxuICBASW5wdXQoKVxuICBkaXNwbGF5RGV0YWlscyA9IGZhbHNlO1xuXG4gIHJlc3VsdHNMZW5ndGggPSAwO1xuICBpc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgaXNSYXRlTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gIGV4cGFuZGVkRWxlbWVudDogYW55O1xuICBkYXRhOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldEZpZWxkID0gKHNvdXJjZSwgZmllbGRQYXRoOiBzdHJpbmcpID0+IGxvZC5nZXQoc291cmNlLCBmaWVsZFBhdGgsICcnKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25zICYmIHRoaXMuYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNvbHVtbklkcy5wdXNoKCdidXR0b25zJyk7XG4gICAgfVxuICAgIC8vIElmIHRoZSB1c2VyIGNoYW5nZXMgdGhlIHNvcnQgb3JkZXIsIHJlc2V0IGJhY2sgdG8gdGhlIGZpcnN0IHBhZ2UuXG4gICAgdGhpcy5zb3J0LnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+ICh0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXggPSAwKSk7XG5cbiAgICBtZXJnZSh0aGlzLnNvcnQuc29ydENoYW5nZSwgdGhpcy5wYWdpbmF0b3IucGFnZSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIDxPYnNlcnZhYmxlPGFueT4+KFxuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIoXG4gICAgICAgICAgICAgIHRoaXMuc29ydC5hY3RpdmUsXG4gICAgICAgICAgICAgIHRoaXMuc29ydC5kaXJlY3Rpb24sXG4gICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCxcbiAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3IucGFnZVNpemVcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKGRhdGEgPT4ge1xuICAgICAgICAgIC8vIEZsaXAgZmxhZyB0byBzaG93IHRoYXQgbG9hZGluZyBoYXMgZmluaXNoZWQuXG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5pc1JhdGVMaW1pdFJlYWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlc3VsdHNMZW5ndGggPSBkYXRhLnRvdGFsX2NvdW50O1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHJldHVybiBkYXRhLml0ZW1zO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgICAgICAgLy8gQ2F0Y2ggaWYgdGhlIEdpdEh1YiBBUEkgaGFzIHJlYWNoZWQgaXRzIHJhdGUgbGltaXQuIFJldHVybiBlbXB0eSBkYXRhLlxuICAgICAgICAgIHRoaXMuaXNSYXRlTGltaXRSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKFtdKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiAodGhpcy5kYXRhID0gZGF0YSkpO1xuICB9XG5cbiAgcmVtb3ZlRWxlbWVudCA9IGVsZW1lbnRUb0RlbGV0ZSA9PiB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihlbGVtID0+IGVsZW0gIT09IGVsZW1lbnRUb0RlbGV0ZSk7XG4gIH1cblxuICB0b2dnbGVFeHBhbmQgPSBjbGlja2VkRWxlbWVudCA9PlxuICAgICh0aGlzLmV4cGFuZGVkRWxlbWVudCA9XG4gICAgICAhdGhpcy5leHBhbmRlZEVsZW1lbnQgfHwgdGhpcy5leHBhbmRlZEVsZW1lbnQgIT09IGNsaWNrZWRFbGVtZW50XG4gICAgICAgID8gY2xpY2tlZEVsZW1lbnRcbiAgICAgICAgOiBudWxsKVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ3V0aWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdnZW5lcmFsJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW5lcmFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KGFyZ3MpKSB7XG4gICAgICBhcmdzLmZvckVhY2gocGlwZSA9PiB7XG4gICAgICAgIHZhbHVlID0gKDxQaXBlVHJhbnNmb3JtPnBpcGUpLnRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSAoPFBpcGVUcmFuc2Zvcm0+YXJncykudHJhbnNmb3JtKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24ge1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBpY29uOiBzdHJpbmc7XHJcbiAgYW5pbWF0aW9uPzogc3RyaW5nO1xyXG4gIGFsdGVybmF0ZUljb24/OiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0ZXh0OiBzdHJpbmcsXHJcbiAgICBpY29uOiBzdHJpbmcsXHJcbiAgICBhbHRlcm5hdGVJY29uPzogc3RyaW5nLFxyXG4gICAgYW5pbWF0aW9uPzogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgdGhpcy5pY29uID0gaWNvbjtcclxuICAgIHRoaXMuYWx0ZXJuYXRlSWNvbiA9IGFsdGVybmF0ZUljb24gPyBhbHRlcm5hdGVJY29uIDogbnVsbDtcclxuICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgbWF0VG9vbHRpcD1cIkluZm8gYWJvdXQgdGhlIGFjdGlvblwiIGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiIChjbGljayk9XCJjb25jcmV0ZUJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50LCRldmVudClcIj5cbiAgPGZhIFtuYW1lXT1cImJ1dHRvbkRlZi5pY29uXCIgW2FuaW1hdGlvbl09XCJidXR0b25EZWYuYW5pbWF0aW9uXCI+PC9mYT5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5idXR0b24tY29udGFpbmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiM1NDU0Yzc7bWFyZ2luOjRweDtsaW5lLWhlaWdodDoxMDAlO2ZsZXg6MX0uYnV0dG9uLWNvbnRhaW5lcjpob3Zlcntjb2xvcjpvcmFuZ2V9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYnV0dG9uVHlwZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRhcmdldEVsZW1lbnQ7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uOiBGdW5jdGlvbjtcblxuICBidXR0b25EZWY6IEJ1dHRvbjtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuYnV0dG9uRGVmID0gYnV0dG9ucy5nZXQodGhpcy5idXR0b25UeXBlKTtcbiAgICB9XG4gIH1cblxuICBjb25jcmV0ZUJ1dHRvbkFjdGlvbiA9ICh0YXJnZXRFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuYnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQpO1xuICB9XG59XG5cbmNvbnN0IGJ1dHRvbnM6IE1hcDxzdHJpbmcsIEJ1dHRvbj4gPSBuZXcgTWFwKFtcbiAgWydlZGl0JywgbmV3IEJ1dHRvbignSXptZW5pJywgJ3BlbmNpbC1zcXVhcmUtbycpXSxcbiAgWydkZWxldGUnLCBuZXcgQnV0dG9uKCdPYnJpw4XCoWknLCAndHJhc2gtbycpXSxcbiAgWyd2aWV3JywgbmV3IEJ1dHRvbignRGV0YWxqaScsICdhZGRyZXNzLWNhcmQtbycpXSxcbiAgWydzYXZlJywgbmV3IEJ1dHRvbignU2HDhMKNdXZhaicsICdmbG9wcHktbycpXSxcbiAgWydhcHByb3ZlJywgbmV3IEJ1dHRvbignT2RvYnJpJywgJ2NoZWNrJyldLFxuICBbJ2RlbnknLCBuZXcgQnV0dG9uKCdPZGJpaicsICdiYW4nKV1cbl0pO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUaW1zR3JpZENvbXBvbmVudCB9IGZyb20gJy4vdGltcy1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7XG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0Q2FyZE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgR2VuZXJhbFBpcGUgfSBmcm9tICcuL2dlbmVyYWwucGlwZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZm9udC1hd2Vzb21lJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQW5ndWxhckZvbnRBd2Vzb21lTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RpbXNHcmlkQ29tcG9uZW50LCBHZW5lcmFsUGlwZSwgQnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbXNHcmlkQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zR3JpZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbXN5c3RlbXNMaWJDb21wb25lbnQgfSBmcm9tICcuL3RpbXN5c3RlbXMtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1zR3JpZE1vZHVsZSB9IGZyb20gJy4vdGltcy1ncmlkL3RpbXMtZ3JpZC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVGltc0dyaWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1zeXN0ZW1zTGliQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbXNHcmlkTW9kdWxlLCBUaW1zeXN0ZW1zTGliQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUaW1zeXN0ZW1zTGliTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsib2JzZXJ2YWJsZU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQVFFLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7NkJBRXBCLENBQ2QsSUFBWSxFQUNaLEtBQWEsRUFDYixJQUFZOztZQUVaLE1BQU0sSUFBSSxHQUFHLHNDQUFzQyxDQUFDOztZQUNwRCxNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksa0NBQWtDLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSTtnQkFDMUYsQ0FBQyxFQUFFLENBQUM7WUFFTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFZLFVBQVUsQ0FBQyxDQUFDO1NBQzdDO0tBWnVDOzs7WUFKekMsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBSlEsVUFBVTs7Ozs7Ozs7QUNGbkI7SUFhRSxpQkFBaUI7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