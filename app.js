const imageUrl = 'study.png';
const input = document.getElementById('files');

document.getElementById('share').addEventListener('click', async () => {
   const files = input.files;

   console.log(files);

   if (navigator.canShare) {
      try {
         await navigator.share({
            files,
            title: 'Images',
            text: 'Beautiful images',
         });
      } catch (error) {
         console.log(error);
      }
   }
});
