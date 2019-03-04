// Add active class to amount selected

var paragraphs = ".paragraph--membership-signup";

$(paragraphs).each(function(i) {
        var x = $(this).css('backgroundColor');
        if(x){
                $(this).append("<style> " + ".img-shadow" + ":before {color:" + x + "}" + "</style>" );
        }

});


$(paragraphs).each(function(i) {
	$(this)
		.find(".select-amount-btn")
		.click(function(e) {
			$(this)
				.parent()
				.find(".select-amount-btn")
                                .removeClass("active");
                        // Add selected amount to input field
			$(this).addClass("active");
			var amount = $(this).text();
			$(this)
				.parent()
				.parent()
				.find(" input[name='membership_amount']")
				.val(parseInt(amount.replace(/\D/g, ""), 10));
			e.preventDefault();
		});
});
