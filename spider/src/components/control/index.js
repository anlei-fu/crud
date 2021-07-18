import installButton from "./button"
import installCode from "./code"
import installCommon from "./common"
import installEditTable from "./edit-table"
import installEnumConfig from "./enum-config"
import installGlobalConfig from "./global-config"
import installLayout from "./layout"
import intallLefTab from "./left-tab"
import installModalControl from "./modal-control"
import installTableConfig from "./table-config"
import installVuexItem from "./vuex-item"
import installPage from "./page-config"


export default {
        install(vue) {
                installButton(vue);
                installCode(vue);
                installCommon(vue);
                installEditTable(vue);
                installEnumConfig(vue);
                installGlobalConfig(vue);
                installLayout(vue);
                intallLefTab(vue);
                installModalControl(vue);
                installTableConfig(vue);
                installVuexItem(vue);
                installPage(vue);
        }
}