//vc_checkbox
$ = jQuery;
function pixflow_pixflowSliderDependency_skin() {
    'use strict';
    var $sliderSkin = $('select[name="slider_skin"]');
    skinChanged($sliderSkin.val());
    function skinChanged(skin) {
        var $noneClassic = $('.classic-hidden'),
            $noneVertical = $('.vertical-hidden');
        if ('classic' == skin) {
            $noneClassic.addClass('vc-dependency-hidden1');
            $noneVertical.removeClass('vc-dependency-hidden1');
        } else if ('vertical' == skin) {
            $noneVertical.addClass('vc-dependency-hidden1');
            $noneClassic.removeClass('vc-dependency-hidden1');
        }
    }

    $sliderSkin.change(function () {
        var skin = $(this).val();
        skinChanged(skin);
        pixflow_pixflowSliderDependency_btn();
    });

}
var run = 0;
function pixflow_pixflowSliderDependency_btn() {
    'use strict';
    if (run > 2) {
        return;
    }
    for (var k = 1; k <= 5; k++) {
        var $btn1 = $('input[data-name="slide_btn1_' + k + '"]'),
            $btn2 = $('input[data-name="slide_btn2_' + k + '"]');
        btnChanged($btn1.is(":checked"), 1, k);
        btnChanged($btn2.is(":checked"), 2, k);
        $btn1.change(function () {
            var $btn = $(this),
                slideNum = $btn.attr('data-name').substr(-1, 1);
            btnChanged($btn.is(":checked"), 1, slideNum);
        });
        $btn2.change(function () {
            var $btn = $(this),
                slideNum = $btn.attr('data-name').substr(-1, 1);
            btnChanged($btn.is(":checked"), 2, slideNum);
        });
    }
    function btnChanged(status, btn, slide) {
        var $btnDependency = $('.slide_btn' + btn + '_' + slide + '_dependency');
        if (false == status) {
            $btnDependency.addClass('vc-dependency-hidden2');
        } else {
            $btnDependency.removeClass('vc-dependency-hidden2');
        }
    }

    run++;
}

$('input.md_vc_checkbox[type="checkbox"]').each(function () {
    var $this = $(this),
        $input = $this,
        $input2 = $('input[el-id="' + $this.attr('el-id') + '"].md_vc_checkbox_field');

    $this.click(function () {
        if ($this.is(":checked")) {
            $input.val('yes').trigger('change');
            $input2.attr('id', $input2.attr('name') + '-yes');
            $input2.val('yes').trigger('keyup');
        } else {
            $input.val('no').trigger('change');
            $input2.attr('id', $input2.attr('name') + '-no');
            $input2.val('no').trigger('keyup');
        }
    });
});

function pixflow_pixflowSliderDependency_contentType() {
    var $slideContentType = $('select[name*="slide_content_type"]');

    function contentChanged($this, type) {
        var parent = $this.closest('.wpb_el_type_dropdown'),
            name = $this.attr('name'),
            num = parseInt(name.charAt(name.length - 1));
        if (type == 'text') {
            /* show text option */
            parent.nextAll('div[data-vc-shortcode-param-name=slide_title_' + num + ']').css('display', 'block');
            parent.nextAll('div[data-vc-shortcode-param-name=slide_title_color_' + num + ']').css('display', 'block');

            /* Hide image option */
            parent.nextAll('div[data-vc-shortcode-param-name=slide_content_image_' + num + ']').css('display', 'none');

        } else {
            /* hide text options */
            parent.nextAll('div[data-vc-shortcode-param-name=slide_title_' + num + ']').css('display', 'none');
            parent.nextAll('div[data-vc-shortcode-param-name=slide_title_color_' + num + ']').css('display', 'none');

            /* show image option */
            parent.nextAll('div[data-vc-shortcode-param-name=slide_content_image_' + num + ']').css('display', 'block');

        }
    }

    $slideContentType.each(function () {
        $(this).change(function () {
            var type = $(this).val(),
                name = $(this).attr('name');
            contentChanged($(this), type);

        });
    });
}
//vc_color
var $ = jQuery;
$("input.md_vc_colorpicker").each(function () {
    var t = $(this).attr("opacity"), a = $(this).attr("id") + "_alpha";
    $(this).after('<span class="color-value" style="color:#ddd" id="value_' + $(this).attr("id") + '"></span>');
    var cancel_text = ( $('body').hasClass('compose-mode') ) ? 'Cancel' : '' ;
    var e = $(this);
    $(this).spectrum({
        color: e.attr("value"),
        showAlpha: t,
        clickoutFiresChange: !0,
        preferredFormat: "hex",
        chooseText: "Choose",
        cancelText: cancel_text,
        showInput: !0,
        className: a,
        change: function (t) {
            $(this).attr("value", t.toRgbString()), $(this).val(t.toRgbString());
            {
                var i = /\w+/g;
                t.toRgbString().match(i), $("div." + a + " div.sp-preview div.sp-preview-inner")
            }
            $("." + a + " input.custom-color").val(t.toHexString()), $("#value_" + e.attr("id")).html(t.toHexString())
        }
    });

    $(this).on( "dragstop.spectrum" , function() {
        builder.should_close_shortcode_setting_panel = false;
        return false;
    });

    var i = e.spectrum("get");
    $("#value_" + e.attr("id")).html(i.toHexString()), $("." + a + " input.custom-color").keypress(function () {
        e.spectrum("set", $(this).val())
    });
    {
        var r = /\w+/g;
        $(this).attr("value").match(r), $("div." + a + " div.sp-preview div.sp-preview-inner")
    }
    "true" == t ? ($("ad." + a + " .alpha-feature", "." + a + " .alpha-feature").css("display", "block"), $("." + a + " .sp-input").css("top", "25px")) : ($("." + a + " .alpha-feature").css("display", "none"), $("." + a + " .sp-fill").css("padding-top", "45%"), $("." + a + " .sp-top").css("margin-bottom", "12px"))
}), $(".vc_panel").not("div.sp-container,.sp-replacer").on("mousedown", function () {
    $("div.sp-container").addClass("sp-hidden")
});
$(document).off('reflow.spectrum');
$(document).on('reflow.spectrum',function (e) {
    var $clicked_color_picker = $(e.target).closest('.param-md-vc-colorpicker');
    if ( ! $clicked_color_picker.length ) return;

    var clicked_element_id = $clicked_color_picker.find('> input').attr('id'),
        active_color_picker_pallet = $('#'+clicked_element_id).spectrum("container");
    active_color_picker_pallet.css('left',active_color_picker_pallet.offset().left);
})
//vc_gradient
$('.gradient-color-picker-popup').click(function(){
    var id = $(this).attr('data-preview-id');
    $('.gradient-popup[data-preview-id='+id+']').toggleClass("opened");
});

$(document).bind("click", function (t) {
    var d = $(t.target);
    if(!d.parents().hasClass("gradient-popup") && !d.hasClass('gradient-color-picker-popup')){
        $('.gradient-popup').removeClass("opened");
    }
});

function pixflow_updateDesimal(t, a) {
    return a >= 1 ? t.substr(0, t.length - 3) : a >= .1 ? t.substr(0, t.length - 1) : .1 > a ? t : void 0
}
function pixflow_vc_makeGradient(t, a, r, e) {
    var o = $("#" + t).attr("pos1") + "%", n = $("#" + t).attr("pos2") + "%";
    if ("" == a || "undefined" == typeof a)var a = $("#" + t).attr("col1");
    if ("" == r || "undefined" == typeof r)var r = $("#" + t).attr("col2");
    if ("" == e || "undefined" == typeof e)var e = $("#angleValue-" + t).attr("value");
    var i;
    e = parseInt(e), i = 90 >= e ? 90 - e : 360 - (e - 90);
    var s = [];
    s[0] = a, s[1] = "-moz-linear-gradient(" + e + "deg, " + a + " " + o + ", " + r + " " + n + ")", s[2] = "-webkit-gradient(" + e + "deg, left bottom, color-stop(" + o + ", " + a + "), color-stop(" + n + ", " + r + "))", s[3] = "-webkit-linear-gradient(" + e + "deg, " + a + " " + o + ", " + r + " " + n + ")", s[4] = "-o-linear-gradient(" + e + "deg, " + a + " " + o + ", " + r + " " + n + ")", s[5] = "-ms-linear-gradient(" + e + "deg, " + a + " " + o + ", " + r + " " + n + ")", s[6] = "linear-gradient(" + i + "deg, " + a + " " + o + ", " + r + " " + n + ")", $("#" + t+' ,span[data-preview-id='+t+']').css("background", "none"), s.forEach(function (a) {
        $("#" + t+' ,span[data-preview-id='+t+']').css("background", a + ',url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==")')
    });
    var l = {color1: a, color2: r, color1Pos: $("#" + t).attr("pos1"), color2Pos: $("#" + t).attr("pos2"), angle: e};
    $("#input-" + t).val(JSON.stringify(l))
}
$(".gradient_color_picker").each(function () {
    var t = $(this), a = t.get(0), r = parseInt(t.attr("pos1")), e = parseInt(t.attr("pos2"));
    noUiSlider.create(a, {start: [r, e], range: {min: 0, max: 100}});
    var o = $(this).attr("id"), n = $(this).find(".noUi-handle");
    n.first().append('<span class="color-preview lower"></span>'), n.first().attr("gradient-id", o), n.first().addClass("gradient_color_handle"), n.last().append('<span class="color-preview upper"></span>'), n.last().attr("gradient-id", o), n.last().addClass("gradient_color_handle"), a.noUiSlider.on("update", function (t, a) {
        var r = o;
        $(".color-preview.lower").css("background-color", $("#" + r).attr("col1")), $(".color-preview.upper").css("background-color", $("#" + r).attr("col2")), $("#" + r).attr("pos1", t[0]), $("#" + r).attr("pos2", t[1]), pixflow_vc_makeGradient(r)
    })
}), $(".gradient_color_picker_angle").each(function () {
    var t = $(this), a = t.get(0);
    noUiSlider.create(a, {
        start: [t.attr("angle")],
        step: 1,
        range: {min: 0, max: 360}
    }), a.noUiSlider.on("update", function (a) {
        $("#angleValue-" + t.attr("gID")).val(pixflow_updateDesimal(a[0], 1)), $("#angleValue-" + t.attr("gID")).attr("value", pixflow_updateDesimal(a[0], 1)), pixflow_vc_makeGradient(t.attr("gID"), "", "", pixflow_updateDesimal(a[0], 1))
    });
    var r = t.parent().find(".gradient-angle");
    r.keypress(function (t) {
        13 == t.which && a.noUiSlider.set($(this).val());
        if (13 == t.which)return false;
    })
}), $(".gradient_color_handle").each(function () {
    var t, a = $(this), r = a.attr("gradient-id"), e = $(this).attr("id") + "_alpha";
    t = a.hasClass("noUi-handle-lower") ? $("#" + r).attr("col1") : $("#" + r).attr("col2"), $(this).spectrum({
        color: t,
        showAlpha: !0,
        clickoutFiresChange: !0,
        chooseText: "Choose",
        cancelText: "Cancel" ,
        showInput: !0,
        className: e,
        change: function (t) {
            $("." + e + " input.custom-color").val(t.toHexString()), $(this).find(".color-preview").css("background-color", t.toRgbString()), $(this).hasClass("noUi-handle-lower") ? ($("#" + r).attr("col1", t.toRgbString()), pixflow_vc_makeGradient(r, t.toRgbString())) : $(this).hasClass("noUi-handle-upper") && ($("#" + r).attr("col2", t.toRgbString()), pixflow_vc_makeGradient(r, "", t.toRgbString()))
        }
    });
    var o = a.spectrum("get");
    $("." + e + " input.custom-color").val(o.toHexString()), $("." + e + " input.custom-color").keypress(function () {
        a.spectrum("set", $(this).val())
    })
});
var $ = jQuery;
//vc_icon
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=2b35412dfcc05c812d4a)
 * Config saved to config.json and https://gist.github.com/2b35412dfcc05c812d4a
 */
