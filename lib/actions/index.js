'use babel';

import _ from 'lodash';

/**
 * [Shuffles card using Lodash]
 * @param  {[type]} cards [description]
 * @return {[type]}       [description]
 */
const shuffleCards = (cards) => {
  return _.shuffle(cards);
}

/**
 * [Builds a 20 card Hand from the Deck]
 * @param  {[type]} cards [description]
 * @return {[type]}       [description]
 */
const buildHand = (cards) => {
  let hand = [];
  for (let i = 0; i < 20; i++) {
    const shuffledCards = shuffleCards(cards);
    const chosenCard = _.first(shuffledCards);
    hand.push(chosenCard);
    _.pull(cards, chosenCard)
  }
  return _.compact(hand);
}

/**
 * Setups the cards to be used in the game
 * @param  {Array} cards  ZigZag Cards
 * @return {Object}       Sets up cards to be used in the game
 */
const setupCards = (cards) => {
  console.log('setupCards', cards);
  const game = {};
  game.deck = shuffleCards(cards);
  game.hand = buildHand(game.deck);
  return game;
}

export default {
  shuffleCards,
  buildHand,
  setupCards,
};
