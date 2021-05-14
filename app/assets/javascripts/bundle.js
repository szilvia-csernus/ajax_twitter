/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
    
    followUser: (id, success, error) => {
        $.ajax({
            method: 'POST',
            url: `/users/${id}/follow`,
            dataType: 'json',
            success,
            error
        })
    },

    unfollowUser: (id, success, error) => {
        $.ajax({
            method: 'DELETE',
            url: `/users/${id}/follow`,
            dataType: 'json',
            success,
            error
        })
    },

};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

$(function() {
    $("button.follow-toggle").each((idx, button) => new FollowToggle(button, {}));
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map