var $ = jQuery;
if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var i = t(this), n = i.data("bs.tooltip"), s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || i.data("bs.tooltip", n = new o(this, s)), "string" == typeof e && n[e]())
        })
    }

    var o = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    o.VERSION = "3.3.5", o.TRANSITION_DURATION = 150, o.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, o.prototype.init = function (e, o, i) {
        if (this.enabled = !0, this.type = e, this.$element = t(o), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector)throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != r) {
                var p = "hover" == r ? "mouseenter" : "focusin", a = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(p + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
    }, o.prototype.getDefaults = function () {
        return o.DEFAULTS
    }, o.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, o.prototype.getDelegateOptions = function () {
        var e = {}, o = this.getDefaults();
        return this._options && t.each(this._options, function (t, i) {
            o[t] != i && (e[t] = i)
        }), e
    }, o.prototype.enter = function (e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), e instanceof t.Event && (o.inState["focusin" == e.type ? "focus" : "hover"] = !0), o.tip().hasClass("in") || "in" == o.hoverState ? void(o.hoverState = "in") : (clearTimeout(o.timeout), o.hoverState = "in", o.options.delay && o.options.delay.show ? void(o.timeout = setTimeout(function () {
                    "in" == o.hoverState && o.show()
                }, o.options.delay.show)) : o.show())
    }, o.prototype.isInStateTrue = function () {
        for (var t in this.inState)if (this.inState[t])return !0;
        return !1
    }, o.prototype.leave = function (e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), e instanceof t.Event && (o.inState["focusout" == e.type ? "focus" : "hover"] = !1), o.isInStateTrue() ? void 0 : (clearTimeout(o.timeout), o.hoverState = "out", o.options.delay && o.options.delay.hide ? void(o.timeout = setTimeout(function () {
                    "out" == o.hoverState && o.hide()
                }, o.options.delay.hide)) : o.hide())
    }, o.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i)return;
            var n = this, s = this.tip(), r = this.getUID(this.type);
            this.setContent(), s.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && s.addClass("fade");
            var p = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement, a = /\s?auto?\s?/i, l = a.test(p);
            l && (p = p.replace(a, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(p).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var h = this.getPosition(), f = s[0].offsetWidth, c = s[0].offsetHeight;
            if (l) {
                var u = p, d = this.getPosition(this.$viewport);
                p = "bottom" == p && h.bottom + c > d.bottom ? "top" : "top" == p && h.top - c < d.top ? "bottom" : "right" == p && h.right + f > d.width ? "left" : "left" == p && h.left - f < d.left ? "right" : p, s.removeClass(u).addClass(p)
            }
            var v = this.getCalculatedOffset(p, h, f, c);
            this.applyPlacement(v, p);
            var g = function () {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", g).emulateTransitionEnd(o.TRANSITION_DURATION) : g()
        }
    }, o.prototype.applyPlacement = function (e, o) {
        var i = this.tip(), n = i[0].offsetWidth, s = i[0].offsetHeight, r = parseInt(i.css("margin-top"), 10), p = parseInt(i.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(p) && (p = 0), e.top += r, e.left += p, t.offset.setOffset(i[0], t.extend({
            using: function (t) {
                i.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), i.addClass("in");
        var a = i[0].offsetWidth, l = i[0].offsetHeight;
        "top" == o && l != s && (e.top = e.top + s - l);
        var h = this.getViewportAdjustedDelta(o, e, a, l);
        h.left ? e.left += h.left : e.top += h.top;
        var f = /top|bottom/.test(o), c = f ? 2 * h.left - n + a : 2 * h.top - s + l, u = f ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(c, i[0][u], f)
    }, o.prototype.replaceArrow = function (t, e, o) {
        this.arrow().css(o ? "left" : "top", 50 * (1 - t / e) + "%").css(o ? "top" : "left", "")
    }, o.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, o.prototype.hide = function (e) {
        function i() {
            "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }

        var n = this, s = t(this.$tip), r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i(), this.hoverState = null, this)
    }, o.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, o.prototype.hasContent = function () {
        return this.getTitle()
    }, o.prototype.getPosition = function (e) {
        e = e || this.$element;
        var o = e[0], i = "BODY" == o.tagName, n = o.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {width: n.right - n.left, height: n.bottom - n.top}));
        var s = i ? {
                top: 0,
                left: 0
            } : e.offset(), r = {scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()}, p = i ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, r, p, s)
    }, o.prototype.getCalculatedOffset = function (t, e, o, i) {
        return "bottom" == t ? {
                top: e.top + e.height,
                left: e.left + e.width / 2 - o / 2
            } : "top" == t ? {
                    top: e.top - i,
                    left: e.left + e.width / 2 - o / 2
                } : "left" == t ? {
                        top: e.top + e.height / 2 - i / 2,
                        left: e.left - o
                    } : {top: e.top + e.height / 2 - i / 2, left: e.left + e.width}
    }, o.prototype.getViewportAdjustedDelta = function (t, e, o, i) {
        var n = {top: 0, left: 0};
        if (!this.$viewport)return n;
        var s = this.options.viewport && this.options.viewport.padding || 0, r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var p = e.top - s - r.scroll, a = e.top + s - r.scroll + i;
            p < r.top ? n.top = r.top - p : a > r.top + r.height && (n.top = r.top + r.height - a)
        } else {
            var l = e.left - s, h = e.left + s + o;
            l < r.left ? n.left = r.left - l : h > r.right && (n.left = r.left + r.width - h)
        }
        return n
    }, o.prototype.getTitle = function () {
        var t, e = this.$element, o = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call(e[0]) : o.title)
    }, o.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, o.prototype.tip = function () {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length))throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, o.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, o.prototype.enable = function () {
        this.enabled = !0
    }, o.prototype.disable = function () {
        this.enabled = !1
    }, o.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, o.prototype.toggle = function (e) {
        var o = this;
        e && (o = t(e.currentTarget).data("bs." + this.type), o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o))), e ? (o.inState.click = !o.inState.click, o.isInStateTrue() ? o.enter(o) : o.leave(o)) : o.tip().hasClass("in") ? o.leave(o) : o.enter(o)
    }, o.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = o, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var i = t(this), n = i.data("bs.popover"), s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || i.data("bs.popover", n = new o(this, s)), "string" == typeof e && n[e]())
        })
    }

    var o = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
    o.VERSION = "3.3.5", o.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "top",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), o.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), o.prototype.constructor = o, o.prototype.getDefaults = function () {
        return o.DEFAULTS
    }, o.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), o = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof o ? "html" : "append" : "text"](o), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, o.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, o.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, o.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = o, t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(jQuery);
