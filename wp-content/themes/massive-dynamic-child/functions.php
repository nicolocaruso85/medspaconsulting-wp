<?php
function pixflow_child_theme_admin_scripts(){

    wp_dequeue_style('admin');

    wp_enqueue_style('admin-style-child',pixflow_path_combine(get_stylesheet_directory_uri(),'/admin-child.css'),false,PIXFLOW_THEME_VERSION);

    wp_enqueue_script('admin-script-child',pixflow_path_combine(get_stylesheet_directory_uri(),'/js/admin-child.js'),false,PIXFLOW_THEME_VERSION);

}

add_action( 'admin_head', 'pixflow_child_theme_admin_scripts',55);

function parent_enqueue_styles() {

    // enqueue parent styles
    wp_enqueue_style('style', get_template_directory_uri() .'/style.css');

}
add_action('wp_enqueue_scripts', 'parent_enqueue_styles');


function pixflow_child_theme_scripts(){

    //Register Main Theme Styles
    wp_enqueue_style('child-style', get_stylesheet_directory_uri().'/style.css', false, PIXFLOW_THEME_VERSION);


    wp_enqueue_style('child-responsive-style', pixflow_path_combine(get_stylesheet_directory_uri(),'/responsive-child.css'), false, PIXFLOW_THEME_VERSION);


    wp_enqueue_script('main-child-js', pixflow_path_combine(get_stylesheet_directory_uri(), '/js/custom-child.js'), array(), PIXFLOW_THEME_VERSION, true);

}

add_action('wp_enqueue_scripts', 'pixflow_child_theme_scripts',55);



function enqueue_customize_styles() {
    wp_enqueue_style( 'child-custom', get_stylesheet_directory_uri() . '/css/custom.css' );
    wp_enqueue_style( 'child-responsive', get_stylesheet_directory_uri() . '/css/responsive.css' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_customize_styles' );



function enqueue_customize_scripts() {
    //wp_enqueue_script( 'custom-js', get_stylesheet_directory_uri() . '/js/custom.js' );
    //wp_enqueue_script( 'consent-solution', get_stylesheet_directory_uri() . '/js/consent-solution.js' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_customize_scripts' );


function admin_style() {
  wp_enqueue_style('child-admin', get_stylesheet_directory_uri().'/css/admin.css');
}
add_action('admin_enqueue_scripts', 'admin_style');