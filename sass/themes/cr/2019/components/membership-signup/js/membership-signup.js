(function($) {

	$(document).ready(function() {

		var url = "https://comicrelief.com/donate"
		var pattern = /^[0-9]+([,.][0-9]+)?$/;

		$('.paragraph--membership-signup').each(function(i) {
			var $thisParagraph = $(this);
			var thisID = 'paragraph--membership-signup-' + i;
			$thisParagraph.attr('id', thisID);
			var $newParagraphWithId = $('#'+ thisID)
			var amount = $newParagraphWithId.find(".select-amount-btn.active").text();
			$newParagraphWithId.find("input[name='membership_amount']").val(parseFloat(amount.replace(/\D/g, "")));
			var colour = $newParagraphWithId.css("backgroundColor");
			if (colour) {
				$('.img-shadow', $newParagraphWithId).append("<style> " + "#" + thisID + " .img-shadow" + ":before {color:" + colour + "}" + "</style>");
			}
		});


		/* Handle money buy selection */
		$('.paragraph--membership-signup .select-amount-btn').click(function(e) {
			e.preventDefault();
			var $thisBtn = $(this);
			$thisBtn.siblings('.select-amount-btn').removeClass("active");
			$thisBtn.addClass("active");
			var amount = $thisBtn.text();
			$thisBtn.parents(".membership-signup__wrapper-copy--form-money")
			.find("input[name='membership_amount']").val(parseFloat(amount.replace(/\D/g, "")));

		});


		/* Handle change of currency */
		$('.paragraph--membership-signup select').change(function() {
			var $thisSelect = $(this);
			var currency = $thisSelect.find("option:selected").data("currency");
			$thisSelect.closest(".membership-signup__wrapper-copy--form-money").find(".membership__currency-label").text(currency);
		});

		/* Watch for action/change on input */
		$(".paragraph--membership-signup input[name='membership_amount']").on("input propertychange",function(){
			var $thisInput = $(this);
			var amount = parseFloat($thisInput.val());
			if (validateAmount(amount) || isNaN(amount)) {
				$thisInput.closest('form').find(".form-error").removeClass('visible');
			} else {
				$thisInput.closest('form').find(".form-error").addClass('visible');
			}
		});


		/* Handle enter-key keyboard event */
		$(".paragraph--membership-signup input[name='membership_amount']").keypress(function(e) {
			var $thisInput = $(this);
			if (e.which == 13) {
				e.preventDefault();
          /* Get amount */
					var amount = parseFloat($thisInput.val());
          /* Get currency */
					var currency = $thisInput.closest('form').find("option:selected").val();
          /* Giving type */
					var givingType = $thisInput.closest('form').data('giving-type');
					/* Cart ID */
					var cartId = $thisInput.closest('form').data('cart-id');
					/* Send data */
					if (validateAmount(amount)) {
						$thisInput.closest('form').find(".form-error").removeClass('visible');
						nextStepHandler(e, currency, amount, givingType);
					} else {
						$thisInput.closest('form').find(".form-error").addClass('visible');
					}
        }
      });


      // Handle pressing next button event
      $(".paragraph--membership-signup .membership--submit").click(function(e) {
      	e.preventDefault();
      	var $thisButton = $(this);
      	var $thisForm = $thisButton.closest('form');
        /* Get amount */
        var amount = $thisForm.find("input[name='membership_amount']").val();
        /* Get currency */
        var currency = $thisForm.closest('form').find("option:selected").val();
        /* Giving type */
				var givingType = $thisForm.data('giving-type');
				/* Cart ID */
				var cartId = $thisForm.data('cart-id');
				/* Send data */
				if (validateAmount(amount)) {
					$thisForm.find(".form-error").removeClass('visible');
					nextStepHandler(e, currency, amount, givingType);
				} else {
					$thisForm.find(".form-error").addClass('visible');
				}

      });

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
