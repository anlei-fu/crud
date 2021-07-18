import ColorSelector from "./ColorSelector"
import IconSelector from "./IconSelector"
import IndexColumnConfiger from "./IndexColumnConfiger"
import JoinConfiger from "./JoinConfiger"
import OrderByConfiger from "./OrderByConfiger"
import TableCloneColumnSelector from "./TableCloneColumnSelector"
import TableContextColumnSelector from "./TableContextColumnSelector"
import CasscaderConfiger from "./CasscaderConfiger"

function install(vue) {
    vue.component("ColorSelector", ColorSelector);
    vue.component("IconSelector", IconSelector);
    vue.component("IndexColumnConfiger", IndexColumnConfiger);
    vue.component("JoinConfiger", JoinConfiger);
    vue.component("OrderByConfiger", OrderByConfiger);
    vue.component("TableCloneColumnSelector", TableCloneColumnSelector);
    vue.component("TableContextColumnSelector", TableContextColumnSelector);
    vue.component("CasscaderConfiger", CasscaderConfiger);

}

export default install