import ListPageConfig from "./ListPageConfig"
import DisplayColumnConfig from "./DisplayColumnConfig"
import FilterColumnConfig from "./FilterColumnConfig"
import AddColumnConfig from "./AddColumnConfig"

function install(vue) {
    vue.component("ListPageConfig", ListPageConfig);
    vue.component("DisplayColumnConfig", DisplayColumnConfig);
    vue.component("FilterColumnConfig", FilterColumnConfig);
    vue.component("AddColumnConfig", AddColumnConfig);

}

export default install
