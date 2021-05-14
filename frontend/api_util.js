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