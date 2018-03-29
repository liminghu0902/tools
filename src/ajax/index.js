var ajax = function(options) {

    if(!$) {
        return;
    }

    var defaultConfig = {
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    var cfg = $.extend(defaultConfig, options || {});

    $.ajax(cfg)
        .done(function(data, textStatus, jqXHR) {

        }).fail(function(jqXHR) {
            
        })
}

var handleError = {
    error_404: {
        tit: '',
        msg: ''
    },
    error_401: {
        tit: '',
        msg: ''
    },
    default: {
        tit: '',
        msg: ''
    }
}

var handleErrorResponse = function() {

}

var handleResponse = function() {

}

