$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $('#back-to-top').fadeIn()
    } else {
      $('#back-to-top').fadeOut()
    }
  })

  patchAssetIntoDom('/assets/logos/cc/logomark.svg')
  patchAssetIntoDom('/assets/logos/products/open_source.svg')

  // Check for click events on the navbar burger icon
  $('.navbar-burger').click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $('.navbar-burger').toggleClass('is-active')
    $('.navbar-menu').toggleClass('is-active')
  })

  $('.navbar-item.has-dropdown').click(function () {
    if ($('.navbar-burger').is(':visible')) {
      $(this).toggleClass('is-active')
    }
  })
  $('.navbar-item > .navbar-link').click(function (e) {
    if ($('.navbar-burger').is(':visible')) {
      e.preventDefault()
    }
  })
  $(window).resize(function () {
    if (
      !$('.navbar-burger').is(':visible') &&
      $('.navbar-item.has-dropdown.is-active').length
    ) {
      $('.navbar-item.has-dropdown.is-active').removeClass('is-active')
    }
  })

  // Internal Navigation for table of contents and table of progress component
  const hash = window.location.hash
  if (hash.length > 0) {
    $('.menu-list')
      .find('a[href="' + hash + '"]')
      .addClass('is-active')
    $('.step')
      .find('a[href="' + hash + '"]')
      .find('.number')
      .addClass('is-active')
  }

  $(window).on('hashchange', function () {
    const hash = window.location.hash
    $('.menu-list a[href*="#"]').closest('a').removeClass('is-active')
    $('.menu-list')
      .find('a[href="' + hash + '"]')
      .addClass('is-active')

    $('.step a[href*="#"]')
      .closest('a')
      .find('.number')
      .removeClass('is-active')
    $('.step')
      .find('a[href="' + hash + '"]')
      .find('.number')
      .addClass('is-active')
  })
})

const getFullyQualifiedUrl = (path, version) => {
  let baseUrl = 'https://unpkg.com/@creativecommons/vocabulary'
  if (version) {
    baseUrl = `${baseUrl}@${version}`
  }
  return `${baseUrl}/${path}`
}

const patchAssetIntoDom = (asset, version = null) => {
  const ajax = new XMLHttpRequest()
  ajax.open('GET', getFullyQualifiedUrl(asset, version), true)
  ajax.onload = () => {
    const div = document.createElement('div')
    // Render SVG in the page
    div.innerHTML = ajax.responseText
    div.style.display = 'none'
    document.body.insertBefore(div, document.body.childNodes[0])
  }

  ajax.send()
}
