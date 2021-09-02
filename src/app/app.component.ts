import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventBubblingTest';

  public bubbling(event: Event): void {
    console.log('It\'s bubbling!', `${event.currentTarget['tagName']} - ${event.currentTarget['className']}`, event);
    alert(`It's bubbling through ${event.currentTarget['tagName']} and started from ${event.target['tagName']}`);
  }
}
