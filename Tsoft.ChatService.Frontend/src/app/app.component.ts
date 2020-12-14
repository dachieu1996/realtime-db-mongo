import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VERSION as VERSION_ALAIN, TitleService } from '@delon/theme';
import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';

import { NzConfigService } from 'ng-zorro-antd/';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  template: `
    <ng2-slim-loading-bar color="blue"></ng2-slim-loading-bar>
    <app-messages></app-messages>
    <div class="w-100">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private nzConfigService: NzConfigService,
    private loadingBar: SlimLoadingBarService,
  ) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit() {
    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
      this.titleSrv.setTitle();
      this.modalSrv.closeAll();
    });
    this.nzConfigService.set('notification', { nzPlacement: 'bottomRight', nzPauseOnHover: true });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }
}
