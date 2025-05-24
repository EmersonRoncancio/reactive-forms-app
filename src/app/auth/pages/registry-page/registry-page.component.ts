import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-registry-page',
  imports: [JsonPipe],
  templateUrl: './registry-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryPageComponent { }
