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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGltc3lzdGVtcy1saWIvIiwic291cmNlcyI6WyJsaWIvdGltcy1ncmlkL2dyaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFjLE1BQU0saUJBQWlCLENBQUM7OztBQU1oRSxNQUFNOzs7O0lBRUosWUFBK0MsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUMvRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNwQztLQUNGOzs7WUFURixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7NENBR2MsTUFBTSxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JpZENvbmZpZ1NlcnZpY2UsIEdyaWRDb25maWcgfSBmcm9tICcuL2J1dHRvbi1jb25maWcnO1xuaW1wb3J0IHsgQnV0dG9uRGVmaW5pdGlvbiB9IGZyb20gJy4vYnV0dG9uJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcbiAgYnV0dG9uczogQnV0dG9uRGVmaW5pdGlvbltdO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEdyaWRDb25maWdTZXJ2aWNlKSBwcml2YXRlIGNvbmZpZzogR3JpZENvbmZpZykge1xuICAgIGlmICh0aGlzLmNvbmZpZy5idXR0b25zKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmNvbmZpZy5idXR0b25zO1xuICAgIH1cbiAgfVxufVxuIl19