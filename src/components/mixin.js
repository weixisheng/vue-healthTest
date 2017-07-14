export const loadMore = {
    directives: {
        'load-more': {
            bind: (el, binding) => {
                const wHeight = window.screen.height;
                let height, offsetTop, pdBottom, mgBottom, oldScrollTop, scrollEl, heightEl;
                // 传值2表示scrollEl,否则是body
                let scrollType = el.attributes.type && el.attributes.type.value;
                // 缓冲距离
                const scrollReduce = 2;
                // 有wrapper的情况，取子节点作scroller
                if (scrollType == 2) {
                    scrollEl = el;
                    heightEl = el.children[0];
                } else {
                    scrollEl = document.body;
                    heightEl = el;
                }
                //scrollTop不属于style，单独计算
                const getStyle = (element, attr) => {
                    let target;
                    if (attr == 'scrollTop') {
                        target = element.scrollTop;
                    } else {
                        target = window.getComputedStyle(element, null)[attr];
                    }
                    return parseInt(target);
                }
                const loadMore = () => {

                    if (scrollEl.scrollTop + wHeight >= height + offsetTop + pdBottom + mgBottom + scrollReduce)
                        binding.value();
                }
                const moveEnd = () => {
                    var rAF = requestAnimationFrame(() => {
                        if (scrollEl.scrollTop != oldScrollTop) {
                            oldScrollTop = scrollEl.scrollTop;
                            moveEnd();
                        } else {
                            cancelAnimationFrame(rAF);
                            height = heightEl.clientHeight;
                            loadMore();
                        }
                    })
                }
                el.addEventListener('touchstart', () => {
                    height = scrollType == 2 ? height : heightEl.clientHeight;
                    offsetTop = el.offsetTop;
                    pdBottom = getStyle(el, 'paddingBottom');
                    mgBottom = getStyle(el, 'marginBottom');

                }, false);
                el.addEventListener('touchmove', () => {
                    loadMore();

                }, false)
                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                }, false)
            }
        }
    }
}
