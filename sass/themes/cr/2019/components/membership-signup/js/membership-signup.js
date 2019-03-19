(function($) {
	$(document).ready(function() {
		var url = "https://comicrelief.com/donate";
		var pattern = /^[0-9]+([,.][0-9]+)?$/;

		$('.paragraph--membership-signup').each(function(i) {
			var $thisParagraph = $(this);
			setFormDefaults($thisParagraph, i);
		});

		/* Handle money buy selection */
		$('.paragraph--membership-signup .select-amount-btn').click(function(e) {
			e.preventDefault();
			var $thisBtn = $(this);
			var $thisForm= $thisBtn.closest('form');
			$thisForm.find('select').css("background", "transparent");
			$thisForm.find(".form__field--wrapper").removeClass('active-input');
			$thisForm.find(".form-error").removeClass('show-error');
			$thisForm.find('.select-amount-btn').removeClass("active");
			$thisForm.find("input[name='membership_amount']").val("");
			$(this).addClass("active");
			var amount = parseFloat($thisBtn.text().replace(/\D/g, ""));
			var $thisBtnParent = $thisBtn.parents(".membership-signup__wrapper-copy--form-money");
			var descriptionCopies = $thisBtnParent.find(".donation-copy").children();
			var position = $thisBtn.data("position");
			currentAmount($thisBtn, amount);
			moneyBuyDescriptionHandler(descriptionCopies, position);
		});

		/* Watch for action or change on input */
		$(".paragraph--membership-signup input[name='membership_amount']").on("input propertychange click",function(event){
			var $thisInput = $(this);
			var amount = parseFloat($thisInput.val());
			var $thisForm = $thisInput.parents('form');
			$thisForm.find(".form__field--wrapper").addClass("active-input")
			$thisForm.find('.select-amount-btn').removeClass("active");
			$thisForm.find('.money-buy--description').removeClass('show-money-buy-copy');
			$thisForm.find('.random-description').addClass('show-money-buy-copy');

			// Check if user enters input
			if (event.type === "input") {
				if (validateAmount(amount) && !isNaN(amount)) {
					$thisForm.find(".form-error").removeClass('show-error');
					currentAmount($thisForm, amount);
				} else {
					$thisForm.find(".form-error").addClass('show-error');
					currentAmount($thisForm, 0);
				}
			}

		});

		/* Handle change of currency */
		$('.paragraph--membership-signup select').on( "selectmenuchange input propertychange click", function() {
			var $thisSelect = $(this);
			var $thisForm = $thisSelect.parents('form')
			var currency = $thisSelect.find("option:selected").data("currency");
			var givingType = $thisForm.data("giving-type");

			if(givingType.toLowerCase() !== "MONTHLY".toLowerCase()) {
				var currency = $thisForm.find("option:selected").data("currency");
				$thisSelect.closest(".membership-signup__wrapper-copy--form-money").find("#js-currency-label").text(currency);
			}
		});


		/* Handle enter-key keyboard event */
		$(".paragraph--membership-signup input[name='membership_amount']").keypress(function (e) {
			var $thisInput = $(this);
			if (e.which == 13) {
				e.preventDefault();
				var $thisForm = $thisInput.closest('form');
				var amount = getAmount($thisForm)
				handleDatabeforeSubmission($thisForm, amount, e);
			}
		});

      // Handle pressing next button event
		$(".paragraph--membership-signup .membership--submit").click(function (e) {
			e.preventDefault();
			var $thisButton = $(this);
			var $thisForm = $thisButton.closest('form');
			var amount = getAmount($thisForm);
			handleDatabeforeSubmission($thisForm, amount, e);
		});


		/**  FUNCTIONS  */
		function setFormDefaults($thisParagraph, i) {
			var thisID = 'paragraph--membership-signup-' + i;
			$thisParagraph.attr('id', thisID);
			var $newParagraphWithId = $('#'+ thisID);

			/* Set Box shadow colour */
			var colour = $newParagraphWithId.css("backgroundColor");
			if (colour) {
				$('.img-shadow', $newParagraphWithId).append("<style> " + "#" + thisID + " .img-shadow" + ":before {color:" + colour + "}" + "</style>");
			}

			/** Check giving type before taking decision to hide select tag or not */
			var givingType = $newParagraphWithId.find("form").data("giving-type");
			if(givingType.toLowerCase() === "MONTHLY".toLowerCase()) {
				$newParagraphWithId.find('.form__fieldset').addClass("hide-select-tag");
			}

			var amount = parseFloat($newParagraphWithId.find(".select-amount-btn.active").text().replace(/\D/g, ""));
			$newParagraphWithId.attr("data-current-amount", amount);
			var position = $newParagraphWithId.find(".select-amount-btn.active").data("position");
			/* Add money buy description && currency */
			var descriptionCopies = $newParagraphWithId.find(".donation-copy").children();
			moneyBuyDescriptionHandler(descriptionCopies, position);
		}

		/** Money buy description handler */
		function moneyBuyDescriptionHandler(descriptions, position) {
			descriptions.each(function (i) {
				$(this).removeClass('show-money-buy-copy');
				if (position === i + 1) {
					$(this).addClass('show-money-buy-copy');
				}
			})
		}

		/** Set value of data current amount */
		function currentAmount(selector, amount) {
			selector.parents(".paragraph--membership-signup").attr("data-current-amount", amount);
		}

		/** Get amount from value of data current amount  */
		function getAmount(selector) {
			return selector.parents(".paragraph--membership-signup").data("current-amount");
		}

		/* Handle data before submission */
		function handleDatabeforeSubmission($thisForm, amount, event) {
			/* Get currency */
			var currency = $thisForm.find("option:selected").val();
			/* Giving type */
			var givingType = $thisForm.data('giving-type');
			/* Cart ID */
			var cartId = $thisForm.data('cart-id');
			/* Send data */
			if (validateAmount(amount)) {
				$thisForm.find(".form-error").removeClass('visible');
				nextStepHandler(event, currency, amount, givingType);
			} else {
				$thisForm.find(".form-error").addClass('visible');
			}
		}

		/* Check and validate amount */
		function validateAmount(amount) {
			if (pattern.test(amount) && (amount >= 1 && amount <= 5000)) {
				return true
			} else {
				return false
			}
		}

		/* Submit data */
		function nextStepHandler(e, currency, amount, givingType) {
			e.preventDefault();
			window.location.href = url + "?amount=" + amount + "&currency=" + currency + "&givingType=" + givingType
		}
	});
})(jQuery);
