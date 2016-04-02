/* 
 * Paul Karcher
 *
 * controller:
 * Handles all game logic, tells the model
 * how to change the data.
 *
 * play:
 * The main function which is executed from the
 * new game button within the html. It relies
 * on the helper functions. Provides AI logic
 * to compete with the dealer and the human player.
 *
 * dealerTurn:
 * Provides logic for the dealer's turn such as
 * hitting at <= 17 as described in the project
 * specs as well as winning when everyone else busts.
 * Also handles who gets added to the winners to
 * be printed by the view when the controller sends that
 * order because the dealer's turn is last.
 *
 * hitHuman:
 * Allows for adding additional cards to the human's hand
 * activated by html button press.
  *
  * stayHuman:
 * Allows for stopping cards being able to be added to
 * the human's hand, activated by html button press.
 * Signals the end of the human's turn, game will
 * enter final winner logic and complete after.
 *
 *
 * globals are used but only for the sake of being
 * accessed within the functions exclusively on
 * this file, model/view never access them.
 *
 *
 *
 *
 *
 */

/* global game */

console.log("controller loaded.");


"use strict";

var playerStayed = false;
var playerBusted = false;
var bot1Busted = false;
var bot2Busted = false;
var blackJack = false;
var leadingTotal = 0;
var winners = [];


function play()
{
    var playerWon = false;
    var dealerWon = false;
    playerStayed = false;
    playerBusted = false;
    bot1Busted = false;
    bot2Busted = false;
    blackJack = false;
    leadingTotal = 0;
    winners = [];
    var receivedAce0 = false;
    var receivedAce1 = false;
    
    
    game.deck.resetDeck();
    game.human.resetHand();
    game.bot1.resetHand();
    game.bot2.resetHand();
    game.dealer.resetHand();
    
    
    game.dealCardToPlayer("human");
    game.dealCardToPlayer("bot1");
    game.dealCardToPlayer("bot2");
    game.dealCardToPlayer("dealer");
    
    
    game.dealCardToPlayer("human");
    game.dealCardToPlayer("bot1");
    game.dealCardToPlayer("bot2");
    game.dealCardToPlayer("dealer");
    
    
    generateHandsView(true, true, []);
    
    if ((game.human.getHand()[0].name === "Ace" ||
        game.human.getHand()[0].name === "Ace") &&
        game.human.getTotalValue() === 11)
    {
        if (game.human.getHand()[0].name === "Ace")
        {
            game.human.getHand()[0].setValue(11);
            game.human.calculateTotalValue();
        }
        alert("Blackjack! Player: " + game.human.getName());
        console.log("total value from blackjack check:");
        console.log(game.human.getTotalValue());
        playerWon = true;
        blackJack = true;
        
        winners.push("You");
        generateHandsView(false, false, []);
    }
    
    if (game.bot1.getTotalValue() === 21)
    {
        alert("Blackjack! Player: " + game.bot1.getName());
        console.log("total value from blackjack check:");
        console.log(game.bot1.getTotalValue());
        playerWon = true;
        blackJack = true;
        
        
        winners.push("AI #1");
        generateHandsView(false, false, []);
    }
    
    if (game.bot2.getTotalValue() === 21)
    {
        alert("Blackjack! Player: " + game.bot2.getName());
        console.log("total value from blackjack check:");
        console.log(game.bot2.getTotalValue());
        playerWon = true;
        blackJack = true;
        
        winners.push("AI #2");
        generateHandsView(false, false, []);
    }
    
    if (game.dealer.getTotalValue() === 21)
    {
        alert("Blackjack! Player: " + game.dealer.getName());
        console.log("total value from blackjack check:");
        console.log(game.dealer.getTotalValue());
        dealerWon = true;
        blackJack = true;
        
        winners.push("Dealer");
        generateHandsView(false, false, []);
    }
    
    console.log("playerBusted");
    console.log(playerBusted);
    console.log(playerStayed);
    
    if (blackJack)
    {
        generateHandsView(false, false, winners);
    }
    
    
    if (blackJack === false)
    {
        leadingTotal = game.human.getTotalValue();
        console.log("game.bot1.getTotalValue()");
        console.log(game.bot1.getTotalValue());
        while (game.bot1.getTotalValue() < 17 || game.bot1.getTotalValue() < leadingTotal)
        {
            game.dealCardToPlayer("bot1");
            generateHandsView(true, true, []);
            if (game.bot1.checkBust())
            {
                alert("Bot1 has busted.");
                bot1Busted = true;
                break;
            }
        }
        
        if (!game.bot1.checkBust() && game.bot1.getTotalValue() > leadingTotal)
        {
            leadingTotal = game.bot1.getTotalValue();
            console.log("leading total: ");
            console.log(leadingTotal);
        }
        
        
        console.log("game.bot2.getTotalValue()");
        console.log(game.bot2.getTotalValue());
        while (game.bot2.getTotalValue() < 17 || game.bot2.getTotalValue() < leadingTotal)
        {
            game.dealCardToPlayer("bot2");
            generateHandsView(true, true, []);
            if (game.bot2.checkBust())
            {
                alert("Bot 2 has busted.");
                bot2Busted = true;
                break;
            }
            
        }
        if (!game.bot2.checkBust() && game.bot2.getTotalValue() > leadingTotal)
        {
            leadingTotal = game.bot2.getTotalValue();
            console.log("leading total: ");
            console.log(leadingTotal);
        }
        
        
        if (game.human.hand[0].name === "Ace")
        {
            alert("it worked1");
            generateHandsView(true, true, []);
            var ace1 = confirm("You have received an Ace, Press OK to keep the default value of the Ace = 1 or Cancel if you want this Ace equal to 11");
            
            if (!(ace1))
            {
                game.human.hand[0].setValue(11);
                game.human.calculateTotalValue();
                
                if (game.human.checkBust())
                {
                    playerBusted = true;
                    
                    alert("You have busted.");
                    
                    stayHuman();
                }
                else
                {
                    /*if (game.human.getTotalValue() > leadingTotal)
                     {
                     leadingTotal = game.human.getTotalValue();
                     }*/
                    
                    generateHandsView(true, true, []);
                }
            }
        }
        
        
        if (game.human.hand[1].name === "Ace")
        {
            alert("it worked2");
            generateHandsView(true, true, []);
            var ace1 = confirm("You have received an Ace, Press OK to keep the default value of the Ace = 1 or Cancel if you want this Ace equal to 11");
            
            if (!(ace1))
            {
                game.human.hand[1].setValue(11);
                game.human.calculateTotalValue();
                
                
                if (game.human.checkBust())
                {
                    playerBusted = true;
                    
                    alert("You have busted.");
                    
                    stayHuman();
                }
                else
                {
                    /*if (game.human.getTotalValue() > leadingTotal)
                     {
                     leadingTotal = game.human.getTotalValue();
                     }*/
                    
                    generateHandsView(true, true, []);
                }
            }
            
        }
    }
}


