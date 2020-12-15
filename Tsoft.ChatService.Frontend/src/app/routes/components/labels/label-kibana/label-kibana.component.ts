import { Component, OnInit, Input } from '@angular/core';
type FontStyle = 'italic' | 'normal' | 'oblique' | 'initial';
type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | number;
@Component({
  selector: 'app-label-kibana',
  templateUrl: './label-kibana.component.html',
  styleUrls: ['./label-kibana.component.less']
})

export class LabelKibanaComponent implements OnInit {
  @Input('fontStyle') fontStyle: FontStyle = 'italic';
  @Input('fontSize') fontSize: string = '13px';
  @Input('fontWeight') fontWeight: FontWeight = 'normal';
  @Input('color') color: string = 'rgba(0, 0, 0, 0.60)';
  @Input('noColon') noColon: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
