$(document).ready(function() {

  if (!'IntersectionObserver' in window) {

  var imgs = document.querySelectorAll("img");

  var option = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  var fetchImage = url => {
    return new Promise((resolve, reject) => {
      var image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  };

  var loadImage = image => {
    var src = image.dataset.lazy;
    fetchImage(src).then(() => {
      image.src = src;
    });
  };

  var handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        loadImage(entry.target);
      }
    });
  };

  var observer = new IntersectionObserver(handleIntersection, option);

  imgs.forEach(img => {
    observer.observe(img);
  });

} else {

  Array.from(images).forEach(image => loadImage(image));

}
});
