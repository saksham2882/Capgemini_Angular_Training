import { Routes } from '@angular/router';
import { App } from './app';
import { SignalsDemo } from './signals-demo/signals-demo';
import { ChangeDetectionDemo } from './change-detection-demo/change-detection-demo';
import { ChangeDetection2 } from './change-detection2/change-detection2';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
    // { path: '', redirectTo: 'app', pathMatch: 'full' },
    // { path: 'signals-demo', component: SignalsDemo },
    // { path: 'change-detection-demo', component: ChangeDetectionDemo },
    // { path: 'change-detection2', component: ChangeDetection2},
    // { path: 'home', component: Home},
    // { path: 'about', component: About},
    // { path: 'contact', component: Contact},


    // =========== Nested Route ============= //
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'change-detection2', component: ChangeDetection2},
    {
        path: 'signal-demo',
        component: SignalsDemo,
        children: [
            {
                path: 'CD1',
                component: ChangeDetectionDemo
            },
            {
                path: 'CD2',
                component: ChangeDetection2
            }, 
            {
                path: 'home',
                component: Home
            }
        ]
    }
];