// ハンバーガーメニュー
//--------------------------------------------

// ハンバーガーメニューボタン
const hamburger = document.getElementById('js-hamburger');
// ハンバーガーメニュー
const menu = document.querySelector('.js-spmenu');
// 各メニュー項目
const menuItems = document.querySelectorAll('.js-spmenuItem');

// ハンバーガーメニューボタンがクリックされた時
hamburger.addEventListener('click', function() {

  const expanded = this.getAttribute('aria-expanded');

  // メニューが開くとき
  if (expanded === 'false') {
    this.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  }
  // メニューが閉じるとき
  else {
    this.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }
});

// メニュー項目がクリックされた時
menuItems.forEach(item => {
  item.addEventListener('click', function() {
    // ハンバーガーメニューを閉じる
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
    menu.setAttribute('aria-hidden', 'true');
  });
});


// スムーススクロール
//--------------------------------------------

// ヘッダー
const header = document.getElementById('js-header');

// ページ内スムーススクロール
document.querySelectorAll('a[href^="#"]:not([href^="#!"]').forEach(function(anchor) {
  anchor.addEventListener("click", function(event) {
    // デフォルトのイベント動作をキャンセル
    event.preventDefault();

    const id = anchor.getAttribute("href");
    const target = document.querySelector(id === "#" || id === "" ? "html" : id);

    if (target) {
      const headerHeight = header.offsetHeight;
      // ターゲット要素のドキュメント全体における絶対位置からヘッダー高さを引いた位置を算出
      const position = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      // ターゲット位置までスムーススクロール
      window.scrollTo({
        top: position,
        behavior: "smooth"
      });
    }
  });
});


// Slickスライダー
//--------------------------------------------

$('#js-slider').slick({
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: true,
  prevArrow: '<button class="p-case__slide-arrow p-case__slide-arrow--left"><img src="images/arrow-left.png" alt="前のスライドを表示" width="20" height="20"></button>',
  nextArrow: '<button class="p-case__slide-arrow p-case__slide-arrow--right"><img src="images/arrow-right.png" alt="次のスライドを表示" width="20" height="20"></button>',
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }]
});


// アコーディオン
//--------------------------------------------

// アコーディオンアニメーション
const accordions = document.querySelectorAll('.js-details');

accordions.forEach(accordion => {
  const summary = accordion.querySelector('.js-summary');
  const content = accordion.querySelector('.js-content');
  const durationTime = 400;
  const easing = 'linear';

  summary.addEventListener('click', (e) => {
    e.preventDefault();
    // 閉じるアニメーション
    if (accordion.open) {
      const closeDetails = content.animate(
        {
          opacity: [1, 0],
          height: [content.offsetHeight + 'px', 0],
        },
        {
          duration: durationTime,
          easing: easing,
        }
      );
      // 開閉ボタン（横棒）
      const horizBar = summary.animate(
        {
          rotate: ["180deg", "0deg"],
        },
        {
          duration: durationTime,
          pseudoElement: "::before",
          easing: easing,
          fill: 'forwards',
        }
      );
      // 開閉ボタン（縦棒）
      const vertBar = summary.animate(
        {
          rotate: ["90deg", "0deg"],
          opacity: [0,1]
        },
        {
          duration: durationTime,
          pseudoElement: "::after",
          easing: easing,
          fill: 'forwards',
        }
      );
      closeDetails.onfinish = () => {
        accordion.removeAttribute('open');
      }
    // 開くアニメーション
    } else {
      accordion.setAttribute('open', 'true');
      const openDetails = content.animate(
        {
          opacity: [0, 1],
          height: [0, content.offsetHeight + 'px'],
        },
        {
          duration: durationTime,
          easing: easing,
        }
      );
      // 開閉ボタン（横棒）
      const horizBar = summary.animate(
        {
          rotate: ["0deg", "180deg"],
        },
        {
          duration: durationTime,
          pseudoElement: "::before",
          easing: easing,
          fill: 'forwards',
        }
      );
      // 開閉ボタン（縦棒）
      const vertBar = summary.animate(
        {
          rotate: ["0deg", "90deg"],
          opacity: [1,0]
        },
        {
          duration: durationTime,
          pseudoElement: "::after",
          easing: easing,
          fill: 'forwards',
        }
      );
    }
  });
});


// フォーム送信
//--------------------------------------------

document.querySelectorAll('.js-form').forEach(form => {

  // フォームの全入力項目
  const inputs = form.querySelectorAll('input');
  
  // 送信ボタン
  const submitBtn = form.querySelector('.js-btnSubmit');
  
  // 入力チェック対象フィールド
  const requiredFields = [
    'entry.614544490',
    'entry.569966614',
    'entry.1558711951',
    'entry.1412484714',
    'entry.1972106247'
  ];
  
  // 入力イベントを監視し、必須項目がすべて入力されれば送信ボタンを有効化
  inputs.forEach(input => {
    input.addEventListener('input', validateForm);
  });
  
  // フォーム送信
  form.addEventListener('submit', function(event) {
    // デフォルトのイベント動作をキャンセル
    event.preventDefault();
    const formData = new FormData(form);
    const endMsg = form.querySelector('.js-msgSubmitEnd');
    const delayTime = 300;
    fetch(form.action, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    }).finally(() => {
      submitBtn.classList.remove('is-active');
      submitBtn.classList.add('is-hidden');
      setTimeout(() => {
        endMsg.classList.add('is-active');
      }, delayTime);
    });
  });
  
  function validateForm() {
    // 必須項目がすべて入力されたかチェック
    const isFilled = requiredFields.every(name => {
      const field = form.querySelector(`[name="${name}"]`);
      return field && field.value.trim() !== '';
    });
  
    if (isFilled) {
      submitBtn.disabled = false;
      submitBtn.classList.add('is-active');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('is-active');
    }
  }
});


// ふわっと表示
//--------------------------------------------

$(".js-inview").on("inview", function (event, isInView) {
  if (isInView) {
    $(this).stop().addClass("is-show");
  }
});
