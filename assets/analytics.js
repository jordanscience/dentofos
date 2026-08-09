/* ============================================================
   Mesure d'audience — Cabinet Dentaire DENTOFOS
   ------------------------------------------------------------
   Configuration volontairement minimale et sans cookie, afin de
   rester dans le cadre de l'exemption de consentement prevue par
   la CNIL pour la mesure d'audience :
     - aucun cookie, aucun stockage local (persistence: memory)
     - adresse IP non transmise
     - pas de capture automatique des clics ni d'enregistrement
       de session
     - aucun suivi entre sites
   Seuls sont mesures : les pages vues et quelques actions utiles
   au cabinet (appels, prises de rendez-vous, itineraires).
   ============================================================ */
(function () {
  'use strict';

  // Cle publique de projet PostHog (commence par "phc_").
  // Cette cle est concue pour etre publique, elle figure dans le code
  // de la page. Ne jamais mettre ici une cle personnelle ("phx_").
  var CLE = 'phc_pwFKUMBfoBm78vQowyHDAJX5nAvxD4CxXWTWS2qNAbCh';

  // Region du compte PostHog : https://eu.i.posthog.com (Europe)
  // ou https://us.i.posthog.com (Etats-Unis).
  var HOTE = 'https://us.i.posthog.com';

  // Tant que la cle n'est pas renseignee, rien n'est charge.
  if (CLE.indexOf('phc_') !== 0 || CLE === 'phc_A_REMPLACER') return;

  // Respect du signal "Do Not Track" du navigateur.
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init(CLE, {
    api_host: HOTE,
    persistence: 'memory',            // aucun cookie, aucun localStorage
    autocapture: false,               // pas de capture automatique des clics
    capture_pageview: true,
    capture_pageleave: false,
    disable_session_recording: true,  // aucun enregistrement d'ecran
    disable_surveys: true,
    enable_heatmaps: false,
    person_profiles: 'never',         // aucun profil individuel
    property_denylist: ['$ip', '$device_id'],
    ip: false
  });

  // ---- Actions utiles au cabinet -------------------------------
  function suivre(nom, proprietes) {
    if (window.posthog && posthog.capture) posthog.capture(nom, proprietes || {});
  }

  document.addEventListener('click', function (evt) {
    var a = evt.target.closest && evt.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';

    if (href.indexOf('tel:') === 0) {
      suivre('appel_telephone', { emplacement: a.className || 'lien', page: location.pathname });
      return;
    }
    if (href.indexOf('doctolib.fr') !== -1) {
      suivre('rdv_doctolib', { praticien: (a.textContent || '').trim().slice(0, 60), page: location.pathname });
      return;
    }
    if (href.indexOf('waze.com') !== -1) {
      suivre('itineraire', { service: 'waze', page: location.pathname });
      return;
    }
    if (href.indexOf('google.com/maps') !== -1) {
      suivre('itineraire', { service: 'google_maps', page: location.pathname });
    }
  }, true);
})();