function hitHuman()
{
    alert("You have chosen to hit.");
    
    var card = game.dealCardToPlayer("human");
    
    console.log("did we get an ace?");
    console.log(card.name);
    //alert(card.name);
    
    if (game.human.checkBust())
    {
        playerBusted = true;
        
        alert("You have busted.");
        
        stayHuman();
        
        /*
         * Reset all hands and deck.
         */
        
    }
    else
    {
        if (card.name === "Ace")
        {
            generateHandsView(true, true, []);
            var ace1 = confirm("You have received an Ace, Press OK to keep the default value of the Ace = 1 or Cancel if you want this Ace equal to 11");
            
            if (!(ace1))
            {
                game.human.hand[game.human.hand.length - 1].setValue(11);
                game.human.calculateTotalValue();
                
                
                if (game.human.checkBust())
                {
                    playerBusted = true;
                    
                    alert("You have busted.");
                    
                    stayHuman();
                }
                else
                {
                    /*if (game.human.getTotalValue() > leadingTotal)
                     {
                     leadingTotal = game.human.getTotalValue();
                     }*/
                    
                    generateHandsView(true, true, []);
                }
            }
            
        }
        
        /*if (game.human.getTotalValue() > leadingTotal && game.human.getTotalValue() <= 21)
         {
         leadingTotal = game.human.getTotalValue();
         }*/
        
        generateHandsView(true, true, []);
    }
    
    
    return game.human.checkBust();
    
}

function stayHuman()
{
    //alert("You have chosen to stay.");
    
    playerStayed = true;
    console.log(playerStayed);
    
    if (game.human.getTotalValue() > leadingTotal && game.human.getTotalValue() <= 21)
    {
        leadingTotal = game.human.getTotalValue();
    }
    
    
    generateHandsView(false, false, []);
    
    dealerTurn();
    
    return true;
}


function dealerTurn()
{
    if (playerBusted && bot1Busted && bot2Busted)
    {
        alert("Dealer has won due to everyone else busting.");
        winners.push("Dealer");
    }
    else
    {
        while (game.dealer.getTotalValue() < 17 || game.dealer.getTotalValue() < leadingTotal)
        {
            game.dealCardToPlayer("dealer");
            generateHandsView(false, false, []);
            
            if (game.dealer.checkBust())
            {
                alert("Dealer has busted.");
                break;
            }
        }
        
        if (game.dealer.getTotalValue() > leadingTotal && game.dealer.getTotalValue() <= 21)
        {
            leadingTotal = game.dealer.getTotalValue();
        }
        
        
        if (blackJack === false)
        {
            if (game.bot1.getTotalValue() === leadingTotal)
            {
                winners.push("AI #1");
            }
            if (game.bot2.getTotalValue() === leadingTotal)
            {
                winners.push("AI #2");
            }
            if (game.human.getTotalValue() === leadingTotal)
            {
                winners.push("You");
            }
            if (game.dealer.getTotalValue() === leadingTotal)
            {
                winners.push("Dealer");
            }
        }
    }
    
    
    console.log("winners after dealer");
    console.log(winners);
    
    
    generateHandsView(false, false, winners);
}