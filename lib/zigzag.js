'use babel';

import _ from 'lodash';
import { CompositeDisposable } from 'atom';

import ZigzagCard from './zigzag-card';
import ZIGZAGS from './zigzags';
import {
  setupCards,
  shuffleCards,
} from './actions';

export default {

  cardView: null,
  cardModal: null,
  subscriptions: null,
  cards: null,

  activate(state) {
    this._setupSubscriptions();
    this._setupViews(state);
  },

  deactivate() {
    this.subscriptions.dispose();
    this._destroyViews();
  },

  serialize() {
    return {
      zigzagViewState: this.cardView.serialize()
    };
  },

  new() {
    if (!this.cards || !this.cards.length) {
      return this._startGame();
    }
    return alert('we have a game going already')
  },

  /**
   * [Draws card from current hand. Discards it when confirmed]
   * @return {[type]} [description]
   */
  draw() {
    if (!this.cards) {
      return alert("No cards. Start a new game.")
    }
    if (!this.cards.hand.length) {
      return alert("No more cards in hand")
    }
    const card = this._drawCard();
    this._showCard(card);
    setTimeout(()=>{
      this.cardModal.hide();
      this._discardFromHand(card);
    }, 8000)
  },

  _drawCard(cards){
    const shuffledCards = shuffleCards(this.cards.hand);
    const chosenCard = _.first(shuffledCards);
    return chosenCard;
  },

  _discardFromHand(card){
    _.pull(this.cards.hand, card);
  },

  _startGame(){
    const ok = confirm('Start a new game of Zig Zag?');
    if (!ok) return alert('See ya :(')

    this.cards = setupCards(ZIGZAGS);
    return alert('Started new game!');
  },

  _setupViews(){
    //
  },

  _showCard(card){
    this._setupCardView(card);
    this.cardModal.show();
  },

  _setupCardView(card){
    this.cardView = new ZigzagCard(card, {
      cardCount: this.cards.hand.length,
    });
    this.cardModal = atom.workspace.addModalPanel({
      item: this.cardView.getElement(),
      visible: false
    });
  },

  _setupSubscriptions(){
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zigzag:new': () => this.new()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zigzag:draw': () => this.draw()
    }));
  },

  _destroyViews(){
    this.cardView.destroy();
    this.cardModal.destroy();
  }

};
