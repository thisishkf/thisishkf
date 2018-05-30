$(document).ready(function () {
	createScoreBoard(course["9220"]);
	bindShowDetail();
	bindShowTable();
	bindSelectChange();
});

const bindShowDetail = function () {
	$("#showDetail").on('click', function () {
		let _this = $(this);
		$(".course_title").toggleClass("hidden");
		$(".credit").toggleClass("hidden");
		$(".course_level").toggleClass("hidden");
		$(".honorClass").toggleClass("hidden");
	});
}

const bindShowTable = function () {
	$("#showCourse").on('click', function () {
		let _this = $(this);
		$("#scoreBoard").toggleClass("hidden");
	});
}

/**
 * @return {Object}	{ a : {} , b : {}}
 */
const getGPAData = function () {
	let source = {
		a: {},
		b: {}
	};
	Object.keys(GPA).forEach((ele, i) => {
		source.a[GPA[ele]] = {};
		source.b[GPA[ele]] = {};
	});
	source.a[0] = {};
	source.b[0] = {};
	$("#scoreBoard").find('tbody').find('tr').each(function () {
		let _tr = $(this);
		let courseId = _tr.data('course');
		let honorClass = _tr.find('.honorClass').text().indexOf('a') > -1 ? "a" : "b";
		let grade = _tr.find('select').val() || 0;
		source[honorClass][grade][courseId] = {
			credit: parseInt(_tr.find('.credit').text())
		};
	});
	return sortGPAData(source);
}

/**
 * 
 * @param 	{Object} 	source 
 * @return 	{Object}	
 */
const sortGPAData = function (source) {
	let grades = Object.values(GPA).sort().reverse(); // 4->0
	let classes = {
		a: {},
		b: {}
	};

	let credits = { a: 0, b: 0 };
	for (let grade of grades) {
		if (source.a[grade].length == 0) {
			delete source.a[grade];
			continue;
		}
		for (let code in source.a[grade]) {
			let course = source.a[grade][code];
			if (credits.a + course.credit <= 40) {
				classes.a[code] = { grade: grade, credit: course.credit };
				credits.a += course.credit;
				delete source.a[grade][code];
			}
			else if (credits.b + course.credit <= 40) {
				credits.b += course.credit;
				classes.b[code] = { grade: grade, credit: course.credit };
				delete source.a[grade][code];
			}
			else {
				break;
			}
		}
	}

	for (let grade of grades) {
		if (source.b[grade].length == 0) {
			delete source.b[grade];
			continue;
		}
		for (let code in source.b[grade]) {
			let course = source.b[grade][code];
			if (credits.b + course.credit <= 40) {
				credits.b += course.credit;
				classes.b[code] = { grade: grade, credit: course.credit };
				delete source.b[grade][code];
			} else {
				break;
			}
		}
	}
	return classes;
}

const createHonorTable = function (tableId, data) {
	const classType = tableId.split("-")[1];
	let table = $(tableId)
		.html("")
		.append(
			$('<caption />')
				.text(`Class ${classType} Courses`)
		)
	let thead = $('<thead/>');
	thead.append(
		$('<tr/>').append(
			$('<th/>').text("Course Code")
		).append(
			$('<th/>').text("Credit")
		).append(
			$('<th/>').text("Grade")
		)
	).appendTo(table);

	if (Object.keys(data[classType]).length > 0) {

		let tobdy = $("<tbody/>").appendTo(table);

		Object.keys(data[classType]).forEach((ele, i) => {
			$('<tr/>').addClass('data-tr')
				.append(
					$('<td/>').text(ele)
				).append(
					$('<td/>').addClass('credit')
						.text(data[classType][ele].credit)
				).append(
					$('<td/>').addClass('grade')
						.text(data[classType][ele].grade)
				).appendTo(table);
		});

		let total = { credit: 0, grade: 0 };
		table.find('.credit').each(function () {
			total.credit += parseFloat($(this).text());
		});
		table.find('.grade').each(function () {
			total.grade += parseFloat($(this).text());
		});

		table.find('tbody').append(
			$('<tr/>').append(
				$('<td>').html("ClassA Total: ")
			).append(
				$('<td/>').html(total.credit.toFixed(0))
			).append(
				$('<td/>').html(total.grade.toFixed(1))
			)
		);
	}
}

