import { Pipe, PipeTransform } from '@angular/core';
import { WebProgramBasic } from '../models/programs';

@Pipe({
  name: 'guideWidth'
})
export class GuideWidthPipe implements PipeTransform {

  transform(program: WebProgramBasic, guideStart: string | number | Date, guideEnd: string | number | Date): number {
    const guideStartMs = new Date(guideStart).getTime();
    const guideEndMs = new Date(guideEnd).getTime();
    const start = Math.max(new Date(program.StartTime).getTime(), guideStartMs);
    const end = Math.min(new Date(program.EndTime).getTime(), guideEndMs);
    return end > start ? (end - start) / (guideEndMs - guideStartMs) : 0;
  }

}