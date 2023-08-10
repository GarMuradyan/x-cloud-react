class ImageResiser {

    quality = 0.8;
    queue = [];
    resizing = false;
    resizedImages = {};

    resize ({ url, width, height, quality, successCb, errorCb }) {

        if (!url || !width || !height || !successCb || !errorCb) {
            console.warn("ImageResizer: missing required params => url, width, height, successCb, errorCb");
            return errorCb();
        }

        const resizedImage = this.resizedImages[url + ":" + width + "x" + height];

        if (resizedImage) return successCb(resizedImage);

        const image = new Image();

        image.crossOrigin = 'anonymous';

        image.onload = () => {
            console.log(image.naturalWidth)

            this.queue.push({
                url,
                width,
                height,
                quality,
                successCb,
                errorCb,
                image
            });

            this.processQueue();

        }

        image.onerror = () => {
            errorCb(url)
        }

        image.src = url;

    }

    processQueue () {

        requestAnimationFrame(() => {

            if (this.queue.length === 0) return;

            if (this.resizing) return;

            this.resizing = true;

            let item = this.queue.shift();

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            canvas.width = item.width;
            canvas.height = item.height;

            ctx.drawImage(item.image, 0, 0, item.width, item.height);

            const src = canvas.toDataURL('image/jpeg', item.quality || this.quality);

            this.resizedImages[item.url + ":" + item.width + "x" + item.height] = src;

            item.successCb(src);

            this.resizing = false

            this.processQueue();

        });

    }

}

export default new ImageResiser();