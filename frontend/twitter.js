const FollowToggle = require("./follow_toggle");

$(function() {
    $("button.follow-toggle").each((idx, button) => new FollowToggle(button, {}));
});