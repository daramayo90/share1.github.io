export async function Share(element) {
   const canShare = 'share' in window.navigator;
   const options = element.dataset.share.split(' ');
   const shareIndex = options.findIndex((option) => {
      return option === 'device';
   });
   const shareData = {
      facebook: { url: 'https://www.facebook.com/share.php?u=' },
      linkedin: { url: 'https://www.linkedin.com/shareArticle?mini=true&url=' },
      twitter: { url: 'https://www.twitter.com/share?url=' },
      // Instagram does not support direct sharing via URL in this manner.
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
         [h('i', {}, ['Share'])], // Added text inside button for clarity
      );
      shareButton.addEventListener('click', async () => {
         // Assume 'path/to/your/image.jpg' is a path to the image you want to share
         // This could also be a blob or file object directly obtained from an input field or other data source
         try {
            const imageFile = await fetch('test.jpg')
               .then((response) => {
                  if (!response.ok) throw new Error('Network response was not ok');
                  return response.blob();
               })
               .then((blob) => new File([blob], 'test.jpg', { type: 'image/jpeg' }));

            if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
               await navigator.share({
                  title: document.title,
                  url: location.href,
                  files: [imageFile],
               });
            } else {
               console.log('File sharing not supported');
               // Fallback or notify user here
            }
         } catch (error) {
            console.error('Sharing failed', error);
         }
      });
      element.appendChild(shareButton);
   } else {
      options.forEach((option) => {
         if (shareData[option]) {
            // Check if option exists in shareData
            const shareLink = h(
               'a',
               {
                  'aria-label': `${element.dataset.shareLabel} ${option}`,
                  'data-share-item': option,
                  href: shareData[option].url + encodeURIComponent(location.href),
                  rel: 'noopener noreferrer',
                  target: '_blank',
               },
               [h('i', {}, [option])], // Added text inside link for clarity
            );
            element.appendChild(shareLink);
         }
      });
   }
}

function h(type, attributes, children = []) {
   const element = document.createElement(type);
   for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
   }
   children.forEach((child) => {
      if (typeof child === 'string') {
         element.appendChild(document.createTextNode(child));
      } else {
         element.appendChild(child);
      }
   });
   return element;
}

const shares = document.querySelectorAll(`[data-share]`);
shares.forEach((element) => {
   Share(element);
});
