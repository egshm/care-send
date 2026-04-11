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


// 全img要素の読込み完了を監視
//--------------------------------------------
function onAllImagesLoaded(callback) {
  const images = document.querySelectorAll("img");
  let loadedCount = 0;
  let isCalled = false;

  // callback の重複実行を防ぐ
  function done() {
    if (!isCalled) {
      isCalled = true;
      callback();
    }
  }

  // 画像が無い場合は即実行
  if (images.length === 0) {
    done();
    return;
  }

  images.forEach(image => {
    // すでに読込みが完了している場合
    if (image.complete) {
      loadedCount++;
      if (loadedCount === images.length) done();
      return;
    }

    // 読込みが完了した場合
    image.addEventListener('load', function() {
      loadedCount++;
      if (loadedCount === images.length) done();
    });

    // 読込みエラーの場合
    image.addEventListener('error', function() {
      loadedCount++;
      if (loadedCount === images.length) done();
    });
  });
}


// スムーススクロール
//--------------------------------------------

// ヘッダー
const header = document.getElementById('js-header');

// ページ内スムーススクロール
document.querySelectorAll('a[href^="#"]:not([href^="#!"]').forEach(function(anchor) {
  anchor.addEventListener("click", function(event) {
    // デフォルトのイベント動作をキャンセル
    event.preventDefault();

    // 遅延読込み画像を強制的に読込むように設定
    document.querySelectorAll('img[loading="lazy"]').forEach(lazyImage => {
      lazyImage.loading = "eager";
    });

    // 画像の読み込みがすべて完了したら処理を継続
    onAllImagesLoaded(function() {

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
});


// Slickスライダー
//--------------------------------------------

$('#js-slider').slick({
  slidesToShow: 2,
  slidesToScroll: 2,
  accessibility: false,
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
    event.preventDefault();

    const formData = new FormData(form);
    const endMsg = form.querySelector('.js-msgSubmitEnd');
    const xhr = new XMLHttpRequest();
    const XHR_STATE_DONE = 4;
    const DELAY_TIME = 300;

    xhr.open('POST', form.action, true);

    // Google FormsはCORSを許可しておらず、ブラウザによってレスポンスがブロックされる。
    // そのため、ステータスコード（status）は常に0となり、成功判定には使えない。
    // したがって、XHRクライアントの状態（readyState）を参照してリクエスト完了だけを監視する。
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XHR_STATE_DONE) {
        submitBtn.classList.remove('is-active');
        submitBtn.classList.add('is-hidden');
        setTimeout(() => {
          endMsg.classList.add('is-active');
        }, DELAY_TIME);

        form.reset();
        console.log(xhr.status);
      }
    }

    // フォームの入力内容を送信
    xhr.send(formData);
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
