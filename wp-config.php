<?php
/**
 * Il file base di configurazione di WordPress.
 *
 * Questo file viene utilizzato, durante l’installazione, dallo script
 * di creazione di wp-config.php. Non è necessario utilizzarlo solo via
 * web, è anche possibile copiare questo file in «wp-config.php» e
 * riempire i valori corretti.
 *
 * Questo file definisce le seguenti configurazioni:
 *
 * * Impostazioni MySQL
 * * Prefisso Tabella
 * * Chiavi Segrete
 * * ABSPATH
 *
 * È possibile trovare ultetriori informazioni visitando la pagina del Codex:
 *
 * @link https://codex.wordpress.org/it:Modificare_wp-config.php
 *
 * È possibile ottenere le impostazioni per MySQL dal proprio fornitore di hosting.
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
define( 'AUTH_KEY',         'B(|u8jN#=1z`|JOcuLM,0XOc;$Zdd*m`/a4V,~7d@=;}!D8^]p;Kw!W*luzjKx*W' );
define( 'SECURE_AUTH_KEY',  '8}_uG?PC7![)Rex?znX0`z~C44CV+IbDpWDGb,bf_7ip p{NC]*|=:O{wiqsR%@V' );
define( 'LOGGED_IN_KEY',    'glKbp3NEdaldg{/-o G]IJuV=e;5)o/+9ZbLQ|m#ZSPkB[A%`:;SZuU1A0RV7&0:' );
define( 'NONCE_KEY',        '=).0|8+Su`6AXX/2[JgouIpP$6**2U&$T]4PR7sBk(f |u?67!>;q-8#3Vb36Enm' );
define( 'AUTH_SALT',        '~Ng#V?as~*Y^r^!,0@;T$</GMf]XH#lY_pse}x=l).PrD7(cz_7I&RQbZlL>{7uv' );
define( 'SECURE_AUTH_SALT', ';m,^v1&zoy~mI*GnV{0Z+a;&5[x8a]^EBxwF1cki}DX&yOOg5Z`?8hC|u_8Pq]u:' );
define( 'LOGGED_IN_SALT',   '@mS_u4Ex1cG[rXbECR5jJyO^{bYr[OJz}OcN2}l^h(Z<x:+|h$RVboYkZrS>Y9}0' );
define( 'NONCE_SALT',       'Y-2ih=OSL%,_9akkBqffD:7Utsxi=M.~r8)#w}(@3&e{[lP1}nw#v%|_|[@$H?qK' );

/**#@-*/

/**
 * Prefisso Tabella del Database WordPress.
 *
 * È possibile avere installazioni multiple su di un unico database
 * fornendo a ciascuna installazione un prefisso univoco.
 * Solo numeri, lettere e sottolineatura!
 */
$table_prefix = 'wp_';

/**
 * Per gli sviluppatori: modalità di debug di WordPress.
 *
 * Modificare questa voce a TRUE per abilitare la visualizzazione degli avvisi
 * durante lo sviluppo.
 * È fortemente raccomandato agli svilupaptori di temi e plugin di utilizare
 * WP_DEBUG all’interno dei loro ambienti di sviluppo.
 */
define('WP_DEBUG', false);

/* Finito, interrompere le modifiche! Buon creazione di contenuti. */

/** Path assoluto alla directory di WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Imposta le variabili di WordPress ed include i file. */
require_once(ABSPATH . 'wp-settings.php');
function wp_mail() {}
