'use strict';

var overlay = document.querySelector('.modal-overlay');
var link = document.querySelector('.address .button');

var popup = document.querySelector('.modal');
var close = popup.querySelector('.modal-close');

var form = popup.querySelector('form');

var userName = popup.querySelector('[name=name]');
var userMail = popup.querySelector('[name=email]');
var letter = popup.querySelector('[name=letter]');

var isStorageSupport = true;
var storageName = '';
var storageMail = '';

try {
  storageName = localStorage.getItem('name');
  storageMail = localStorage.getItem('mail');
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function (evt) {
  evt.preventDefault();
  overlay.classList.add('overlay-show');
  popup.classList.add('modal-show');

  if (storageName) {
    userName.value = storageName;
    userMail.value = storageMail;
    letter.focus();
  } else {
    userName.focus();
  }
});

close.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('modal-show');
  popup.classList.remove('modal-error');
  overlay.classList.remove('overlay-show');
});

form.addEventListener('submit', function (evt) {
  if (!userName.value || !userMail.value || !letter.value) {
    evt.preventDefault();
    popup.classList.remove('modal-error');
    var fake = popup.offsetWidth; // Почему без этого не работает?
    var fake2 = fake;
    fake = fake2;
    popup.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', userName.value);
      localStorage.setItem('mail', userMail.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    popup.classList.remove('modal-show');
    overlay.classList.remove('overlay-show');
    if (popup.classList.contains('modal-error')) {
      popup.classList.remove('modal-error');
    }
  }
});

