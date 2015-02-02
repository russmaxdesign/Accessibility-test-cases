$(document).ready(function() {
	$("a[href^='#']").click(function() {
		$("#"+$(this).attr("href").slice(1)+"")
			.focus()
			.effect("highlight", {}, 3000);
	});
});
