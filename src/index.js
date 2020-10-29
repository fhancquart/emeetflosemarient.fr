import {main} from './js/main';
import {home} from './js/home';
import {galerie} from './js/galerie';
import css from "./scss/style.scss";
import TweenMax from "gsap/TweenMax";
import $ from "jquery";
import barba from '@barba/core';


var links = document.querySelectorAll('a[href]');
var cbk = function(e) {
  if(e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
  }
};

for(var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', cbk);
}

function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

// Function to add and remove the page transition screen
function pageTransition() {
  TweenMax.to("[data-barba-namespace='home']", 1.5, {
    css: {opacity: 0}
  });
}

// Function to animate the content of each page
function contentAnimation() {

}

barba.init({
  cacheIgnore: ['/galerie'],
  debug: true,
  views: [{
    namespace: 'home',
    afterEnter(data) {
      console.log('home Enter')
      new home();
    },
    beforeLeave(data) {
      console.log('home Leave')
    }
  }, {
    namespace: 'galerie',
    afterEnter(data) {
      console.log('galerie Enter')
      new galerie();
    },
    beforeLeave(data) {
      console.log('galerie Leave')
    }
  }],
  sync: true,
  transitions: [{

    async leave(data) {

      const done = this.async();

      pageTransition();
      await delay(1000);
      done();

    },

    async enter(data) {
      contentAnimation();
    },

    async once(data) {
      contentAnimation();
    }

  }]
});
