import React from 'react'
import ReactDOM from 'react-dom'
import hljs from 'highlight.js'

class Notepad extends React.Component {
    constructor() {
        super()
        this.state = {
            highlightedHTML: "",
        }
    }

    storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    syncText(element) {
        var self = this;
        element.onkeydown = (e) => {
            // get caret position/selection
            var val = element.value,
                start = element.selectionStart,
                end = element.selectionEnd;

            if (e.keyCode === 9) { // tab was pressed
                // set textarea value to: text before caret + tab + text after caret
                element.value = val.substring(0, start) + '\t' + val.substring(end)

                // put caret at right position again
                element.selectionStart = element.selectionEnd = start + 1

                // prevent the focus lose
                return false
            }

            if (e.keyCode === 13) {
                self.editorHighlight.scrollTop = element.scrollTop;
            }
        }

        element.addEventListener('input', (e) => {
            // sync text
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            var newChar = String.fromCharCode(charCode);
            var textToSync = element.value + newChar
            var codeHighlight = hljs.highlight('markdown', textToSync)
            self.setState({ highlightedHTML: codeHighlight.value })
            if (self.storageAvailable('localStorage')) {
                localStorage.setItem('savedNote', this.editor.value)
            }
        })

        element.addEventListener('scroll', () => {
            self.editorHighlight.scrollTop = element.scrollTop;
        })
    }

    componentDidMount() {
        if (this.editor != null) {
            hljs.initHighlightingOnLoad();
            this.editor.focus()
            this.syncText(this.editor)

            if (this.storageAvailable('localStorage')) {
                // Yippee! We can use localStorage awesomeness
                var savedValue = localStorage.getItem('savedNote')
                if (savedValue) {
                    this.editor.value = savedValue
                    this.setState({ highlightedHTML: hljs.highlight('markdown', this.editor.value).value })
                }
            }
            else {
                // Too bad, no localStorage for us
                console.log('You don\'t have localStorage, nothing can be saved!')
            }
        }
    }

    render() {
        return (
            <div className="content">
                <pre ref={(ref) => this.editorHighlight = ref} className="highlight-layer" dangerouslySetInnerHTML={{__html: this.state.highlightedHTML}}></pre>
                <textarea ref={(ref) => this.editor = ref} placeholder="Don't think, just type..."></textarea>
            </div>
        )
    }
}

export default Notepad
