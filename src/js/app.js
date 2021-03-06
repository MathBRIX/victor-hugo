import Drop from 'tether-drop';
import $ from 'cash-dom';
import noUiSlider from 'nouislider';
import device from 'current-device';
import Plyr from 'plyr';

// Create flyout menus in top navigation

const options = {
  classes: 'drop-theme-arrows-bounce',
  position: 'bottom left',
  openOn: 'hover'
};

['product', 'company', 'login'].forEach(function(section) {
  new Drop(
    Object.assign({
      target: document.querySelector(`#${section}`),
      content: document.querySelector(`#${section}-dropdown`)
    }, options)
  );
});

// Toggle mobile navigation

function mobileNav() {
  if(!$('#show-mobile-nav').length) {
    return;
  }

  $('#show-mobile-nav').on('click', function() {
    $('#mobile-nav').css('left', 0);
    return false;
  });

  $('#hide-mobile-nav').on('click', function() {
    $('#mobile-nav').css('left', '-100%');
    return false;
  });
}

// Toggle YouTube video embed modal

function videoModal() {
  const containerEl = $('#splashreel-container');

  if (!containerEl.length) {
    return;
  }

  const videoWidth = containerEl.width();
  const videoHeight = videoWidth / 16 * 9;

  containerEl.css({
    height: videoHeight
  });

  new Plyr('#splashreel');
}

// Create players for MathBRIX Academy videos

function onboardingVideos() {
  const selector = '.onboarding-video';

  if (!$(selector).length) {
    return;
  }

  new Plyr.setup(selector);
}

// Create pricing slider

function pricingSlider() {
  if (!$('#pricing-slider').length) {
    return;
  }

  noUiSlider.create($('#pricing-slider')[0], {
    range: {
      min: 1,
      max: 100
    },
    start: 4,
    step: 1,
    connect: 'lower'
  }).on('update', function(values) {
    const val = parseInt(values[0]);
    $('#num-students').html(val);

    const baseQuantity = 4;
    const basePrice = 16;
    const addonQuantity = 1;
    const addonPrice = 4;
    const extraStudents = Math.max(val - baseQuantity, 0);
    const totalPrice = basePrice + addonPrice * Math.ceil(extraStudents / addonQuantity);
    const formattedPrice = Math.round(totalPrice) === totalPrice ?
      totalPrice.toFixed(0) : totalPrice.toFixed(2);

    $('#total-price').html(formattedPrice);
  });
}

// Show/hide and resize the game demo to proper dimensions

function gameDemo() {
  const el = $('#game-demo');

  if (!el.length) {
    return;
  }

  if (!device.desktop()) {
    el.css('display', 'none');
    $('#app-link-thumbnail').css('display', 'block');
    return;
  }

  el.prop('height', el.width() / 16 * 9);
}

$(document).ready(function() {
  mobileNav();
  videoModal();
  onboardingVideos();
  pricingSlider();
  gameDemo();
});
