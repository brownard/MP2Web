import { WebScheduleBasic } from './schedules';
import { WebChannelBasic } from './channels';

export interface ScheduleWithChannel {
  schedule: WebScheduleBasic;
  channel: WebChannelBasic;
}

export interface ScheduleWithHeader extends ScheduleWithChannel {
  header: string;
}

export enum ScheduleSort { Channel, Date }

/**
 * Sorts a collection of schedules by start date, and sets the header of the first schedule of each day to a string representation of the date.
 * @param schedules The collection of schedules to sort.
 * @param toSortHeader Optional function that returns the header to use for the first schedule on a given date, Date.toDateString() is used if this is not set.
 */
export function sortByDate(schedules: ScheduleWithChannel[], toSortHeader?: (date: Date) => string): ScheduleWithHeader[] {

  const containers: ScheduleWithHeader[] = [];
  let currentDate: Date = null;

  for (let schedule of schedules) {

    let header: string = null;
    let scheduleDate = new Date(schedule.schedule.StartTime);
    // First schedule or start date is different to previous so set the header
    if (!currentDate || !daysAreEqual(currentDate, scheduleDate)) {
      currentDate = scheduleDate;
      header = toSortHeader ? toSortHeader(scheduleDate) : scheduleDate.toDateString();
    }

    containers.push({ ...schedule, header });
  }
  return containers;
}

/**
 * Sorts a collection of schedules by channel, and sets the header of the first schedule of each channel to the channel title.
 * @param schedules The collection of schedules to sort.
 */
export function sortByChannel(schedules: ScheduleWithChannel[]): ScheduleWithHeader[] {
  const containers: ScheduleWithHeader[] = [];

  schedules = [...schedules].sort(compareScheduleChannels)

  let currentChannelId: number = null;
  for (let schedule of schedules) {

    let header: string;
    // First schedule or channel is different to previous so set the header
    if (!currentChannelId || currentChannelId !== schedule.channel.Id) {
      currentChannelId = schedule.channel.Id;
      header = schedule.channel.Title;
    }
    else {
      header = null;
    }

    containers.push({ ...schedule, header });
  }
  return containers;
}

/**
 * Returns a map of channel id to schedules.
 * @param schedules The schedules to group by channel id.
 */
export function groupByChannelId(schedules: WebScheduleBasic[]): { [id: number]: WebScheduleBasic[] } {
  const schedulesByChannel: { [id: number]: WebScheduleBasic[] } = {};
  for (let schedule of schedules) {
    const channelSchedules = schedulesByChannel[schedule.ChannelId];
    if (!channelSchedules)
      schedulesByChannel[schedule.ChannelId] = [schedule];
    else
      channelSchedules.push(schedule);
  }
  return schedulesByChannel;
}

/**
 * Compares two ScheduleWithChannels, if they have the same channel the start times of the schedules are compared, else the channel titles are compared alphabetically.
 * @param a ScheduleWithChannel to compare.
 * @param b ScheduleWithChannel to compare.
 */
export function compareScheduleChannels(a: ScheduleWithChannel, b: ScheduleWithChannel): number {
  if (!a.channel)
    return !b.channel ? 0 : 1;
  if (!b.channel)
    return -1;

  if (a.channel.Id === b.channel.Id)
    return new Date(a.schedule.StartTime).getTime() - new Date(b.schedule.StartTime).getTime();

  const aTitle = a.channel.Title.toUpperCase();
  const bTitle = b.channel.Title.toUpperCase();

  if (aTitle > bTitle)
    return 1;
  else if (aTitle < bTitle)
    return -1;
  return a.channel.Id - b.channel.Id;
}

/**
 * Helper function to determine whether the date portion of Dates are equal.
 * @param a Date to compare
 * @param b Date to compare
 */
export function daysAreEqual(a: Date, b: Date): boolean {
  return a && b && a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}
