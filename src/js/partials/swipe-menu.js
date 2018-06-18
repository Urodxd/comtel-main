$(document).ready(function() {
  var myElement = document.querySelector('body');
  var mc = new Hammer(myElement);

  var mobileMenu = {
    header: $('.header'),
    burger: $('.burger'),
    action: burgerAction,
    state: false
  };

  mc.on('panleft', function(ev) {
    if(mobileMenu.state) {
      mobileMenu.action('active');
      mobileMenu.state = false;
    }
  });

  mc.on('panright', function(ev) {
    if(!mobileMenu.state) {
      mobileMenu.action('active');
      mobileMenu.state = true;
    }
  });

  mobileMenu.burger.on('click', function() {
    mobileMenu.action('active');
  });

  function burgerAction(a) {
    this.header.toggleClass(a);
    this.burger.toggleClass(a);
    this.state = !this.state;
  }
});
