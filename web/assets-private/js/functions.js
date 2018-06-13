function render(template, parameters) {
    for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            var reg = new RegExp('@'+key+'@', 'g');
            template = template.replace(reg, parameters[key]);
        }
    }

    return $(template);
}

function error(msg) {
    bootoast({
        message:msg,
        type: 'danger',
        position: 'top-center',
        icon: undefined,
        timeout: 3,
        animationDuration: 300,
        dismissable: true
    });
}

function warning(msg) {
    bootoast({
        message:msg,
        type: 'warning',
        position: 'top-center',
        icon: undefined,
        timeout: 3,
        animationDuration: 300,
        dismissable: true
    });
}

function success(msg) {
    bootoast({
        message:msg,
        type: 'success',
        position: 'top-center',
        icon: undefined,
        timeout: 3,
        animationDuration: 300,
        dismissable: true
    });
}

function info(msg) {
    bootoast({
        message: msg,
        type: 'info',
        position: 'bottom-left',
        icon: 'info-sign',
        timeout: 5,
        animationDuration: 300,
        dismissable: true
    });
}

function reload() {
    $.pjax.reload('.content-body', {
        fragment: '.content-body',
        timeout: 200000000,
        show: 'fade',
        cache: true,
        push: true
    })
}

function go(url) {
    $.pjax({
        url: url,
        container: '.content-body',
        fragment: '.content-body',
        timeout: 200000000,
        show: 'fade',
        cache: true,
        push: true,
        replace: false
    });
}

function handleNewMessage(data) {
    info(data.msg);

    var message  = data.data;
    var $messageCount = $('#MyMessageCount');

    if ($messageCount.length) {
        var originCount = parseInt($messageCount.text());
        if (originCount > 10) {
            return ;
        }
        $messageCount.text( + 1);
    } else {
        var $messageLabel = $('.nav-message-label');
        var messageLabel = $messageLabel.text();
        var newMessageLabel = messageLabel + '(<b id="MyMessageCount"></b>)';
        $messageLabel.html(newMessageLabel);
        $('b#MyMessageCount').text(1);
    }

    var html = render($('#message-item-tpl').html(), {
        content: message.content,
        username: message.sender_username,
        createdAt: message.createdAt,
        nickname: message.sender
    });

    $('li.messages ul').prepend(html);
}

function handleNewFollower(data) {
    info(data.msg);
    var $label = $('.notification-label');
    var text = $label.attr('data-origin');
    $label.html(text + '(<b style="color: red">new</b>)');
}

function handleNewChat(data) {
    $('.nav-chat-dot').addClass('push-notifications-count');
}

function path(route, parameters) {
    for (var k in parameters) {
        if (parameters.hasOwnProperty(k)) {
            route = route.replace(k, parameters[k]);
        }
    }
    return route;
}