$(function(){
    const HeaderSearchBtn = $(".shopping_nav .search_btn");
    const HeaderSearchForm = $("header form");

    HeaderSearchBtn.click(()=>{ HeaderSearchForm.toggleClass("active") });

    $(".main_slide ul").bxSlider({
        mode:'vertical',
        controls:false,
    });

    const detailsLink = $(".new_arrivals_list > li");
    
    detailsLink.click(function(){
        location.href = "./details.html";
    })

    // 상품상세 이미지 변경
    const productPictures = $(".product_pictures"),
          bigImg = productPictures.find(".big_img"),
          thumbImg = productPictures.find(".thumb_img li");

    thumbImg.click(function(){
        let imgSrc = $(this).find("img").attr("data-target");
        $(this).addClass("active").siblings().removeClass("active");
        bigImg.attr("src", `./images/${imgSrc}`);
    })

    // 상품 수량 가격 변경하기
    const quantity = $(".quantity");
    const quantityBtn = quantity.find("span");
    const quantityInput = quantity.find("input");
    const totalPrice = $(".total_price .price");
    let unitPrice = quantity.attr("data-unitprice");
    
    quantityBtn.click(function(){
        let CurrentValue = quantityInput.val();        
        
        if($(this).hasClass("plus")){
            quantityInput.val(++CurrentValue);
        } else {
            if(CurrentValue > 1){
                quantityInput.val(--CurrentValue);
            }
        }
        let priceValue = (unitPrice * CurrentValue).toLocaleString();

        totalPrice.text(priceValue + " $");

    })

    // 카테고리 필터    

    $( ".price_range" ).slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ 10, 500 ],
        create: function( event, ui ) {
            let slideVal = $(".price_filter .price_range span");
            let slideFitstVal = slideVal.filter(":first-of-type");
            let slideLastVal = slideVal.filter(":last-of-type");

            slideVal.html("<i></i>");
            
            slideFitstVal.find("i").text($( ".price_range" ).slider( "values", 0 ));
            slideLastVal.find("i").text($( ".price_range" ).slider( "values", 1 ));
        },
        slide: function( event, ui ) {
            let slideVal = $(".price_filter .price_range span");
            let slideFitstVal = slideVal.filter(":first-of-type");
            let slideLastVal = slideVal.filter(":last-of-type");

            slideVal.html("<i></i>");

            $("#from").val(ui.values[0]);
            $("#to").val(ui.values[1]);
            slideFitstVal.find("i").text(ui.values[0]);
            slideLastVal.find("i").text(ui.values[1]);
        }
    });
    $( "#from" ).val($( ".price_range" ).slider( "values", 0 ));
    $( "#to" ).val($( ".price_range" ).slider( "values", 1 ));

    $( "#from" ).change(function(){
        let inputVal = $(this).val();
        
        $( ".price_range" ).slider( "values", 0, inputVal );

        let slideVal = $(".price_filter .price_range span");
        let slideFitstVal = slideVal.filter(":first-of-type");

        slideFitstVal.html("<i></i>");
        
        slideFitstVal.find("i").text($( ".price_range" ).slider( "values", 0 ));
    });
    $( "#to" ).change(function(){
        let inputVal = $(this).val();
        
        $( ".price_range" ).slider( "values", 1, inputVal );

        let slideVal = $(".price_filter .price_range span");
        let slideLastVal = slideVal.filter(":last-of-type");

        slideLastVal.html("<i></i>");

        slideLastVal.find("i").text($( ".price_range" ).slider( "values", 1 ));
    });

    let sizeFilter = $(".size_filter input");
    let targetList = $(".new_arrivals_list > li");    

    // ISOTOPE 플러그인 상품 필터링
    let $filters = $(".combi_filters input");
    // init isotope
    let $grid = $('.new_arrivals_list').isotope({
        itemSelector: '.new_arrivals_list > li'
    });

    let filters = {};

    $($filters).click(function() {
        var $button = $(this);
        // get group key
        var $buttonGroup = $button.parents('div');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        // set filter for group
        filters[ filterGroup ] = $button.val();
        // combine filters
        var filterValue = concatValues( filters );
        // set filter for Isotope
        $grid.isotope({ filter: filterValue });

        if($button.val() == "*"){            
            $button.parent("div").find('input').prop('checked', false);
            $button.prop('checked', true);
        } else {
            $button.parent("div").find('input').eq(0).prop('checked', false);
        }
    });

    // flatten object by concatting values
    function concatValues( obj ) {
        var value = '';
        for ( var prop in obj ) {
        value += obj[ prop ];
        }
        return value;
    }

    $grid.isotope({filter:'*'});
})