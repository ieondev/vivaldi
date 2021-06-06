$(document).ready(function () {
  setDateTime();
  setInterval(() => {
    setDateTime();
  }, 1000);

  // TODO: random image picker
  $('body').css('background-image', 'url(./imgs/background/image1.jpg)');

  $('.tabs-item.item-2').addClass('active');
  $('.tab-header-item').first().addClass('active');

  $('input').val('> ').focus();

  $('.tab-header-item').click((ev) => {
    $('.tab-header-item.active').removeClass('active');
    $(ev.target).addClass('active');
    linkTabs();
  });

  $(document).on('keydown', (ev) => {
    if (ev.which === 9) {
      ev.preventDefault();
      ev.stopPropagation();
      const $next = $('.tab-header-item.active').removeClass('active').next('.tab-header-item');
      $next.length ? $next.addClass('active') : $(".tab-header-item:first").addClass('active');
      linkTabs();

      if ($('.tabs-item.item-2').hasClass('active')) {
        $('input').val('> ').focus();
      }
    }
  });

  $(document).on('click', (ev) => {
    if ($('.tabs-item.item-2').hasClass('active')) {
      $('input').focus();
    }
  });

  $('input').on('keydown', (ev) => {
    let val = $('input').val();
    if (ev.which === 13 && val !== '> ') {
      window.location.href = 'http://duckduckgo.com/?q='+val.substring(2);
    }
    if (ev.which === 8 && val === '> ') {
      ev.preventDefault();
      ev.stopPropagation();
    }

  });

  $('input').on('keyup', (ev) => {
    let val = $('input').val();
    if (val.substring(0,2) !== '> ') {
      if (ev.which !== 8) {
        $('input').val('> '+ev.originalEvent.key);
      } else {
        $('input').val('> ');
      }

    }
  });

});

const setDateTime = () => {
  const dateTime = dayjs().format('LL dddd LTS');
  $('.date-time span').text(dateTime);
};

const linkTabs = () => {
  const activeTabHeader = $('.tab-header-item.active').attr('class').split(' ')[1];
  $('.tabs-item.active').removeClass('active');
  $(`.tabs-item.${activeTabHeader}`).addClass('active');
};
