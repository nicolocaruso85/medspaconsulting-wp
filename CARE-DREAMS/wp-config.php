<?php
/**
 * Il file base di configurazione di WordPress.
 *
 * Questo file viene utilizzato, durante l’installazione, dallo script
 * di creazione di wp-config.php. Non è necessario utilizzarlo solo via web
 * puoi copiare questo file in «wp-config.php» e riempire i valori corretti.
 *
 * Questo file definisce le seguenti configurazioni:
 *
 * * Impostazioni MySQL
 * * Chiavi Segrete
 * * Prefisso Tabella
 * * ABSPATH
 *
 * * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Impostazioni MySQL - È possibile ottenere queste informazioni dal proprio fornitore di hosting ** //
/** Il nome del database di WordPress */
define( 'DB_NAME', 'medspaconsulting' );

/** Nome utente del database MySQL */
define( 'DB_USER', 'medspaconsulting' );

/** Password del database MySQL */
define( 'DB_PASSWORD', 'B43@/!xr`KhFWw__' );

/** Hostname MySQL  */
define( 'DB_HOST', 'localhost' );

/** Charset del Database da utilizzare nella creazione delle tabelle. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Il tipo di Collazione del Database. Da non modificare se non si ha idea di cosa sia. */
define('DB_COLLATE', '');

/**#@+
 * Chiavi Univoche di Autenticazione e di Salatura.
 *
 * Modificarle con frasi univoche differenti!
 * È possibile generare tali chiavi utilizzando {@link https://api.wordpress.org/secret-key/1.1/salt/ servizio di chiavi-segrete di WordPress.org}
 * È possibile cambiare queste chiavi in qualsiasi momento, per invalidare tuttii cookie esistenti. Ciò forzerà tutti gli utenti ad effettuare nuovamente il login.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'HW#LbJ3;vyTF.E~K19Y)4rRS`aS~~Pblm.)APp=H>,<9:S5cxiG{|v$~ut:a`5iq' );
define( 'SECURE_AUTH_KEY',  'Vr;2jqcE(JZ8H%af/C_,vRr8>?GJwS8e84U/IO]&GJf`F/DGWFxQCPX&.6-c&I,K' );
define( 'LOGGED_IN_KEY',    'hdIY72{G&KTV;Q?{pg!c1H+j5?XYD1BD&$f7r7IQ/KapW8QqMO(-?ERrIpHoB<m(' );
define( 'NONCE_KEY',        '$C-Kk76.Y{XLuK&j#HWbrCA{Fc}FhK[#}aMm!RTKkyA)fK{T`hXz>7/;z^iN*%Ck' );
define( 'AUTH_SALT',        '%HDa1[B$XWmdNr)%Ey]T~}V~K~7QFtqz&Ot&AA5tm!TJ5Tcc?#E4rWE+T>w)hwO5' );
define( 'SECURE_AUTH_SALT', 'H/pg~fxo ?^DCIdh+u@vv&X.;hI8Pvq#5&0Z.)kQVyeUz4OK6##& glh_]u_uxZ+' );
define( 'LOGGED_IN_SALT',   'iV>R<Wtfe~qWqs`?wwRFT6[!q$n0{J4;&Q[ r}14f&ePuIN#Zjj{^&ZOVk].;b,r' );
define( 'NONCE_SALT',       'lt3:-g)^qoK4r-j|zWuavf*skYz_G3cy=DS-C<I.&[YMqHQ8>j<6dkv6}0@d.hTS' );

/**#@-*/

/**
 * Prefisso Tabella del Database WordPress.
 *
 * È possibile avere installazioni multiple su di un unico database
 * fornendo a ciascuna installazione un prefisso univoco.
 * Solo numeri, lettere e sottolineatura!
 */
$table_prefix = 'care_';

/**
 * Per gli sviluppatori: modalità di debug di WordPress.
 *
 * Modificare questa voce a TRUE per abilitare la visualizzazione degli avvisi durante lo sviluppo
 * È fortemente raccomandato agli svilupaptori di temi e plugin di utilizare
 * WP_DEBUG all’interno dei loro ambienti di sviluppo.
 *
 * Per informazioni sulle altre costanti che possono essere utilizzate per il debug,
 * leggi la documentazione
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define('WP_DEBUG', false);

/* Finito, interrompere le modifiche! Buon blogging. */

/** Path assoluto alla directory di WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Imposta le variabili di WordPress ed include i file. */
require_once(ABSPATH . 'wp-settings.php');
