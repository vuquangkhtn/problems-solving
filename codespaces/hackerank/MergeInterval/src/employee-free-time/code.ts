import { Interval, IInterval } from './interval.ts';

function employeeFreeTime(schedule: Array<Array<IInterval>>) {
  const mergedSchedules = schedule.flat();
  mergedSchedules.sort((a: IInterval, b: IInterval) => a.start - b.start);
  const mergedIntervals = [mergedSchedules[0]];

  for (let i = 1; i < mergedSchedules.length; i++) {
    const current = mergedSchedules[i];

    const peek = mergedIntervals[mergedIntervals.length - 1];

    if (peek.end < current.start) {
      mergedIntervals.push(mergedSchedules[i]);
      continue;
    }

    mergedIntervals.pop();
    const merged = new Interval(
      Math.min(current.start, peek.start),
      Math.max(current.end, peek.end)
    );
    mergedIntervals.push(merged);
  }

  const result = [];
  for (let i = 1; i < mergedIntervals.length; i++) {
    if (mergedIntervals[i].start > mergedIntervals[i - 1].end) {
      result.push(new Interval(mergedIntervals[i - 1].end, mergedIntervals[i].start));
    }
  }
  return result;
}

export { employeeFreeTime };
