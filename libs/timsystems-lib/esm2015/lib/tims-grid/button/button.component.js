/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GridService } from '../grid.service';
export class ButtonComponent {
    /**
     * @param {?} gridServ
     */
    constructor(gridServ) {
        this.gridServ = gridServ;
        this.concreteButtonAction = (targetElement, event) => {
            if (this.buttonAction) {
                event.stopPropagation();
                this.buttonAction(targetElement);
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.buttonType) {
            this.buttonDef = this.gridServ.buttons.find(item => item.name === this.buttonType);
        }
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'tims-button',
                template: `<div  class="button-container" (click)="concreteButtonAction(targetElement,$event)">
  <fa [matTooltip]="buttonDef.button.text" [name]="buttonDef.button.icon" [animation]="buttonDef.button.animation"></fa>
</div>
`,
                styles: [`.button-container{cursor:pointer;color:#5454c7;margin:4px;line-height:100%;flex:1}.button-container:hover{color:orange}`],
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: GridService }
];
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
    /** @type {?} */
    ButtonComponent.prototype.gridServ;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBVTlDLE1BQU07Ozs7SUFZSixZQUFvQixRQUFxQjtRQUFyQixhQUFRLEdBQVIsUUFBUSxDQUFhO29DQVFsQixDQUFDLGFBQWEsRUFBRSxLQUFpQixFQUFFLEVBQUU7WUFDMUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNsQztTQUNGO0tBYjRDOzs7O0lBRTdDLFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BGO0tBQ0Y7OztZQTFCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7O0NBR1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMseUhBQXlILENBQUM7YUFDcEk7Ozs7WUFUUSxXQUFXOzs7eUJBV2pCLEtBQUs7NEJBR0wsS0FBSzsyQkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXR0b25EZWZpbml0aW9uIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vZ3JpZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltcy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgIGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiIChjbGljayk9XCJjb25jcmV0ZUJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50LCRldmVudClcIj5cbiAgPGZhIFttYXRUb29sdGlwXT1cImJ1dHRvbkRlZi5idXR0b24udGV4dFwiIFtuYW1lXT1cImJ1dHRvbkRlZi5idXR0b24uaWNvblwiIFthbmltYXRpb25dPVwiYnV0dG9uRGVmLmJ1dHRvbi5hbmltYXRpb25cIj48L2ZhPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmJ1dHRvbi1jb250YWluZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzU0NTRjNzttYXJnaW46NHB4O2xpbmUtaGVpZ2h0OjEwMCU7ZmxleDoxfS5idXR0b24tY29udGFpbmVyOmhvdmVye2NvbG9yOm9yYW5nZX1gXSxcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYnV0dG9uVHlwZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRhcmdldEVsZW1lbnQ7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uQWN0aW9uOiBGdW5jdGlvbjtcblxuICBidXR0b25EZWY6IEJ1dHRvbkRlZmluaXRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkU2VydjogR3JpZFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5idXR0b25EZWYgPSB0aGlzLmdyaWRTZXJ2LmJ1dHRvbnMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gdGhpcy5idXR0b25UeXBlKTtcbiAgICB9XG4gIH1cblxuICBjb25jcmV0ZUJ1dHRvbkFjdGlvbiA9ICh0YXJnZXRFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aGlzLmJ1dHRvbkFjdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmJ1dHRvbkFjdGlvbih0YXJnZXRFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG4iXX0=