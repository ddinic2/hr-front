/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimsGridComponent } from './tims-grid.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule, MatTooltipModule, } from '@angular/material';
import { GeneralPipe } from './general.pipe';
import { ButtonComponent } from './button/button.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GridService } from './grid.service';
import { GridConfigService } from './button-config';
var TimsGridModule = /** @class */ (function () {
    function TimsGridModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    TimsGridModule.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: TimsGridModule,
            providers: [
                GridService,
                {
                    provide: GridConfigService,
                    useValue: config,
                },
            ],
        };
    };
    TimsGridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        AngularFontAwesomeModule,
                        CdkTableModule,
                        MatTableModule,
                        MatPaginatorModule,
                        BrowserAnimationsModule,
                        MatTooltipModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule,
                        MatCardModule,
                        MatProgressSpinnerModule,
                        MatMenuModule,
                        MatIconModule,
                        MatToolbarModule,
                        MatButtonModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatSelectModule,
                        MatSortModule,
                        MatTableModule,
                        FormsModule,
                        ReactiveFormsModule,
                    ],
                    declarations: [TimsGridComponent, GeneralPipe, ButtonComponent],
                    exports: [TimsGridComponent],
                    providers: [GridService],
                },] },
    ];
    return TimsGridModule;
}());
export { TimsGridModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltcy1ncmlkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RpbXN5c3RlbXMtbGliLyIsInNvdXJjZXMiOlsibGliL3RpbXMtZ3JpZC90aW1zLWdyaWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYix3QkFBd0IsRUFDeEIsZUFBZSxFQUNmLGFBQWEsRUFDYixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFFbEIsZ0JBQWdCLEdBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFjLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0lBMkN2RCx3QkFBUzs7OztJQUFoQixVQUFpQixNQUFrQjtRQUNqQyxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsV0FBVztnQkFDWDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7S0FDSDs7Z0JBMUNGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWix3QkFBd0I7d0JBQ3hCLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLHVCQUF1Qjt3QkFDdkIsZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLHdCQUF3Qjt3QkFDeEIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsV0FBVzt3QkFDWCxtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUM7b0JBQy9ELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUM1QixTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQ3pCOzt5QkFyRUQ7O1NBc0VhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRpbXNHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi90aW1zLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNvcnRNb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRUb29sYmFyTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0VG9vbHRpcCxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgR2VuZXJhbFBpcGUgfSBmcm9tICcuL2dlbmVyYWwucGlwZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZm9udC1hd2Vzb21lJztcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi9ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JpZENvbmZpZywgR3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2J1dHRvbi1jb25maWcnO1xuXG4vLyBleHBvcnQgY29uc3QgYnV0dG9uczogTWFwPHN0cmluZywgQnV0dG9uPiA9IG5ldyBNYXAoW1xuLy8gICBbJ2VkaXQnLCBuZXcgQnV0dG9uKCdJem1lbmknLCAncGVuY2lsLXNxdWFyZS1vJyldLFxuLy8gICBbJ2RlbGV0ZScsIG5ldyBCdXR0b24oJ09icmnFoWknLCAndHJhc2gtbycpXSxcbi8vICAgWyd2aWV3JywgbmV3IEJ1dHRvbignRGV0YWxqaScsICdhZGRyZXNzLWNhcmQtbycpXSxcbi8vICAgWydzYXZlJywgbmV3IEJ1dHRvbignU2HEjXV2YWonLCAnZmxvcHB5LW8nKV0sXG4vLyAgIFsnYXBwcm92ZScsIG5ldyBCdXR0b24oJ09kb2JyaScsICdjaGVjaycpXSxcbi8vICAgWydkZW55JywgbmV3IEJ1dHRvbignT2RiaWonLCAnYmFuJyldLFxuLy8gICBbJ2dlbmVyYXRlJywgbmV3IEJ1dHRvbignR2VuZXJpxaFpIGRva3VtZW50JywgJ2ZpbGUtdGV4dCcpXSxcbi8vIF0pO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFuZ3VsYXJGb250QXdlc29tZU1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1zR3JpZENvbXBvbmVudCwgR2VuZXJhbFBpcGUsIEJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1zR3JpZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0dyaWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVGltc0dyaWRNb2R1bGUge1xuICBzdGF0aWMgc2V0Q29uZmlnKGNvbmZpZzogR3JpZENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVGltc0dyaWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgR3JpZFNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBHcmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=