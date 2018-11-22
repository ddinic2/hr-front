import { OnInit } from '@angular/core';
import { ButtonDefinition } from '../button';
import { GridService } from '../grid.service';
export declare class ButtonComponent implements OnInit {
    private gridServ;
    buttonType: string;
    targetElement: any;
    buttonAction: Function;
    buttonDef: ButtonDefinition;
    constructor(gridServ: GridService);
    ngOnInit(): void;
    concreteButtonAction: (targetElement: any, event: MouseEvent) => void;
}
