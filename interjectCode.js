// First make sure the wrapper app is loaded
document.addEventListener("DOMContentLoaded", function() {

   // Then get its webviews
   let webviews = document.querySelectorAll(".TeamView webview");

   // Fetch our CSS in parallel ahead of time
   const cssPath = 'https://raw.githubusercontent.com/kBite/slack-black-theme/kbite/custom.css';
   let cssPromise = fetch(cssPath).then(response => response.text());

//     :root {
//       /* Modify these to change your theme colors: */
//       --primary: ${theme.primary};
//       --primaryT: ${theme.primaryT};
//       --accent: ${theme.accent};
//       --accentT: ${theme.accentT};
//       --accent2: ${theme.accent2};
//       --accent2T: ${theme.accent2T};
//       --bg: ${theme.bg};
//       --fg: ${theme.fg};
//       --text: ${theme.text};
//       --selectBg: ${theme.selectBg};
//       --selectFg: ${theme.selectFg};
//       --button: ${theme.button};
//       --secondBg: ${theme.secondBg};
//       --disabled: ${theme.disabled};
//       --contrast: ${theme.contrast};
//       --active: ${theme.active};
//       --border: ${theme.border};
//       --hl: ${theme.hl};
//       --tree: ${theme.tree};
//       --notif: ${theme.notif};
//       --excluded: ${theme.excluded};
//
//       --yellow: ${theme.yellow};
//       --green: ${theme.green};
//       --cyan: ${theme.cyan};
//       --blue: ${theme.blue};
//       --purple: ${theme.purple};
//       --red: ${theme.red};
//       --red2: ${theme.red2};
//       --orange: ${theme.orange};
//       --orange2: ${theme.orange2};
//       --gray: ${theme.gray};
//       --silver: ${theme.silver};
//       --black: ${theme.black};
//     }

   let customCustomCSS = `
   :root {
      /* Modify these to change your theme colors: */
      --primary: #66d9ef;
      --text: #EEEEEC;
      --background: #1C1C1C;
      --background-elevated: #222;
   }

   a[aria-label^="NAME_OF_CHANNEL_OR_DIRECT_CONVO_TO_STYLE"]
   {
        --background: #4d0000  !important;
        --text-transform: uppercase  !important;
        --letter-spacing: 2px !important;
        --text-shadow: 1px 1px white;

   }   `

   // Insert a style tag into the wrapper view
   cssPromise.then(css => {
      let s = document.createElement('style');
      s.type = 'text/css';
      s.innerHTML = css + customCustomCSS;
      document.head.appendChild(s);
   });

   // Wait for each webview to load
   webviews.forEach(webview => {
      webview.addEventListener('ipc-message', message => {
         if (message.channel == 'didFinishLoading')
            // Finally add the CSS into the webview
            cssPromise.then(css => {
               let script = `
                     let s = document.createElement('style');
                     s.type = 'text/css';
                     s.id = 'slack-custom-css';
                     s.innerHTML = \`${css + customCustomCSS}\`;
                     document.head.appendChild(s);
                     `
               webview.executeJavaScript(script);
            })
      });
   });
});
