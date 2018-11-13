/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GridService } from '../grid.service';
var ButtonComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'tims-button',
                    template: "<div  class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [matTooltip]=\"buttonDef.text\" [name]=\"buttonDef.icon\" [animation]=\"buttonDef.animation\"></fa>\n</div>\n",
                    styles: [".button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}"],
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: GridService }
    ]; };
    ButtonComponent.propDecorators = {
        buttonType: [{ type: Input }],
        targetElement: [{ type: Input }],
        buttonAction: [{ type: Input }]
    };
    return ButtonComponent;
}());
export { ButtonComponent };
if (false) {
    /** @type {?} */
    ButtonComponent.prototype.buttonType;
    /** @type {?} */
    ButtonComponent.prototype.targetElement;
    /** @type {?} */
    ButtonComponent.prototype.buttonAction;
    /** @type {?} */
    ButtonComponent.prototype.buttonDef;
    /** @type {?} */
    ButtonComponent.prototype.concreteButtonAction;
    /** @type {?} */
    ButtonComponent.prototype.gridServ;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQXNCNUMseUJBQW9CLFFBQXFCO1FBQXpDLGlCQUE2QztRQUF6QixhQUFRLEdBQVIsUUFBUSxDQUFhO29DQVFsQixVQUFDLGFBQWEsRUFBRSxLQUFpQjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7S0FiNEM7Ozs7SUFFN0Msa0NBQVE7OztJQUFSO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO0tBQ0Y7O2dCQTFCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwrTUFHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx5SEFBeUgsQ0FBQztpQkFDcEk7Ozs7Z0JBVFEsV0FBVzs7OzZCQVdqQixLQUFLO2dDQUdMLEtBQUs7K0JBR0wsS0FBSzs7MEJBbkJSOztTQVlhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2J1dHRvbic7XG5pbXBvcnQgeyBHcmlkU2VydmljZSB9IGZyb20gJy4uL2dyaWQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIiAoY2xpY2spPVwiY29uY3JldGVCdXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCwkZXZlbnQpXCI+XG4gIDxmYSBbbWF0VG9vbHRpcF09XCJidXR0b25EZWYudGV4dFwiIFtuYW1lXT1cImJ1dHRvbkRlZi5pY29uXCIgW2FuaW1hdGlvbl09XCJidXR0b25EZWYuYW5pbWF0aW9uXCI+PC9mYT5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5idXR0b24tY29udGFpbmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiM1NDU0Yzc7bWFyZ2luOjRweDtsaW5lLWhlaWdodDoxMDAlO2ZsZXg6MX0uYnV0dG9uLWNvbnRhaW5lcjpob3Zlcntjb2xvcjpvcmFuZ2V9YF0sXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvblR5cGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0YXJnZXRFbGVtZW50O1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbjogRnVuY3Rpb247XG5cbiAgYnV0dG9uRGVmOiBCdXR0b247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkU2VydjogR3JpZFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5idXR0b25EZWYgPSB0aGlzLmdyaWRTZXJ2LmJ1dHRvbnMuZ2V0KHRoaXMuYnV0dG9uVHlwZSk7XG4gICAgfVxuICB9XG5cbiAgY29uY3JldGVCdXR0b25BY3Rpb24gPSAodGFyZ2V0RWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5idXR0b25BY3Rpb24pIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5idXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuIl19