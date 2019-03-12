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
			$thisBtn.closest('form').find(".form-error").removeClass('visible');
			$thisBtn.siblings('.select-amount-btn').removeClass("active");
			$thisBtn.addClass("active");
			var amount = parseFloat($thisBtn.text().replace(/\D/g, ""));
			var $thisBtnParent = $thisBtn.parents(".membership-signup__wrapper-copy--form-money");
			var descriptionCopies = $thisBtnParent.find(".donation-copy").children();
			var position = $thisBtn.data("position");
			$thisBtnParent.find("input[name='membership_amount']").val(amount);
			currentAmount($thisBtn, amount);
			moneyBuyDescriptionHandler(descriptionCopies, position);
		});

		/** Handle change of currency  and set currency of input label */
		$('.paragraph--membership-signup select').change(function() {
			var $thisSelect = $(this);
			var currency = $thisSelect.find("option:selected").data("currency");
			var $thisParent = $thisSelect.closest(".membership-signup__wrapper-copy--form-money");
			$thisParent.find("#js-currency-label").text(currency);
		});

		/* Watch for action or change on input */
		$(".paragraph--membership-signup input[name='membership_amount']").on("input propertychange",function(){
			var $thisInput = $(this);
			var amount = parseFloat($thisInput.val());
			var $thisForm = $thisInput.parents('form');
			$thisForm.find('.select-amount-btn').removeClass("active");
			currentAmount($thisForm, amount);

			if (validateAmount(amount) && !isNaN(amount)) {
				$thisForm.find(".form-error").removeClass('visible');
			} else {
				$thisForm.find(".form-error").addClass('visible');
			}
		});

		/* Handle enter-key keyboard event */
		$(".paragraph--membership-signup input[name='membership_amount']").keypress(function(e) {
			var $thisInput = $(this);
			if (e.which == 13) {
				e.preventDefault();
					var $thisForm = $thisInput.closest('form');
					var amount = getAmount($thisForm)
					handleDatabeforeSubmission($thisForm, amount, e);
        }
      });

      // Handle pressing next button event
      $(".paragraph--membership-signup .membership--submit").click(function(e) {
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

			var amount = parseFloat($newParagraphWithId.find(".select-amount-btn.active").text().replace(/\D/g, ""));
			$newParagraphWithId.attr("data-current-amount", amount);
			var position = $newParagraphWithId.find(".select-amount-btn.active").data("position");
			/* Add money buy description && currency */
			var descriptionCopies = $newParagraphWithId.find(".donation-copy").children();
			moneyBuyDescriptionHandler(descriptionCopies, position);
		}

		/** Money buy description handler */
		function moneyBuyDescriptionHandler(descriptions, position) {
			console.log(position)
			descriptions.each(function (i) {
				$(this).removeClass('show-copy');
				if (position === i + 1) {
					$(this).addClass('show-copy');
				}
			})
		}

		/** Set value of data current amount */
		function currentAmount(selector, amount) {
			if (isNaN(amount)) {
				selector.parents(".paragraph--membership-signup").attr("data-current-amount", 0);
			} else {
				selector.parents(".paragraph--membership-signup").attr("data-current-amount", amount);
			}
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
