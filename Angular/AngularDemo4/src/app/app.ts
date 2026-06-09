import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalsDemo } from './signals-demo/signals-demo';
import { ChangeDetectionDemo } from "./change-detection-demo/change-detection-demo";
import { RouterLink } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [SignalsDemo, ChangeDetectionDemo, RouterOutlet, RouterLink, Home, About, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularDemo4');
}
