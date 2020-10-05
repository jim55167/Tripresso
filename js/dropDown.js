$(document).ready(function () {
  $(".score").click(function () {
    // $('.dropdown-menu').slideToggle();
    // console.log($('.dropdown-menu').slideToggle());
    $(this).siblings().removeClass("menu-show");
    $(this).toggleClass("menu-show");
    // console.log($(this).removeClass("body"));
  });
});
