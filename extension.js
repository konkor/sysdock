const Lang = imports.lang;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const St = imports.gi.St;
//const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension ();
const APPDIR = Me.dir.get_path ();

const NotifyIndicator = new Lang.Class({
    Name: "NotifyIndicator",
    Extends: PanelMenu.Button,

    _init: function () {
        this.parent (0.0, "Notifications Indicator", false);

        this.status = new St.Label ({text: "0", y_expand: true, y_align: 2});
        let _box = new St.BoxLayout();
        _box.add_actor(this.status);
        this.actor.add_actor (_box);
        this.actor.connect('button-press-event', Lang.bind(this, function () {
            //TODO rise sidebar
        }));
    }
});

let notifyindicator;

function init () {
}

function enable () {
    //notifyindicator = new NotifyIndicator;
    //Main.panel.addToStatusArea ("notify-indicator", notifyindicator);
}

function disable () {
    //notifyindicator.destroy ();
    notifyindicator = null;
}
