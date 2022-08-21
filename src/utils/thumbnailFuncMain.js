thumbnailImages.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    thumbnailImages.forEach((thumbnail) => {
      thumbnail.classList.remove("thumbnail__current");
    });
    thumbnail.classList.toggle("thumbnail__current");
    let thumbnailId = thumbnail.id.split("");
    thumbnailId = thumbnailId.filter((item) => {
      return parseInt(item);
    });
    thumbnailId = parseInt(thumbnailId.join(""));

    let size = productImages[0].clientWidth;
    imageSlider.style.transition = "none";
    imageSlider.style.transform = `translateX(${-size * thumbnailId}px)`;
    counter = thumbnailId;
  });
});
