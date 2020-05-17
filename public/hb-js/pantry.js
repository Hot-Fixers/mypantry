$(document).ready(function() {
    // MAIN MENU ****************************************
    $(".stock-btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        window.location.replace("/add");
    });

    $(".explore-btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        window.location.replace("/explore");
    });

    $(".back-btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        window.location.replace("/members");
    });

    // UPDATE EXISTING ITEMS IN PANTRY ***************************************

    // On click decrements the item amount by 1, to a minimum of 0.
    $(".dec-btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $(`[item=${$(this).attr("item")}][el=con]`).show();
    
        if ( $(`[item=${$(this).attr("item")}][el=quant]`).val() > 0 ) {
            $(`[item=${$(this).attr("item")}][el=quant]`).val((parseInt($(`[item=${$(this).attr("item")}][el=quant]`).val()) - 1));
        }
    });

    // On click increments the item amount by 1.
    $(".inc-btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(`[item=${$(this).attr("item")}][el=con]`).show();

        $(`[item=${$(this).attr("item")}][el=quant]`).val((parseInt($(`[item=${$(this).attr("item")}][el=quant]`).val()) + 1));
    });

    // On click deletes the item if the amount is 0, or updates the amount.
    $(".confirm-btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        const iId = $(this).attr("itemId");

        if ( $(`[item=${$(this).attr("item")}][el=quant]`).val() == 0) {
            $.ajax(`/api/ingredients/${iId}`, {
                type: "DELETE",
                data: {id: iId}
            }).then(() => {
                location.reload();
            });
        }
        else {
            $.ajax("api/ingredients", {
                type: "PUT",
                data: {
                    IngId: iId,
                    Amount: $(`[item=${$(this).attr("item")}][el=quant]`).val()
                }
            }).then(() => {
                location.reload();
            });
        };
    });

    // ADD NEW ITEMS TO PANTRY *******************************************

    $(".i-input").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(".add-btn").show();
    });

    $(".add-btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
       
        $.ajax("api/ingredients", {
            type: "POST",
            data: {
                Ingredients: $("[el=iName]").val().trim(),
                Amount: $("[el=iAmount]").val().trim(),
                UserId: $(this).attr("userid")
            }
        }).then(() => {
            location.reload();
        });
    });

    // RECIPES ****************************************

    // On click show recipe instructions modal
    $(".card-footer-item").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(`[rId=${$(this).attr("rId")}]`).addClass("is-active");
    });

    // Close modal
    $(".modal-close").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(".modal").removeClass("is-active");
    });
});