/* ========================================================================
 * Bootstrap: bootstrap-iconpicker.js v1.6.0 by @recktoner
 * https://victor-valencia.github.com/bootstrap-iconpicker
 * ========================================================================
 * Copyright 2013-2014 Victor Valencia Rico.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
!function (t) {
    "use strict";
    var e = function (o, s) {
        this.$element = t(o), this.options = t.extend({}, e.DEFAULTS, this.$element.data()), this.options = t.extend({}, this.options, s)
    };
    e.ICONSET_EMPTY = {iconClass: "", iconClassFix: "", icons: []}, e.ICONSET = {
        _custom: null,
        elusiveicon: t.iconset_elusiveicon || e.ICONSET_EMPTY,
        fontawesome: t.iconset_fontawesome || e.ICONSET_EMPTY,
        ionicon: t.iconset_ionicon || e.ICONSET_EMPTY,
        glyphicon: t.iconset_glyphicon || e.ICONSET_EMPTY,
        mapicon: t.iconset_mapicon || e.ICONSET_EMPTY,
        octicon: t.iconset_octicon || e.ICONSET_EMPTY,
        typicon: t.iconset_typicon || e.ICONSET_EMPTY,
        weathericon: t.iconset_weathericon || e.ICONSET_EMPTY
    }, e.DEFAULTS = {
        arrowClass: "",
        arrowNextIconClass: "glyphicon glyphicon-arrow-right",
        arrowPrevIconClass: "glyphicon glyphicon-arrow-left",
        cols: 4,
        icon: "",
        iconset: "glyphicon",
        labelHeader: "{0} / {1}",
        labelFooter: "{0} - {1} of {2}",
        placement: "bottom",
        rows: 4,
        search: !0,
        searchText: "Search icon",
        selectedClass: "btn-warning",
        unselectedClass: "btn-default"
    }, e.prototype.bindEvents = function () {
        var e = this.options, o = this;
        e.table.find(".btn-previous, .btn-next").off("click").on("click", function () {
            var s = parseInt(t(this).val(), 10);
            o.changeList(e.page + s)
        }), e.table.find(".btn-icon").off("click").on("click", function () {
            o.select(t(this).val()), o.$element.popover("destroy")
        }), e.table.find(".search-control").off("keyup").on("keyup", function () {
            o.changeList(1)
        })
    }, e.prototype.changeList = function (t) {
        this.filterIcons(), this.updateLabels(t), this.updateIcons(t), this.options.page = t, this.bindEvents()
    }, e.prototype.filterIcons = function () {
        var o = this.options, s = o.table.find(".search-control").val();
        if ("" === s) o.icons = e.ICONSET[o.iconset].icons; else {
            var n = [];
            t.each(e.ICONSET[o.iconset].icons, function (t, e) {
                e.toLowerCase().indexOf(s) > -1 && n.push(e)
            }), o.icons = n
        }
    }, e.prototype.removeAddClass = function (t, e, o) {
        return this.options.table.find(t).removeClass(e).addClass(o), o
    }, e.prototype.reset = function () {
        this.updatePicker(), this.changeList(1)
    }, e.prototype.select = function (e) {
        var o = this.options, s = this.$element;
        o.selected = t.inArray(e.replace(o.iconClassFix, ""), o.icons), -1 === o.selected && (o.selected = 0, e = o.iconClassFix + o.icons[o.selected]), "" !== e && o.selected >= 0 && (o.icon = e, s.find("input").val(e), s.find("i").attr("class", "").addClass(o.iconClass).addClass(e), s.trigger({
            type: "change",
            icon: e
        }), o.table.find("button." + o.selectedClass).removeClass(o.selectedClass))
    }, e.prototype.switchPage = function (e) {
        var o = this.options;
        if (o.selected = t.inArray(e.replace(o.iconClassFix, ""), o.icons), "" !== e && o.selected >= 0) {
            var s = Math.ceil((o.selected + 1) / this.totalIconsPerPage());
            this.changeList(s)
        }
        o.table.find("i." + e).parent().addClass(o.selectedClass)
    }, e.prototype.totalPages = function () {
        return Math.ceil(this.totalIcons() / this.totalIconsPerPage())
    }, e.prototype.totalIcons = function () {
        return this.options.icons.length
    }, e.prototype.totalIconsPerPage = function () {
        return this.options.cols * this.options.rows
    }, e.prototype.updateArrows = function (t) {
        var e = this.options, o = this.totalPages();
        1 === t ? e.table.find(".btn-previous").addClass("disabled") : e.table.find(".btn-previous").removeClass("disabled"), t === o || 0 === o ? e.table.find(".btn-next").addClass("disabled") : e.table.find(".btn-next").removeClass("disabled")
    }, e.prototype.updateIcons = function (e) {
        for (var o = this.options, s = o.table.find("tbody").empty(), n = (e - 1) * this.totalIconsPerPage(), i = 0; i < o.rows; i++) {
            for (var a = t("<tr></tr>"), c = 0; c < o.cols; c++) {
                var r = n + i * o.cols + c, p = t('<button class="btn ' + o.unselectedClass + ' btn-icon"></button>').hide();
                if (r < o.icons.length) {
                    var l = o.iconClassFix + o.icons[r];
                    p.val(l).attr("title", l).append('<i class="' + o.iconClass + " " + l + '"></i>').show(), o.icon === l && p.addClass(o.selectedClass).addClass("btn-icon-selected")
                }
                a.append(t("<td></td>").append(p))
            }
            s.append(a)
        }
    }, e.prototype.updateIconsCount = function () {
        var t = this.options, e = ["<tr>", '   <td colspan="' + t.cols + '" class="text-center">', '       <span class="icons-count"></span>', "   </td>", "</tr>"];
        t.table.find("tfoot").empty().append(e.join(""))
    }, e.prototype.updateLabels = function (t) {
        var e = this.options, o = this.totalIcons(), s = this.totalPages();
        e.table.find(".page-count").html(e.labelHeader.replace("{0}", 0 === s ? 0 : t).replace("{1}", s));
        var n = (t - 1) * this.totalIconsPerPage(), i = t * this.totalIconsPerPage();
        e.table.find(".icons-count").html(e.labelFooter.replace("{0}", n + 1).replace("{1}", o > i ? i : o).replace("{2}", o)), this.updateArrows(t)
    }, e.prototype.updatePagesCount = function () {
        for (var e = this.options, o = t("<tr></tr>"), s = 0; s < e.cols; s++) {
            var n = t('<td class="text-center"></td>');
            if (0 === s || s === e.cols - 1) {
                var i = ['<button class="btn btn-arrow ' + (0 === s ? "btn-previous" : "btn-next") + " " + e.arrowClass + '" value="' + (0 === s ? -1 : 1) + '">', '<span class="' + (0 === s ? e.arrowPrevIconClass : e.arrowNextIconClass) + '"></span>', "</button>"];
                n.append(i.join("")), o.append(n)
            } else 0 === o.find(".page-count").length && (n.attr("colspan", e.cols - 2).append('<span class="page-count"></span>'), o.append(n))
        }
        e.table.find("thead").empty().append(o)
    }, e.prototype.updatePicker = function () {
        var t = this.options;
        if (t.cols < 4)throw"Iconpicker => The number of columns must be greater than or equal to 4. [option.cols = " + t.cols + "]";
        if (t.rows < 1)throw"Iconpicker => The number of rows must be greater than or equal to 1. [option.rows = " + t.rows + "]";
        this.updatePagesCount(), this.updateSearch(), this.updateIconsCount()
    }, e.prototype.updateSearch = function () {
        var e = this.options, o = ["<tr>", '   <td colspan="' + e.cols + '">', '       <input type="text" class="form-control search-control" style="width: ' + 39 * e.cols + 'px;" placeholder="' + e.searchText + '">', "   </td>", "</tr>"];
        o = t(o.join("")), e.search === !0 ? o.show() : o.hide(), e.table.find("thead").append(o)
    }, e.prototype.setArrowClass = function (t) {
        this.options.arrowClass = this.removeAddClass(".btn-arrow", this.options.arrowClass, t)
    }, e.prototype.setArrowNextIconClass = function (t) {
        this.options.arrowNextIconClass = this.removeAddClass(".btn-next > span", this.options.arrowNextIconClass, t)
    }, e.prototype.setArrowPrevIconClass = function (t) {
        this.options.arrowPrevIconClass = this.removeAddClass(".btn-previous > span", this.options.arrowPrevIconClass, t)
    }, e.prototype.setCols = function (t) {
        this.options.cols = t, this.reset()
    }, e.prototype.setIcon = function (t) {
        this.select(t)
    }, e.prototype.setIconset = function (o) {
        var s = this.options;
        t.isPlainObject(o) ? (e.ICONSET._custom = t.extend(e.ICONSET_EMPTY, o), s.iconset = "_custom") : s.iconset = e.ICONSET.hasOwnProperty(o) ? o : e.DEFAULTS.iconset, s = t.extend(s, e.ICONSET[s.iconset]), this.reset(), this.select(s.icon)
    }, e.prototype.setLabelHeader = function (t) {
        this.options.labelHeader = t, this.updateLabels(this.options.page)
    }, e.prototype.setLabelFooter = function (t) {
        this.options.labelFooter = t, this.updateLabels(this.options.page)
    }, e.prototype.setPlacement = function (t) {
        this.options.placement = t
    }, e.prototype.setRows = function (t) {
        this.options.rows = t, this.reset()
    }, e.prototype.setSearch = function (t) {
        var e = this.options.table.find(".search-control");
        t === !0 ? e.show() : e.hide(), e.val(""), this.changeList(1), this.options.search = t
    }, e.prototype.setSearchText = function (t) {
        this.options.table.find(".search-control").attr("placeholder", t), this.options.searchText = t
    }, e.prototype.setSelectedClass = function (t) {
        this.options.selectedClass = this.removeAddClass(".btn-icon-selected", this.options.selectedClass, t)
    }, e.prototype.setUnselectedClass = function (t) {
        this.options.unselectedClass = this.removeAddClass(".btn-icon", this.options.unselectedClass, t)
    };
    var o = t.fn.iconpicker;
    t.fn.iconpicker = function (o, s) {
        return this.each(function () {
            var n = t(this), i = n.data("bs.iconpicker"), a = "object" == typeof o && o;
            if (i || n.data("bs.iconpicker", i = new e(this, a)), "string" == typeof o) {
                if ("undefined" == typeof i[o])throw'Iconpicker => The "' + o + '" method does not exists.';
                i[o](s)
            } else {
                var c = i.options;
                c = t.extend(c, {
                    page: 1,
                    selected: -1,
                    table: t('<table class="table-icons"><thead></thead><tbody></tbody><tfoot></tfoot></table>')
                });
                var inputClass = n.attr("input-class");
                var inputValue = n.attr("value");
                var r = "undefined" != typeof n.attr("name") ? 'name="' + n.attr("name") + '"' : "";
                n.empty().append("<i></i>").append('<input class="' + inputClass + '" type="hidden" ' + r + ' type="text" />').append('<span class="px-icon icon-arrow-down6 inactive-text-color"></span>'), n.addClass("iconpicker"), i.setIconset(c.iconset), n.on("click", function (t) {
                    t.preventDefault(), n.popover({
                        animation: !1,
                        trigger: "manual",
                        html: !0,
                        content: c.table,
                        container: "body",
                        placement: "bottom",
                    }).on("shown.bs.popover", function () {
                        i.switchPage(c.icon), i.bindEvents()
                    }), n.data("bs.popover").tip().addClass("iconpicker-popover"), n.popover("show")
                })
            }
        })
    }, t.fn.iconpicker.Constructor = e, t.fn.iconpicker.noConflict = function () {
        return t.fn.iconpicker = o, this
    }, t(document).on("click", "body", function (e) {
        t(".iconpicker").each(function () {
            t(this).is(e.target) || 0 !== t(this).has(e.target).length || 0 !== t(".popover").has(e.target).length || t(this).popover("destroy")
        })
    }), t('button[role="iconpicker"]').iconpicker()
}(jQuery);


var $ = jQuery;
!function ($) {
    $.noConflict();
    $('.iconpicker').each(function () {
        $(this).iconpicker()
            .iconpicker('setArrowPrevIconClass', 'px-icon icon-Left')
            .iconpicker('setArrowNextIconClass', 'px-icon icon-Right2')
            .iconpicker('setCols', 7)
            .iconpicker('setIconset', {
                iconClass: 'px-icon',
                iconClassFix: 'icon-',
                icons: [
                    "empty", "bell3", "hamburger-menu", "search5", "shopping-cart", "zigzag", "rating", "play-curve", "close", "shopcart2", "search3", "notification", "Apple", "Cherries", "Grapes", "Tomato", "Peach", "Brocoli", "Oliver", "Carrot", "Garlic", "Lemon", "2SeatedSofa", "Strawberry", "Watermelon", "Avocado", "Pineapple", "Eggplant", "Pumpkin", "Grains", "WorkingDesk", "OfficeChair", "Paddle", "ButcherKnife", "ChefKnife", "Spoon", "Cutlery", "Salad", "MartiniGlass", "Dairy", "Meatballs", "GlassofWater", "BeerPint", "Doughnut", "FrostedCupcake", "TeaInfuser", "Teapot", "BoilingStew", "FryingPan", "TeaCup", "CoffeeCup", "GroceryBag", "StrippedIcecream", "ConeGelato", "HotDog", "Hamburger", "Taco", "FrenchFries", "Snowflake", "ChristmasTree", "ChristmasShopping", "Decorations", "GingerbreadCookie", "Mittens", "Cookies", "OutdoorLamp", "OutdoorLamp2", "Toffee", "Candy", "Jawbreaker", "Globe", "CozyArmchair", "CandyCane", "RoomLamp", "ElectricHeater", "Snowman", "GingerbreadHouse", "StrawberryJam", "Fireplace", "Cross", "Spider", "Skull", "SodaCan", "Pumpkin2", "WashingMachine", "King", "Cheddar", "BarbequeFeast", "AddProfiles", "SuccessFile", "SyncCloud", "EditMail", "PartyHat", "SlicedPizz", "Baloons", "BathTub", "LuckyHorseshoe", "BeerKeg", "JapanesseSalad", "Bread", "FlowerPot", "Toast", "HaunchofMeat", "MinecraftBone", "Steak", "Church", "EasterEggs", "HotDish", "LightBulb", "Shrimp", "Dices", "KitchenGlove", "FullMoon", "Cards", "Microwave", "Owl", "Fish", "ChampagneGlasses", "Pie", "DopeMix", "VacuumCleaner", "ChargingBattery", "DriveLicense", "Rich", "Time-Tracking2", "Ointment", "MovetoTop", "MovetoBottom", "Expand", "Move", "PiggyBank", "Target", "Radar", "Internet", "Money", "CapsuledPills", "Coins", "Maps", "Track", "Favorite", "Star", "Like2", "Health", "Dislike", "CloudSync", "CloudDownload", "CloudUpload", "Cloud", "Megaphone", "Wi-Fi", "Airdrop", "ThumbsDown", "ThumbsUp", "Share", "Calculator", "Calculator2", "TurnOff", "Help1", "Warning1", "Success", "Error", "VolumeDown", "VolumeUp", "Down", "CD", "MusicalNote", "MovieCamera", "Camera", "Movie", "Picture2", "Video2", "Locked3", "Profile", "Users", "Send", "Location", "Compass", "Siri", "ONOFFSwitch", "Bluetooth", "DialPad", "Unlink", "TrashBin", "Layers", "Windows", "Menu", "Hide", "View2", "Home", "Search", "Search2", "Flag", "Vector", "ReadingList", "Bank", "Stamp", "Check", "TimeisMoney", "Store", "Cube", "Football", "PlasteredFoot", "Settings", "Iphones", "Pin", "Diamond", "Hairpin", "Fingerprint", "Privacy", "Iphone5", "TV", "iMac", "LandscapeIpad", "Ipad", "OldiMac", "GraphPresentation", "ChartPresentation", "Magnet", "Stethoscope", "FirstAIdKit", "Safety", "Wheelchair", "PrescriptionFile", "Controls3", "3DCoordinates", "Controls4", "SelectObjectSide", "Bookmark", "Store2", "Bookmark2", "Flag2", "Cashier", "USBCable", "Badminton", "IphoneChargingCable", "Clock", "Marksmanship", "POS", "AlarmClock", "BaseballBat", "Brain", "FaxScan", "Edit", "Cup", "World-Wide", "Tennis", "World-Wide2", "IceSkates", "Gift", "GrowingStats", "DecreasingStats", "Graph2", "Graph3", "RollerSkates", "SpiralTool", "GraphicTabletIntuos", "SoccerBall", "Volleyball", "Baseball", "Basketball", "PieChart22", "InboxFile", "LeftSidebar", "BandagedFoot", "Settings5", "Settings8", "Bicycle", "Down2", "Up", "Upload", "Download", "Iphone6", "Up2", "SpeedDial", "Whistle", "PingPong", "Safebox", "Stopwatch", "InvestmentStock", "Medal", "SNESController", "File", "Checklist", "OpenFolder", "Binder", "Chess", "Darts", "Fantasia", "Bowling", "FullWallet", "Moon", "OpenSign", "Sunny", "GasLamp", "OlympicFlare", "Resumee", "Sunglasses", "BusinessBriefcase", "Sunset", "Spaceship", "ExoticIsland", "HockeyClubs", "Marshmallows", "ScanBarcode", "SpaceshipLaunchPad", "Campfire", "UFO", "OutdoorCamera", "UnprotectedSystem", "ProtectedSystem", "6Pack", "ChatConversation", "ChatConversation2", "ChatConversation4", "Stroller", "Xylophone", "WoodenCrate22", "Yachting", "XboxRemote", "Turntable2", "Kayaking", "SegagenesisController", "ShowMicrophone", "21", "PS2Controller", "YogaBall", "BasketballPanel", "DocumentFolder", "Playstation1", "Podium", "Suitcase", "Triangle", "CalendarEvent", "GameboyAdvance", "Whatsapp", "BasketballJersey", "Plane", "PriceTag", "Tricycle", "HikingBackpack", "BathDuckling", "Pacifier", "PriceTag2", "FootballJersey", "GypsyTambourine", "Cruise", "MoneySuitcase", "OutdoorStove", "Briefcase", "PhoneEncryption", "PS4", "SearchFIle", "SummerRain", "SwissArmyKnife", "Mountainside", "Suitcase2", "ExpandWindow2", "MildlyRottenPremolar", "Nintendo64", "RetrieveCard", "ToyTrain", "AntivirusProtection", "FlipboardDocument", "FootballJersey2", "GypsyTambourine2", "InsertCard2", "Neptune", "Cruise2", "Flipboard2", "OutdoorStove2", "PS42", "Saturn", "SoccerJersey", "Diapazone", "SearchFIle2", "BoyBodywear", "Homer", "TeddyBear", "CattleSkull", "ShoppingCart", "Soyuz", "ToyRobot", "Umbrella", "Chat2", "Newspaper", "Saxophone", "Compass2", "FireExtinguisher", "TheOlympics", "Gagarin", "ChariotWheel", "Blueprint", "PriceTag7", "SafetyPinclosed", "Trombone", "BoxingGlove", "LogCutting", "Ukulele", "Skateboard", "SolarSystem", "SurvivalKnife", "Left", "Right2", "BassGuitar", "Luggage", "Microphone", "SurvivalWatch", "Compose2", "ElectricGuitar", "Lightning", "MeteoriteImpact", "RotateLandscape", "Stopwatch2", "Earth3", "Mailbox", "Capitalize", "FishingVest", "Key", "PingPong2", "Binoculars", "CowboyHat", "Popcorn", "SETIDish", "WiredPhone", "Cimbalom", "TakeNotes", "SandCastle", "Bullets", "ShoppingCart3", "FlipFlops", "Jobs", "MoonLander", "CommercialSatellite", "Ruler", "Warning", "AddCartContents", "Canoe", "DrumSet", "NativeAmericanBow", "Parasailing", "Feeder", "MailContents", "OpenMail", "Bills", "Sunbed", "NeilArmstrong", "WindToy", "ColtRevolver", "Tomahawk", "WaterJumping", "Mail", "Pencial", "PhoneMessage", "Headphones", "Quaver", "ReMusicalNote", "MusicalNote2", "Code", "ColorBucket", "Forest", "Briefcase2", "CardioBike", "ColorSpray", "Ipod", "DivingGear", "Ruler2", "Mountainside3", "NativeAmericanTent", "Brush", "Weight", "Trees", "Cabin", "Code2", "ColorPallette", "CrossroadsSigns", "ColorEyedropper", "HuntingLodge", "facebook4", "twitter-old", "share", "feed4", "bird", "chat3", "phone4", "phone5", "monitor", "laptop2", "modem", "hdd", "keyboard", "mouse", "floppy", "camera5", "pictures2", "eye4", "camera6", "volume", "radio", "cassette", "broadcast2", "cog3", "search2", "zoomout3", "zoomin3", "binocular", "location2", "pin2", "quote4", "clipboard", "clipboard2", "gift", "settings2", "support", "medicine", "cone", "info", "drink2", "lollipop", "heart2", "lightning3", "gaspump", "tree", "leaf", "flower", "direction", "thumbsup", "thumbsdown", "arrow-up3", "arrow-down3", "arrow-left3", "arrow-right3", "arrow-top-right", "arrow-top-left", "arrow-bottom-right", "arrow-bottom-left", "tv2", "trashcan", "umbrella", "printer", "laptop", "desktop", "tablet", "phone2", "mobile", "camera2", "profile-male", "profile-female", "layers3", "basket", "envelope", "twitter4", "rss", "tumblr3", "linkedin2", "cancel3", "checkmark2", "cancel5", "checkmark4", "heart3", "cloud3", "star", "trash", "search", "bubble", "like", "world", "settings", "pen", "diamond", "location", "paperplane", "params", "banknote", "study", "lab", "number", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "number10", "quote2", "quote3", "th-small", "th-menu", "th-list", "th-large", "leaf2", "feather", "plane-outline", "microphone-outline", "chevron-right2", "chevron-left2", "arrow-right-thick", "arrow-left-thick", "arrow-up-thick", "arrow-down-thick", "minus5", "plus7", "backspace", "eye3", "paper-clip", "mail", "toggle", "layout", "link2", "bell", "lock", "unlock", "ribbon", "image", "signal", "target", "clipboard3", "clock", "watch", "air-play", "camera4", "video", "printer2", "monitor2", "server", "cog4", "heart4", "paragraph", "align-justify2", "align-left", "align-center", "align-right", "book", "layers4", "stack", "stack-2", "paper", "paper-stack", "search4", "zoom-in", "zoom-out", "reply", "circle-plus", "circle-minus", "circle-check", "circle-cross", "square-plus", "square-minus", "square-check", "square-cross", "microphone", "record2", "skip-back", "rewind", "play2", "pause2", "stop2", "fast-forward", "skip-forward", "shuffle", "repeat", "folder", "umbrella2", "moon2", "thermometer2", "drop", "sun4", "cloud4", "cloud-upload", "cloud-download", "upload", "download", "location3", "location-2", "map", "battery", "head", "briefcase", "speech-bubble", "anchor", "globe", "box", "reload", "share3", "marquee", "marquee-plus", "marquee-minus", "tag", "power", "command", "alt", "esc", "bar-graph", "bar-graph-2", "pie-graph", "star2", "arrow-left4", "arrow-right7", "arrow-up4", "arrow-down4", "volume2", "mute", "content-right", "content-left", "grid2", "grid-2", "columns", "loader", "bag", "ban", "flag", "trash2", "expand", "contract", "maximize", "minimize", "plus5", "minus6", "check", "cross", "move", "delete", "menu3", "archive", "inbox", "outbox", "file", "file-add", "file-subtract", "help", "open", "ellipsis", "basecamp", "behance", "creative-cloud", "dropbox", "evernote", "flattr", "foursquare", "google-drive", "google-hangouts", "grooveshark", "icloud", "mixi", "onedrive", "paypal", "picasa", "qq", "rdio-with-circle", "renren", "scribd", "sina-weibo", "slideshare", "smashing", "spotify", "swarm", "vine", "vk", "xing", "yelp", "facebook", "google", "instagram", "lastfm", "linkedin", "tumblr", "play", "pause", "record", "stop", "next", "previous", "first", "last", "github6", "flickr5", "twitter5", "facebook5", "googleplus6", "pinterest3", "qq2", "instagram2", "evernote2", "renren2", "sina-weibo2", "paypal4", "picasa2", "soundcloud3", "mixi2", "circles", "vk2", "smashing2", "stumbleupon3", "lastfm3", "earth2", "heart32", "arrow-right4", "arrow-left5", "arrow-down5", "arrow-up5", "arrow-right5", "arrow-left6", "arrow-down6", "arrow-up6", "uniE81F", "menu2", "minus4", "plus6", "list", "arrow-left7", "arrow-down7", "arrow-up7", "arrow-right6", "ccw", "cw", "box2", "write", "clock2", "reply2", "reply-all", "forward", "search22", "trash22", "envelope2", "bubble2", "user2", "users", "cloud23", "download2", "upload2", "rain", "sun23", "moon22", "bell2", "folder2", "pin", "sound", "microphone2", "camera22", "image2", "calendar", "map-marker", "store", "support2", "tag2", "heart22", "video-camera", "trophy", "cart2", "eye22", "cancel4", "chart", "target2", "printer22", "location22", "bookmark3", "monitor22", "cross2", "plus22", "left2", "up2", "browser", "windows2", "switch2", "dashboard", "play22", "fast-forward2", "next2", "refresh", "film", "home2", "home", "pencil", "quill", "droplet", "camera", "credit-card", "lifebuoy", "phone", "address-book", "undo", "redo", "user", "quotes-left", "quotes-right", "fire", "airplane", "switch", "power-cord", "cloud", "link", "attachment", "eye", "bookmark", "sun", "heart", "loop2", "share2", "feed2", "youtube3", "twitch", "vimeo", "wordpress", "joomla", "tux", "apple", "finder", "windows8", "stackoverflow", "html5", "codepen", "chrome", "firefox", "IE", "opera", "safari", "comment", "check-alt", "x-altx-alt", "plus-alt", "plus2", "document-alt-stroke", "eye2", "camera3", "left-quote-alt", "right-quote-alt", "sunrise", "sun2", "moon", "sun22", "windy", "wind", "snowflake", "cloudy", "cloud2", "windy2", "snowy", "snowy2", "snowy3", "weather", "cloudy2", "cloud22", "lightning", "sun3", "snowy4", "weather2", "cloudy3", "lightning2", "thermometer", "compass", "none", "Celsius", "Fahrenheit", "weather3", "weather4", "weather5", "uniF488", "uniF489", "uniF48A", "uniF48B", "down", "downleft", "downright", "up", "upleft", "upright", "right", "left", "psbuttonx", "menu", "mouse2", "uniF639", "uniF477", "uniF478", "uniF479", "uniF476", "grid", "details", "thumbnails", "quote", "post2", "layers", "layers2", "minus2", "google2", "youtube2", "steam", "github2", "android", "windows", "paypal3", "googleplus", "google-drive2", "lanyrd", "flickr2", "skype", "reddit", "lastfm2", "yelp2", "file-pdf", "file-openoffice", "file-word", "facebook2", "instagram3", "picassa", "dribbble", "forrst", "deviantart2", "joomla2", "blogger", "yahoo", "tux2", "apple2", "finder2", "delicious", "stumbleupon2", "stackoverflow2", "file-excel", "file-zip", "file-powerpoint", "file-xml", "file-css", "html52", "html522", "css3", "chrome2", "at", "copyright", "multiply", "cursor", "circleadd", "circledelete", "circleselect", "elipse", "roundedrectangle", "polygon", "notificationdown", "bookmark2", "zoomin", "zoomout", "cmd", "cart", "cog2", "minus3", "plus4", "cancel", "zoomin2", "zoomout2", "cancel2", "arrow-left2", "arrow-up2", "arrow-right2", "arrow-down2", "add-circle-1", "baby-trolley", "banking-donation-2", "bin", "chat-bubble-square-1", "chat-bubble-square-smiley", "chef-1", "chef-hat", "content-book-2", "fire-extinguisher", "fire-lighter", "flash", "folder-add", "folder-check", "folder-close", "folder-subtract", "food-chicken-drum-stick", "food-icecream-2", "glass-cocktail-2", "graduation-hat", "hand-gun", "health-prescription-2", "helicopter", "hotel-bath-shower", "id-card-1", "key-hole-1", "king", "lock-1", "lock-unlock-1", "nature-plant-1", "paint-brush-1", "places-christ-the-redeemer", "places-eiffel-tower", "places-home-3", "places-taj-mahal", "police-officer-1", "polo-shirt", "quill2", "rewards-banner-check", "rewards-gift", "ring-planet", "romance-bow", "romance-love-target", "romance-relationship", "save-water", "user-add", "user-chat-1", "user-check", "user-female", "user-headphone", "video-games-gameboy", "video-games-pacman", "vote-heart-circle-1", "add-circle-12", "airplane2", "alien-head", "android2", "baby-trolley2", "banking-debit-machine", "banking-donation-22", "banking-spendings-1", "banking-spendings-3", "bank-note", "battery-charging-1", "beaker-science", "bin2", "binoculars", "box-2", "building-6", "building-10", "building-barn", "bus-2", "business-briefcase-cash", "business-whiteboard", "calendar-1", "camera-1", "camera-live-view-off", "car-2", "castle-1", "cc-camera-1", "chat-bubble-square-smiley2", "check-box", "chef-12", "chef-hat2", "close2", "cloud32", "cog-box", "coin-stack-1", "computer-screen-1", "content-book-22", "couch", "data-download-5", "data-upload-5", "devices", "dna", "download-computer", "eco-field", "file-new-1", "file-new-2", "file-notes-document", "file-notes-new", "file-office-text", "file-tasks-add", "file-zipped-new", "fire-extinguisher2", "flash2", "folder-add2", "folder-check2", "folder-close2", "folder-subtract2", "food-chicken-drum-stick2", "food-double-burger", "food-icecream-22", "glass-cocktail-22", "graduation-hat2", "hand-gun2", "hand-remote", "hat-magician", "health-ambulance", "health-graph-1", "health-heart-pulse", "health-hospital-sign-1", "health-medicine-bottle", "health-prescription-22", "helicopter2", "hot-air-balloon", "hotel-bath-shower2", "hotel-bed-1", "hotel-shower", "hourglass", "id-card-12", "inbox2", "keyboard2", "key-hole-12", "kitchen-blender", "lamp-1", "lamp-studio-1", "leisure-dj-booth", "leisure-rest", "location-gps-on-2", "location-map-1", "location-pin-4", "location-pin-check-2", "location-user", "lock-12", "lock-unlock-12", "login-check", "login-lock", "login-wrong", "mail-refresh-1", "match-stick", "monster-truck-1", "motorcycle-2", "music-note-1", "nature-flower-1", "nature-plant-12", "navigation-before-1", "navigation-next-1", "network-business", "origami-paper-bird", "paint-brush-12", "paper-pin", "paperplane2", "pencil-2", "pencil-ruler", "places-christ-the-redeemer2", "places-colosseum", "places-eiffel-tower2", "places-home-32", "places-home-4", "places-taj-mahal2", "places-warehouse-1", "police-officer-12", "polo-shirt2", "quill22", "rechargable-battery", "remove-circle-1", "rewards-banner-check2", "rewards-gift2", "rewards-medal-1", "rewards-pedestal", "rewards-trophy-5", "ring-planet2", "romance-bow2", "romance-love-target2", "romance-relationship2", "safe", "scissors", "settings-1", "share-megaphone-2", "share-radar", "share-signal-user", "shopping-basket-1", "shopping-basket-2", "shopping-basket-add", "shopping-basket-check", "shopping-basket-close", "shopping-basket-subtract", "sign-toilet", "smart-watch-circle-navigation", "smiley-dolar", "smiley-poker-face", "smiley-shy-1", "smiley-smile-2", "smiley-wink", "smiley-worry", "spa-lotion", "spa-lotus-flower", "sport-basketball", "sport-bowling", "sport-dumbbell-1", "sport-football-field", "sport-takraw", "spray-bottle", "star-constellation", "subtract-circle-1", "sunny", "synchronize-1", "synchronize-2", "tank", "temple-2", "toilet-roll", "travel-beach", "travel-camping", "travel-globe", "umbrella-open", "undershirt", "underwear", "user-add2", "user-chat-12", "user-check2", "user-headphone2", "user-heart", "user-male", "user-subtract", "vector-circle", "vector-line", "vector-square-1", "vector-triangle", "video-call-1", "video-call-mobile-phone", "video-camera-3", "video-clip-3", "video-clip-4", "video-control-play", "video-games-gameboy2", "video-games-pacman2", "vote-heart-circle-12", "vote-plus-one", "vote-thumbs-down", "vote-thumbs-up", "wallet", "warehouse-box", "water-droplet", "water-tap", "water-tower", "wind-flag", "window", "window-programming", "airplane22", "alien-head2", "android22", "shopcart", "gathermenu", "chevron-right", "flag2", "align-justify", "cog", "remove", "chevron-left", "minus", "plus", "resize-vertical", "resize-horizontal", "chevron-up", "chevron-down", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "angle-left", "angle-right", "angle-up", "angle-down", "caret-left", "caret-up", "caret-down", "caret-right", "sort-down", "sort-up", "alpha", "brush", "point"
                ]
            })
            .iconpicker('setIcon', $(this).attr('value'))
            .iconpicker('setLabelHeader', '{0} of {1} pages')
            .iconpicker('setLabelFooter', '{0} - {1} of {2} icons')
            .iconpicker('setPlacement', 'right')
            .iconpicker('setRows', 7)
            .iconpicker('setSearch', true)
            .iconpicker('setSearchText', 'Type text')
    });
    $('.setting-panel-container').not("div.popover,.iconpicker").on('mousedown', function () {
        $("div.popover").remove();
    });
}(window.jQuery);

//vc_multiselect
var $ = jQuery;
function pixflow_getSelectedValue(t) {
    return $("#" + t).find("dt a span.value").html()
}
$(".dropdown dt a").on("click", function () {
    $(".dropdown dd ul").slideToggle("fast")
}), $(".dropdown dd ul li a").on("click", function () {
    $(".dropdown dd ul").hide()
}), $(document).bind("click", function (t) {
    var d = $(t.target);
    d.parents().hasClass("dropdown") || $(".dropdown dd ul").hide()
}), $input = $("#input-" + $(".multiSel").attr("data-id")), "" == $input.val() ? $(".hida").show() : $(".hida").hide(), $(".multiSel").html($input.val()), $('.mutliSelect input[type="checkbox"]').on("click", function () {
    var t = "";
    $(".mutliSelect input[type='checkbox']:checked:enabled").each(function () {
        "" != t ? t = t + "," + $(this).attr("value") : t += $(this).attr("value")
    }), $("#input-" + $(this).attr("data-id")).val(t), $(".multiSel").html(t), "" == t ? $(".hida").show() : $(".hida").hide()
});

//vc_range
function pixflow_updateDesimal(val, step) {
    if (step >= 1) {
        return val.substr(0, val.length - 3);
    } else if (step >= 0.1) {
        return val.substr(0, val.length - 1);
    } else if (step < 0.1) {
        return val;
    }
}
$(".vc_slider").each(function () {

    var $this = $(this),
        MDslider = $this.get(0),
        start = Number($this.attr('value')),
        min = Number($this.attr('min')),
        max = Number($this.attr('max')),
        step = Number($this.attr('step')),
        decimal = Number($this.attr('decimal')),
        prefix = $this.attr('prefix');

    noUiSlider.create(MDslider, {
        start: [start],
        step: step,
        range: {
            'min': min,
            'max': max
        }
    });
    MDslider.noUiSlider.on('update', function (values) {
        $('#input-' + $this.attr('id')).val(pixflow_updateDesimal(values[0], step));
        $this.siblings('.vc_slider_value').html(prefix);
    });
    /*$(this).prev().change(function () {
     MDslider.noUiSlider.set(this.value);
     });*/

    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms, .5 second for example
    var $input = $(this).prev();

