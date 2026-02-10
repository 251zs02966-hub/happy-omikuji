'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0) { // ※修正：langth -> length
      return;
    }

    // 表示エリアの初期化
    resultDivision.innerText = '';
    while (tweetDivision.firstChild) {
      tweetDivision.removeChild(tweetDivision.firstChild);
    }

    // おみくじ結果表示エリアの作成
    const header = document.createElement('h3');
    header.innerText = 'おみくじ結果';
    resultDivision.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    // ツイートエリアの作成
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('ハッピーおみくじ') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result); // 診断結果が入るように変更
    anchor.innerText = '結果をツイートする';

    tweetDivision.appendChild(anchor);
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

// Enterキーでもおみくじを引けるようにする
userNameInput.addEventListener(
  'keydown',
  (event) => {
    if (event.code === 'Enter') {
      assessmentButton.click();
    }
  }
);

// 全てが大吉のハッピーなメッセージリスト
const answers = [
  '###userName###さんは【超ハッピー大吉】！今日は何をやっても笑いが止まらない最高の一日になります！',
  '###userName###さんは【ミラクル大吉】！探していたものや、欲しかったチャンスが向こうからやってきます！',
  '###userName###さんは【スマイル大吉】！あなたの笑顔が周りを幸せにし、素敵な出会いを引き寄せます。',
  '###userName###さんは【ラッキー大吉】！自販機で当たりが出るレベルの小さな幸せが100個くらい起きます！',
  '###userName###さんは【全肯定大吉】！今のままのあなたが最高です。自信を持って突き進んでください！',
  '###userName###さんは【サンシャイン大吉】！太陽のような明るさで、周囲の悩みを吹き飛ばしてしまいます！',
  '###userName###さんは【モグモグ大吉】！今日食べるものは全部世界一美味しく感じられます！',
  '###userName###さんは【ワクワク大吉】！ずっとやりたかったことに挑戦する絶好のタイミングです！'
];

/**
 * 名前の文字列を渡すと結果を返す関数
 */
function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('###userName###', userName);
  return result; //
}