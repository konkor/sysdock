#! /usr/bin/gjs

const Gio = imports.gi.Gio;
const Notify = imports.gi.Notify;
const GdkPixbuf = imports.gi.GdkPixbuf;

const APPDIR = getCurrentFile ()[1];
imports.searchPath.unshift(APPDIR);

let notificationTitle = ["Chromium", "Tilix", "Nautilus", "Firefox", "Hangouts"];

let notifications = [];

Notify.init("test");

notificationTitle.forEach(function(title) {
    let notification =new Notify.Notification ({
        summary: "Notification from " + title,
        icon_name: "dialog-information"
    });
    notification.set_app_name(title);
    let img = GdkPixbuf.Pixbuf.new_from_file(APPDIR + "/icons/" + title + ".png");//.scale_simple (128,128,GdkPixbuf.InterpType.TILES);
    if (img) notification.set_image_from_pixbuf (img);
    //notification.clear_actions ();
    notification.add_action("more", "See More...", function() {});
    notifications.push(notification);
});

notifications.forEach(function (notification) {
    let rndNb = (1 + Math.floor(Math.random() * 6));
    for (let i=1; i<rndNb; i++) {
    try {
        notification.body = "This is the notification number " + i + " from " + notification.app_name;
        notification.id = rndNb;
        notification.show();
    } catch(e) {
        log(e)
    }
}
});

function getCurrentFile () {
    let stack = (new Error()).stack;
    let stackLine = stack.split("\n")[1];
    if (!stackLine)
        throw new Error ("Could not find current file");
    let match = new RegExp ("@(.+):\\d+").exec(stackLine);
    if (!match)
        throw new Error ("Could not find current file");
    let path = match[1];
    let file = Gio.File.new_for_path (path);
    return [file.get_path(), file.get_parent().get_path(), file.get_basename()];
}