const bindSelectChange = function () {
	$('select').on('change', function () {
		let source = getGPAData();
		createHonorTable('#honorBoard-a', source);
		createHonorTable('#honorBoard-b', source);
		createHonorSummary();
	});
}

const createSummaryTable = function (classes, credits) {
	let table = $('#honorBoard-summary').html("")
		.append(
			$('<caption />')
				.text("Honorship summary")
		);
	let thead = $('<thead/>').append(
		$('<tr/>').append(
			$('<th/>').text('Class')
		).append(
			$('<th/>').text('Total Credit')
		).append(
			$('<th/>').text('Weighting')
		).append(
			$('<th/>').text('Total Grade')
		)
	).appendTo(table);
	let tbody = $('<tbody/>').append(
		$('<tr/>').addClass('summary-a')
		.append(
			$('<td/>').html('A')
		).append(
			$('<td/>').html(credits.a)
		).append(
			$('<td/>').html(2)
		).append(
			$('<td/>').addClass('weightedGrade').html(classes.a * 2)
		)
	).append(
		$('<tr/>').addClass('summary-b')
		.append(
			$('<td/>').html('B')
		).append(
			$('<td/>').html(credits.b)
		).append(
			$('<td/>').html(1)
		).append(
			$('<td/>').addClass('weightedGrade').html(classes.b * 1)
		)
	).appendTo(table);

	let grade = (parseFloat($('.summary-a').find('.weightedGrade').text()) + parseFloat($('.summary-b').find('.weightedGrade').text())) / 120;
	let honor = '';
	switch(grade){
		case 4:case 3.5:
		honor = "First Class";
		break;
		case 3:
		honor = "Second Class Honor Upper Division";
		break;
		case 2.5:
		honor = "Second Class Honor Lower Division";
		break;
		default: 
		honor = "Thrid Class Honor";
	}
	tbody.append(
		$('<tr/>').addClass('summary')
		.append(
			$('<td/>').html('Summary')
		).append(
			$('<td/>').attr('colspan', 3).html(`${honor} (honored GPA : ${grade.toFixed(2)} / 4.0) `)
		)
	);
}

const createHonorSummary = function () {

	let classes = { a: 0, b: 0 };
	let credits = { a: 0, b: 0 };
	$('#honorBoard-a').find('.data-tr').each(function () {
		let credit = parseInt($(this).find('.credit').text());
		classes.a += credit * parseFloat($(this).find('.grade').text());
		credits.a += credit;
	});
	$('#honorBoard-b').find('.data-tr').each(function () {
		let credit = parseInt($(this).find('.credit').text());
		classes.b += parseInt($(this).find('.credit').text()) * parseFloat($(this).find('.grade').text());
		credits.b += credit;
	});
	// if (credits.a == credits.b == 40) {
	createSummaryTable(classes, credits);
	// }
}

const gpaSelection = function () {
	let select = $('<select/>').append(
		$('<option>')
			.attr("selected", true)
			.attr("disabled", true)
			.text("-- GPA --")
	);
	Object.keys(GPA).forEach((grade, i) => {
		$('<option/>')
			.val(GPA[grade])
			.text(`${grade} (${GPA[grade]}) `)
			.appendTo(select);
	});
	return select;
}

