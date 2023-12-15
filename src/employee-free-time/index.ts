import { Interval, display } from './interval.ts';
import { employeeFreeTime } from './code.ts';

// Driver code
function main() {
	const inputs = [
		[
			[new Interval(1, 2), new Interval(5, 6)],
			[new Interval(1, 3)],
			[new Interval(4, 10)],
		],
		[
			[new Interval(1, 3), new Interval(6, 7)],
			[new Interval(2, 4)],
			[new Interval(2, 5), new Interval(9, 12)],
		],
		[
			[new Interval(2, 3), new Interval(7, 9)],
			[new Interval(1, 4), new Interval(6, 7)],
		],
		[
			[new Interval(3, 5), new Interval(8, 10)],
			[new Interval(4, 6), new Interval(9, 12)],
			[new Interval(5, 6), new Interval(8, 10)],
		],
		[
			[new Interval(1, 3), new Interval(6, 9), new Interval(10, 11)],
			[new Interval(3, 4), new Interval(7, 12)],
			[new Interval(1, 3), new Interval(7, 10)],
			[new Interval(1, 4)],
			[new Interval(7, 10), new Interval(11, 12)],
		],
		[
			[
				new Interval(1, 2),
				new Interval(3, 4),
				new Interval(5, 6),
				new Interval(7, 8),
			],
			[new Interval(2, 3), new Interval(4, 5), new Interval(6, 8)],
		],
		[
			[
				new Interval(1, 2),
				new Interval(3, 4),
				new Interval(5, 6),
				new Interval(7, 8),
				new Interval(9, 10),
				new Interval(11, 12),
			],
			[
				new Interval(1, 2),
				new Interval(3, 4),
				new Interval(5, 6),
				new Interval(7, 8),
				new Interval(9, 10),
				new Interval(11, 12),
			],
			[
				new Interval(1, 2),
				new Interval(3, 4),
				new Interval(5, 6),
				new Interval(7, 8),
				new Interval(9, 10),
				new Interval(11, 12),
			],
			[
				new Interval(1, 2),
				new Interval(3, 4),
				new Interval(5, 6),
				new Interval(7, 8),
				new Interval(9, 10),
				new Interval(11, 12),
			],
		],
	];
	let i = 1;
	inputs.forEach((schedule) => {
		console.log(i + ".\tEmployee Schedules:");
		schedule.forEach((s) => console.log("\t\t", display(s)));
		console.log(
			"\tEmployees' free time:",
			display(employeeFreeTime(schedule))
		);
		console.log("-".repeat(100));
		i += 1;
	});
}

main();