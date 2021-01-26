$(function () {

    var chat = $.connection.testHub;

    var testid1 = '@ViewBag.TestId';
    var ques1 = '@ViewBag.Questions';

    // Start the connection.
    $.connection.hub.start().done(function () {

        console.log('Upload test Connection Established ');

        $('#start').click(function () {
            chat.server.sendTestMessage(testid1, ques1);
            console.log('code passed point');
        });
    });

    chat.client.updateConnectedUsers = function (n) {
        $('#conn').text('No of Students connected:' + n);
    };

    chat.client.testSubmittedUsers = function (n) {
        $('#sub').text('No of students submitted:' + n);
    };

});