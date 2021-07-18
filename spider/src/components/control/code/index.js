import CodeViewer from "./CodeViewer"
import JavaCodeViewer from "./JavaCodeViewer"
import JsCodeViewer from "./JsCodeViewer"
import SqlCodeViewer from "./SqlCodeViewer"

function install(vue) {
    vue.component("CodeViewer", CodeViewer);
    vue.component("JavaCodeViewer", JavaCodeViewer);
    vue.component("JsCodeViewer", JsCodeViewer);
    vue.component("SqlCodeViewer", SqlCodeViewer);

}

export default install