import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChange, ViewChild, ViewEncapsulation, DoCheck, AfterContentInit } from '@angular/core';


// @component is a decorator function that specifies the Angular metadata for the component.
// from Angular 19 onwards, by default standalone is set to true, so we don't need to specify it explicitly.
@Component({
  selector: 'app-home',       // every component defines as CSS Selector, that determines how the component
                              // is used in a template. In this case, the selector is 'app-home', which means that this component can be used in a template as <app-home></app-home>.
                              // here app-home is type selector, which is based on HTML element name.

  // attribute selector is also possible, which is based on HTML attribute name. For example, if we want to use this component as an attribute selector, we can change the selector to '[app-home]'. In this case, we can use this component in a template as <div app-home></div>.
  // selector: '[app-home]',

  // class selector is also possible, which is based on HTML class name. For example, if we want to use this component as a class selector, we can change the selector to '.app-home'. In this case, we can use this component in a template as <div class="app-home"></div>.
  // selector: '.app-home',


  imports: [],                // imports array is used to import other components, directives, and pipes that are used in the template of this component. In this case, we don't have any imports, so we can leave it empty.

  // templateUrl is used to specify the path to the HTML template file for this component. In this case, the template file is home.html, which is located in the same directory as this TypeScript file.
  templateUrl: './home.html',

  // template: `<h1>Welcome to the Home Page</h1>
  // <p>This is the home page of our Angular application.</p>`, //we can also use inline template instead of templateUrl. In this case, we can specify the HTML template directly in the template property.

  // styleUrl: './home.css',

  styles: `
          h2 {
            color: blue;  
          }`,                // we can also use inline styles instead of styleUrl. In this case, we can specify the CSS styles directly in the style property.  

  encapsulation: ViewEncapsulation.Emulated          // by default, Angular uses Emulated view encapsulation, which means that the styles defined in this component will only apply to this component
                                                     // and will not affect any other components.
                                                     // We can also use None or ShadowDom, None, ExperimentalIsolatedShadowDom view encapsulation if we want to change this behavior.
})


export class Home {

  changeValue() {
    throw new Error('Method not implemented.');
  }

  changeValueAgain() {
    throw new Error('Method not implemented.');
  }

  @ViewChild('chartContainer') chartContainer: ElementRef;         // ViewChild is a decorator function that allows us to access a child component, directive, or DOM element from the parent component. In this case, we are using ViewChild to access a DOM element with the template reference variable 'chartContainer'. The type of chartContainer is ElementRef, which is a wrapper around the native DOM element.

  @Input()                                                         // input decorator is used to define an input property for this component. An input property is a property that can receive data from a parent component. In this case, we have defined an input property called 'name' of type string.
  id = 0;
  title: any;
  x: any;

  constructor() {
    console.log('Home component is created');
    this.chartContainer = new ElementRef(null);                    // initialize chartContainer to avoid undefined error in ngAfterViewInit
  }

  ngOnInit() {                                                     // called when the component is initialized. This is a good place to perform any initialization logic for the component, such as fetching data from a server or setting up event listeners.
    console.log('Home component is initialized ngOnInit()');
  }

  ngOnChanges(change: SimpleChange) {                              // called whenever there is a change in the input properties of the component.
    console.log('Home component is changed ngOnChanges()');
  }

  ngDoCheck() {                                                    // called during every change detection run, immediately after ngOnChanges() and ngOnInit(). This is a good place to perform custom change detection logic.
    console.log('Home component is checked ngDoCheck()');
    if (this.id === 30) {
      console.log('Value of id is 30, resetting it to 0');
      this.id = 0;
    }
  }

  ngAfterContentInit() {                                           // called after Angular has fully initialized all content of the component. This is a good place to perform any additional initialization logic that depends on the content being fully initialized.
    console.log('Home component content is initialized ngAfterContentInit()');
  }

  ngAfterViewInit() {                                              // called after Angular has fully initialized the component's view. This is a good place to perform any additional initialization logic that depends on the view being fully initialized.
    console.log('Home component view is initialized ngAfterViewInit()');
    this.initializeChart();
  }

  initializeChart() {
    console.log('Initializing chart in Home component');
    if (this.chartContainer && this.chartContainer.nativeElement) {
      // Here you can add your chart initialization logic using the chartContainer.nativeElement
      // For example, you can use a charting library like Chart.js or D3.js to create a chart inside the chartContainer element.
      console.log('Chart container is available for initialization');
    } else {
      console.log('Chart container is not available for initialization');
    }
  }

  ngAfterViewChecked() {                                          // called after Angular has checked the component's view for changes. This is a good place to perform any additional logic that depends on the view being checked.
    console.log('Home component view is checked ngAfterViewChecked()');
  }

  ngOnDestroy() {                                                 // called just before Angular destroys the component. This is a good place to perform any cleanup logic, such as unsubscribing from observables or detaching event handlers.
    console.log('Home component is destroyed ngOnDestroy()');
    this.id = 0; // reset id to 0 when the component is destroyed
    console.log('Value of id is reset to 0 in ngOnDestroy()');
  }
}