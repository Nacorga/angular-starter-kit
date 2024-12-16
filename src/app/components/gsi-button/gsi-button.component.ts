import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GsiService } from '@app/services/gsi/gsi.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-gsi-button',
  standalone: true,
  imports: [],
  templateUrl: './gsi-button.component.html',
  styleUrl: './gsi-button.component.scss',
})
export class GsiButtonComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) btnId: string;

  @Output() tokenChange = new EventEmitter<string>();

  private gTokenSubs = new Subscription();

  constructor(private gsiSrv: GsiService) {}

  ngOnInit() {
    this.initGoogleTokenSubscription();
  }

  ngAfterViewInit() {
    this.gsiSrv.init(this.btnId);
  }

  ngOnDestroy() {
    this.gsiSrv.resetToken();
    this.gTokenSubs.unsubscribe();
  }

  private initGoogleTokenSubscription() {
    this.gTokenSubs = this.gsiSrv.gToken$.pipe(filter((gToken) => !!gToken)).subscribe((gToken) => {
      this.tokenChange.emit(gToken);
    });
  }
}
