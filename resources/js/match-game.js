var MatchGame = {};
$(document).ready(function() {
  let $game = $('#game');
  let value = MatchGame.generateCardValues();
  MatchGame.renderCards(value, $game);
})

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  let count = 1;
  let cardValues = [];
  for (let i = 0; i < 8; i++, count++) {
    cardValues.push(count);
    cardValues.push(count);
  }
  let arr = []
  while (cardValues.length > 0) {
    let index = cardValues.length - 1;
    randomIndex = Math.floor(Math.random() * cardValues.length);
    arr.push(cardValues[randomIndex]);
    cardValues.splice(randomIndex, 1);
  }
  return arr;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flipped', []);
  let hslValue = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
  $game.empty();
  for(let number = 0; number < cardValues.length; number++) {
    let $card = $('<div class="col-xs-3 card"></div>');
    $card.data('row', 1);
    $card.data('value', cardValues[number]);
    $card.data('flipped', false);
    $card.data('color', hslValue[cardValues[number] - 1]);
    $game.append($card);
  }
  $('.card').on('click', function() {
    MatchGame.flipCard($(this), $game);
  })

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($card.data('flipped') === true ) {
    return null;
  } else {
    $card.css('backgroundColor', $card.data('color'));
    $card.text($card.data('value'));
    $card.addClass('card-face-up');
    $card.addClass('card-face-up-number');
    $card.data('flipped', true);
  }
  $game.data('flipped').push($card);
  if($game.data('flipped').length === 2) {
    if($game.data('flipped')[0].data('value') === $game.data('flipped')[1].data('value')) {
      $game.data('flipped')[0].css({
        backgroundColor: 'rgb(153,153,153)',
        color: 'rgb(255,255,255)'
      });
      $game.data('flipped')[1].css({
        backgroundColor: rgb(153,153,153),
        color: rgb(255,255,255)
      });
    } else {
      let card1 = $game.data('flipped')[0];
      let card2 = $game.data('flipped')[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32,64,86)').text('').data('flipped', 'false');
        card2.css('background-color', 'rgb(32,64,86)').text('').data('flipped', 'false');

      }, 350);
      $game.data('flipped', []);
    }
  }

};
