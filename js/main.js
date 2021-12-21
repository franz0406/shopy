$(function(){
    const HeaderSearchBtn = $(".shopping_nav .search_btn");
    const HeaderSearchForm = $("header form");

    HeaderSearchBtn.click(()=>{ HeaderSearchForm.toggleClass("active") });

    $(".main_slide ul").bxSlider({
        mode:'vertical',
        controls:false,
    });

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
        slide: function( event, ui ) {
            $("#from").val(ui.values[0]);
            $("#to").val(ui.values[1]);
        }
    });
    $( "#from" ).val($( ".price_range" ).slider( "values", 0 ));
    $( "#to" ).val($( ".price_range" ).slider( "values", 1 ));

})