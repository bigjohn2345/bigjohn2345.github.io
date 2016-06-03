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

    highlightCode(input) {
        var codeHighlight = hljs.highlight('markdown', input).value
        codeHighlight = codeHighlight.replace(/(\[ \] \w+.*)/g, '<span class="marked-list">$1</span>')
        codeHighlight = codeHighlight.replace(/(\[x\] \w+.*)/g, '<span class="marked-list checked">$1</span>')
        return codeHighlight
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
            var kCode = e.which || e.keyCode;
            if (kCode === 13) {
                console.log(element.value)
                self.editorHighlight.scrollTop = element.scrollTop;
            }
        }

        element.addEventListener('input', (e) => {
            // sync text
            var textToSync = e.target.value
            if (textToSync[textToSync.length - 1] == "\n") {
                var lines = textToSync.split("\n");
                var previousLine = lines[lines.length - 2];
                console.log("previous", previousLine);

                // Numbered list
                var previousNumber = parseInt(previousLine.match(/(\d+)\. [\[|\w]+/g));
                if (!isNaN(previousNumber)) {
                    lines[lines.length - 1] = (previousNumber + 1) + ". "
                }
                // Exit the bullet list
                if (lines[lines.length - 2].match(/(\d+)\. $/g)) {
                    lines[lines.length - 2] = ""
                }

                // Un-ordered list
                if (previousLine.match(/- [\[|\w]+/g)) {
                    lines[lines.length - 1] = "- "
                }
                // Exit the bullet list
                if (lines[lines.length - 2].match(/- $/g)) {
                    lines[lines.length - 2] = ""
                }

                // Join all the lines together (again)
                textToSync = lines.join("\n")
                element.value = textToSync
            }
            self.setState({ highlightedHTML: this.highlightCode(textToSync) })
            if (self.storageAvailable('localStorage')) {
                localStorage.setItem('savedNote', element.value)
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
                    this.setState({ highlightedHTML: this.highlightCode(this.editor.value) })
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
