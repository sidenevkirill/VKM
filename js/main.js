var initVkMeLanding = function() {
  init();

  function init() {
    initPopup();
    initParallax();
  }

  /**
   * Initialize popup with QR codes
   */
  function initPopup() {
    const container = document.querySelector('.popup');
    const qrElement = document.querySelector('.popup__qr');
    const closeElement = document.querySelector('.popup__close');
    const overlayElement = document.querySelector('.popup__overlay');
    const IOS_ANCHOR = 'ios-link-qr';
    const ANDROID_ANCHOR = 'android-link-qr';
    const popupHashes = [IOS_ANCHOR, ANDROID_ANCHOR];
    const qrCallers = document.querySelectorAll('.link-qr');

    Array.prototype.forEach.call(qrCallers, function(elem) {
      elem.addEventListener('click', function(e) {
        const target = e.target.getAttribute('data-target');

        openPopup(target);
        e.preventDefault();
        return false;
      });
    });

    if (closeElement) {
      closeElement.addEventListener('click', closePopup);
    }
    if (overlayElement) {
      overlayElement.addEventListener('click', closePopup);
    }

    /**
     * Opens popup
     *
     * @param {String} anchor url hash part
     * @return {void}
     */
    function openPopup(anchor) {
      const qrFilename = anchor === IOS_ANCHOR ? 'download' : 'pdalife';

      qrElement.src = 'img/' + qrFilename + '-qr.svg';
      container.classList.add('popup--visible');
    }

    /**
     * Closes popup
     *
     * @return {void}
     */
    function closePopup() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      container.classList.remove('popup--visible');
      window.scrollTo(0, scrollTop);
    }
  }

  function initParallax() {
    if (document.body.classList.contains('is_browser_safari')) {
      return;
    }
    const elem1 = document.querySelector('.phone--ios');
    const elem2 = document.querySelector('.phone--android');

    window.addEventListener('resize', checkEffect);
    checkEffect();

    function checkEffect() {
      const w = document.body.clientWidth;

      if (w > 940) {
        window.addEventListener('scroll', effectHandler);
        effectHandler();
      } else {
        window.removeEventListener('scroll', effectHandler);
      }
    }

    function effectHandler(e) {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      const clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
      const koef = -1 * scrollTop / (scrollHeight - clientHeight) + 0.5;

      document.documentElement.style.setProperty('--koef', koef);
    }
  }

};
