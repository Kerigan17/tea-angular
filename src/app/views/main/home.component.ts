import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";

declare var $: any;
@Component({
  selector: 'main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy{
  private observable: Observable<boolean>;
  private subscription: Subscription | null = null;
  private popupElement: HTMLElement | null = null;
  private timeoutShowElement: number = 10000;
  constructor() {
    this.observable = new Observable<boolean>((observer: Observer<boolean>)=> {
      const interval = setTimeout(()=> {
        observer.next(true);
      }, this.timeoutShowElement);

      return {
        unsubscribe() {
          clearInterval(interval);
        }
      }
    })
  }

  ngOnInit() {
    this.popupElement = document.getElementById('modalSheet');

    $(function () {
      let icons: {header: string, activeHeader: string} = {
        header: 'iconClosed',
        activeHeader: 'iconOpen'
      };
      $("#accordion").accordion({
        heightStyle: "content",
        collapsible: true,
        icons: icons
      });

    });


    this.subscription = this.observable.subscribe((param: boolean)=> {
      if (param && this.popupElement) {
        this.popupElement.style.display = 'flex';
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closePopup() {
    if (this.popupElement) {
      this.popupElement.style.display = 'none';
    }
  }
}
