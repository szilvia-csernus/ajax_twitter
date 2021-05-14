const APIUtil = require("./api_util");

class FollowToggle {
    constructor(el, options) {
        this.$el = $(el);
        this.userId = this.$el.data('user-id') || options.userId;
        this.followState = this.$el.data('initial-follow-state') || options.followState;
        
        this.render();
        this.$el.on('click', this.handleClick.bind(this));
    }

    render() {
        switch (this.followState) {
            case 'followed':
                this.$el.prop('disabled', false);
                this.$el.html('Unfollow!');
                break;
            case 'unfollowed':
                this.$el.prop('disabled', false);
                this.$el.html('Follow!');
                break;
            case 'following':
                this.$el.prop('disabled', true);
                this.$el.html('Following...');
                break;
            case 'unfollowing':
                this.$el.prop('disabled', true);
                this.$el.html('Unfollowing...');
                break;
        }
    }

    fetchSuccess() {
        this.followState = (this.followState === "followed") ? "unfollowed" : "followed";
        this.render();
        
    };

    fetchError() {
        console.log('An error occured during updating follow status.')
    };

    handleClick(event) {
        
        event.preventDefault();
        const followToggle = this;

        if (this.followState === "unfollowed") {
            //this.followState = 'following';
            //this.render();

            APIUtil.followUser(this.userId, this.fetchSuccess.bind(this), this.fetchError.bind(this))
            // $.ajax({
            //     type: 'POST',
            //     url: `/users/${this.userId}/follow`,
            //     dataType: 'json',
            //     success: this.fetchSuccess.bind(this),
            //     error: this.fetchError.bind(this)
            // })

        } else {
            //this.followState = 'unfollowing';
            //this.render();

            APIUtil.unfollowUser(this.userId, this.fetchSuccess.bind(this), this.fetchError.bind(this))
            // $.ajax({
            //     type: 'DELETE',
            //     url: `/users/${this.userId}/follow`,
            //     dataType: 'json',
            //     success: this.fetchSuccess.bind(this),
            //     error: this.fetchError.bind(this)
            // })
        }
        
    }

}

module.exports = FollowToggle;