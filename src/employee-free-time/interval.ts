interface IInterval {
	start: number;
	end: number;
}

class Interval implements IInterval {
	start: number;
	end: number;
	closed: any;

	setClosed: (closed: boolean) => void;
	formatInterval: () => String;

	constructor(start: number, end: number) {
			this.start = start;
			this.end = end;

			this.setClosed = function (closed) {
					this.closed = closed;
			};

			this.formatInterval = function () {
					return this.closed
							? "[" + this.start + ", " + this.end + "]"
							: "(" + this.start + ", " + this.end + ")";
			};
	}
}

function display(vec: Array<any>) {
	let string = "[";
	if (vec.length > 0) {
			for (let i = 0; i < vec.length; i++) {
					string += vec[i].formatInterval();
					if (i + 1 < vec.length) {
							string += ", ";
					}
			}
	}
	string += "]";
	return string;
}

export { Interval, display, IInterval };