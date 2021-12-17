$(function(){
    const HeaderSearchBtn = $(".shopping_nav .search_btn");
    const HeaderSearchForm = $("header form");

    HeaderSearchBtn.click(()=>{ HeaderSearchForm.toggleClass("active") });
})