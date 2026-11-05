// WebMCP (W3C draft, Chrome early preview): read-only tools for a browser
// agent on the live page. Feature-detected, so other browsers and crawlers are
// unaffected. Same facts as /ai/ and /llms.txt. Nothing here books, pays or sends.
(function () {
  var mc = navigator.modelContext;
  if (!mc || !mc.registerTool) return;
  var text = function (d) {
    return { content: [{ type: 'text', text: JSON.stringify(d, null, 2) }] };
  };
  var add = function (name, description, load) {
    try {
      mc.registerTool({
        name: name,
        description: description,
        inputSchema: { type: 'object', properties: {} },
        annotations: { readOnlyHint: true },
        execute: function () { return Promise.resolve(text(load())); }
      });
    } catch (e) { /* already registered or API shape changed */ }
  };

  add('get_profile', 'Who Shreyas Raj is: role, location, company and public profiles.', function () {
    return {
      name: 'Shreyas Raj',
      role: 'AI instructor, applied AI builder and founder of RapidXAI',
      location: 'Pune, Maharashtra, India',
      teaches: 'Building and selling AI voice agents and AI automation, and building an AI agency from scratch.',
      company: { name: 'RapidXAI', url: 'https://rapidxai.com/' },
      profiles: {
        youtube: 'https://www.youtube.com/@AIwithShreyasRaj',
        instagram: 'https://www.instagram.com/theshreyasraj9595/',
        x: 'https://x.com/TopR9595',
        github: 'https://github.com/TopR9595',
        educatexai: 'https://educatexai.com/'
      },
      factsPage: 'https://shreyasraj.com/ai/'
    };
  });

  add('get_educatex_offer', 'The EducateX AI community offer as listed on 5 November 2026. Check educatexai.com for current price and terms.', function () {
    return {
      name: 'EducateX AI community',
      listedPrice: '$197 one-time, lifetime access (as of 5 November 2026)',
      url: 'https://educatexai.com/',
      note: 'Confirm the current price and terms on educatexai.com.'
    };
  });

  add('get_pages', 'List the main pages of shreyasraj.com with URLs.', function () {
    return [
      { title: 'Facts for AI agents', url: 'https://shreyasraj.com/ai/' },
      { title: 'Paid 1:1 consultation', url: 'https://shreyasraj.com/consult/' },
      { title: 'Portfolio and case files', url: 'https://shreyasraj.com/' },
      { title: 'AI Field Notes', url: 'https://shreyasraj.com/blog/' }
    ];
  });

  add('get_consultation_link', 'Get the link to the paid 1:1 consultation page. Returns a link only, it does not book or charge anything.', function () {
    return {
      url: 'https://shreyasraj.com/consult/',
      note: 'The human must choose a slot and complete payment themselves.'
    };
  });
})();