const createScoreBoard = function (data) {
	let table = $("#scoreBoard")
		.append(
			$('<caption />')
				.text("Course Table")
		);
	let thead = $('<thead/>');
	thead.append(
		$('<tr/>').append(
			$('<th/>').text("Course Code")
		).append(
			$('<th/>').text("Course Title")
				.addClass("course_title")
		).append(
			$('<th/>').text("Credit")
				.addClass("credit")
		).append(
			$('<th/>').text("Course Level")
				.addClass("course_level")
		).append(
			$('<th/>').text("Course Group")
				.addClass("honorClass")
		).append(
			$('<th/>').text("Grade")
				.addClass("grade")
		)
	).appendTo(table);

	let tbody = $("<tbody/>").appendTo(table);
	Object.keys(data).forEach((ele, i) => {
		let tr = $('<tr/>').attr("data-course", ele);
		let info = data[ele];
		let honorClass = JSON.stringify(info.course_classGroup)
			.replace('"[', "")
			.replace(']"', "")
			.replace(',', " or ");
		tr.append(
			$("<td/>").text(ele)
		)
			.append(
				$("<td/>").text(info.course_title).addClass("course_title")
			)
			.append(
				$("<td/>").text(info.credit).addClass("credit")
			)
			.append(
				$("<td/>").text(info.course_level).addClass("course_level")
			)
			.append(
				$("<td/>").text(honorClass).addClass("honorClass")
			).append(gpaSelection)
			.appendTo(tbody);
	});
}

/**
 * Data
 */

const GPA = {
    "A": 4,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3,
    "B-": 2.7,
    "C+": 2.3,
    "C-": 2
};

let course = {};
course["9220"] = {
    ACTB211F:
        {
            course_title: 'Introduction to Accounting I',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    ACTB212F:
        {
            course_title: 'Introduction to Accounting II',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    BUSB272F:
        {
            course_title: 'Quantitative Methods f, Decision Making',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    ECONA231F:
        {
            course_title: 'Introduction to Microeconomics',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    ECONA232F:
        {
            course_title: 'Introduction to Macroeconomics',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    FINB280F:
        {
            course_title: 'Introduction to Financial Management',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    LAWB262F:
        {
            course_title: 'Business Law I',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    MGTB240F:
        {
            course_title: 'Principles and Practices of Management',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    MKTB250F:
        {
            course_title: 'Introduction to Marketing',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    MGTB399F:
        {
            course_title: 'Management Policy and Strategy',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    BUSB328F:
        {
            course_title: 'Investigating Entrepreneurial Opp,tunities',
            credit: '10',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    BUSB368F:
        {
            course_title: 'Business Issues and Ethics',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB304F:
        {
            course_title: 'Accounting Inf,mation Systems',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB313F:
        {
            course_title: 'Management and Cost Accounting',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB331F:
        {
            course_title: 'Company Accounting I',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB332F:
        {
            course_title: 'Company Accounting II',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB405F:
        {
            course_title: 'Advanced Management Accounting',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB407F:
        {
            course_title: 'Advanced Financial Rep,ting and Analysis I',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB414F:
        {
            course_title: 'Taxation I',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB416F:
        {
            course_title: 'Auditing I',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    LAWB333F:
        {
            course_title: 'Company Law I',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB408F:
        {
            course_title: 'Advanced Financial Rep,ting and Analysis II',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB415F:
        {
            course_title: 'Taxation II',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    ACTB417F:
        {
            course_title: 'Auditing II',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    BUSB299F:
        {
            course_title: 'Business Field Studies',
            credit: '5',
            course_level: 'Middle',
            course_classGroup: '[b]'
        },
    FINB386F:
        {
            course_title: 'Financial Decision Making',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    FINB388F:
        {
            course_title: 'Banking Systems',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    FINB389F:
        {
            course_title: 'Financial Markets',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    MGTB341F:
        {
            course_title: 'Labour Relations and Law',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    MGTB397F:
        {
            course_title: 'Global Issues in Management',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        },
    MKTB365F:
        {
            course_title: 'Services Marketing',
            credit: '5',
            course_level: 'Higher',
            course_classGroup: '[a,b]'
        }
};