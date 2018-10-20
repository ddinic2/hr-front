/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import Button from '../button';
var ButtonComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'tims-button',
                    template: "<div matTooltip=\"Info about the action\" class=\"button-container\" (click)=\"concreteButtonAction(targetElement,$event)\">\n  <fa [name]=\"buttonDef.icon\" [animation]=\"buttonDef.animation\"></fa>\n</div>\n",
                    styles: [".button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}"]
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return []; };
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
}
/** @type {?} */
var buttons = new Map([
    ['edit', new Button('Izmeni', 'pencil-square-o')],
    ['delete', new Button('Obriši', 'trash-o')],
    ['view', new Button('Detalji', 'address-card-o')],
    ['save', new Button('Sačuvaj', 'floppy-o')],
    ['approve', new Button('Odobri', 'check')],
    ['deny', new Button('Odbij', 'ban')]
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFDOztJQXFCN0I7UUFBQSxpQkFBZ0I7b0NBUU8sVUFBQyxhQUFhLEVBQUUsS0FBaUI7WUFDdEQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEM7S0FYZTs7OztJQUVoQixrQ0FBUTs7O0lBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7O2dCQXpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxtTkFHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx5SEFBeUgsQ0FBQztpQkFDcEk7Ozs7OzZCQUVFLEtBQUs7Z0NBR0wsS0FBSzsrQkFHTCxLQUFLOzswQkFsQlI7O1NBV2EsZUFBZTs7Ozs7Ozs7Ozs7Ozs7QUF5QjVCLElBQU0sT0FBTyxHQUF3QixJQUFJLEdBQUcsQ0FBQztJQUMzQyxDQUFDLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxDQUFDLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDakQsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsU0FBUyxFQUFFLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDckMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbXMtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IG1hdFRvb2x0aXA9XCJJbmZvIGFib3V0IHRoZSBhY3Rpb25cIiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIiAoY2xpY2spPVwiY29uY3JldGVCdXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCwkZXZlbnQpXCI+XG4gIDxmYSBbbmFtZV09XCJidXR0b25EZWYuaWNvblwiIFthbmltYXRpb25dPVwiYnV0dG9uRGVmLmFuaW1hdGlvblwiPjwvZmE+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuYnV0dG9uLWNvbnRhaW5lcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojNTQ1NGM3O21hcmdpbjo0cHg7bGluZS1oZWlnaHQ6MTAwJTtmbGV4OjF9LmJ1dHRvbi1jb250YWluZXI6aG92ZXJ7Y29sb3I6b3JhbmdlfWBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvblR5cGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0YXJnZXRFbGVtZW50O1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbkFjdGlvbjogRnVuY3Rpb247XG5cbiAgYnV0dG9uRGVmOiBCdXR0b247XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5idXR0b25UeXBlKSB7XG4gICAgICB0aGlzLmJ1dHRvbkRlZiA9IGJ1dHRvbnMuZ2V0KHRoaXMuYnV0dG9uVHlwZSk7XG4gICAgfVxuICB9XG5cbiAgY29uY3JldGVCdXR0b25BY3Rpb24gPSAodGFyZ2V0RWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50KTtcbiAgfVxufVxuXG5jb25zdCBidXR0b25zOiBNYXA8c3RyaW5nLCBCdXR0b24+ID0gbmV3IE1hcChbXG4gIFsnZWRpdCcsIG5ldyBCdXR0b24oJ0l6bWVuaScsICdwZW5jaWwtc3F1YXJlLW8nKV0sXG4gIFsnZGVsZXRlJywgbmV3IEJ1dHRvbignT2JyacWhaScsICd0cmFzaC1vJyldLFxuICBbJ3ZpZXcnLCBuZXcgQnV0dG9uKCdEZXRhbGppJywgJ2FkZHJlc3MtY2FyZC1vJyldLFxuICBbJ3NhdmUnLCBuZXcgQnV0dG9uKCdTYcSNdXZhaicsICdmbG9wcHktbycpXSxcbiAgWydhcHByb3ZlJywgbmV3IEJ1dHRvbignT2RvYnJpJywgJ2NoZWNrJyldLFxuICBbJ2RlbnknLCBuZXcgQnV0dG9uKCdPZGJpaicsICdiYW4nKV1cbl0pO1xuIl19