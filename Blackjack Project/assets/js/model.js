/*
 * Paul Karcher
 * model:
 * Provides game class for which is only used by the controller
 * for the game logic.
 *
 * Card:
 * Provides suite, name and value properties for a card.
 *
 * Deck:
 * Collection of cards, provides shuffling functionality
 * as well as capability of dealing a card(removing a card
 * off the top and returning it). Resetting a deck is also
 * provided if a new full deck is desired after dealing cards.
 *
 * Player:
 * Has a hand of cards, can be dealt more cards to and
 * his hand value can be calculated. Resetting and
 * checking if the player has busted is also provided.
 * This class is used by all AI/Dealer and the human player.
 *
 * Game:
 * Provides all information needed for a game to begin:
 * contains a deck and players.
 * Allows for dealing cards directly to a player.
 *
 */

console.log("model loaded.");

"use strict";
function Card(suite, name, value)
{
  this.suite = suite;
  this.name = name;
  this.value = value;
}

Card.prototype.getSuite =
        function ()
        {
          return Card.suite;
        };
        
        
Card.prototype.getName =
        function ()
        {
          return Card.name;
        };

Card.prototype.getValue =
        function ()
        {
          return Card.value;
        };


Card.prototype.setValue =
        function (newValue)
        {
          this.value = newValue;
        };


function Deck()
{
  this.cards = [];

  this.createDeck();

  this.shuffleDeck();


  console.log(this.cards);

}

Deck.prototype.createDeck =
        function ()
        {
          var currentSuite;
          /*
           * 1 iterations for each suite
           */
          for (var i = 0; i <= 3; i++)
          {
            switch (i)
            {
              case 0:
                currentSuite = "Spades";
                break;
              case 1:
                currentSuite = "Clubs";
                break;
              case 2:
                currentSuite = "Hearts";
                break;
              case 3:
                currentSuite = "Diamonds";
                break;
            }
            for (var j = 2; j <= 14; j++)
            {
              switch (j)
              {
                /* Jack */
                case 11:
                  this.cards.push(
                          {"suite": currentSuite, "name": "Jack", "value": 10});
                  break;
                  /* Queen */
                case 12:
                  this.cards.push(
                          {"suite": currentSuite, "name": "Queen", "value": 10});
                  break;
                  /* King */
                case 13:
                  this.cards.push(
                          {"suite": currentSuite, "name": "King", "value": 10});
                  break;
                  /* Ace, assume default value or 1 to avoid busting before the
                   * user selects 1 or 11 */
                case 14:
                  this.cards.push(
                          {"suite": currentSuite, "name": "Ace", "value": 1});
                  break;
                  /* Number cards 1 through 10 */
                default:
                  this.cards.push(
                          {"suite": currentSuite, "name": j.toString(), "value": j});
                  break;
              }
            }
          }
        };


/*
 * shuffle each card into a random position
 */
Deck.prototype.shuffleDeck =
        function ()
        {
          console.log("random this.cards.length");
          console.log(this.cards.length);

          /* -1 because this.cards[52] is out of bounds.
           * 0-51 is the proper range */
          for (var i = 0; i <= this.cards.length - 1; i++)
          {
            var random_index = Math.floor((Math.random() * (this.cards.length - 1)));
            var tempCard = this.cards[random_index];

            //console.log(tempCard);
            //console.log(random_index);

            this.cards[random_index] = this.cards[i];
            this.cards[i] = tempCard;
          }
        };



Deck.prototype.dealCard =
        function ()
        {
          var topCard = this.cards[0];
          this.cards.splice(0, 1);

          return topCard;
        };


Deck.prototype.resetDeck =
        function ()
        {
          /*
           * clear array
           */
          this.cards = [];

          this.createDeck();
          this.shuffleDeck();
          console.log("new reset deck length");
          console.log(this.cards.length);
        };



function Player(name, ai)
{
  this.name = name;
  this.hand = [];
  this.totalValue = 0;
  this.ai = ai;
  this.preferredAceValue = 1;
}

Player.prototype.getName =
        function ()
        {
          return this.name;
        };

Player.prototype.getHand =
        function ()
        {
          return this.hand;
        };


/* deprecated
Player.prototype.getHandTotalValue =
        function ()
        {
          return this.totalValue;
        };
*/

Player.prototype.addCard =
        function (card)
        {
          this.hand.push(card);

          console.log(this.name);
          console.log("hand is ");
          console.log(this.hand);


          this.calculateTotalValue();

          return this.hand;
        };


Player.prototype.calculateTotalValue =
        function ()
        {
          this.totalValue = 0;

          for (var i = 0; i <= this.hand.length - 1; i++)
          {
            this.totalValue += this.hand[i].value;
            console.log(this.hand[i].value);
          }

          console.log(this.name);
          console.log("total value is");
          console.log(this.totalValue);

          return this.totalValue;
        };

Player.prototype.getTotalValue =
        function ()
        {
          return this.totalValue;
        };


Player.prototype.getName =
        function ()
        {
          return this.name;
        };


/*
 * deprecated
 */
Player.prototype.togglePreferredAceValue =
        function ()
        {
          if (this.preferredAceValue === 1)
          {
            this.preferredAceValue = 11;
          }
          else
          {
            this.preferredAceValue = 1;
          }
        };



Player.prototype.checkBust =
        function ()
        {
          /*
           * if user chooses to ace for value of 11
           * rather than default choice of 1.
           */
          if (this.totalValue > 21)
          {
            return true;
          }

          return false;
        };

Player.prototype.resetHand =
        function ()
        {
          /*
           * clear array
           */
          this.hand = [];

          this.calculateTotalValue();

          console.log("new reset hand");
          console.log(console.log(this.hand));
          console.log(this.calculateTotalValue());
        };






function Game(human, bot1, bot2, dealer)
{
  this.human = human;
  this.bot1 = bot1;
  this.bot2 = bot2;
  this.dealer = dealer;
  this.deck = new Deck();

  console.log("end of game");
  console.log(this.deck.cards.length);
  console.log(this.deck.cards);
}

Game.prototype.dealCardToPlayer =
        function (playerID)
        {
          var tempCard = this.deck.dealCard();
          
          var card = new Card(tempCard.suite, tempCard.name, tempCard.value);
          
          //alert(card.name);
          
          if (playerID === "human")
          {
            this.human.addCard(card);
          }
          if (playerID === "bot1")
          {
            if (card.name === "Ace" && this.bot1.getTotalValue() <= 10)
            {
              card.setValue(11);
            }
            this.bot1.addCard(card);
          }
          if (playerID === "bot2")
          {
            if (card.name === "Ace" && this.bot2.getTotalValue() <= 10)
            {
              card.setValue(11);
            }
            this.bot2.addCard(card);
          }
          if (playerID === "dealer")
          {
            if (card.name === "Ace" && this.dealer.getTotalValue() <= 10)
            {
              card.setValue(11);
            }
            this.dealer.addCard(card);
          }

          console.log("Card dealt");
          console.log(card.name);
          console.log(this.deck.cards.length);
          return card;
        };


var game = new Game(new Player("Human", false), new Player("AI #1", true),
        new Player("AI #2", true), new Player("Dealer", true));

