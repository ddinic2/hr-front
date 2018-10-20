/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import Button from '../button';
export class ButtonComponent {
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
const buttons = new Map([
    ['edit', new Button('Izmeni', 'pencil-square-o')],
    ['delete', new Button('Obriši', 'trash-o')],
    ['view', new Button('Detalji', 'address-card-o')],
    ['save', new Button('Sačuvaj', 'floppy-o')],
    ['approve', new Button('Odobri', 'check')],
    ['deny', new Button('Odbij', 'ban')]
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBVS9CLE1BQU07SUFXSjtvQ0FRdUIsQ0FBQyxhQUFhLEVBQUUsS0FBaUIsRUFBRSxFQUFFO1lBQzFELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xDO0tBWGU7Ozs7SUFFaEIsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0M7S0FDRjs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Q0FHWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyx5SEFBeUgsQ0FBQzthQUNwSTs7Ozs7eUJBRUUsS0FBSzs0QkFHTCxLQUFLOzJCQUdMLEtBQUs7Ozs7Ozs7Ozs7Ozs7OztBQWtCUixNQUFNLE9BQU8sR0FBd0IsSUFBSSxHQUFHLENBQUM7SUFDM0MsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDakQsQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pELENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDLFNBQVMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3JDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9idXR0b24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1zLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBtYXRUb29sdGlwPVwiSW5mbyBhYm91dCB0aGUgYWN0aW9uXCIgY2xhc3M9XCJidXR0b24tY29udGFpbmVyXCIgKGNsaWNrKT1cImNvbmNyZXRlQnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQsJGV2ZW50KVwiPlxuICA8ZmEgW25hbWVdPVwiYnV0dG9uRGVmLmljb25cIiBbYW5pbWF0aW9uXT1cImJ1dHRvbkRlZi5hbmltYXRpb25cIj48L2ZhPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmJ1dHRvbi1jb250YWluZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzU0NTRjNzttYXJnaW46NHB4O2xpbmUtaGVpZ2h0OjEwMCU7ZmxleDoxfS5idXR0b24tY29udGFpbmVyOmhvdmVye2NvbG9yOm9yYW5nZX1gXVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBidXR0b25UeXBlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdGFyZ2V0RWxlbWVudDtcblxuICBASW5wdXQoKVxuICBidXR0b25BY3Rpb246IEZ1bmN0aW9uO1xuXG4gIGJ1dHRvbkRlZjogQnV0dG9uO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5idXR0b25EZWYgPSBidXR0b25zLmdldCh0aGlzLmJ1dHRvblR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmNyZXRlQnV0dG9uQWN0aW9uID0gKHRhcmdldEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5idXR0b25BY3Rpb24odGFyZ2V0RWxlbWVudCk7XG4gIH1cbn1cblxuY29uc3QgYnV0dG9uczogTWFwPHN0cmluZywgQnV0dG9uPiA9IG5ldyBNYXAoW1xuICBbJ2VkaXQnLCBuZXcgQnV0dG9uKCdJem1lbmknLCAncGVuY2lsLXNxdWFyZS1vJyldLFxuICBbJ2RlbGV0ZScsIG5ldyBCdXR0b24oJ09icmnFoWknLCAndHJhc2gtbycpXSxcbiAgWyd2aWV3JywgbmV3IEJ1dHRvbignRGV0YWxqaScsICdhZGRyZXNzLWNhcmQtbycpXSxcbiAgWydzYXZlJywgbmV3IEJ1dHRvbignU2HEjXV2YWonLCAnZmxvcHB5LW8nKV0sXG4gIFsnYXBwcm92ZScsIG5ldyBCdXR0b24oJ09kb2JyaScsICdjaGVjaycpXSxcbiAgWydkZW55JywgbmV3IEJ1dHRvbignT2RiaWonLCAnYmFuJyldXG5dKTtcbiJdfQ==