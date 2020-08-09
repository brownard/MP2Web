import { Pipe, PipeTransform } from '@angular/core';
import { WebProgramBasic } from '../models/programs';

@Pipe({
  name: 'isAiring'
})
export class IsAiringPipe implements PipeTransform {

  transform(program: WebProgramBasic, currentTime: string | number | Date): boolean {
    if (!program || !currentTime)
      return false;

    const current = new Date(currentTime).getTime();
    return current >= new Date(program.StartTime).getTime() && current < new Date(program.EndTime).getTime();
  }

}
