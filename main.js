// hamburguer menu
const $toggleButton = document.querySelector('.toggle-menu')
const $menu = document.querySelector('.menu')

// dark mode
const $toggleDark = document.querySelector('.toggle-dark')
const mqDark = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)')

// switch dark mode
function setToggleDarkState(dark) {
  const $circle = $toggleDark.querySelector('div')
  const $moon = $toggleDark.querySelector('#moon')
  // if not received dark arg, simply toggle
  if (!dark) dark = $circle.classList.contains('switch-dark') ? 'light' : 'dark'

  if (dark === 'dark') {
    $moon.src = '/img/Moon_fill.svg'
    $circle.classList.add('switch-dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    $moon.src = '/img/Moon_fill_light.svg'
    $circle.classList.remove('switch-dark')
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

// user dark mode select
function toggleDark() {
  setToggleDarkState()
  const darkState = document.documentElement.getAttribute('data-theme') == 'dark'
  if (darkState) {
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }
}

// if there is dark mode in localStorage use it, otherwise use the system choice
function detectColorScheme() {
  const localTheme = localStorage.getItem('theme')
  const mediaMatch = mqDark.matches
  const theme = localTheme ? (localTheme === 'dark' ? 'dark' : 'light') : (mediaMatch ? 'dark' : 'light')

  if (theme === 'dark') {
    setToggleDarkState('dark')
  } else {
    setToggleDarkState('light')
  }
}

// hamburger menu
const toggleMenu = (e) => {
  if ($menu.classList.contains('show')) {
    $menu.classList.remove('show')
    $toggleButton.children[0].style.display = 'block'
    $toggleButton.children[1].style.display = 'none'
  } else {
    $menu.classList.add('show')
    $toggleButton.children[0].style.display = 'none'
    $toggleButton.children[1].style.display = 'block'
  }
}

// listeners
// hamburger menu
$toggleButton.addEventListener('click', toggleMenu)
$toggleDark.addEventListener('click', toggleDark)

// dark mode
window.addEventListener('load', detectColorScheme)
mqDark.addEventListener('change', detectColorScheme)