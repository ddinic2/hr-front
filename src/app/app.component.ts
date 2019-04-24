import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from './shared/shared/login.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser, NavItem } from './models/current-user';
import { LogInService } from './pages/log-in/log-in.service';
import { NavService } from './pages/nav.service';
import { VERSION } from '@angular/material';

@Component({
  selector: 'hr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'HR-Timsystems';
  userRole: number;
  currentUser: any;
  logged: any;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

// odavde
@ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Pocetna',
      iconName: 'home',
      route: 'home'
    },
    {
      displayName: 'Podaci o zaposlenom',
      iconName: 'person',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Pretraga',
          iconName: '',
          route: 'devfestfl/sessions/material-design'
        },
        {
          displayName: 'Novi zaposleni',
          iconName: '',
          route: 'motiv8'
        },
        // {
        //   displayName: 'Napredna pretraga',
        //   iconName: '',
        //   route: 'devfestfl/sessions/what-up-web'
        // },
        // {
        //   displayName: 'Moj profil',
        //   iconName: '',
        //   route: 'devfestfl/sessions/my-ally-cli'
        // },
        // {
        //   displayName: 'Speakers',
        //   iconName: '',
        //   route: 'devfestfl/speakers',
        //   children: [
        //     {
        //       displayName: 'Michael Prentice',
        //       iconName: '',
        //       route: 'devfestfl/speakers/michael-prentice',
        //       children: [
        //         {
        //           displayName: 'Create Enterprise UIs',
        //           iconName: '',
        //           route: 'devfestfl/speakers/michael-prentice/material-design'
        //         }
        //       ]
        //     },
        //     {
        //       displayName: 'Stephen Fluin',
        //       iconName: '',
        //       route: 'devfestfl/speakers/stephen-fluin',
        //       children: [
        //         {
        //           displayName: 'What\'s up with the Web?',
        //           iconName: '',
        //           route: 'devfestfl/speakers/stephen-fluin/what-up-web'
        //         }
        //       ]
        //     },
        //     {
        //       displayName: 'Mike Brocchi',
        //       iconName: '',
        //       route: 'devfestfl/speakers/mike-brocchi',
        //       children: [
        //         {
        //           displayName: 'My ally, the CLI',
        //           iconName: '',
        //           route: 'devfestfl/speakers/mike-brocchi/my-ally-cli'
        //         },
        //         {
        //           displayName: 'Become an Angular Tailor',
        //           iconName: '',
        //           route: 'devfestfl/speakers/mike-brocchi/become-angular-tailer'
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   displayName: 'Sessions',
        //   iconName: '',
        //   route: 'devfestfl/sessions',
        //   children: [
        //     {
        //       displayName: 'Create Enterprise UIs',
        //       iconName: '',
        //       route: 'devfestfl/sessions/material-design'
        //     },
        //     {
        //       displayName: 'What\'s up with the Web?',
        //       iconName: '',
        //       route: 'devfestfl/sessions/what-up-web'
        //     },
        //     {
        //       displayName: 'My ally, the CLI',
        //       iconName: '',
        //       route: 'devfestfl/sessions/my-ally-cli'
        //     },
        //     {
        //       displayName: 'Become an Angular Tailor',
        //       iconName: '',
        //       route: 'devfestfl/sessions/become-angular-tailer'
        //     }
        //   ]
        // },
        // {
        //   displayName: 'Feedback',
        //   iconName: '',
        //   route: 'devfestfl/feedback'
        // }
      ]
    },
    {
      displayName: 'Odsustvo',
      iconName: 'transfer_within_a_station',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Lista odsustva',
          iconName: '',
          route: 'lista-odsustava'
        },
        {
          displayName: 'Novo odsustvo',
          iconName: '',
          route: 'odsustvo'
        },
      ]
    },
    {
      displayName: 'Motiv8',
      iconName: 'star_half',
      route: 'motiv8'
    },
    {
      displayName: 'Multi-upload file component',
      iconName: 'star_half',
      route: 'multi-upload-file'
    },
    // {
    //   displayName: 'Disney',
    //   iconName: '',
    //   children: [
    //     {
    //       displayName: 'Speakers',
    //       iconName: '',
    //       children: [
    //         {
    //           displayName: 'Michael Prentice',
    //           iconName: '',
    //           route: 'michael-prentice',
    //           children: [
    //             {
    //               displayName: 'Create Enterprise UIs',
    //               iconName: '',
    //               route: 'material-design'
    //             }
    //           ]
    //         },
    //         {
    //           displayName: 'Stephen Fluin',
    //           iconName: '',
    //           route: 'stephen-fluin',
    //           children: [
    //             {
    //               displayName: 'What\'s up with the Web?',
    //               iconName: '',
    //               route: 'what-up-web'
    //             }
    //           ]
    //         },
    //         {
    //           displayName: 'Mike Brocchi',
    //           iconName: '',
    //           route: 'mike-brocchi',
    //           children: [
    //             {
    //               displayName: 'My ally, the CLI',
    //               iconName: '',
    //               route: 'my-ally-cli'
    //             },
    //             {
    //               displayName: 'Become an Angular Tailor',
    //               iconName: '',
    //               route: 'become-angular-tailer'
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       displayName: 'Sessions',
    //       iconName: '',
    //       children: [
    //         {
    //           displayName: 'Create Enterprise UIs',
    //           iconName: '',
    //           route: 'material-design'
    //         },
    //         {
    //           displayName: 'What\'s up with the Web?',
    //           iconName: '',
    //           route: 'what-up-web'
    //         },
    //         {
    //           displayName: 'My ally, the CLI',
    //           iconName: '',
    //           route: 'my-ally-cli'
    //         },
    //         {
    //           displayName: 'Become an Angular Tailor',
    //           iconName: '',
    //           route: 'become-angular-tailer'
    //         }
    //       ]
    //     },
    //     {
    //       displayName: 'Feedback',
    //       iconName: '',
    //       route: 'feedback'
    //     }
    //   ]
    // },
    // {
    //   displayName: 'Orlando',
    //   iconName: '',
    //   children: [
    //     {
    //       displayName: 'Speakers',
    //       iconName: '',
    //       children: [
    //         {
    //           displayName: 'Michael Prentice',
    //           iconName: '',
    //           route: 'michael-prentice',
    //           children: [
    //             {
    //               displayName: 'Create Enterprise UIs',
    //               iconName: '',
    //               route: 'material-design'
    //             }
    //           ]
    //         },
    //         {
    //           displayName: 'Stephen Fluin',
    //           iconName: '',
    //           route: 'stephen-fluin',
    //           children: [
    //             {
    //               displayName: 'What\'s up with the Web?',
    //               iconName: '',
    //               route: 'what-up-web'
    //             }
    //           ]
    //         },
    //         {
    //           displayName: 'Mike Brocchi',
    //           iconName: '',
    //           route: 'mike-brocchi',
    //           children: [
    //             {
    //               displayName: 'My ally, the CLI',
    //               iconName: '',
    //               route: 'my-ally-cli'
    //             },
    //             {
    //               displayName: 'Become an Angular Tailor',
    //               iconName: '',
    //               route: 'become-angular-tailer'
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       displayName: 'Sessions',
    //       iconName: '',
    //       children: [
    //         {
    //           displayName: 'Create Enterprise UIs',
    //           iconName: '',
    //           route: 'material-design'
    //         },
    //         {
    //           displayName: 'What\'s up with the Web?',
    //           iconName: '',
    //           route: 'what-up-web'
    //         },
    //         {
    //           displayName: 'My ally, the CLI',
    //           iconName: '',
    //           route: 'my-ally-cli'
    //         },
    //         {
    //           displayName: 'Become an Angular Tailor',
    //           iconName: '',
    //           route: 'become-angular-tailer'
    //         }
    //       ]
    //     },
    //     {
    //       displayName: 'Feedback',
    //       iconName: '',
    //       route: 'feedback'
    //     }
    //   ]
    // },
    // {
    //   displayName: 'Maleficent',
    //   disabled: true,
    //   iconName: '',
    //   children: [
    //     {
    //       displayName: 'Speakers',
    //       iconName: '',
    //       children: [
    //         {
    //           displayName: 'Michael Prentice',
    //           iconName: '',
    //           route: 'michael-prentice',
    //           children: [
    //             {
    //               displayName: 'Create Enterprise UIs',
    //               iconName: '',
    //               route: 'material-design'
    //             }
    //           ]
    //         },
    //         {
    //           displayName: 'Stephen Fluin',
    //           iconName: '',
    //           route: 'stephen-fluin',
    //           children: [
    //             {
    //               displayName: 'What\'s up with the Web?',
    //               iconName: '',
    //               route: 'what-up-web'
    //             }
    //           ]
    //         },
    //         {
    //           displayName: 'Mike Brocchi',
    //           iconName: '',
    //           route: 'mike-brocchi',
    //           children: [
    //             {
    //               displayName: 'My ally, the CLI',
    //               iconName: '',
    //               route: 'my-ally-cli'
    //             },
    //             {
    //               displayName: 'Become an Angular Tailor',
    //               iconName: '',
    //               route: 'become-angular-tailer'
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       displayName: 'Sessions',
    //       iconName: '',
    //       children: [
    //         {
    //           displayName: 'Create Enterprise UIs',
    //           iconName: '',
    //           route: 'material-design'
    //         },
    //         {
    //           displayName: 'What\'s up with the Web?',
    //           iconName: '',
    //           route: 'what-up-web'
    //         },
    //         {
    //           displayName: 'My ally, the CLI',
    //           iconName: '',
    //           route: 'my-ally-cli'
    //         },
    //         {
    //           displayName: 'Become an Angular Tailor',
    //           iconName: '',
    //           route: 'become-angular-tailer'
    //         }
    //       ]
    //     },
    //     {
    //       displayName: 'Feedback',
    //       iconName: '',
    //       route: 'feedback'
    //     }
    //   ]
    // }
    {
      displayName: 'Task-manager',
      iconName: 'settings',
      route: 'task-manager'
    },
  ];
// kraj navigacije


  constructor(private login: LoginService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private logInService: LogInService,
    private navService: NavService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnInit() {
    this.logged = false;
    this.logInService.currentSharedUser.subscribe(message => {
      if (message) {
        this.logged = true;
        this.currentUser = message;
      }
    });     // console.log('poruka prosledjena u app-component', message)
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy(): void {
      // this.mobileQuery.removeListener(this._mobileQueryListener);
    }

  }


