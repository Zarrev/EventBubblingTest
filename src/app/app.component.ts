import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy{
  public title = 'EventBubblingTest';
  @ViewChild('targetElement') private targetElement: ElementRef;
  private listener: EventListenerOrEventListenerObject = (e: Event) => console.log('Other handler is running too!', e);
  private target: HTMLElement;

  public ngAfterViewInit(): void {
    this.target = this.targetElement.nativeElement;
    this.target.addEventListener('click', this.listener, false);
  }

  public ngOnDestroy(): void {
    this.target.removeEventListener('click', this.listener, false);
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
