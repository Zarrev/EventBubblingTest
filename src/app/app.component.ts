import {AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy{
  public title = 'EventBubblingTest';
  @ViewChildren('targetElement') private targetElements: QueryList<ElementRef>;
  @ViewChild('fakeDocument') private fakeDocument: ElementRef;
  private fakeDoc: Element[];
  private listener: EventListenerOrEventListenerObject = (e: Event) => {
    const msg = 'Other handler is running too';
    // tslint:disable-next-line:no-string-literal
    console.log(msg, e.target['tagName']);
    // tslint:disable-next-line:no-string-literal
    alert(`${msg} on ${e.target['tagName']}`);
  }

  public ngAfterViewInit(): void {
    this.targetElements.forEach(({ nativeElement }) => nativeElement.addEventListener('click', this.listener, false));
    this.fakeDoc = Array.from(
      (this.fakeDocument.nativeElement as HTMLElement).getElementsByTagName('*'))
      .concat([this.fakeDocument.nativeElement]);
    for (const element of this.fakeDoc) {
      element.addEventListener('click', e => alert(`Capturing: ${element.tagName}`), true);
      element.addEventListener('click', e => alert(`Bubbling: ${element.tagName}`), false);
    }
  }

  public ngOnDestroy(): void {
    this.targetElements.forEach(({ nativeElement }) => nativeElement.removeEventListener('click', this.listener, false));
    for (const element of this.fakeDoc) {
      element.removeEventListener('click', e => alert(`Capturing: ${element.tagName}`), true);
      element.removeEventListener('click', e => alert(`Bubbling: ${element.tagName}`), false);
    }
  }

  public bubbling(event: Event, stopBubbling: boolean = false, immediateStop: boolean = false): void {

    if (stopBubbling) {
      event.stopPropagation();
    } else if (immediateStop) {
      event.stopImmediatePropagation();
    }
    // tslint:disable-next-line:no-string-literal
    console.log('It\'s bubbling!', `${event.currentTarget['tagName']} - ${event.currentTarget['className']}`, event);
    // tslint:disable-next-line:no-string-literal
    alert(`It's bubbling through ${event.currentTarget['tagName']} and started from ${event.target['tagName']}`);
  }
}
