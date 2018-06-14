$(document).ready(function() {
  $('iframe').each(function() {
    var width = $(this).width();
    var height = width * .56;
    $(this).height(height);
  });
});
