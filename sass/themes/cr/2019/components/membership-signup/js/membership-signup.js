(function($) {

	var dataLayer;

	$(document).ready(function() {

		dataLayer = window.dataLayer = window.dataLayer || [];
		var pattern = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/;
		var allParagraphs = [];

		$('.paragraph--membership-signup').each(function(i) {
			var $thisParagraph = $(this);
			setFormDefaults($thisParagraph, i);
		});


		/* Handle money buy selection */
		$('.paragraph--membership-signup .select-amount-btn').click(function(e) {
			e.preventDefault();
			var $thisBtn = $(this);
			var $thisForm = $thisBtn.closest('form');

			$thisForm.find('select').css("background", "transparent");
			$thisForm.find(".form__field--wrapper").removeClass('active-input');
			$thisForm.find(".form-error").removeClass('show-error');
			$thisForm.find('.select-amount-btn').removeClass("active");
			$thisForm.find("input[name='membership_amount']").val("");
			$(this).addClass("active");

			var $thisBtnParent = $thisBtn.parents(".membership-signup__wrapper-copy--form-money");
			var descriptionCopies = $thisBtnParent.find(".donation-copy").children();
			var position = $thisBtn.data("position");

			moneyBuyDescriptionHandler(descriptionCopies, position);

			var moneyBuySelected = parseFloat($thisForm.find('.select-amount-btn.active').text().replace(/\D/g, ""));
			setCurrentDataAmount($thisForm, moneyBuySelected);

			addToBasket($thisForm, $thisBtn);
			
		});


		/* Watch for action or change on input */
		$(".paragraph--membership-signup input[name='membership_amount']").on("input propertychange click",function(event){
			var $thisInput = $(this);
			var $thisForm = $thisInput.parents('form');
			var amount = parseFloat($thisInput.val());

			$thisForm.find(".form__field--wrapper").addClass("active-input")
			$thisForm.find('.select-amount-btn').removeClass("active");
			$thisForm.find('.money-buy--description').removeClass('show-money-buy-copy');
			$thisForm.find('.random-description').addClass('show-money-buy-copy');

			/** Reset current amount to zero  */
			setCurrentDataAmount($thisInput, 0);

			// Check if user enters input
			if (event.type === "input") {
				if (validateAmount(amount) && !isNaN(amount)) {
					$thisForm.find(".form-error").removeClass('show-error');
					setCurrentDataAmount($thisInput, amount);
				} else {
					$thisForm.find(".form-error").addClass('show-error');
					setCurrentDataAmount($thisInput, 0);
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
				var inputValue = parseFloat($thisInput.val())
				if(!isNaN(inputValue)) {
					setCurrentDataAmount($thisInput, inputValue);
					handleDatabeforeSubmission($thisForm, inputValue, e);
				} else {
					setCurrentDataAmount($thisInput, 0);
					handleDatabeforeSubmission($thisForm, 0, e);
				}
			}
		});


      // Handle pressing next button event
		$(".paragraph--membership-signup .membership--submit").click(function (e) {
			e.preventDefault();
			var $thisButton = $(this);
			var $thisForm = $thisButton.closest('form');
			var moneyBuySelected = parseFloat($thisForm.find('.select-amount-btn.active').text().replace(/\D/g, ""));
			var inputValue = parseFloat($thisForm.find("input[name='membership_amount']").val())

			if(!isNaN(moneyBuySelected)){
				setCurrentDataAmount($thisForm, moneyBuySelected);
				handleDatabeforeSubmission($thisForm, moneyBuySelected, e);
			} else if(!isNaN(inputValue)){
				setCurrentDataAmount($thisButton, inputValue);
				handleDatabeforeSubmission($thisForm, inputValue, e);
			} else {
				setCurrentDataAmount($thisButton, 0);
				handleDatabeforeSubmission($thisForm, 0, e);
			}

			$thisForm.parents('.paragraph--membership-signup').attr('data-current-amount', moneyBuySelected)
		});


		/**  FUNCTIONS  */
		function setFormDefaults($thisParagraph, i) {
			var thisID = 'paragraph--membership-signup-' + i;
			$thisParagraph.attr('id', thisID);
			var $newParagraphWithId = $('#'+ thisID);

			var $thisForm = $newParagraphWithId.find('form');
			var cartID = $thisForm.data('cart-id');
			var clientID = $thisForm.data('client-id');
			var theseButtons = [];

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

			// Cache all our button info for this paragraph in array, to pass to the main paragraph array
			$newParagraphWithId.find(".select-amount-btn").each( function(i) {
				theseButtons[i] = {
					position: $(this).data("position"),
					amount: $(this).data("amount")
				}
			});

			// Cache all of these for ease-of-use later & prevent endless DOM traversal
			allParagraphs[thisID] = {
				giving_type: givingType == 'MONTHLY' ? 'regular-payment': 'single-payment',
				current_amount: amount,
				active_btn_pos: position,
				cart_id: cartID,
				client_id: clientID,
				buttons: theseButtons
			}; 

			/* Pass the cached row to set up the dataLayer */
      initDataLayer($newParagraphWithId, thisID);
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
		function setCurrentDataAmount(selector, amount) {
			selector.parents(".paragraph--membership-signup").attr("data-current-amount", amount);
		}

		/* Handle data before submission */
		function handleDatabeforeSubmission($thisForm, amount, event) {
			var currency = $thisForm.find("option:selected").val();
			var givingType = $thisForm.data('giving-type');
			var cartId = $thisForm.data('cart-id');
			var clientId = $thisForm.data('client-id');

			/* Send data */
			if (validateAmount(amount)) {
				$thisForm.find(".form-error").removeClass('show-error');
				nextStepHandler(event, currency, amount, givingType, cartId, clientId);
			} else {
				$thisForm.find(".form-error").addClass('show-error');
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
		function nextStepHandler(e, currency, amount, givingType, cartId, clientId) {
			e.preventDefault();
			var url = "https://donation-staging.spa.comicrelief.com/";
			var getUrl =  $('#paragraph--membership-signup-0').data("donation-url");
			var donationLink = getUrl ? getUrl : url;

			/* Affiliate value */
			var url_string = window.location.href;
			var url = new URL(url_string);
			var affiliateValue = url.searchParams.get("affiliate")? url.searchParams.get("affiliate") : 'generic';

			/* Strip out all params now we've saved our required 'affiliate' value */
			if (url_string.indexOf('?') > -1 ) {
				url_string = url_string.substring(0, url_string.indexOf('?'));
			}

			window.location.href = donationLink + "?clientOverride=" + clientId + "&amount=" + amount + "&currency=" + currency + "&givingType=" + givingType + "&cartId=" + cartId + "&affiliate=" + affiliateValue + "&siteurl=" + url_string;
		}

		 /* Set-up data layer stuff on pageload */
    function initDataLayer($element, thisID) {

    	// Grab this Paragraph from our cached array
    	var thisParagraph = allParagraphs[thisID];

      // Construct object to push to datalayer, stating with Other Amount field
      var ecommerceObj = {
        'ecommerce': {
          'currencyCode': 'GBP',
          'impressions': [{
            id:'manual-entry',      
            name:'manual-entry',      
            price:'0.00',       
            category: thisParagraph['cart_id'],
            position: 0,
            list: thisParagraph['client_id'] + '_' + thisID,
          }],
        }
      };

      // Construct obj to represent each moneybuy button
      for (i = 0; i < thisParagraph['buttons'].length; i++) {
      	var thisObj = {
          id:'moneybuy-' + thisParagraph['buttons'][i]['amount'],
          name:'moneybuy-' + thisParagraph['buttons'][i]['amount'],
          price: thisParagraph['buttons'][i]['amount'] + '.00',      
          brand:'cr-membership',  
          category: thisParagraph['cart_id'],   
          position: thisParagraph['buttons'][i]['position'],
          list: thisParagraph['client_id'] + '_' + thisID,
          dimenstion10: thisParagraph['giving_type']
        };

        // Add the object to the impressions array
        ecommerceObj['ecommerce']['impressions'].push(thisObj);
      };

      // Push to the data layer
      console.log("finished ecommerceObj for " + thisID + ": ", ecommerceObj);
      // TODO: ADD THIS BACK! dataLayer.push(ecommerceObj);
    }

    function addToBasket($thisForm, $thisButton){
      var thisID = $thisForm.closest('.paragraph--membership-signup').attr('id');


/*      allParagraphs[thisID] = {
        giving_type: givingType == 'MONTHLY' ? 'regular-payment': 'single-payment',
        current_amount: amount,
        active_btn_pos: position,
        cart_id: cartID,
        client_id: clientID,
        buttons: theseButtons
      }; */

      // MONDAY START HERE
      var thisCartID = allParagraphs[thisID]['card_id'];
      var thisClientID =  allParagraphs[thisID]['client_id'];
      var regularOrSingle = allParagraphs[thisID]['giving_type'];

      // Construct object to push to datalayer
      var ecommerceObj = {
        'ecommerce': {
          'currencyCode': 'GBP',
          'add': {
            'products': [{
          		id:'moneybuy-' + thisAmount,
          		name:'moneybuy-' + thisAmount,
          		price: thisAmount + '.00',      
          		brand:'cr-membership',  
          		category: thisCartID, 
              quantity:1,
          		dimenstion10: regularOrSingle
            }],
          },
        },
        'event': 'addToBasket'
      };
    }

	});
})(jQuery);
