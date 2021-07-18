import CheckboxEnumSelector from "./CheckboxEnumSelector"
import EnumSelector from "./EnumSelector"
import TableColumnSelector from "./TableColumnSelector"
import TableSelector from "./TableSelector"

function install(vue) {
    vue.component("CheckboxEnumSelector", CheckboxEnumSelector);
    vue.component("EnumSelector", EnumSelector);
    vue.component("TableColumnSelector", TableColumnSelector);
    vue.component("TableSelector", TableSelector);

}

export default install