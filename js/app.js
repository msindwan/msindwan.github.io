/**
 * Portfolio Main Module
 *
 * @Author : Mayank Sindwani
 * @Date   : 2015-09-23
 *
 * Description : A module that binds event handlers and houses helper methods
 * for user interaction with the portfolio.
 **/

'use strict';

// Localize the namespace-like object.
var Portfolio = Portfolio || {};

Portfolio.UI = function() {

    // Private variables
    var data = {},
        dom = {},
        handlers = {},
        methods = {},
        setup = {},
        projects;

    // Projects Array.
    projects = [{

        name: "JConf",
        description: '<a class="repo-link" target="_" href="https://bitbucket.org/msindwan/jconf">JConf</a> \
                      is a JSON parser for C/C++ applications. It is primarily used for JSON-based configuration files.',

        image : "images/jconf_logo.png",
        link: "https://bitbucket.org/msindwan/jconf"

    },
    {

        name: "Server++",
        description: '<a class="repo-link" target="_" href="https://bitbucket.org/msindwan/serverpp">Server++</a> \
                      is a basic HTTP server for Windows and Linux written in C++. \
                      <strong>Please note that it is still under development.</strong>.',

        image : "images/serverpp_logo.png",
        link: "https://bitbucket.org/msindwan/serverpp"

    }];

    /**
     * Setup[dom]
     *
     * Retrieves and caches dom elements
     **/
    setup.dom = function() {
        dom.content = $("#content_scroll");
        dom.menu = $("#site_nav > li");
        dom.view_projects = $("#view_projects");
        dom.profile_education = $(".profile-education");
        dom.profile_experience = $(".profile-experience");
        dom.profile_interests = $(".profile-interests");
        dom.projects = $('.section.projects');
        dom.project_tmpl = $('#project_container');
    };

    /**
     * Setup[data]
     *
     * Declares and sets data variables used globally
     **/
    setup.data = function() {
        data.last_selected_item = $(dom.menu[0]);
        data.slide_interval = 10000;
    }

    /**
     * Setup[bindings]
     *
     * Adds event listeners to cached dom objects
     **/
    setup.bindings = function() {

        dom.menu.click(handlers.menu_item_clicked);

        dom.view_projects.click(handlers.view_projects_clicked);
    };

    /**
     * Setup[plugins]
     *
     * Initializes various third-party plugins
     **/
    setup.plugins = function() {

        dom.content.mCustomScrollbar({
            theme:"dark",
            scrollInertia : 100,
            scrollButtons: { enable: true },
            callbacks : { whileScrolling : handlers.on_scroll }
        });

        $('.carousel').carousel({
            interval: data.slide_interval
        });
    };

    /**
     * Setup[init]
     *
     * Initializes the application. This is the entry point that is
     * exposed globally
     **/
    setup.init = function() {
        setup.dom();
        setup.bindings();
        setup.data();
        setup.plugins();

        methods.app_init();

        // Initialize once
        delete setup.init;
    };

    /* App Handlers */

    handlers.menu_item_clicked = function(e) {
        var li = $(this),
            section = this.getAttribute("data-target");

        if(!data.init)
            return;

        $(dom.content).mCustomScrollbar("scrollTo", $(section), {
            scrollInertia:1000,
            scrollEasing:"easeOut",
            callbacks:false
        });

        if (data.last_selected_item.attr("data-target") != section)
            methods.show_profile();

        data.last_selected_item.removeClass("active");
        data.last_selected_item = li;
        li.addClass("active");
    };

    handlers.on_scroll = function(e) {
        var min,
            name,
            section;

        $.each(dom.menu, function(index, li) {
            var target = li.getAttribute("data-target"),
                top = Math.abs($(target).offset().top);

            if (index === 0 || top < min) {
                min = top;
                section = li;
                name = target;
            }
        });

        data.last_selected_item.removeClass("active");
        data.last_selected_item = $(section);
        $(section).addClass("active");

        if (name === '.section.profile') {
            methods.show_profile();
        }
    };

    handlers.view_projects_clicked = function(e) {
        $("li[data-target='.section.projects']").click();
    };

    methods.app_init = function () {

        projects.forEach(function(project) {
            var clone = $(dom.project_tmpl.get(0).innerHTML),
                columns = clone.find('.col');

            $(columns[0])
                .append($('<a></a>')
                    .attr({
                        'href': project.link,
                        'target': '_'
                    }).append(
                        $('<div></div>')
                            .attr('class', 'project-icon')
                            .css('background-image', 'url(\'' + project.image + '\')')
                     ).append(
                        $('<h1 class="project-title">' + project.name + '</h1>')
                     ));

            $(columns[1])
                .html(project.description);

            dom.projects.append(clone);
        });

        setTimeout(function() {
            $(".loader").hide();
            $("#home_carousel").css("opacity","1");
            setTimeout(function(){data.init = true;}, 500);
        }, 100);
    };

    methods.show_profile = function() {
        setTimeout(function() { dom.profile_education.addClass("slide-top"); }, 0);
        setTimeout(function() { dom.profile_experience.addClass("slide-top");}, 200);
        setTimeout(function() { dom.profile_interests.addClass("slide-top");} , 400);
    };

    return {
        init : setup.init
    }
};