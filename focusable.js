import { useEffect, useRef } from "react";

var focusable = document.getElementsByClassName("focusable");

export default function Focusable ({ children }) {

    const parent = useRef(null);

    useEffect(() => {

        parent.current.addEventListener("mouseenter", () => {
            var active = document.querySelector(".active");
            if (active) active.classList.remove("active");
            parent.current.children[0].classList.add("active");
        }, true);

        parent.current.focus = function () {
            this.children[0].classList.add("active");
        }

        parent.current.blur = function () {
            this.children[0].classList.remove("active");
        }

        parent.current.move = function (side) {

            var rect = this.getBoundingClientRect();

            var nextElements = [];
            var nearestRect = null;
            var nearestEl = null;

            for (var i = 0; i < focusable.length; i++) {

                if (focusable[i] == this) continue;

                var focusableRect = focusable[i].getBoundingClientRect();

                switch (side) {
                    case "up":

                        var top = focusableRect.top + focusableRect.height;

                        if (top < rect.top) {

                            var left = focusableRect.left;
                            var right = focusableRect.left + focusableRect.width;

                            if (rect.left <= left && rect.left + rect.width >= left || right >= rect.left && right <= rect.left + rect.width) {

                                nextElements.push(focusable[i]);

                            }

                        }

                        break;
                    case "down":

                        var top = focusableRect.top;

                        if (top > rect.top) {

                            var left = focusableRect.left;
                            var right = focusableRect.left + focusableRect.width;

                            if (rect.left <= left && rect.left + rect.width >= left || right >= rect.left && right <= rect.left + rect.width) {

                                nextElements.push(focusable[i]);

                            }

                        }

                        break;
                    case "left":

                        var left = focusableRect.left + focusableRect.width;

                        if (left < rect.left) {

                            if (!nearestRect) {
                                nearestRect = focusableRect;
                                nearestEl = focusable[i];
                                continue;
                            }

                            var top = focusableRect.top;
                            var bottom = focusableRect.top + focusableRect.height;

                            if (focusableRect.left + focusableRect.width > nearestRect.left + nearestRect.width) {
                                nearestRect = focusableRect;
                                nearestEl = focusable[i];
                            }

                        }

                        break;
                    case "right":

                        var left = focusableRect.left;

                        if (left > rect.left) {

                            var top = focusableRect.top;
                            var bottom = focusableRect.top + focusableRect.height;

                            if (rect.top <= top && rect.top + rect.height >= top || bottom >= rect.top && bottom <= rect.top + rect.height) {

                                nextElements.push(focusable[i]);

                            }

                        }

                        break;
                }

            }

            // if (nextElements.length == 0) return;

            // var closest = null;

            // nextElements.map(function (item) {

            //     if (!closest) {
            //         closest = item;
            //     } else {

            //         var itemRect = item.getBoundingClientRect();

            //         var closestRect = closest.getBoundingClientRect();

            //         switch (side) {
            //             case "up":
            //                 if (itemRect.top > closestRect.top) closest = item;
            //                 break;
            //             case "down":
            //                 if (itemRect.top < closestRect.top) closest = item;
            //                 break;
            //             case "left":
            //                 if (itemRect.right > closestRect.right) closest = item;
            //                 break;
            //             case "right":
            //                 if (itemRect.right < closestRect.right) closest = item;
            //                 break;
            //         }

            //     }

            // });

            // this.blur();
            // closest.focus();

            if (nearestEl) {
                this.blur();
                nearestEl.focus();
            }

        }

    }, []);

    return (
        <div className='focusable' style={ { display: "inline-block" } } ref={ parent }>
            { children }
        </div>
    );

}

document.addEventListener("keydown", function keydown (e) {

    var key = e.keyCode;

    var active = document.getElementsByClassName("active")[0].parentNode;

    if (!active) return;

    switch (key) {
        case 37: // left
            active.move("left");
            break;
        case 38: // up
            active.move("up");
            break;
        case 39: // right
            active.move("right");
            break;
        case 40: // down
            active.move("down");
            break;
    }

});