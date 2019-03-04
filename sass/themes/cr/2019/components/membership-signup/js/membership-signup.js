// Add active class to amount selected

newFunction();
function newFunction() {
        $(document).ready(function () {
                var paragraphs = ".paragraph--membership-signup";
                $(paragraphs).each(function (i) {
                        var x = $(this).css("backgroundColor");
                        if (x) {
                                $(this).append("<style> " + ".img-shadow" + ":before {color:" + x + "}" + "</style>");
                        }
                        $(this)
                                .find(".select-amount-btn")
                                .click(function (e) {
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
                        // Change currency
                        $(this)
                                .find("select")
                                .change(function () {
                                        var currency = $(this)
                                                .find("option:selected")
                                                .data("currency");
                                        $(this)
                                                .parent()
                                                .parent()
                                                .find("#js-currency-label")
                                                .text(currency);
                                });

                        // Submit data
                        function nextStepHandler(e, currency, amount) {
                                e.preventDefault();
                                var moneyDonated = currency + amount;
                                console.log(moneyDonated);
                        }
                        // Click event
                        $(this)
                                .find("input[name='membership_amount']")
                                .keypress(function (e) {
                                        if (e.which == 13) {
                                                e.preventDefault();
                                                // Get amount
                                                var amount = parseFloat($(this).val(), 10);
                                                // Get currency
                                                var currency = $(this)
                                                        .siblings(".currency-input-label")
                                                        .text();
                                                if (amount && (amount > 1 && amount <= 5000)) {
                                                        nextStepHandler(e, currency, amount);
                                                }
                                        }
                                });
                });
        });
}

