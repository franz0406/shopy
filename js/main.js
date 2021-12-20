$(function(){
    const HeaderSearchBtn = $(".shopping_nav .search_btn");
    const HeaderSearchForm = $("header form");

    HeaderSearchBtn.click(()=>{ HeaderSearchForm.toggleClass("active") });

    $(".main_slide ul").bxSlider({
        mode:'vertical',
        controls:false,
    });
})