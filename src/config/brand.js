// ONE place for everything brand- and account-specific.
// Change the name here and the whole site updates (title tags, footer, schema, WhatsApp text).
// Leave an ID empty ("") and that integration is simply not loaded — nothing breaks.

export const brand = {
  // ---- Identity -------------------------------------------------------
  name: 'Como en Familia',
  tagline: 'Cuidado especializado en Alzheimer y demencia, en casa',
  legalName: 'Como en Familia S. de R.L. de C.V.', // update once incorporated
  domain: 'comoenfamilia.mx',
  city: 'Guadalajara',
  serviceArea: 'Guadalajara, Zapopan y Tlajomulco',

  // ---- Contact --------------------------------------------------------
  phoneDisplay: '33 0000 0000',            // company phone (WhatsApp Business line)
  phoneE164: '523300000000',               // digits only, country code first — used for tel: and wa.me links
  email: 'hola@comoenfamilia.mx',
  whatsappGreeting: 'Hola, me gustaría información sobre el cuidado en casa para un familiar con Alzheimer.',

  // ---- Tracking & marketing IDs (fill in as accounts are created) -------
  gtmId: '',            // e.g. 'GTM-XXXXXXX'  — the ONLY tag hard-coded in the site; GA4, Meta Pixel, Google Ads, HubSpot all go inside GTM
  hubspotPortalId: '', // e.g. '12345678'
  hubspotFormId: '',   // e.g. 'a1b2c3d4-....'  (HubSpot form for the contact page)
  hubspotRegion: 'na1',

  // ---- Social (leave empty until handles are claimed) ---------------------
  instagram: '',
  facebook: '',
};
