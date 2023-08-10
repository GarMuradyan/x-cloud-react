function os () {
    console.log('OS:')
    if (window.tizen) {
        console.log('Tizen OS')
        tizen.tvinputdevice.registerKeyBatch(
            ['ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue', 'ChannelUp', 'ChannelDown']
        )
    }

    const onWindowResize = () => {

        let fontSize = 10; // 1rem = 10px (default) 1920x1080

        let k = window.innerWidth / 1920;

        fontSize = fontSize * k;

        document.documentElement.style.fontSize = fontSize + "px";

    }

    onWindowResize();

    window.addEventListener("resize", onWindowResize);
}

export default os
