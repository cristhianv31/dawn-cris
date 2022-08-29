class ContentCarousel extends HTMLElement {
  constructor() {
    super()

    const viewportNode = this.querySelector('.embla__viewport')

    // get options from data attributes
    const loop = this.dataset.loop === "true"
    const slidesToScroll = this.dataset.slidesToScroll || 1
    const startIndex = this.dataset.startIndex || 0
    const draggable = this.dataset.draggable === 'true'
    const slidesToShow = this.dataset.slidesToShow || 1
    const align = this.dataset.align || 'start'


    console.log(slidesToScroll)
    const options = {
      loop: loop,
      slidesToScroll: slidesToScroll,
      draggable: draggable,
      startIndex: parseInt(startIndex),
      align: align,
      slidesToShow: parseInt(slidesToShow)
    }
    const carousel = EmblaCarousel(viewportNode, options)

    const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
      prevBtn.addEventListener('click', embla.scrollPrev, false)
      nextBtn.addEventListener('click', embla.scrollNext, false)
    }


    const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
      return () => {
        if (embla.canScrollPrev()) prevBtn.style.opacity = '1'
        else prevBtn.style.opacity = '0'

        if (embla.canScrollNext()) nextBtn.style.opacity = '1'
        else nextBtn.style.opacity = '0'
      }
    }

    // Grab button nodes
    const prevButtonNode = this.querySelector('.embla__button--prev')
    const nextButtonNode = this.querySelector('.embla__button--next')

    const disablePrevAndNextBtns = disablePrevNextBtns(prevButtonNode, nextButtonNode, carousel)

    setupPrevNextBtns(prevButtonNode, nextButtonNode, carousel)

    // Add click listeners
    carousel.on("select", disablePrevAndNextBtns)
    carousel.on("init", disablePrevAndNextBtns)
  }
}

customElements.define('content-carousel', ContentCarousel)