//on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function () {
            MDslider.noUiSlider.set($input.val());
        }, doneTypingInterval);
    });
});

//vc_url
var $ = jQuery;
$('input.md_vc_url[type="text"]').each(function () {
    try {
        var $this = $(this),
            $url = $('#url_' + $this.attr('id')),
            pageURL = $('meta[name="post-id"]').attr('page-url');
    } catch (e) {
    }
    if ($this.val() != '') {
        $url.html(pageURL + '#' + $this.val());
    }
    $this.keyup(function () {
        $url.html(pageURL + '#' + $this.val());
    });
});

// Load tiny mce
if ($('#mbwpeditor').length) {
    setTimeout(function () {
        //init quicktags
        quicktags({id: 'mbwpeditor'});
        if ( $('body').hasClass('pixflow-builder') ){
            tinymce.EditorManager.execCommand('mceRemoveEditor', false, 'mbwpeditor');
            tinyMCE.execCommand('mceAddEditor', false, 'mbwpeditor');
        }
    }, 1000);
}

$("input[type='text']").not('.gradient-angle').keydown(function (e) {
    if (e.keyCode == 13) {
        return false;
    }
});

/*Air Datepicker plugin*/
!function (t, e, i) {
    !function () {
        var s, a, n, h = "datepicker", r = ".datepicker-here", o = !1, c = '<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>', d = {
            classes: "",
            inline: !1,
            language: "ru",
            startDate: new Date,
            firstDay: "",
            weekends: [6, 0],
            dateFormat: "",
            altField: "",
            altFieldDateFormat: "@",
            toggleSelected: !0,
            keyboardNav: !0,
            position: "bottom left",
            offset: 12,
            view: "days",
            minView: "days",
            showOtherMonths: !0,
            selectOtherMonths: !0,
            moveToOtherMonthsOnSelect: !0,
            showOtherYears: !0,
            selectOtherYears: !0,
            moveToOtherYearsOnSelect: !0,
            minDate: "",
            maxDate: "",
            disableNavWhenOutOfRange: !0,
            multipleDates: !1,
            multipleDatesSeparator: ",",
            range: !1,
            todayButton: !1,
            clearButton: !1,
            showEvent: "focus",
            autoClose: !1,
            monthsField: "monthsShort",
            prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
            nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
            navTitles: {days: "MM, <i>yyyy</i>", months: "yyyy", years: "yyyy1 - yyyy2"},
            timepicker: !1,
            dateTimeSeparator: " ",
            timeFormat: "",
            minHours: 0,
            maxHours: 24,
            minMinutes: 0,
            maxMinutes: 59,
            hoursStep: 1,
            minutesStep: 1,
            onSelect: "",
            onChangeMonth: "",
            onChangeYear: "",
            onChangeDecade: "",
            onChangeView: "",
            onRenderCell: ""
        }, l = {
            ctrlRight: [17, 39],
            ctrlUp: [17, 38],
            ctrlLeft: [17, 37],
            ctrlDown: [17, 40],
            shiftRight: [16, 39],
            shiftUp: [16, 38],
            shiftLeft: [16, 37],
            shiftDown: [16, 40],
            altUp: [18, 38],
            altRight: [18, 39],
            altLeft: [18, 37],
            altDown: [18, 40],
            ctrlShiftUp: [16, 17, 38]
        }, u = function (t, a) {
            this.el = t, this.$el = e(t), this.opts = e.extend(!0, {}, d, a, this.$el.data()), s == i && (s = e("body")), this.opts.startDate || (this.opts.startDate = new Date), "INPUT" == this.el.nodeName && (this.elIsInput = !0), this.opts.altField && (this.$altField = "string" == typeof this.opts.altField ? e(this.opts.altField) : this.opts.altField), this.inited = !1, this.visible = !1, this.silent = !1, this.currentDate = this.opts.startDate, this.currentView = this.opts.view, this._createShortCuts(), this.selectedDates = [], this.views = {}, this.keys = [], this.minRange = "", this.maxRange = "", this._prevOnSelectValue = "", this.init()
        };
        n = u, n.prototype = {
            viewIndexes: ["days", "months", "years"], init: function () {
                o || this.opts.inline || !this.elIsInput || this._buildDatepickersContainer(), this._buildBaseHtml(), this._defineLocale(this.opts.language), this._syncWithMinMaxDates(), this.elIsInput && (this.opts.inline || (this._setPositionClasses(this.opts.position), this._bindEvents()), this.opts.keyboardNav && this._bindKeyboardEvents(), this.$datepicker.on("mousedown", this._onMouseDownDatepicker.bind(this)), this.$datepicker.on("mouseup", this._onMouseUpDatepicker.bind(this))), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.timepicker && (this.timepicker = new e.fn.datepicker.Timepicker(this, this.opts), this._bindTimepickerEvents()), this.views[this.currentView] = new e.fn.datepicker.Body(this, this.currentView, this.opts), this.views[this.currentView].show(), this.nav = new e.fn.datepicker.Navigation(this, this.opts), this.view = this.currentView, this.$el.on("clickCell.adp", this._onClickCell.bind(this)), this.$datepicker.on("mouseenter", ".datepicker--cell", this._onMouseEnterCell.bind(this)), this.$datepicker.on("mouseleave", ".datepicker--cell", this._onMouseLeaveCell.bind(this)), this.inited = !0
            }, _createShortCuts: function () {
                this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-86399999136e5), this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(86399999136e5)
            }, _bindEvents: function () {
                this.$el.on(this.opts.showEvent + ".adp", this._onShowEvent.bind(this)), this.$el.on("mouseup.adp", this._onMouseUpEl.bind(this)), this.$el.on("blur.adp", this._onBlur.bind(this)), this.$el.on("keyup.adp", this._onKeyUpGeneral.bind(this)), e(t).on("resize.adp", this._onResize.bind(this)), e("body").on("mouseup.adp", this._onMouseUpBody.bind(this))
            }, _bindKeyboardEvents: function () {
                this.$el.on("keydown.adp", this._onKeyDown.bind(this)), this.$el.on("keyup.adp", this._onKeyUp.bind(this)), this.$el.on("hotKey.adp", this._onHotKey.bind(this))
            }, _bindTimepickerEvents: function () {
                this.$el.on("timeChange.adp", this._onTimeChange.bind(this))
            }, isWeekend: function (t) {
                return -1 !== this.opts.weekends.indexOf(t)
            }, _defineLocale: function (t) {
                "string" == typeof t ? (this.loc = e.fn.datepicker.language[t], this.loc || (console.warn("Can't find language \"" + t + '" in Datepicker.language, will use "ru" instead'), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru)), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, e.fn.datepicker.language[t])) : this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, t), this.opts.dateFormat && (this.loc.dateFormat = this.opts.dateFormat), this.opts.timeFormat && (this.loc.timeFormat = this.opts.timeFormat), "" !== this.opts.firstDay && (this.loc.firstDay = this.opts.firstDay), this.opts.timepicker && (this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator));
                var i = this._getWordBoundaryRegExp;
                (this.loc.timeFormat.match(i("aa")) || this.loc.timeFormat.match(i("AA"))) && (this.ampm = !0)
            }, _buildDatepickersContainer: function () {
                o = !0, s.append('<div class="datepickers-container" id="datepickers-container"></div>'), a = e("#datepickers-container")
            }, _buildBaseHtml: function () {
                var t, i = e('<div class="datepicker-inline">');
                t = "INPUT" == this.el.nodeName ? this.opts.inline ? i.insertAfter(this.$el) : a : i.appendTo(this.$el), this.$datepicker = e(c).appendTo(t), this.$content = e(".datepicker--content", this.$datepicker), this.$nav = e(".datepicker--nav", this.$datepicker)
            }, _triggerOnChange: function () {
                if (!this.selectedDates.length) {
                    if ("" === this._prevOnSelectValue)return;
                    return this._prevOnSelectValue = "", this.opts.onSelect("", "", this)
                }
                var t, e = this.selectedDates, i = n.getParsedDate(e[0]), s = this, a = new Date(i.year, i.month, i.date, i.hours, i.minutes);
                t = e.map(function (t) {
                    return s.formatDate(s.loc.dateFormat, t)
                }).join(this.opts.multipleDatesSeparator), (this.opts.multipleDates || this.opts.range) && (a = e.map(function (t) {
                    var e = n.getParsedDate(t);
                    return new Date(e.year, e.month, e.date, e.hours, e.minutes)
                })), this._prevOnSelectValue = t, this.opts.onSelect(t, a, this)
            }, next: function () {
                var t = this.parsedDate, e = this.opts;
                switch (this.view) {
                    case"days":
                        this.date = new Date(t.year, t.month + 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                        break;
                    case"months":
                        this.date = new Date(t.year + 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
                        break;
                    case"years":
                        this.date = new Date(t.year + 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade)
                }
            }, prev: function () {
                var t = this.parsedDate, e = this.opts;
                switch (this.view) {
                    case"days":
                        this.date = new Date(t.year, t.month - 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                        break;
                    case"months":
                        this.date = new Date(t.year - 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
                        break;
                    case"years":
                        this.date = new Date(t.year - 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade)
                }
            }, formatDate: function (t, e) {
                e = e || this.date;
                var i, s = t, a = this._getWordBoundaryRegExp, h = this.loc, r = n.getLeadingZeroNum, o = n.getDecade(e), c = n.getParsedDate(e), d = c.fullHours, l = c.hours, u = "am";
                switch (this.opts.timepicker && this.timepicker && this.ampm && (i = this.timepicker._getValidHoursFromDate(e), d = r(i.hours), l = i.hours, u = i.dayPeriod), !0) {
                    case/@/.test(s):
                        s = s.replace(/@/, e.getTime());
                    case/aa/.test(s):
                        s = s.replace(a("aa"), u);
                    case/AA/.test(s):
                        s = s.replace(a("AA"), u.toUpperCase());
                    case/dd/.test(s):
                        s = s.replace(a("dd"), c.fullDate);
                    case/d/.test(s):
                        s = s.replace(a("d"), c.date);
                    case/DD/.test(s):
                        s = s.replace(a("DD"), h.days[c.day]);
                    case/D/.test(s):
                        s = s.replace(a("D"), h.daysShort[c.day]);
                    case/mm/.test(s):
                        s = s.replace(a("mm"), c.fullMonth);
                    case/m/.test(s):
                        s = s.replace(a("m"), c.month + 1);
                    case/MM/.test(s):
                        s = s.replace(a("MM"), this.loc.months[c.month]);
                    case/M/.test(s):
                        s = s.replace(a("M"), h.monthsShort[c.month]);
                    case/ii/.test(s):
                        s = s.replace(a("ii"), c.fullMinutes);
                    case/i/.test(s):
                        s = s.replace(a("i"), c.minutes);
                    case/hh/.test(s):
                        s = s.replace(a("hh"), d);
                    case/h/.test(s):
                        s = s.replace(a("h"), l);
                    case/yyyy/.test(s):
                        s = s.replace(a("yyyy"), c.year);
                    case/yyyy1/.test(s):
                        s = s.replace(a("yyyy1"), o[0]);
                    case/yyyy2/.test(s):
                        s = s.replace(a("yyyy2"), o[1]);
                    case/yy/.test(s):
                        s = s.replace(a("yy"), c.year.toString().slice(-2))
                }
                return s
            }, _getWordBoundaryRegExp: function (t) {
                return new RegExp("\\b(?=[a-zA-Z0-9??????????????<])" + t + "(?![>a-zA-Z0-9??????????????])")
            }, selectDate: function (t) {
                var e = this, i = e.opts, s = e.parsedDate, a = e.selectedDates, h = a.length, r = "";
                if (Array.isArray(t))return void t.forEach(function (t) {
                    e.selectDate(t)
                });
                if (t instanceof Date) {
                    if (this.lastSelectedDate = t, this.timepicker && this.timepicker._setTime(t), e._trigger("selectDate", t), this.timepicker && (t.setHours(this.timepicker.hours), t.setMinutes(this.timepicker.minutes)), "days" == e.view && t.getMonth() != s.month && i.moveToOtherMonthsOnSelect && (r = new Date(t.getFullYear(), t.getMonth(), 1)), "years" == e.view && t.getFullYear() != s.year && i.moveToOtherYearsOnSelect && (r = new Date(t.getFullYear(), 0, 1)), r && (e.silent = !0, e.date = r, e.silent = !1, e.nav._render()), i.multipleDates && !i.range) {
                        if (h === i.multipleDates)return;
                        e._isSelected(t) || e.selectedDates.push(t)
                    } else i.range ? 2 == h ? (e.selectedDates = [t], e.minRange = t, e.maxRange = "") : 1 == h ? (e.selectedDates.push(t), e.maxRange ? e.minRange = t : e.maxRange = t, n.bigger(e.maxRange, e.minRange) && (e.maxRange = e.minRange, e.minRange = t), e.selectedDates = [e.minRange, e.maxRange]) : (e.selectedDates = [t], e.minRange = t) : e.selectedDates = [t];
                    e._setInputValue(), i.onSelect && e._triggerOnChange(), i.autoClose && !this.timepickerIsActive && (i.multipleDates || i.range ? i.range && 2 == e.selectedDates.length && e.hide() : e.hide()), e.views[this.currentView]._render()
                }
            }, removeDate: function (t) {
                var e = this.selectedDates, i = this;
                if (t instanceof Date)return e.some(function (s, a) {
                    return n.isSame(s, t) ? (e.splice(a, 1), i.selectedDates.length ? i.lastSelectedDate = i.selectedDates[i.selectedDates.length - 1] : (i.minRange = "", i.maxRange = "", i.lastSelectedDate = ""), i.views[i.currentView]._render(), i._setInputValue(), i.opts.onSelect && i._triggerOnChange(), !0) : void 0
                })
            }, today: function () {
                this.silent = !0, this.view = this.opts.minView, this.silent = !1, this.date = new Date, this.opts.todayButton instanceof Date && this.selectDate(this.opts.todayButton)
            }, clear: function () {
                this.selectedDates = [], this.minRange = "", this.maxRange = "", this.views[this.currentView]._render(), this._setInputValue(), this.opts.onSelect && this._triggerOnChange()
            }, update: function (t, i) {
                var s = arguments.length;
                return 2 == s ? this.opts[t] = i : 1 == s && "object" == typeof t && (this.opts = e.extend(!0, this.opts, t)), this._createShortCuts(), this._syncWithMinMaxDates(), this._defineLocale(this.opts.language), this.nav._addButtonsIfNeed(), this.nav._render(), this.views[this.currentView]._render(), this.elIsInput && !this.opts.inline && (this._setPositionClasses(this.opts.position), this.visible && this.setPosition(this.opts.position)), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.timepicker && (this.timepicker._handleDate(this.lastSelectedDate), this.timepicker._updateRanges(), this.timepicker._updateCurrentTime(), this.lastSelectedDate && (this.lastSelectedDate.setHours(this.timepicker.hours), this.lastSelectedDate.setMinutes(this.timepicker.minutes))), this._setInputValue(), this
            }, _syncWithMinMaxDates: function () {
                var t = this.date.getTime();
                this.silent = !0, this.minTime > t && (this.date = this.minDate), this.maxTime < t && (this.date = this.maxDate), this.silent = !1
            }, _isSelected: function (t, e) {
                var i = !1;
                return this.selectedDates.some(function (s) {
                    return n.isSame(s, t, e) ? (i = s, !0) : void 0
                }), i
            }, _setInputValue: function () {
                var t, e = this, i = e.opts, s = e.loc.dateFormat, a = i.altFieldDateFormat, n = e.selectedDates.map(function (t) {
                    return e.formatDate(s, t)
                });
                i.altField && e.$altField.length && (t = this.selectedDates.map(function (t) {
                    return e.formatDate(a, t)
                }), t = t.join(this.opts.multipleDatesSeparator), this.$altField.val(t)), n = n.join(this.opts.multipleDatesSeparator), this.$el.val(n)
            }, _isInRange: function (t, e) {
                var i = t.getTime(), s = n.getParsedDate(t), a = n.getParsedDate(this.minDate), h = n.getParsedDate(this.maxDate), r = new Date(s.year, s.month, a.date).getTime(), o = new Date(s.year, s.month, h.date).getTime(), c = {
                    day: i >= this.minTime && i <= this.maxTime,
                    month: r >= this.minTime && o <= this.maxTime,
                    year: s.year >= a.year && s.year <= h.year
                };
                return e ? c[e] : c.day
            }, _getDimensions: function (t) {
                var e = t.offset();
                return {width: t.outerWidth(), height: t.outerHeight(), left: e.left, top: e.top}
            }, _getDateFromCell: function (t) {
                var e = this.parsedDate, s = t.data("year") || e.year, a = t.data("month") == i ? e.month : t.data("month"), n = t.data("date") || 1;
                return new Date(s, a, n)
            }, _setPositionClasses: function (t) {
                t = t.split(" ");
                var e = t[0], i = t[1], s = "datepicker -" + e + "-" + i + "- -from-" + e + "-";
                this.visible && (s += " active"), this.$datepicker.removeAttr("class").addClass(s)
            }, setPosition: function (t) {
                t = t || this.opts.position;
                var e, i, s = this._getDimensions(this.$el), a = this._getDimensions(this.$datepicker), n = t.split(" "), h = this.opts.offset, r = n[0], o = n[1];
                switch (r) {
                    case"top":
                        e = s.top - a.height - h;
                        break;
                    case"right":
                        i = s.left + s.width + h;
                        break;
                    case"bottom":
                        e = s.top + s.height + h;
                        break;
                    case"left":
                        i = s.left - a.width - h
                }
                switch (o) {
                    case"top":
                        e = s.top;
                        break;
                    case"right":
                        i = s.left + s.width - a.width;
                        break;
                    case"bottom":
                        e = s.top + s.height - a.height;
                        break;
                    case"left":
                        i = s.left;
                        break;
                    case"center":
                        /left|right/.test(r) ? e = s.top + s.height / 2 - a.height / 2 : i = s.left + s.width / 2 - a.width / 2
                }
                this.$datepicker.css({left: i, top: e})
            }, show: function () {
                this.setPosition(this.opts.position), this.$datepicker.addClass("active"), this.visible = !0
            }, hide: function () {
                this.$datepicker.removeClass("active").css({left: "-100000px"}), this.focused = "", this.keys = [], this.inFocus = !1, this.visible = !1, this.$el.blur()
            }, down: function (t) {
                this._changeView(t, "down")
            }, up: function (t) {
                this._changeView(t, "up")
            }, _changeView: function (t, e) {
                t = t || this.focused || this.date;
                var i = "up" == e ? this.viewIndex + 1 : this.viewIndex - 1;
                i > 2 && (i = 2), 0 > i && (i = 0), this.silent = !0, this.date = new Date(t.getFullYear(), t.getMonth(), 1), this.silent = !1, this.view = this.viewIndexes[i]
            }, _handleHotKey: function (t) {
                var e, i, s, a = n.getParsedDate(this._getFocusedDate()), h = this.opts, r = !1, o = !1, c = !1, d = a.year, l = a.month, u = a.date;
                switch (t) {
                    case"ctrlRight":
                    case"ctrlUp":
                        l += 1, r = !0;
                        break;
                    case"ctrlLeft":
                    case"ctrlDown":
                        l -= 1, r = !0;
                        break;
                    case"shiftRight":
                    case"shiftUp":
                        o = !0, d += 1;
                        break;
                    case"shiftLeft":
                    case"shiftDown":
                        o = !0, d -= 1;
                        break;
                    case"altRight":
                    case"altUp":
                        c = !0, d += 10;
                        break;
                    case"altLeft":
                    case"altDown":
                        c = !0, d -= 10;
                        break;
                    case"ctrlShiftUp":
                        this.up()
                }
                s = n.getDaysCount(new Date(d, l)), i = new Date(d, l, u), u > s && (u = s), i.getTime() < this.minTime ? i = this.minDate : i.getTime() > this.maxTime && (i = this.maxDate), this.focused = i, e = n.getParsedDate(i), r && h.onChangeMonth && h.onChangeMonth(e.month, e.year), o && h.onChangeYear && h.onChangeYear(e.year), c && h.onChangeDecade && h.onChangeDecade(this.curDecade)
            }, _registerKey: function (t) {
                var e = this.keys.some(function (e) {
                    return e == t
                });
                e || this.keys.push(t)
            }, _unRegisterKey: function (t) {
                var e = this.keys.indexOf(t);
                this.keys.splice(e, 1)
            }, _isHotKeyPressed: function () {
                var t, e = !1, i = this, s = this.keys.sort();
                for (var a in l)t = l[a], s.length == t.length && t.every(function (t, e) {
                    return t == s[e]
                }) && (i._trigger("hotKey", a), e = !0);
                return e
            }, _trigger: function (t, e) {
                this.$el.trigger(t, e)
            }, _focusNextCell: function (t, e) {
                e = e || this.cellType;
                var i = n.getParsedDate(this._getFocusedDate()), s = i.year, a = i.month, h = i.date;
                if (!this._isHotKeyPressed()) {
                    switch (t) {
                        case 37:
                            "day" == e ? h -= 1 : "", "month" == e ? a -= 1 : "", "year" == e ? s -= 1 : "";
                            break;
                        case 38:
                            "day" == e ? h -= 7 : "", "month" == e ? a -= 3 : "", "year" == e ? s -= 4 : "";
                            break;
                        case 39:
                            "day" == e ? h += 1 : "", "month" == e ? a += 1 : "", "year" == e ? s += 1 : "";
                            break;
                        case 40:
                            "day" == e ? h += 7 : "", "month" == e ? a += 3 : "", "year" == e ? s += 4 : ""
                    }
                    var r = new Date(s, a, h);
                    r.getTime() < this.minTime ? r = this.minDate : r.getTime() > this.maxTime && (r = this.maxDate), this.focused = r
                }
            }, _getFocusedDate: function () {
                var t = this.focused || this.selectedDates[this.selectedDates.length - 1], e = this.parsedDate;
                if (!t)switch (this.view) {
                    case"days":
                        t = new Date(e.year, e.month, (new Date).getDate());
                        break;
                    case"months":
                        t = new Date(e.year, e.month, 1);
                        break;
                    case"years":
                        t = new Date(e.year, 0, 1)
                }
                return t
            }, _getCell: function (t, e) {
                e = e || this.cellType;
                var i, s = n.getParsedDate(t), a = '.datepicker--cell[data-year="' + s.year + '"]';
                switch (e) {
                    case"month":
                        a = '[data-month="' + s.month + '"]';
                        break;
                    case"day":
                        a += '[data-month="' + s.month + '"][data-date="' + s.date + '"]'
                }
                return i = this.views[this.currentView].$el.find(a), i.length ? i : ""
            }, destroy: function () {
                var t = this;
                t.$el.off(".adp").data("datepicker", ""), t.selectedDates = [], t.focused = "", t.views = {}, t.keys = [], t.minRange = "", t.maxRange = "", t.opts.inline || !t.elIsInput ? t.$datepicker.closest(".datepicker-inline").remove() : t.$datepicker.remove()
            }, _onShowEvent: function (t) {
                this.visible || this.show()
            }, _onBlur: function () {
                !this.inFocus && this.visible && this.hide()
            }, _onMouseDownDatepicker: function (t) {
                this.inFocus = !0
            }, _onMouseUpDatepicker: function (t) {
                this.inFocus = !1, t.originalEvent.inFocus = !0, t.originalEvent.timepickerFocus || this.$el.focus()
            }, _onKeyUpGeneral: function (t) {
                var e = this.$el.val();
                e || this.clear()
            }, _onResize: function () {
                this.visible && this.setPosition()
            }, _onMouseUpBody: function (t) {
                t.originalEvent.inFocus || this.visible && !this.inFocus && this.hide()
            }, _onMouseUpEl: function (t) {
                t.originalEvent.inFocus = !0, setTimeout(this._onKeyUpGeneral.bind(this), 4)
            }, _onKeyDown: function (t) {
                var e = t.which;
                if (this._registerKey(e), e >= 37 && 40 >= e && (t.preventDefault(), this._focusNextCell(e)), 13 == e && this.focused) {
                    if (this._getCell(this.focused).hasClass("-disabled-"))return;
                    if (this.view != this.opts.minView) this.down(); else {
                        var i = this._isSelected(this.focused, this.cellType);
                        i ? i && this.opts.toggleSelected && this.removeDate(this.focused) : (this.timepicker && (this.focused.setHours(this.timepicker.hours), this.focused.setMinutes(this.timepicker.minutes)), this.selectDate(this.focused))
                    }
                }
                27 == e && this.hide()
            }, _onKeyUp: function (t) {
                var e = t.which;
                this._unRegisterKey(e)
            }, _onHotKey: function (t, e) {
                this._handleHotKey(e)
            }, _onMouseEnterCell: function (t) {
                var i = e(t.target).closest(".datepicker--cell"), s = this._getDateFromCell(i);
                this.silent = !0, this.focused && (this.focused = ""), i.addClass("-focus-"), this.focused = s, this.silent = !1, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this.focused) && (this.maxRange = this.minRange, this.minRange = ""), this.views[this.currentView]._update())
            }, _onMouseLeaveCell: function (t) {
                var i = e(t.target).closest(".datepicker--cell");
                i.removeClass("-focus-"), this.silent = !0, this.focused = "", this.silent = !1
            }, _onTimeChange: function (t, e, i) {
                var s = new Date, a = this.selectedDates, n = !1;
                a.length && (n = !0, s = this.lastSelectedDate), s.setHours(e), s.setMinutes(i), n || this._getCell(s).hasClass("-disabled-") ? (this._setInputValue(), this.opts.onSelect && this._triggerOnChange()) : this.selectDate(s)
            }, _onClickCell: function (t, e) {
                this.timepicker && (e.setHours(this.timepicker.hours), e.setMinutes(this.timepicker.minutes)), this.selectDate(e)
            }, set focused(t) {
                if (!t && this.focused) {
                    var e = this._getCell(this.focused);
                    e.length && e.removeClass("-focus-")
                }
                this._focused = t, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this._focused) && (this.maxRange = this.minRange, this.minRange = "")), this.silent || (this.date = t)
            }, get focused() {
                return this._focused
            }, get parsedDate() {
                return n.getParsedDate(this.date)
            }, set date(t) {
                return t instanceof Date ? (this.currentDate = t, this.inited && !this.silent && (this.views[this.view]._render(), this.nav._render(), this.visible && this.elIsInput && this.setPosition()), t) : void 0
            }, get date() {
                return this.currentDate
            }, set view(t) {
                return this.viewIndex = this.viewIndexes.indexOf(t), this.viewIndex < 0 ? void 0 : (this.prevView = this.currentView, this.currentView = t, this.inited && (this.views[t] ? this.views[t]._render() : this.views[t] = new e.fn.datepicker.Body(this, t, this.opts), this.views[this.prevView].hide(), this.views[t].show(), this.nav._render(), this.opts.onChangeView && this.opts.onChangeView(t), this.elIsInput && this.visible && this.setPosition()), t)
            }, get view() {
                return this.currentView
            }, get cellType() {
                return this.view.substring(0, this.view.length - 1)
            }, get minTime() {
                var t = n.getParsedDate(this.minDate);
                return new Date(t.year, t.month, t.date).getTime()
            }, get maxTime() {
                var t = n.getParsedDate(this.maxDate);
                return new Date(t.year, t.month, t.date).getTime()
            }, get curDecade() {
                return n.getDecade(this.date)
            }
        }, n.getDaysCount = function (t) {
            return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()
        }, n.getParsedDate = function (t) {
            return {
                year: t.getFullYear(),
                month: t.getMonth(),
                fullMonth: t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1,
                date: t.getDate(),
                fullDate: t.getDate() < 10 ? "0" + t.getDate() : t.getDate(),
                day: t.getDay(),
                hours: t.getHours(),
                fullHours: t.getHours() < 10 ? "0" + t.getHours() : t.getHours(),
                minutes: t.getMinutes(),
                fullMinutes: t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()
            }
        }, n.getDecade = function (t) {
            var e = 10 * Math.floor(t.getFullYear() / 10);
            return [e, e + 9]
        }, n.template = function (t, e) {
            return t.replace(/#\{([\w]+)\}/g, function (t, i) {
                return e[i] || 0 === e[i] ? e[i] : void 0
            })
        }, n.isSame = function (t, e, i) {
            if (!t || !e)return !1;
            var s = n.getParsedDate(t), a = n.getParsedDate(e), h = i ? i : "day", r = {
                day: s.date == a.date && s.month == a.month && s.year == a.year,
                month: s.month == a.month && s.year == a.year,
                year: s.year == a.year
            };
            return r[h]
        }, n.less = function (t, e, i) {
            return t && e ? e.getTime() < t.getTime() : !1
        }, n.bigger = function (t, e, i) {
            return t && e ? e.getTime() > t.getTime() : !1
        }, n.getLeadingZeroNum = function (t) {
            return parseInt(t) < 10 ? "0" + t : t
        }, e.fn.datepicker = function (t) {
            return this.each(function () {
                if (e.data(this, h)) {
                    var i = e.data(this, h);
                    i.opts = e.extend(!0, i.opts, t), i.update()
                } else e.data(this, h, new u(this, t))
            })
        }, e.fn.datepicker.Constructor = u, e.fn.datepicker.language = {
            ru: {
                days: ["??????????????????????", "??????????????????????", "??????????????", "??????????", "??????????????", "??????????????", "??????????????"],
                daysShort: ["??????", "??????", "??????", "??????", "??????", "??????", "??????"],
                daysMin: ["????", "????", "????", "????", "????", "????", "????"],
                months: ["????????????", "??????????????", "????????", "????????????", "??????", "????????", "????????", "????????????", "????????????????", "??????????????", "????????????", "??????????????"],
                monthsShort: ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????"],
                today: "??????????????",
                clear: "????????????????",
                dateFormat: "dd.mm.yyyy",
                timeFormat: "hh:ii",
                firstDay: 1
            }
        }, e(function () {
            e(r).datepicker()
        })
    }(), function () {
        var t = {
            days: '<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',
            months: '<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',
            years: '<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'
        }, s = e.fn.datepicker, a = s.Constructor;
        s.Body = function (t, e, i) {
            this.d = t, this.type = e, this.opts = i, this.init()
        }, s.Body.prototype = {
            init: function () {
                this._buildBaseHtml(), this._render(), this._bindEvents()
            }, _bindEvents: function () {
                this.$el.on("click", ".datepicker--cell", e.proxy(this._onClickCell, this))
            }, _buildBaseHtml: function () {
                this.$el = e(t[this.type]).appendTo(this.d.$content), this.$names = e(".datepicker--days-names", this.$el), this.$cells = e(".datepicker--cells", this.$el)
            }, _getDayNamesHtml: function (t, e, s, a) {
                return e = e != i ? e : t, s = s ? s : "", a = a != i ? a : 0, a > 7 ? s : 7 == e ? this._getDayNamesHtml(t, 0, s, ++a) : (s += '<div class="datepicker--day-name' + (this.d.isWeekend(e) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[e] + "</div>", this._getDayNamesHtml(t, ++e, s, ++a))
            }, _getCellContents: function (t, e) {
                var i = "datepicker--cell datepicker--cell-" + e, s = new Date, n = this.d, h = n.opts, r = a.getParsedDate(t), o = {}, c = r.date;
                switch (h.onRenderCell && (o = h.onRenderCell(t, e) || {}, c = o.html ? o.html : c, i += o.classes ? " " + o.classes : ""), e) {
                    case"day":
                        n.isWeekend(r.day) && (i += " -weekend-"), r.month != this.d.parsedDate.month && (i += " -other-month-", h.selectOtherMonths || (i += " -disabled-"), h.showOtherMonths || (c = ""));
                        break;
                    case"month":
                        c = n.loc[n.opts.monthsField][r.month];
                        break;
                    case"year":
                        var d = n.curDecade;
                        c = r.year, (r.year < d[0] || r.year > d[1]) && (i += " -other-decade-", h.selectOtherYears || (i += " -disabled-"), h.showOtherYears || (c = ""))
                }
                return h.onRenderCell && (o = h.onRenderCell(t, e) || {}, c = o.html ? o.html : c, i += o.classes ? " " + o.classes : ""), h.range && (a.isSame(n.minRange, t, e) && (i += " -range-from-"), a.isSame(n.maxRange, t, e) && (i += " -range-to-"), 1 == n.selectedDates.length && n.focused ? ((a.bigger(n.minRange, t) && a.less(n.focused, t) || a.less(n.maxRange, t) && a.bigger(n.focused, t)) && (i += " -in-range-"), a.less(n.maxRange, t) && a.isSame(n.focused, t) && (i += " -range-from-"), a.bigger(n.minRange, t) && a.isSame(n.focused, t) && (i += " -range-to-")) : 2 == n.selectedDates.length && a.bigger(n.minRange, t) && a.less(n.maxRange, t) && (i += " -in-range-")), a.isSame(s, t, e) && (i += " -current-"), n.focused && a.isSame(t, n.focused, e) && (i += " -focus-"), n._isSelected(t, e) && (i += " -selected-"), (!n._isInRange(t, e) || o.disabled) && (i += " -disabled-"), {
                    html: c,
                    classes: i
                }
            }, _getDaysHtml: function (t) {
                var e = a.getDaysCount(t), i = new Date(t.getFullYear(), t.getMonth(), 1).getDay(), s = new Date(t.getFullYear(), t.getMonth(), e).getDay(), n = i - this.d.loc.firstDay, h = 6 - s + this.d.loc.firstDay;
                n = 0 > n ? n + 7 : n, h = h > 6 ? h - 7 : h;
                for (var r, o, c = -n + 1, d = "", l = c, u = e + h; u >= l; l++)o = t.getFullYear(), r = t.getMonth(), d += this._getDayHtml(new Date(o, r, l));
                return d
            }, _getDayHtml: function (t) {
                var e = this._getCellContents(t, "day");
                return '<div class="' + e.classes + '" data-date="' + t.getDate() + '" data-month="' + t.getMonth() + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>"
            }, _getMonthsHtml: function (t) {
                for (var e = "", i = a.getParsedDate(t), s = 0; 12 > s;)e += this._getMonthHtml(new Date(i.year, s)), s++;
                return e
            }, _getMonthHtml: function (t) {
                var e = this._getCellContents(t, "month");
                return '<div class="' + e.classes + '" data-month="' + t.getMonth() + '">' + e.html + "</div>"
            }, _getYearsHtml: function (t) {
                var e = (a.getParsedDate(t), a.getDecade(t)), i = e[0] - 1, s = "", n = i;
                for (n; n <= e[1] + 1; n++)s += this._getYearHtml(new Date(n, 0));
                return s
            }, _getYearHtml: function (t) {
                var e = this._getCellContents(t, "year");
                return '<div class="' + e.classes + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>"
            }, _renderTypes: {
                days: function () {
                    var t = this._getDayNamesHtml(this.d.loc.firstDay), e = this._getDaysHtml(this.d.currentDate);
                    this.$cells.html(e), this.$names.html(t)
                }, months: function () {
                    var t = this._getMonthsHtml(this.d.currentDate);
                    this.$cells.html(t)
                }, years: function () {
                    var t = this._getYearsHtml(this.d.currentDate);
                    this.$cells.html(t)
                }
            }, _render: function () {
                this._renderTypes[this.type].bind(this)()
            }, _update: function () {
                var t, i, s, a = e(".datepicker--cell", this.$cells), n = this;
                a.each(function (a, h) {
                    i = e(this), s = n.d._getDateFromCell(e(this)), t = n._getCellContents(s, n.d.cellType), i.attr("class", t.classes)
                })
            }, show: function () {
                this.$el.addClass("active"), this.acitve = !0
            }, hide: function () {
                this.$el.removeClass("active"), this.active = !1
            }, _handleClick: function (t) {
                var e = t.data("date") || 1, i = t.data("month") || 0, s = t.data("year") || this.d.parsedDate.year;
                if (this.d.view != this.opts.minView)return void this.d.down(new Date(s, i, e));
                var a = new Date(s, i, e), n = this.d._isSelected(a, this.d.cellType);
                n ? n && this.opts.toggleSelected ? this.d.removeDate(a) : n && !this.opts.toggleSelected && (this.d.lastSelectedDate = n, this.d.opts.timepicker && (this.d.timepicker._setTime(n), this.d.timepicker.update())) : this.d._trigger("clickCell", a)
            }, _onClickCell: function (t) {
                var i = e(t.target).closest(".datepicker--cell");
                i.hasClass("-disabled-") || this._handleClick.bind(this)(i)
            }
        }
    }(), function () {
        var t = '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>', i = '<div class="datepicker--buttons"></div>', s = '<span class="datepicker--button" data-action="#{action}">#{label}</span>', a = e.fn.datepicker, n = a.Constructor;
        a.Navigation = function (t, e) {
            this.d = t, this.opts = e, this.$buttonsContainer = "", this.init()
        }, a.Navigation.prototype = {
            init: function () {
                this._buildBaseHtml(), this._bindEvents()
            }, _bindEvents: function () {
                this.d.$nav.on("click", ".datepicker--nav-action", e.proxy(this._onClickNavButton, this)), this.d.$nav.on("click", ".datepicker--nav-title", e.proxy(this._onClickNavTitle, this)), this.d.$datepicker.on("click", ".datepicker--button", e.proxy(this._onClickNavButton, this))
            }, _buildBaseHtml: function () {
                this._render(), this._addButtonsIfNeed()
            }, _addButtonsIfNeed: function () {
                this.opts.todayButton && this._addButton("today"), this.opts.clearButton && this._addButton("clear")
            }, _render: function () {
                var i = this._getTitle(this.d.currentDate), s = n.template(t, e.extend({title: i}, this.opts));
                this.d.$nav.html(s), "years" == this.d.view && e(".datepicker--nav-title", this.d.$nav).addClass("-disabled-"), this.setNavStatus()
            }, _getTitle: function (t) {
                return this.d.formatDate(this.opts.navTitles[this.d.view], t)
            }, _addButton: function (t) {
                this.$buttonsContainer.length || this._addButtonsContainer();
                var i = {action: t, label: this.d.loc[t]}, a = n.template(s, i);
                e("[data-action=" + t + "]", this.$buttonsContainer).length || this.$buttonsContainer.append(a)
            }, _addButtonsContainer: function () {
                this.d.$datepicker.append(i), this.$buttonsContainer = e(".datepicker--buttons", this.d.$datepicker)
            }, setNavStatus: function () {
                if ((this.opts.minDate || this.opts.maxDate) && this.opts.disableNavWhenOutOfRange) {
                    var t = this.d.parsedDate, e = t.month, i = t.year, s = t.date;
                    switch (this.d.view) {
                        case"days":
                            this.d._isInRange(new Date(i, e - 1, s), "month") || this._disableNav("prev"), this.d._isInRange(new Date(i, e + 1, s), "month") || this._disableNav("next");
                            break;
                        case"months":
                            this.d._isInRange(new Date(i - 1, e, s), "year") || this._disableNav("prev"), this.d._isInRange(new Date(i + 1, e, s), "year") || this._disableNav("next");
                            break;
                        case"years":
                            this.d._isInRange(new Date(i - 10, e, s), "year") || this._disableNav("prev"), this.d._isInRange(new Date(i + 10, e, s), "year") || this._disableNav("next")
                    }
                }
            }, _disableNav: function (t) {
                e('[data-action="' + t + '"]', this.d.$nav).addClass("-disabled-")
            }, _activateNav: function (t) {
                e('[data-action="' + t + '"]', this.d.$nav).removeClass("-disabled-")
            }, _onClickNavButton: function (t) {
                var i = e(t.target).closest("[data-action]"), s = i.data("action");
                this.d[s]()
            }, _onClickNavTitle: function (t) {
                return e(t.target).hasClass("-disabled-") ? void 0 : "days" == this.d.view ? this.d.view = "months" : void(this.d.view = "years")
            }
        }
    }(), function () {
        var t = '<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourValue}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>', i = e.fn.datepicker, s = i.Constructor;
        i.Timepicker = function (t, e) {
            this.d = t, this.opts = e, this.init()
        }, i.Timepicker.prototype = {
            init: function () {
                var t = "input";
                this._setTime(this.d.date), this._buildHTML(), navigator.userAgent.match(/trident/gi) && (t = "change"), this.d.$el.on("selectDate", this._onSelectDate.bind(this)), this.$ranges.on(t, this._onChangeRange.bind(this)), this.$ranges.on("mouseup", this._onMouseUpRange.bind(this)), this.$ranges.on("mousemove focus ", this._onMouseEnterRange.bind(this)), this.$ranges.on("mouseout blur", this._onMouseOutRange.bind(this))
            }, _setTime: function (t) {
                var e = s.getParsedDate(t);
                this._handleDate(t), this.hours = e.hours < this.minHours ? this.minHours : e.hours, this.minutes = e.minutes < this.minMinutes ? this.minMinutes : e.minutes
            }, _setMinTimeFromDate: function (t) {
                this.minHours = t.getHours(), this.minMinutes = t.getMinutes()
            }, _setMaxTimeFromDate: function (t) {
                this.maxHours = t.getHours(), this.maxMinutes = t.getMinutes()
            }, _setDefaultMinMaxTime: function () {
                var t = 23, e = 59, i = this.opts;
                this.minHours = i.minHours < 0 || i.minHours > t ? 0 : i.minHours, this.minMinutes = i.minMinutes < 0 || i.minMinutes > e ? 0 : i.minMinutes, this.maxHours = i.maxHours < 0 || i.maxHours > t ? t : i.maxHours, this.maxMinutes = i.maxMinutes < 0 || i.maxMinutes > e ? e : i.maxMinutes
            }, _validateHoursMinutes: function (t) {
                this.hours < this.minHours ? this.hours = this.minHours : this.hours > this.maxHours && (this.hours = this.maxHours), this.minutes < this.minMinutes ? this.minutes = this.minMinutes : this.minutes > this.maxMinutes && (this.minutes = this.maxMinutes)
            }, _buildHTML: function () {
                var i = s.getLeadingZeroNum, a = {
                    hourMin: this.minHours,
                    hourMax: i(this.maxHours),
                    hourStep: this.opts.hoursStep,
                    hourValue: i(this.displayHours),
                    minMin: this.minMinutes,
                    minMax: i(this.maxMinutes),
                    minStep: this.opts.minutesStep,
                    minValue: i(this.minutes)
                }, n = s.template(t, a);
                this.$timepicker = e(n).appendTo(this.d.$datepicker), this.$ranges = e('[type="range"]', this.$timepicker), this.$hours = e('[name="hours"]', this.$timepicker),
                    this.$minutes = e('[name="minutes"]', this.$timepicker), this.$hoursText = e(".datepicker--time-current-hours", this.$timepicker), this.$minutesText = e(".datepicker--time-current-minutes", this.$timepicker), this.d.ampm && (this.$ampm = e('<span class="datepicker--time-current-ampm">').appendTo(e(".datepicker--time-current", this.$timepicker)).html(this.dayPeriod), this.$timepicker.addClass("-am-pm-"))
            }, _updateCurrentTime: function () {
                var t = s.getLeadingZeroNum(this.displayHours), e = s.getLeadingZeroNum(this.minutes);
                this.$hoursText.html(t), this.$minutesText.html(e), this.d.ampm && this.$ampm.html(this.dayPeriod)
            }, _updateRanges: function () {
                this.$hours.attr({
                    min: this.minHours,
                    max: this.maxHours
                }).val(this.hours), this.$minutes.attr({min: this.minMinutes, max: this.maxMinutes}).val(this.minutes)
            }, _handleDate: function (t) {
                this._setDefaultMinMaxTime(), t && (s.isSame(t, this.d.opts.minDate) ? this._setMinTimeFromDate(this.d.opts.minDate) : s.isSame(t, this.d.opts.maxDate) && this._setMaxTimeFromDate(this.d.opts.maxDate)), this._validateHoursMinutes(t)
            }, update: function () {
                this._updateRanges(), this._updateCurrentTime()
            }, _getValidHoursFromDate: function (t) {
                var e = t, i = t;
                t instanceof Date && (e = s.getParsedDate(t), i = e.hours);
                var a = this.d.ampm, n = "am";
                if (a)switch (!0) {
                    case 0 == i:
                        i = 12;
                        break;
                    case 12 == i:
                        n = "pm";
                        break;
                    case i > 11:
                        i -= 12, n = "pm"
                }
                return {hours: i, dayPeriod: n}
            }, set hours(t) {
                this._hours = t;
                var e = this._getValidHoursFromDate(t);
                this.displayHours = e.hours, this.dayPeriod = e.dayPeriod
            }, get hours() {
                return this._hours
            }, _onChangeRange: function (t) {
                var i = e(t.target), s = i.attr("name");
                this.d.timepickerIsActive = !0, this[s] = i.val(), this._updateCurrentTime(), this.d._trigger("timeChange", [this.hours, this.minutes])
            }, _onSelectDate: function (t, e) {
                this._handleDate(e), this.update()
            }, _onMouseEnterRange: function (t) {
                var i = e(t.target).attr("name");
                e(".datepicker--time-current-" + i, this.$timepicker).addClass("-focus-")
            }, _onMouseOutRange: function (t) {
                var i = e(t.target).attr("name");
                this.d.inFocus || e(".datepicker--time-current-" + i, this.$timepicker).removeClass("-focus-")
            }, _onMouseUpRange: function (t) {
                this.d.timepickerIsActive = !1
            }
        }
    }()
}(window, jQuery);
;(function ($) {
    $.fn.datepicker.language['en'] = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yyyy',
        timeFormat: 'hh:ii aa',
        firstDay: 0
    };
})(jQuery);
$('input.md_vc_datepicker').datepicker({
    language: 'en',
    minDate: new Date()
});


