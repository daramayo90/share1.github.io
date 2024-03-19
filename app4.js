export function Share(element) {
   const canShare = 'share' in window.navigator;
   const options = element.dataset.share.split(' ');
   const shareIndex = options.findIndex((option) => {
      return option === 'device';
   });
   const shareData = {
      facebook: { url: 'https://www.facebook.com/share.php?u=' },
      linkedin: { url: 'https://www.linkedin.com/shareArticle?mini=true&url' },
      twitter: { url: 'https://www.twitter.com/share?url=' },
   };

   if (shareIndex > -1 && !canShare) {
      options.splice(shareIndex, 1);
   }

   if (shareIndex > -1 && canShare) {
      const shareButton = h(
         'button',
         {
            'aria-label': `${element.dataset.shareDevice}`,
            'data-share-item': '',
         },
         [h('i')],
      );
      shareButton.addEventListener('click', () => {
         navigator
            .share({
               title: document.title,
               url: location.href,
            })
            .catch(() => {
               return;
            });
      });
      element.appendChild(shareButton);
   } else {
      options.forEach((option) => {
         const shareLink = h(
            'a',
            {
               'aria-label': `${element.dataset.shareLabel} ${option}`,
               'data-share-item': option,
               href: shareData[option].url + encodeURIComponent(location.href),
               rel: 'noopener noreferrer',
               target: '_blank',
            },
            [h('i')],
         );
         element.appendChild(shareLink);
      });
   }
}

function h(type, attributes, children = []) {
   const element = document.createElement(type);
   for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
   }
   if (children.length) {
      children.forEach((child) => {
         if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
         } else {
            element.appendChild(child);
         }
      });
   }
   return element;
}

const shares = document.querySelectorAll(`[data-share]`);

shares.forEach((element) => {
   Share(element);
});
