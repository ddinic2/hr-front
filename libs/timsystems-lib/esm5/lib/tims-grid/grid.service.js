/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { GridConfigService } from './button-config';
import * as i0 from "@angular/core";
import * as i1 from "./button-config";
var GridService = /** @class */ (function () {
    function GridService(config) {
        this.config = config;
        console.log('GridConfigService', config);
        if (this.config.buttons) {
            this.buttons = this.config.buttons;
        }
    }
    GridService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    /** @nocollapse */
    GridService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [GridConfigService,] }] }
    ]; };
    /** @nocollapse */ GridService.ngInjectableDef = i0.defineInjectable({ factory: function GridService_Factory() { return new GridService(i0.inject(i1.GridConfigService)); }, token: GridService, providedIn: "root" });
    return GridService;
}());
export { GridService };
if (false) {
    /** @type {?} */
    GridService.prototype.buttons;
    /** @type {?} */
    GridService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGltc3lzdGVtcy1saWIvIiwic291cmNlcyI6WyJsaWIvdGltcy1ncmlkL2dyaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7SUFPbEQscUJBQStDLE1BQU07UUFBTixXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDcEM7S0FDRjs7Z0JBVkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnREFHYyxNQUFNLFNBQUMsaUJBQWlCOzs7c0JBUnZDOztTQU1hLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9idXR0b24tY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcbiAgYnV0dG9ucztcbiAgY29uc3RydWN0b3IoQEluamVjdChHcmlkQ29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWcpIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZENvbmZpZ1NlcnZpY2UnLCBjb25maWcpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5idXR0b25zKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmNvbmZpZy5idXR0b25zO1xuICAgIH1cbiAgfVxufVxuIl19