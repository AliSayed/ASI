(function($) {

	$.fn.extend({

		clock : function(options) {

			//set current time zone as default
			var timezoneOffset = options.offset;
			var d = new Date;
			var defaults = {
				offset : -(d.getTimezoneOffset() / 60)
			};

			var options = $.extend(defaults, options);

			return this.each(function() {
				var id = $(this).attr('id');
				var init = false;

				var r = Raphael(id, 300, 300), R = 135;
				var hr, min, sec;

				//set current time zone
				var timezoneOffset = options.offset;

				//draw clock
				setupClock();

				//draw clock
				function setupClock() {
					//draw clock face
					r.image("images/clock_face.png", 0, 0, 300, 300);

					//draw clock dots -------
					//draw mins/secs dots
					drawMarks(R, 60, 2, "#111");
					//draw hours dots
					drawMarks(R, 12, 4, "#f00");
					//draw quarters dots
					drawMarks(R, 4, 6, "#22f");
				}

				//UPDATE FN(current value,total divisions,clock radius,hand obj)
				function updateVal(value, total, R, hand) {
					//calc angle for hand
					var a = (360 / total * value);
					hand.transform("t25,25r" + String(a));
				}

				//draw circles (clock radius,total number of dots,dot size,dot color)
				function drawMarks(R, total, size, clr) {
					// circle attr
					var dotAttr = {
						fill : clr,
						stroke : "none"
					};

					for (var value = 0; value < total; value++) {
						//calc angle for dot
						var a = (360 / total * value) * (Math.PI / 180), x = 150 + R * Math.cos(a), y = 150 - R * Math.sin(a);
						//draw dot
						r.circle(x, y, size).attr(dotAttr);
					}
				}

				setInterval(function() {
					//load images if not loaded before
					if (init == false) {
						//load hands objs
						hr = r.image("images/clock_hour.png", 0, 0, 250, 250);
						min = r.image("images/clock_min.png", 0, 0, 250, 250);
						sec = r.image("images/clock_sec.png", 0, 0, 250, 250);

						init = true;
					}

					//update fn--------------
					//get date
					var d = new Date;
					//get date as UTC
					var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
					//add time zone offset
					d = new Date(utc + (3600000 * timezoneOffset));

					//call update fn for each hand
					updateVal(d.getSeconds(), 60, 100, sec);
					updateVal(d.getMinutes(), 60, 100, min);
					updateVal(d.getHours() + (d.getMinutes() / 60), 12, 100, hr);
				}, 1000);
			});
		}
	});
})(jQuery);
