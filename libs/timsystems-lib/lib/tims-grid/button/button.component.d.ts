import { OnInit } from '@angular/core';
import Button from '../button';
export declare class ButtonComponent implements OnInit {
    buttonType: string;
    targetElement: any;
    buttonAction: Function;
    buttonDef: Button;
    constructor();
    ngOnInit(): void;
    concreteButtonAction: (targetElement: any, event: MouseEvent) => void;
}
