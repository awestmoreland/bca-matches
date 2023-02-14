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
          $(this).text('East');
        }
        if (~cellText.indexOf("Sands West")) {
          $(this).text('West');
        }
        if (~cellText.indexOf("Make-Up")) {
          $(this).text('Make-up');
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


});
