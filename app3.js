const imageUrl = 'study.png';

document.getElementById('shareFileBtn').addEventListener('click', async () => {
   const fetchedImage = await fetch(imageUrl);
   const blobImage = await fetchedImage.blob();
   const fileName = imageUrl.split('/').pop();

   const filesArray = [
      new File([blobImage], fileName, {
         type: 'image/png',
         lastModified: Date.now(),
      }),
   ];

   console.log(filesArray);

   const shareData = {
      title: fileName,
      files: filesArray,
      url: document.location.origin,
   };

   if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
   }
});