function base64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
};
function base64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

$(function () {
    $('.to-base64').each(function () {
        $(this).val(base64DecodeUnicode($(this).siblings('input[type="hidden"],textarea.mBuilder-hidden').val().replace(/pixflow_base64/g, '')));
    });
});

$('.to-base64').keyup(function () {
    var value = $(this).val();
    value = base64EncodeUnicode(value);
    $(this).siblings('input[type="hidden"],textarea.mBuilder-hidden').val('pixflow_base64' + value);
});


var pixflow_increase_value = function ( $el ){
    var $input_el = $el.closest('.param-md-vc-slider').find('.md_vc_number');
    var input_info = {
        current_value : parseFloat( $input_el.val() ) ,
        min : parseFloat( $input_el.attr('data-min') ) ,
        max : parseFloat( $input_el.attr('data-max') ) ,
        step : parseFloat( $input_el.attr('data-step') ) ,
    }
    var real_value = input_info.current_value + input_info.step ;
    if ( isNaN( input_info.current_value ) || real_value > input_info.max ){
        return ;
    }
    if ( parseInt( real_value ) != real_value ){
        $input_el.val( real_value.toFixed(1) );
        return ;
    }
    $input_el.val( real_value );

}

var pixflow_reduce_value = function ( $el ){
    var $input_el = $el.closest('.param-md-vc-slider').find('.md_vc_number');
    var input_info = {
        current_value : parseFloat( $input_el.val() ) ,
        min : parseFloat( $input_el.attr('data-min') ) ,
        max : parseFloat( $input_el.attr('data-max') ) ,
        step : parseFloat( $input_el.attr('data-step') ) ,
    }
    var real_value = input_info.current_value - input_info.step ;
    if ( isNaN( input_info.current_value ) || real_value < input_info.min ){
        return ;
    }

    if ( parseInt( real_value ) != real_value ){
        $input_el.val( real_value.toFixed(1) );
        return ;
    }
    $input_el.val( real_value );
}

