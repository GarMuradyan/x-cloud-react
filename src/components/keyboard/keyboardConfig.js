import shiftLogo from '../../images/shift.png'
import doneLogo from '../../images/done.png'
import spaceLogo from '../../images/space.png'
import closeLogo from '../../images/close.png'

const keyboard = [
    [{ key: '1', type: 'basic' }, { key: '2', type: 'basic' }, { key: '3', type: 'basic' }, { key: 'q', type: 'basic' }, { key: 'w', type: 'basic' }, { key: 'e', type: 'basic' }, { key: 'r', type: 'basic' }, { key: 't', type: 'basic' }, { key: 'y', type: 'basic' }, { key: 'u', type: 'basic' }, { key: 'i', type: 'basic' }, { key: 'o', type: 'basic' }, { key: 'p', type: 'basic' }],
    [{ key: '4', type: 'basic' }, { key: '5', type: 'basic' }, { key: '6', type: 'basic' }, { key: 'a', type: 'basic' }, { key: 's', type: 'basic' }, { key: 'd', type: 'basic' }, { key: 'f', type: 'basic' }, { key: 'g', type: 'basic' }, { key: 'h', type: 'basic' }, { key: 'j', type: 'basic' }, { key: 'k', type: 'basic' }, { key: 'l', type: 'basic' }, { key: '@', type: 'basic' }],
    [{ key: '7', type: 'basic' }, { key: '8', type: 'basic' }, { key: '9', type: 'basic' }, { key: '', type: 'shift', poster: shiftLogo, imgWidth: '3rem', imgHeight: '3rem' }, { key: 'z', type: 'basic' }, { key: 'x', type: 'basic' }, { key: 'c', type: 'basic' }, { key: 'v', type: 'basic' }, { key: 'b', type: 'basic' }, { key: 'n', type: 'basic' }, { key: 'm', type: 'basic' }, { key: '.', type: 'basic' }, { key: '', type: 'close', poster: closeLogo, imgWidth: '4rem', imgHeight: '3rem' }],
    [{ key: '+', type: 'basic' }, { key: '0', type: 'basic' }, { key: '-', type: 'basic' }, { key: ',', type: 'basic' }, { key: '/', type: 'basic' }, { key: '', type: 'space', poster: spaceLogo, width: '34.4rem', imgWidth: '5rem', imgHeight: '2rem' }, { key: '-', type: 'basic' }, { key: '_', type: 'basic' }, { key: '', type: 'done', poster: doneLogo, width: '16.8rem', imgWidth: '3rem', imgHeight: '3rem' }]
]

export default keyboard