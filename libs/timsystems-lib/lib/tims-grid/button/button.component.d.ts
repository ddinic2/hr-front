import { OnInit } from '@angular/core';
import { Button } from '../button';
import { GridService } from '../grid.service';
export declare class ButtonComponent implements OnInit {
    private gridServ;
    buttonType: string;
    targetElement: any;
    buttonAction: Function;
    buttonDef: Button;
    constructor(gridServ: GridService);
    ngOnInit(): void;
    concreteButtonAction: (targetElement: any, event: MouseEvent) => void;
}
