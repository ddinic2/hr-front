import { ButtonDefinition } from './button';
import { InjectionToken } from '@angular/core';
export interface GridConfig {
    buttons: ButtonDefinition[];
}
export declare const GridConfigService: InjectionToken<GridConfig>;
