import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playbackTime'
})
export class PlaybackTimePipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    if (hours > 0)
      value = value % 3600;
    const minutes = Math.floor(value / 60);
    if (minutes > 0)
      value = value % 60;

    const seconds = Math.floor(value);

    // Only include hours if necessary, force two digits for minutes
    // following hours, and always force two digits for seconds.
    // e.g.  1:07:08    6:52    0:07  
    return (hours > 0 ? hours + ':' : '') +
      (hours == 0 || minutes >= 10 ? minutes : '0' + minutes) + ':' + 
      (seconds >= 10 ? seconds : '0' + seconds);
  }
}
