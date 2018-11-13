/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { GridConfigService } from './button-config';
import * as i0 from "@angular/core";
import * as i1 from "./button-config";
export class GridService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        console.log('GridConfigService', config);
        if (this.config.buttons) {
            this.buttons = this.config.buttons;
        }
    }
}
GridService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
/** @nocollapse */
GridService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [GridConfigService,] }] }
];
/** @nocollapse */ GridService.ngInjectableDef = i0.defineInjectable({ factory: function GridService_Factory() { return new GridService(i0.inject(i1.GridConfigService)); }, token: GridService, providedIn: "root" });
if (false) {
    /** @type {?} */
    GridService.prototype.buttons;
    /** @type {?} */
    GridService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGltc3lzdGVtcy1saWIvIiwic291cmNlcyI6WyJsaWIvdGltcy1ncmlkL2dyaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUtwRCxNQUFNOzs7O0lBRUosWUFBK0MsTUFBTTtRQUFOLFdBQU0sR0FBTixNQUFNLENBQUE7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNwQztLQUNGOzs7WUFWRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7NENBR2MsTUFBTSxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2J1dHRvbi1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR3JpZFNlcnZpY2Uge1xuICBidXR0b25zO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEdyaWRDb25maWdTZXJ2aWNlKSBwcml2YXRlIGNvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCdHcmlkQ29uZmlnU2VydmljZScsIGNvbmZpZyk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmJ1dHRvbnMpIHtcbiAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuY29uZmlnLmJ1dHRvbnM7XG4gICAgfVxuICB9XG59XG4iXX0=