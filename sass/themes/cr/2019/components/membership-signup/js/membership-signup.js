// Add active class to amount selected
membershipSignup();
function membershipSignup() {
	var url = "https://comicrelief.com/donate"

	$(document).ready(function() {
		var paragraphs = ".paragraph--membership-signup";
		$(paragraphs).each(function(i) {
			var x = $(this).css("backgroundColor");
			if (x) {
			    $(this).append("<style> " + ".img-shadow" + ":before {color:" + x + "}" + "</style>");
			}

			// handle money buy selection
			$(this)
				.find(".select-amount-btn")
				.click(function(e) {
					$(this).parent().find(".select-amount-btn").removeClass("active");
					// Add selected money buy  amount to input field
					$(this).addClass("active");
					var amount = $(this).text();
					$(this).parent().parent().find(" input[name='membership_amount']").val(parseInt(amount.replace(/\D/g, ""), 10));
					e.preventDefault();
				});

			// Handle change of currency
			$(this)
				.find("select")
				.change(function() {
					var currency = $(this).find("option:selected").data("currency");
					$(this).parent().parent().parent().find(".membership__currency-label").text(currency);
				});

			// Submit data
			function nextStepHandler(e, currency, amount, givingType) {
                e.preventDefault();
                if (amount && (amount > 1 && amount <= 5000)) {
                    var moneyDonated = currency + amount;
					console.log(moneyDonated, givingType);
					window.location.href = url + "?amount=" + amount + "&currency=" + currency + "&givingType=" + givingType
                }
			}
			// keyboard event
			$(this)
				.find("input[name='membership_amount']")
				.keypress(function(e) {
					if (e.which == 13) {
						e.preventDefault();
						// Get amount
						var amount = parseFloat($(this).val(), 10);
						// Get currency
						var currency = $(this).siblings(".currency-input-label").text();
						// Giving type
						var givingType = $(this).closest('form').data('giving-type');
						// Send data
                        nextStepHandler(e, currency, amount, givingType);
					}
				});

			// button event
			$(this)
				.find(".btn--membership-blue")
				.click(function(e) {
                    e.preventDefault();
                    // Get amount
                    var amount = $(this).siblings().find("input[name='membership_amount']").val();
                    // Get currency
					var currency = $(this).siblings().find("#js-currency-label").text();
					// Giving type
					var givingType = $(this).closest('form').data('giving-type');
					// Send data
				    nextStepHandler(e, currency, amount, givingType);
				});
		});
	});
}

