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
        var _this = this;
        if (this.buttonType) {
            this.buttonDef = this.gridServ.buttons.find(function (item) { return item.name === _this.buttonType; });
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tims-button',
                    template: "<div  class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [matTooltip]=\"buttonDef.button.text\" [name]=\"buttonDef.button.icon\" [animation]=\"buttonDef.button.animation\"></fa>\n</div>\n",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQXNCNUMseUJBQW9CLFFBQXFCO1FBQXpDLGlCQUE2QztRQUF6QixhQUFRLEdBQVIsUUFBUSxDQUFhO29DQVFsQixVQUFDLGFBQWEsRUFBRSxLQUFpQjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7S0FiNEM7Ozs7SUFFN0Msa0NBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSSxDQUFDLFVBQVUsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1NBQ3BGO0tBQ0Y7O2dCQTFCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxvT0FHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx5SEFBeUgsQ0FBQztpQkFDcEk7Ozs7Z0JBVFEsV0FBVzs7OzZCQVdqQixLQUFLO2dDQUdMLEtBQUs7K0JBR0wsS0FBSzs7MEJBbkJSOztTQVlhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbkRlZmluaXRpb24gfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuLi9ncmlkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGRpdiAgY2xhc3M9XCJidXR0b24tY29udGFpbmVyXCIgKGNsaWNrKT1cImNvbmNyZXRlQnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQsJGV2ZW50KVwiPlxuICA8ZmEgW21hdFRvb2x0aXBdPVwiYnV0dG9uRGVmLmJ1dHRvbi50ZXh0XCIgW25hbWVdPVwiYnV0dG9uRGVmLmJ1dHRvbi5pY29uXCIgW2FuaW1hdGlvbl09XCJidXR0b25EZWYuYnV0dG9uLmFuaW1hdGlvblwiPjwvZmE+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuYnV0dG9uLWNvbnRhaW5lcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojNTQ1NGM3O21hcmdpbjo0cHg7bGluZS1oZWlnaHQ6MTAwJTtmbGV4OjF9LmJ1dHRvbi1jb250YWluZXI6aG92ZXJ7Y29sb3I6b3JhbmdlfWBdLFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBidXR0b25UeXBlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdGFyZ2V0RWxlbWVudDtcblxuICBASW5wdXQoKVxuICBidXR0b25BY3Rpb246IEZ1bmN0aW9uO1xuXG4gIGJ1dHRvbkRlZjogQnV0dG9uRGVmaW5pdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWRTZXJ2OiBHcmlkU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25UeXBlKSB7XG4gICAgICB0aGlzLmJ1dHRvbkRlZiA9IHRoaXMuZ3JpZFNlcnYuYnV0dG9ucy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSB0aGlzLmJ1dHRvblR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmNyZXRlQnV0dG9uQWN0aW9uID0gKHRhcmdldEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMuYnV0dG9uQWN0aW9uKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuYnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==