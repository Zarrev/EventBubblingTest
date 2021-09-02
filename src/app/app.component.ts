import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  public title = 'EventBubblingTest';
  @ViewChild('targetElement') private targetElement: ElementRef;

  public ngAfterViewInit(): void {
    console.log(this.targetElement);
    this.targetElement.nativeElement.addEventListener('click', (e) =>
    {
      console.log('Other handler is running too!')
    }, false);
  }

  public bubbling(event: Event, stopBubbling: boolean = false, immediateStop: boolean = false): void {

    if (stopBubbling) event.stopPropagation();
    if (immediateStop) {
      event.stopImmediatePropagation();
    }
    console.log('It\'s bubbling!', `${event.currentTarget['tagName']} - ${event.currentTarget['className']}`, event);
    alert(`It's bubbling through ${event.currentTarget['tagName']} and started from ${event.target['tagName']}`);
  }
}
