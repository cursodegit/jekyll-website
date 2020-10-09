window.klaroConfig = {
    elementID: 'klaro',
    storageMethod: 'localStorage',
    storageName: 'klaro',
    htmlTexts: true,
    cookieExpiresAfterDays: 30,
    privacyPolicy: {es: '/politica-de-cookies.html'},
    default: true,
    mustConsent: true,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    translations: {
        es: {
            consentModal: {
                description: 'Aquí puede evaluar y personalizar los servicios que nos gustaría utilizar en este sitio web. ¡Usted está a cargo! Habilite o deshabilite los servicios como considere oportuno.',
                privacyPolicy: {
                    name: 'política de cookies',
                    text: 'Para saber más, por favor lea nuestra {privacyPolicy}.',                 
                }
            },
            purposes: {
                tecnical: {
                    description: 'Son aquellas que se usan de forma interna y que son necesarias para el funcionamiento de la web.',
                    title: 'Técnicas'
                },
                analytics: {
                    description: 'Son aquellas que permiten recabar información estadística sobre la actividad de los usuarios. Dicha información se recopila de forma anónima y permite optimizar la navegación por nuestra web con el fin de garantizar un mejor servicio al usuario',
                    title: 'Análiticas'
                },
                customization: {
                    description: 'Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.',
                    title: 'Personalización'
                },
                ads: {
                    title: 'Publicidad',
                    description: 'Son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.'
                },
                thirdParty: {
                    title: 'Cookies de terceros',
                    description: 'Cookies utilizadas por teceros para ofrecer servicios adicionales dentro de nuestra página web, por ejemplo, vídeos, mapas interactivos, etc.'
                }
            },
            cookiesConsent: {
                title: 'Cosentimiento de cookies'
            },
            googleAnalytics: {
                description: ''
            }

        }
    },    
    apps: [
        {
            name: 'cookiesConsent',
            purposes: ['tecnical'],
            required: true,
        },
        {
            name: 'googleAnalytics',
            default: true,
            title: 'Google Analytics',
            description: '', 
            purposes: ['analytics'],
            cookies: [/^ga/i],
            callback: function(consent, app) {
            },
            required: false,
            optOut: false,
            onlyOnce: true,
        },
        {
            name: 'youtube',
            default: true,
            title: 'YouTube',
            purposes: ['thirdParty'],
            cookies: ['IDE', 'YSC', 'VISITOR_INFO1_LIVE', 'CONSENT', 'PREF', 'GPS'],
            callback: function(consent, app) {
            },
            required: false,
            optOut: false,
        }

    ],
};