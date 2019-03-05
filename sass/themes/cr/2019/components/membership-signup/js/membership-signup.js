membershipSignup();
function membershipSignup() {
	var url = "https://comicrelief.com/donate"
	$(document).ready(function() {
		var paragraphs = ".paragraph--membership-signup";

		$(paragraphs).each(function(i) {
			var colour = $(this).css("backgroundColor");

			if (colour) {
			    $(this).append("<style> " + ".img-shadow" + ":before {color:" + colour + "}" + "</style>");
			}

			// handle money buy selection
			$(this)
				.find(".select-amount-btn")
				// Add and remove active class
				.click(function(e) {
					e.preventDefault();
					$(this).parent().find(".select-amount-btn").removeClass("active");
					$(this).addClass("active");

					var amount = $(this).text();

					// Add selected money buy  amount to input field
					$(this).parents(".membership-signup__form-money").find(" input[name='membership_amount']").val(parseInt(amount.replace(/\D/g, ""), 10));
				});

			// Handle change of currency
			$(this)
				.find(".form__field.form__field--currency")
				.change(function() {
					var currency = $(this).find("option:selected").data("currency");
					$(this).parents(".membership-signup__form-money").find(".membership__currency-label").text(currency);
				});

			// Submit data
			function nextStepHandler(e, currency, amount, givingType) {
                e.preventDefault();
                if (amount && (amount > 1 && amount <= 5000)) {
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
					var sibling = $(this).siblings()
                    // Get amount
                    var amount = sibling.find("input[name='membership_amount']").val();
                    // Get currency
					var currency = sibling.find("#js-currency-label").text();
					// Giving type
					var givingType = $(this).closest('form.membership-signup__form-money').data('giving-type');
					// Send data
				    nextStepHandler(e, currency, amount, givingType);
				});
		});
	});
}

