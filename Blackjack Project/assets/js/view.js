/*
 * Paul Karcher
 * view:
 * Is only generated when called from the controller.
 * Controller tells the view the parameters for what to generate
 * otherwise only prints generated information to the html(index.html)
 */


console.log("view loaded.");

function generateHandsView(showHitStayButtons, dealerFaceDown, winners)
{
  //$('<img src="../img/PNG-cards-1.3/clubs/2_of_clubs.png">').appendTo("#human")
  //$('<img src="assets/img/PNG-cards-1.3/back.png" height="100" width="100">').appendTo("#human");

  //cardPath = '<img src="assets/img/PNG-cards-1.3/" + game.human.getHand[0] + "/.png" height="100" width="100">';

  $("#human").empty();
  $("#dealer").empty();
  $("#bot1").empty();
  $("#bot2").empty();
  $("#winners").empty();

  if (showHitStayButtons === true)
  {
    $("#hitHumanButton").show();
    $("#stayHumanButton").show();
  }
  else
  {
    $("#hitHumanButton").hide();
    $("#stayHumanButton").hide();
  }

  for (var i = 0; i <= game.human.getHand().length - 1; i++)
  {
    //console.log("game.human.getHand()[i]");
    //console.log(game.human.getHand()[i]);

    $('<img src="assets/img/PNG-cards-1.3/' +
            game.human.getHand()[i].suite + "/" +
            game.human.getHand()[i].name.toLowerCase() + "_of_" +
            game.human.getHand()[i].suite.toLowerCase() +
            '.png" height="100" width="100">').appendTo("#human");
  }

  $('<br><strong>Total Value: ' + game.human.getTotalValue() + '</strong>').appendTo("#human");

  for (var i = 0; i <= game.dealer.getHand().length - 1; i++)
  {
    //console.log("game.dealer.getHand()[i]");
    //console.log(game.dealer.getHand()[i]);

    if (i === 0 && dealerFaceDown)
    {
      $('<img src="assets/img/PNG-cards-1.3/back.png" height="100" width="100">').appendTo("#dealer");
    }
    else
    {
      $('<img src="assets/img/PNG-cards-1.3/' +
              game.dealer.getHand()[i].suite + "/" +
              game.dealer.getHand()[i].name.toLowerCase() + "_of_" +
              game.dealer.getHand()[i].suite.toLowerCase() +
              '.png" height="100" width="100">').appendTo("#dealer");
    }
  }

if (dealerFaceDown)
{
  $('<br><strong>Total Value: ' + game.dealer.hand[1].value + '</strong>').appendTo("#dealer");
}
else
{
  $('<br><strong>Total Value: ' + game.dealer.getTotalValue() + '</strong>').appendTo("#dealer");
}

  for (var i = 0; i <= game.bot1.getHand().length - 1; i++)
  {
    //console.log("game.bot1.getHand()[i]");
    //console.log(game.bot1.getHand()[i]);

    $('<img src="assets/img/PNG-cards-1.3/' +
            game.bot1.getHand()[i].suite + "/" +
            game.bot1.getHand()[i].name.toLowerCase() + "_of_" +
            game.bot1.getHand()[i].suite.toLowerCase() +
            '.png" height="100" width="100">').appendTo("#bot1");
  }

  $('<br><strong>Total Value: ' + game.bot1.getTotalValue() + '</strong>').appendTo("#bot1");

  for (var i = 0; i <= game.bot2.getHand().length - 1; i++)
  {
    //console.log("game.bot2.getHand()[i]");
    //console.log(game.bot2.getHand()[i]);

    $('<img src="assets/img/PNG-cards-1.3/' +
            game.bot2.getHand()[i].suite + "/" +
            game.bot2.getHand()[i].name.toLowerCase() + "_of_" +
            game.bot2.getHand()[i].suite.toLowerCase() +
            '.png" height="100" width="100">').appendTo("#bot2");
  }

  $('<br><strong>Total Value: ' + game.bot2.getTotalValue() + '</strong>').appendTo("#bot2");


  console.log("winners IN VIEW");
  console.log(winners);
  if (winners.length > 0)
  {
    //$("#winners").show();
    $('<br><h1>' + winners + '</h1>').appendTo("#winners");
  }
}

