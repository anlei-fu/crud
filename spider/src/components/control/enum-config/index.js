import EnumConfig from "./EnumConfig"
import EnumForm from "./EnumForm"
import EnumViewer from "./EnumViewer"

function install(vue) {
    vue.component( "EnumConfig",EnumConfig);
    vue.component( "EnumForm",EnumForm);
    vue.component( "EnumViewer",EnumViewer);
}

export default install
