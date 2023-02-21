$(function () {

  // Load data (keep it simple, stupid)
  $("#season-data").load("pooldata.php #tmpanel1", function () {

    // Remove bootstrap crap
    $("#season-data table, #season-data th, #season-data td").removeAttr('class');

    // Iterate through rows and clean up data
    $rows = $('#season-data tr');

    $rows.each(function () {
      // Remove unneeded columns
      $('*:nth-child(2), *:nth-child(3), *:nth-child(5), *:nth-child(6)', this).remove();

      // Trim headings and venue names (fragile)
      $('*', this).each(function () {
        cellText = $(this).text();
        $(this).text(cellText.replace(' Team', '').replace('Play ', ''));
        if (~cellText.indexOf("Eastside")) {
          $(this)
            .addClass('location-east')
            .text('East');
        }
        if (~cellText.indexOf("Sands West")) {
          $(this)
            .text('West')
            .addClass('location-west');
        }
        if (~cellText.indexOf("Make-Up")) {
          $(this)
            .text('Make-up')
            .addClass('location-tbd');
        }
      });
    });


    // Iterate through weeks, clean up data, and organize

    var daysOffset = 2;
    var archiveDate = new Date(Date.now() - daysOffset * 24 * 3600 * 1000)

    $weeks = $('#season-data > .card-body > .card');

    $weeks.each(function (index) {
      $(this).attr({ 'class': 'week', 'data-week': Number(index + 1) });
      weekString = $('.card-header', this).text().split('-')[1].trim();
      weekDate = new Date(weekString);

      // Any match scheduled to be played more than [dayOffset] days ago is moved to the archive.
      if (weekDate < archiveDate) {
        $(this).addClass('past-week').appendTo('#archive .weeks');
        $('th', this)
      }
      // All others are moved to the future.
      else {
        $(this).addClass('future-week').appendTo('#future .weeks');
      }
    });

    // First week in future is now considered the "latest match" (current week)
    $('#future .week:first-of-type')
      .removeClass('future-week')
      .addClass('current-week')
      .appendTo('#next .weeks');

  });

  // Toggle section weeks when header is clicked
  $('section').on('click', 'header', function () {
    $(this).toggleClass('expanded');
  });


  // Calculate race
  // ==========================================

  var $raceCalc = $('#race-calculator');
  var $p1rate = $('#player1', $raceCalc);
  var $p1race = $('#player1race', $raceCalc); // read-only field for result
  var $p2rate = $('#player2', $raceCalc);
  var $p2race = $('#player2race', $raceCalc); // read-only field for result

  // On-change, call raceCalc()
  $p1rate.on('change', raceCalc);
  $p2rate.on('change', raceCalc);


  function raceCalc() {

    // if either rating is blank, or less than zero, return
    if ($p1rate.val() == '' || $p2rate.val() == '' || $p1rate.val() < 0 || $p2rate.val() < 0) {
      return;
    }

    // Get player ratings
    p1rate = $p1rate.val();
    p2rate = $p2rate.val();

    // Choose higher rating
    if (p1rate >= p2rate) { // if ratings are equal, use p1rate
      $p1rate.attr('class', 'hi');
      $p2rate.attr('class', 'lo');
      hirate = p1rate;
      lorate = p2rate;
      console.log("p1rate is higher");
    }
    else {
      $p2rate.attr('class', 'hi');
      $p1rate.attr('class', 'lo');
      hirate = p2rate;
      lorate = p1rate;
      log("p2rate is higher");
    }

    // Calculate difference (A-B)
    rateDiff = Number(hirate - lorate);

    $result.text(rateDiff);

    // Choose lookup table based on higher score
    // Find race based on difference in scores

  }


});
