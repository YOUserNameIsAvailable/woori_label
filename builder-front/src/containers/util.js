// Include external scripts or styles as part of your content.
// These are utilities to dynamically add the external scripts & styles.
export const addExternalScripts = (list, callback, n=0) => {
    if(list==='') {
        if(callback) callback();
        return;
    }
    let arrScript = list.split(',');
    if(n<=arrScript.length-1) {
        let url = arrScript[n];
        
        // Remove existing
        let includes = document.head.querySelectorAll('script');
        includes.forEach((link) => {
            if(link.src.indexOf(url)!==-1) {
                link.parentNode.removeChild(link);
            }
        });

        var script = document.createElement('script');
        script.onload = () =>{

            addExternalScripts(list,callback,n+1);

        };
        script.src = url;
        document.head.appendChild(script);

    } else {
        if(callback) callback();
    }
}

export const addExternalStyles = (list) => {
    // Remove existing
    let includes = document.head.querySelectorAll('[data-my-css-link]');
    includes.forEach((link) => {
        link.parentNode.removeChild(link);
    });

    let arrStyle = list.split(',');
    for(let i=0;i<=arrStyle.length-1;i++){
        let url = arrStyle[i];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.setAttribute('data-my-css-link','');
        link.href = url;
        document.head.appendChild(link);
    }
}

export const renderHtml = (html) => {
    let range = document.createRange()
    const wrapper = document.querySelector('.container')
    wrapper.innerHTML = ''
    wrapper.appendChild(range.createContextualFragment(html)) // We use createContextualFragment so that embedded javascript code (code block) will be executed
}