var interval;
$('.md-increament-controller span').on('mousedown',function(e) {
    var that = $(this);
    interval = setInterval(function() {
        var action = that.attr('data-action');
        if( action == 'plus' ){
            pixflow_increase_value( that );
        }else{
            pixflow_reduce_value( that );
        }
    },100); 
});

$('.md-increament-controller span').on('mouseup',function(e) {
    clearInterval(interval);
});

$('.md-increament-controller span').on('mouseout',function(e) {
    clearInterval(interval);
});



$('.md_vc_number').on( 'keypress' , function () {
    return event.charCode >= 48 && event.charCode <= 57 ;
});

$('.md_vc_number').on('keyup' , function(){
    var that = $(this);
    setTimeout(function(){
        var value = parseInt( that.val() ),
            max = parseInt( that.attr('data-max') ) ,
            min = parseInt( that.attr('data-min') ) ;
        if( value > max ){
            that.val(max);
        }
        if( value < min ){
            that.val(min);
        }
    } , 500 );
});

var tinymce_string = function () {
    var font_string = '',
        count;
    for (count = 1; count <= 100; count++) {
        font_string += count + 'px ';
    }
    return font_string.trim();
};


setTimeout(function () {
    if ( $('body').hasClass('pixflow-builder') ){
	    try {
		    tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'wpb_tinymce_content');
	    } catch (e) {}
        tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'content');
    }
	try {
		tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'md_text_title1_text');
	} catch (e) {}

	tinymce.init({
		selector: '.tinymce-editor input[type="text"]',
		content_style: "body {background:#fbfbfb!important}",
		theme_advanced_toolbar_location: "top",
		forced_root_block: 'div',
		force_p_newlines: false,
		theme_advanced_resizing: false,
		theme_advanced_resizing_use_cookie: false,
		force_br_newlines: false,
		toolbar_items_size: 'small',
		tabfocus_elements: ":next",
		block_formats: 'Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6',
		fontsize_formats: tinymce_string(),
		toolbar: 'fontsizeselect | forecolor | styleselect | link | code | undo redo ',
		menubar: false,
		paste_as_text: true,
		paste_preprocess: function (plugin, args) {
			args.content = args.content.toString().replace(/<\/?[^>]+>/gi, '');
		},
		plugins: 'textcolor wordpress wplink tabfocus textcolor colorpicker paste lists code',
		external_plugins: {
			'code': tinyMceValues.tinymce_code_plugin_url,
		},
		init_instance_callback: function (editor) {
			editor.on('blur', function (e) {
				update_text_input(e);
			});
		}
	});
    
    tinymce.init({
        selector: '.tinymce-content-editor textarea',
        content_style: "body {background:#fbfbfb!important}",
        convert_urls: false,
        theme_advanced_toolbar_location: "top",
        forced_root_block: 'div',
        force_p_newlines: false,
        theme_advanced_resizing: false,
        theme_advanced_resizing_use_cookie: false,
        force_br_newlines: false,
        menubar: false,
        toolbar_items_size: 'small',
        tabfocus_elements: ":next",
        block_formats: 'Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6',
        fontsize_formats: tinymce_string(),
        toolbar: 'fontsizeselect | forecolor | styleselect | bullist numlist | link image | code | undo redo ',
        paste_as_text: true,
        paste_preprocess: function (plugin, args) {
            args.content = args.content.toString().replace(/<\/?[^>]+>/gi, '');
        },
        plugins: 'textcolor wordpress wplink tabfocus image textcolor colorpicker paste lists code',
        external_plugins: {
            'code': tinyMceValues.tinymce_code_plugin_url,
        },
    });
}, 300);
change_font_event();
function change_font_event() {
    // Title font change
    $('div[data-vc-shortcode-param-name="md_text_title_google_fonts"] .vc_google_fonts_form_field-font_family-select,' +
        ' div[data-vc-shortcode-param-name="md_text_title_google_fonts"] .vc_google_fonts_form_field-font_style-select,' +
        '.google-fonts-families[data-input="md_text_title_google_fonts"],' +
        '.google-fonts-styles[data-input="md_text_title_google_fonts"]').change(function (e) {
        if (typeof e.originalEvent != 'undefined') {
            var content = tinymce.get('md_text_title1_text').getContent();
            pixflow_remove_fonts('md_text_title1_text', content);
        }
    });
    // Description font change
    $('div[data-vc-shortcode-param-name="md_text_desc_google_fonts"] .vc_google_fonts_form_field-font_family-select,' +
        ' div[data-vc-shortcode-param-name="md_text_desc_google_fonts"] .vc_google_fonts_form_field-font_style-select,' +
        '.google-fonts-families[data-input="md_text_desc_google_fonts"],' +
        '.google-fonts-styles[data-input="md_text_desc_google_fonts"]').change(function (e) {
        if (typeof e.originalEvent != 'undefined') {
            if (tinymce.get('wpb_tinymce_content') != null) {
                var tinymce_id = 'wpb_tinymce_content';
            } else {
                var tinymce_id = 'content';
            }
            var content = tinymce.get(tinymce_id).getContent();
            pixflow_remove_fonts(tinymce_id, content);
        }
    });
}

function pixflow_remove_fonts(tinymce_id, content) {
    $('body').append('<div style="display: none" id="temp-fonts"></div>');
    var $temp_div = $('#temp-fonts');
    $temp_div.html(content);
    $('#temp-fonts [style*="font-family"]').css('font-family', '');
    var new_content = $temp_div.html();
    tinymce.get(tinymce_id).setContent(new_content);
    tinymce.get(tinymce_id).save();
    $temp_div.remove();
}

function update_text_input(e) {
    var target = e.target || e.srcElement;
    tinyMCE.triggerSave();
    var $el = $(target.targetElm);
    if ($el.hasClass('textarea_html')) {
	    $el.parent().parent().siblings('input[type=hidden]').val("<p>" + $el.val() + "</p>");
    } else {
	    $(target.targetElm).trigger('keyup');
    }
}