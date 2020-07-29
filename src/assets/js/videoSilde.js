const videoSection = document.getElementById("jsVideosSection");
const videoList = document.getElementById("jsVidoesList");
const previous = document.getElementById("jsPrevious");
const next = document.getElementById("jsNext");

const UL_CSS = videoList.style;

// 현재 페이지의 css 내용 가져와서 정규식으로 숫자만 추출 후 해당 숫자 값에 따라 페이지 변환

const handlePrevious = async () => {
  if (UL_CSS.length) {
    const currentX = Number(UL_CSS.transform.replace(/[^0-9.]/g, ""));
    if (currentX > 0) {
      console.log(currentX - 100);
      UL_CSS.transform = `translateX(-${currentX - 100}%)`;
    }
  }
};

const handleNext = () => {
  if (UL_CSS.length) {
    const currentX = Number(UL_CSS.transform.replace(/[^0-9.]/g, ""));
    if (currentX < 400) {
      console.log(currentX + 100);
      UL_CSS.transform = `translateX(-${currentX + 100}%)`;
    }
  } else {
    UL_CSS.transform = "translateX(-100%)";
  }
};

const init = () => {
  previous.addEventListener("click", handlePrevious);
  next.addEventListener("click", handleNext);
};

if (videoSection) {
  init();
}
