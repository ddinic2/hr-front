import { Button } from './button';
import { InjectionToken } from '@angular/core';
export interface GridConfig {
    buttons: Map<string, Button>;
}
export declare const GridConfigService: InjectionToken<GridConfig>;
