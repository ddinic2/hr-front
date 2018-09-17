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
    ['save', new Button('Sačuvaj', 'floppy-o')]
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBVS9CLE1BQU07SUFXSjtvQ0FRdUIsQ0FBQyxhQUFhLEVBQUUsS0FBaUIsRUFBRSxFQUFFO1lBQzFELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xDO0tBWGU7Ozs7SUFFaEIsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0M7S0FDRjs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Q0FHWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyx5SEFBeUgsQ0FBQzthQUNwSTs7Ozs7eUJBRUUsS0FBSzs0QkFHTCxLQUFLOzJCQUdMLEtBQUs7Ozs7Ozs7Ozs7Ozs7OztBQWtCUixNQUFNLE9BQU8sR0FBd0IsSUFBSSxHQUFHLENBQUM7SUFDM0MsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDakQsQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pELENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM1QyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgbWF0VG9vbHRpcD1cIkluZm8gYWJvdXQgdGhlIGFjdGlvblwiIGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiIChjbGljayk9XCJjb25jcmV0ZUJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50LCRldmVudClcIj5cbiAgPGZhIFtuYW1lXT1cImJ1dHRvbkRlZi5pY29uXCIgW2FuaW1hdGlvbl09XCJidXR0b25EZWYuYW5pbWF0aW9uXCI+PC9mYT5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5idXR0b24tY29udGFpbmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiM1NDU0Yzc7bWFyZ2luOjRweDtsaW5lLWhlaWdodDoxMDAlO2ZsZXg6MX0uYnV0dG9uLWNvbnRhaW5lcjpob3Zlcntjb2xvcjpvcmFuZ2V9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYnV0dG9uVHlwZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRhcmdldEVsZW1lbnQ7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uOiBGdW5jdGlvbjtcblxuICBidXR0b25EZWY6IEJ1dHRvbjtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuYnV0dG9uRGVmID0gYnV0dG9ucy5nZXQodGhpcy5idXR0b25UeXBlKTtcbiAgICB9XG4gIH1cblxuICBjb25jcmV0ZUJ1dHRvbkFjdGlvbiA9ICh0YXJnZXRFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuYnV0dG9uQWN0aW9uKHRhcmdldEVsZW1lbnQpO1xuICB9XG59XG5cbmNvbnN0IGJ1dHRvbnM6IE1hcDxzdHJpbmcsIEJ1dHRvbj4gPSBuZXcgTWFwKFtcbiAgWydlZGl0JywgbmV3IEJ1dHRvbignSXptZW5pJywgJ3BlbmNpbC1zcXVhcmUtbycpXSxcbiAgWydkZWxldGUnLCBuZXcgQnV0dG9uKCdPYnJpxaFpJywgJ3RyYXNoLW8nKV0sXG4gIFsndmlldycsIG5ldyBCdXR0b24oJ0RldGFsamknLCAnYWRkcmVzcy1jYXJkLW8nKV0sXG4gIFsnc2F2ZScsIG5ldyBCdXR0b24oJ1NhxI11dmFqJywgJ2Zsb3BweS1vJyldXG5dKTtcbiJdfQ==