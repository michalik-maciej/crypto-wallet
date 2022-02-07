let i = 1
let mouseWheel = true
function MouseWheelHandler(event: WheelEvent): void {
  console.log(event.deltaY)

  mouseWheel = false
  setTimeout(() => {
    mouseWheel = true
  }, 1000) // Stop mouse wheel event for 3 seconds
  // event = window.event || event
  const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail))
  const h = window.innerHeight
  const section = document.getElementsByClassName('section')
  if (i <= section.length && i >= 0) {
    // scrolling down?
    if (delta < 0) {
      window.scrollTo({
        top: h * i,
        behavior: 'smooth'
      })
      i += 1
    } else {
      // scrolling up?
      window.scrollTo({
        top: h * i,
        behavior: 'smooth'
      })
      i -= 1
    }
  } else {
    i = 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

export default MouseWheelHandler
